import { useCallback, useEffect, useState } from "react";
import useWords from "./useWords";
import useCountdownTimer from "./useCountdownTimer";
import useTypings from "./useTypings";
// import { countErrors } from "../utils/helpers";
import { clear } from "console";

export type State = "start" | "run" | "finish";

const NUMBER_OF_WORDS = 12;
const COUNTDOWN_SECONDS = 0;

const useEngine = (words: string) => {
  useEffect(() => {
    console.log("words from useEngine: ", words);
  }, [words]);

  const [state, setState] = useState<State>("start");
  // const { words, updateWords } = useWords();
  const { timePassed, startCountdown, resetCountdown } =
    useCountdownTimer(COUNTDOWN_SECONDS);
  const {
    typed,
    cursor,
    clearTyped,
    resetTotalTyped,
    totalTyped,
    errors,
    setErrors,
    sumErrors,
    // } = useTypings(state !== "finish", words);
  } = useTypings(true, words);

  const [speed, setSpeed] = useState(0);

  const isStarting = state === "start" && cursor > 0;
  const areWordsFinished = cursor === words.length;

  const countSpeed = useCallback(() => {
    if (state === "run") {
      const speed = (typed.length / timePassed) * 60;

      setSpeed(Math.ceil(speed));
    }
  }, [typed, timePassed]);

  const restart = useCallback(() => {
    // debug("restarting...");
    resetCountdown();
    resetTotalTyped();
    setState("start");
    setErrors(0);
    // updateWords();
    clearTyped();
  }, [clearTyped, resetCountdown, resetTotalTyped]);

  useEffect(() => {
    if (isStarting) {
      setState("run");
      startCountdown();
    }
  }, [isStarting, startCountdown, cursor]);

  // useEffect(() => {
  //   if (!timePassed) {
  //     console.log("Time is up!");
  //     setState("finish");
  //     sumErrors();
  //   }
  // }, [timePassed, sumErrors]);

  // useEffect(() => {
  //   if (areWordsFinished) {
  //     console.log("Words are finished");
  //     sumErrors();
  //     // updateWords();
  //     clearTyped();
  //   }
  // }, [
  //   cursor,
  //   words,
  //   clearTyped,
  //   typed,
  //   areWordsFinished,
  //   // updateWords,
  //   sumErrors,
  // ]);

  useEffect(() => {
    sumErrors();
    countSpeed();
  }, [typed, timePassed]);

  return {
    state,
    words,
    timePassed,
    typed,
    errors,
    totalTyped,
    restart,
    speed,
    cursor,
  };
};

export default useEngine;
