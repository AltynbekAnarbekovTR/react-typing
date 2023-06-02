import { useCallback, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Results from "./components/Results";

function App() {
  const [words, setWords] = useState<string>("");
  const [cursor, setCursor] = useState(0);
  const [isCorrect, setIsCorrect] = useState(true);
  const [errors, setErrors] = useState(0);
  const [timePassed, setTimePassed] = useState(0);
  const [totalTyped, setTotalTyped] = useState(0);
  const [state, setState] = useState("start");
  const [speed, setSpeed] = useState(0);
  const [accuracy, setAccuracy] = useState("0%");

  const timerRef = useRef<NodeJS.Timer | null>(null);
  const remaining = words.substring(cursor);

  const typed = words.substring(0, cursor);

  const isStarting = state === "start" && cursor > 0;
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
    const englishCharacters = /^[A-Za-z0-9.,\s]+$/;
    if (!isKeyboardCodeAllowed(event.code)) {
      console.log("Her");

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

  useEffect(() => {
    const fetchWords = async () => {
      const response = await fetch(
        "https://baconipsum.com/api/?type=meat-and-filler&paras=1"
      );

      if (response.ok) {
        const fetchedWords = await response.json();
        const cleanedStr = fetchedWords[0].replace(/\s{2,}/g, " ");
        setWords(cleanedStr);
      } else {
        throw new Error("An error occurred while fetching data from the API.");
      }
    };
    fetchWords();
  }, []);

  useEffect(() => {
    if (state === "run") {
      calcSpeed();
      calcAccuracy();
    }
  }, [timePassed, typed]);

  useEffect(() => {
    if (isStarting) {
      setState("run");
      startCountdown();
    }
  }, [isStarting, startCountdown, cursor, typed]);

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);

    return () => window.removeEventListener("keydown", keydownHandler);
  }, [keydownHandler]);

  useEffect(() => {
    if (cursor > 0 && !isCorrect) {
      setErrors((prev) => prev + 1);
    }
  }, [cursor, isCorrect]);

  return (
    <>
      <div>
        <div>Errors: {errors}</div>
        <div>Total Typed: {totalTyped}</div>
        <div>Time Passed: {timePassed}</div>
        <div>Speed: {speed}</div>
        <div>Accuracy: {accuracy}</div>
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
                className={index === 0 ? (isCorrect ? "current" : "wrong") : ""}
              >
                {letter}
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
