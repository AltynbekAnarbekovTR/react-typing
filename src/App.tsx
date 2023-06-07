import { useCallback, useEffect, useRef, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import Results from "./components/Results";
import StartModal from "./components/Modal/StartModal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Card, Container, Button } from "react-bootstrap";
// import { transliterate } from "transliteration";
import transliteration from "transliteration";
import { fetchEnglishWords, wordsActions } from "./store/store";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "./hooks/typedStoreHooks";
import Text from "./components/Text";

type AppState = "start" | "run" | "finish";

function App() {
  // const [words, setWords] = useState<string>("");
  const [cursor, setCursor] = useState(0);
  const [isCorrect, setIsCorrect] = useState(true);
  const [errors, setErrors] = useState(0);
  const [timePassed, setTimePassed] = useState(0);
  // const [totalTyped, setTotalTyped] = useState(0);
  const [state, setState] = useState<AppState>("start");
  const [speed, setSpeed] = useState(0);
  const [accuracy, setAccuracy] = useState("0%");
  const [showModal, setShowModal] = useState(true);
  const [lang, setLang] = useState("eng");
  let timerRef = useAppSelector((state) => state.timer.timerRef);
  const totalTyped = useAppSelector((state) => state.totalTyped);

  const dispatch = useAppDispatch();

  const words = useAppSelector((state) => state.words);

  // const timerRef = useRef<NodeJS.Timer | null>(null);

  let remaining;
  let typed;
  if (words.length) {
    remaining = words.substring(cursor);
    typed = words.substring(0, cursor);
  }

  const isStarting = state === "start" && cursor > 0;
  // const results = [
  //   { title: "errors", value: errors },
  //   { title: "characters", value: totalTyped },
  //   { title: "chars/min", value: speed },
  //   { title: "accuracy", value: accuracy },
  // ];

  // const keydownHandler = (event: KeyboardEvent) => {
  //   const { key, code } = event;

  //   if (event.code === "Space") {
  //     event.preventDefault();
  //   }
  //   const englishCharacters = /^[A-Za-z0-9.,!?\s]+$/;
  //   if (!isKeyboardCodeAllowed(event.code)) {
  //     return;
  //   } else if (!englishCharacters.test(key)) {
  //     console.log("Please use english");
  //   }

  //   // if (!englishCharacters.test(key)) {
  //   //   console.log("Please use english");
  //   // }

  //   if (key === words[cursor] && isKeyboardCodeAllowed(code)) {
  //     setCursor((prev) => prev + 1);
  //     setIsCorrect(true);
  //     setTotalTyped((prev) => prev + 1);
  //   } else if (isKeyboardCodeAllowed(code)) {
  //     setIsCorrect(false);
  //     // setErrors((prev) => prev + 1);
  //   }
  // };

  const isKeyboardCodeAllowed = (code: string) => {
    return (
      !code.startsWith("Shift") &&
      !code.startsWith("Control") &&
      !code.startsWith("Alt")
    );
  };

  // const startCountdown = () => {
  //   timerRef.current = setInterval(() => {
  //     setTimePassed((prev) => prev + 1);
  //   }, 1000);
  // };

  // const fetchWords = async () => {
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
  //   // setWords("Hello!");
  // };

  // const resetApp = () => {
  //   setTotalTyped(0);
  //   setErrors(0);
  //   if (timerRef.current) {
  //     clearInterval(timerRef.current);
  //   }
  //   dispatch(fetchEnglishWords());
  //   setCursor(0);
  //   setTimePassed(0);
  //   setSpeed(0);
  // };

  // useEffect(() => {
  //   if (state === "start") {
  //     // fetchWords();
  //     console.log("Heeeeeeere");
  //     dispatch(fetchEnglishWords());
  //     resetApp();
  //   }
  // }, [state]);

  // useEffect(() => {
  //   if (state === "run" && totalTyped > 0) {
  //     calcSpeed();
  //     calcAccuracy();
  //   }
  // }, [timePassed, typed]);

  // useEffect(() => {
  //   if (isStarting || (errors > 0 && timePassed === 0)) {
  //     setState("run");
  //     // if (state !== "run")
  //     if (state !== "run") {
  //       startCountdown();
  //     }
  //   }
  // }, [isStarting, startCountdown, cursor, typed]);

  // useEffect(() => {
  //   window.addEventListener("keydown", keydownHandler);

  //   return () => window.removeEventListener("keydown", keydownHandler);
  // }, [keydownHandler]);

  useEffect(() => {
    if (!isCorrect) {
      setErrors((prev) => prev + 1);
    }
  }, [cursor, isCorrect]);

  useEffect(() => {
    if (totalTyped === words.length && words.length) {
      setShowModal(true);
      setState("finish");
    }
  }, [totalTyped]);

  // useEffect(() => {
  //   if (state === "finish" && timerRef.current) {
  //     clearInterval(timerRef.current!);
  //   }
  // }, [state]);

  return (
    <>
      <Container
        className="d-flex flex-column align-items-center vh-100"
        // className="position-absolute top-50 start-50 translate-middle"
        // className="mt-5 container"
      >
        <StartModal
          // show={showModal}
          // setShowModal={setShowModal}
          setLang={setLang}
          // lang={lang}
          state={state}
        />
        <Results />
        <Text />
        <div className="text-end">
          <Button
            // disabled={totalTyped <= 0}
            className="mt-2"
            onClick={() => {
              // setState("start");
              // clearInterval(timerRef);
              dispatch(wordsActions.resetApp());
            }}
          >
            Restart
          </Button>
        </div>
      </Container>
    </>
  );
}

export default App;
