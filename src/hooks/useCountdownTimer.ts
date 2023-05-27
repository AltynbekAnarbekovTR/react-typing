import { log } from "console";
import { useRef, useState, useCallback, useEffect } from "react";

const useCountdownTimer = (seconds: number) => {
  const [timePassed, setTimePassed] = useState(seconds);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const startCountdown = useCallback(() => {
    console.log("Starting countdown...");

    intervalRef.current = setInterval(() => {
      setTimePassed((timePassed) => timePassed + 1);
    }, 1000);
  }, []);

  const resetCountdown = useCallback(() => {
    console.log("Resetting countdown...");

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setTimePassed(seconds);
  }, [seconds]);

  // when the countdown reaches 0, clear the countdown interval
  useEffect(() => {
    if (!timePassed && intervalRef.current) {
      console.log("Clearing timer...");
      clearInterval(intervalRef.current);
    }
  }, [timePassed, intervalRef]);

  return { timePassed, startCountdown, resetCountdown };
};

export default useCountdownTimer;
