import { useCallback, useEffect, useRef, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import Results from "./components/Results";
import StartModal from "./components/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Card, Container } from "react-bootstrap";
// import { transliterate } from "transliteration";
import transliteration from "transliteration";

type AppState = "start" | "run" | "finish";

function App() {
  const [words, setWords] = useState<string>("");
  const [cursor, setCursor] = useState(0);
  const [isCorrect, setIsCorrect] = useState(true);
  const [errors, setErrors] = useState(0);
  const [timePassed, setTimePassed] = useState(0);
  const [totalTyped, setTotalTyped] = useState(0);
  const [state, setState] = useState<AppState>("start");
  const [speed, setSpeed] = useState(0);
  const [accuracy, setAccuracy] = useState("0%");
  const [showModal, setShowModal] = useState(true);
  const [lang, setLang] = useState("eng");

  const timerRef = useRef<NodeJS.Timer | null>(null);
  const remaining = words.substring(cursor);

  const typed = words.substring(0, cursor);

  const isStarting = state === "start" && cursor > 0;
  const results = [
    { title: "errors", value: errors },
    { title: "characters", value: totalTyped },
    { title: "chars/min", value: speed },
    { title: "accuracy", value: accuracy },
  ];
  // console.log({
  //   state: state,
  //   remaining: remaining,
  //   "words[cursor]": words[cursor],
  //   words: words,
  //   cursor: cursor,
  //   typed: typed,
  //   totalTyped,
  //   timePassed,
  // });

  const keydownHandler = (event: KeyboardEvent) => {
    const { key, code } = event;

    if (event.code === "Space") {
      event.preventDefault();
    }
    const englishCharacters = /^[A-Za-z0-9.,!?\s]+$/;
    if (!isKeyboardCodeAllowed(event.code)) {
      return;
    } else if (!englishCharacters.test(key)) {
      console.log("Please use english");
    }

    // if (!englishCharacters.test(key)) {
    //   console.log("Please use english");
    // }

    if (key === words[cursor] && isKeyboardCodeAllowed(code)) {
      setCursor((prev) => prev + 1);
      setIsCorrect(true);
      setTotalTyped((prev) => prev + 1);
    } else if (isKeyboardCodeAllowed(code)) {
      setIsCorrect(false);
      // setErrors((prev) => prev + 1);
    }
  };

  const isKeyboardCodeAllowed = (code: string) => {
    return (
      !code.startsWith("Shift") &&
      !code.startsWith("Control") &&
      !code.startsWith("Alt")
    );
  };

  const startCountdown = () => {
    timerRef.current = setInterval(() => {
      setTimePassed((prev) => prev + 1);
    }, 1000);
  };

  const calcSpeed = () => {
    if (state === "run" && timePassed) {
      const speed = (typed.length / timePassed) * 60;
      setSpeed(Math.ceil(speed));
    }
  };

  const calcAccuracy = () => {
    const accuracy = Math.ceil(((totalTyped - errors) / totalTyped) * 100);
    setAccuracy(accuracy + "%");
  };

  // const startTimer = (event: KeyboardEvent) => {
  //   if (timePassed === 0 && isKeyboardCodeAllowed(event.code)) {
  //     startCountdown();
  //   }
  // };

  useEffect(() => {
    const fetchWords = async () => {
      //   let url = "https://baconipsum.com/api/?type=meat-and-filler&paras=1";
      //   if (lang === "ru") {
      //     url = "https://fish-text.ru/get?";
      //   }
      //   const response = await fetch(
      //     // "https://baconipsum.com/api/?type=meat-and-filler&paras=1"
      //     // "https://loripsum.net/api/1/russian"
      //     // "https://randomtext.me/api/gibberish/en"
      //     url
      //   );
      //   if (response.ok) {
      //     let fetchedWords = await response.json();
      //     if (lang === "eng") {
      //       fetchedWords = fetchedWords[0].replace(/\s{2,}/g, " ");
      //     }
      //     if (lang === "ru") {
      //       fetchedWords = fetchedWords.text;
      //     }
      //     setWords(fetchedWords);
      //   } else {
      //     throw new Error("An error occurred while fetching data from the API.");
      //   }
      setWords("Hello!");
    };
    fetchWords();
  }, []);

  useEffect(() => {
    if (state === "run" && totalTyped > 0) {
      calcSpeed();
      calcAccuracy();
    }
  }, [timePassed, typed]);

  useEffect(() => {
    if (isStarting || (errors > 0 && timePassed === 0)) {
      setState("run");
      if (state !== "run") {
        startCountdown();
      }
    }
  }, [isStarting, startCountdown, cursor, typed]);

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);

    return () => window.removeEventListener("keydown", keydownHandler);
  }, [keydownHandler]);

  useEffect(() => {
    if (totalTyped === words.length) {
      setShowModal(true);
    }
  }, [totalTyped]);

  useEffect(() => {
    if (!isCorrect) {
      setErrors((prev) => prev + 1);
    }
  }, [cursor, isCorrect]);

  return (
    <>
      <Container
        // className="d-flex align-items-center justify-content-center vh-100"
        className="position-absolute top-50 start-50 container"
      >
        <StartModal
          show={showModal}
          setShowModal={setShowModal}
          setLang={setLang}
          lang={lang}
        />
        <Row className="justify-content-center">
          <Col md={10} xs={11} className="justify-content-center">
            <Row className="align-items-end mb-10">
              <Col className="order-md-2 d-flex justify-content-center">
                {/* <div className="results"> */}
                {results.map(({ title, value }) => (
                  <div key={title + value} className="result">
                    <span className="result-value">{value}</span>
                    <span className="result-title">{title}</span>
                  </div>
                ))}
              </Col>
              <Col className="order-md-1 d-flex justify-content-center align-items-center">
                <div className="timer">
                  <span className="result-value">{timePassed}</span>
                  <span className="result-title">seconds</span>
                </div>
              </Col>
            </Row>

            <Row className="mt-4">
              <Card>
                <div className="white">
                  <span className="typed">
                    {typed.split("").map((letter, index) => (
                      <span key={`${letter}_${index}`}>{letter}</span>
                    ))}
                  </span>
                  {remaining.split("").map((letter, index) => {
                    return (
                      <span
                        key={`${letter}_${index}`}
                        className={
                          index === 0 ? (isCorrect ? "current" : "wrong") : ""
                        }
                      >
                        {letter}
                      </span>
                    );
                  })}
                </div>
              </Card>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
