import { useCallback, useEffect, useState } from "react";
import useWords from "./useWords";
import useCountdownTimer from "./useCountdownTimer";
import useTypings from "./useTypings";
import { countErrors } from "../utils/helpers";
import { clear } from "console";

export type State = "start" | "run" | "finish";

const NUMBER_OF_WORDS = 12;
const COUNTDOWN_SECONDS = 0;

const useEngine = () => {
  const [state, setState] = useState<State>("start");
  const { words, updateWords } = useWords();
  console.log("useEngine")
  const { timePassed, startCountdown, resetCountdown } =
    useCountdownTimer(COUNTDOWN_SECONDS);
  const { typed, cursor, clearTyped, resetTotalTyped, totalTyped } = useTypings(
    state !== "finish"
  );

  const [errors, setErrors] = useState(0);
  const [speed, setSpeed] = useState(0);
  console.log(errors);

  const isStarting = state === "start" && cursor > 0;
  const areWordsFinished = cursor === words.length;

  const sumErrors = useCallback(() => {
    const wordsReached = words.substring(0, cursor);
    setErrors(countErrors(typed, wordsReached));
  }, [typed, words, cursor]);

  const countSpeed = useCallback(() => {
    if (state === "run") {
      const speed = (typed.length / timePassed) * 60;
      console.log("timePassed", timePassed);

      setSpeed(Math.ceil(speed));
    }
  }, [typed, timePassed]);

  const restart = useCallback(() => {
    // debug("restarting...");
    resetCountdown();
    resetTotalTyped();
    setState("start");
    setErrors(0);
    updateWords();
    clearTyped();
  }, [clearTyped, updateWords, resetCountdown, resetTotalTyped]);

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

  useEffect(() => {
    if (areWordsFinished) {
      console.log("words are finished");
      sumErrors();
      updateWords();
      clearTyped();
    }
  }, [
    cursor,
    words,
    clearTyped,
    typed,
    areWordsFinished,
    updateWords,
    sumErrors,
  ]);

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
  };
};

export default useEngine;
