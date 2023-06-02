import { useCallback, useEffect, useRef, useState } from "react";
import { countErrors } from "../utils/helpers";

const isKeyboardCodeAllowed = (code: string) => {
  console.log("code: ", code);

  return (
    code.startsWith("Key") ||
    code.startsWith("Digit") ||
    code.startsWith("Backspace") ||
    code.startsWith("Space")
  );
};

const useTypings = (enabled: boolean, words: string) => {
  const [cursor, setCursor] = useState(0);
  const [typed, setTyped] = useState("");
  const [errors, setErrors] = useState(0);
  const totalTyped = useRef(0);

  console.log("words1: ", words);
  console.log("words1[cursor]: ", words[cursor]);
  console.log("typed1[cursor]: ", typed[cursor]);

  console.log("cursor1: ", cursor);
  window.addEventListener("click", () => {
    console.log("words1: ", words);
  });

  const sumErrors = useCallback(() => {
    const wordsReached = words.substring(0, cursor);
    setErrors(countErrors(typed, wordsReached));
  }, [typed, words, cursor]);

  const keydownHandler = useCallback(
    (event: KeyboardEvent) => {
      const { key, code } = event;
      console.log("key", key);
      console.log("code", code);
      if (event.code === "Space") {
        event.preventDefault();
      }

      if (!enabled || !isKeyboardCodeAllowed(code)) {
        console.log(
          "!enabledddddddddddddddddddddddddddddddddddddddddddddd: ",
          !enabled
        );
        return;
      }

      switch (key) {
        case "Backspace":
          setTyped((prev) => prev.slice(0, -1));
          setCursor(cursor - 1);
          totalTyped.current -= -1;
          break;
        default:
          // const wordsReached = words.substring(0, cursor);
          // const expectedCharacters = wordsReached.split("");
          console.log("words2: ", words);
          console.log("key: ", key);
          console.log("cursor2: ", cursor);
          window.addEventListener("click", () => {
            console.log("words2: ", words);
          });

          console.log("words2[cursor]: ", words[cursor]);
          console.log("typed2[cursor]: ", typed[cursor]);

          if (key === words[cursor]) {
            setTyped((prev) => prev.concat(key));
            setCursor(cursor + 1);
            totalTyped.current += 1;
            console.log(
              "Inside of hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
            );
          } else {
            setErrors((prev) => prev + 1);
          }
        // expectedCharacters.forEach((expectedCharacter, i) => {
        //   // console.log("expectedCharacter: ", expectedCharacter);
        //   // console.log("typed[i]: ", typed[i]);

        //   if (key === expectedCharacter) {
        //     setTyped((prev) => prev.concat(key));
        //     setCursor(cursor + 1);
        //     totalTyped.current += 1;
        //   }
        // });
        // if (typed[i] !== expectedCharacter) {
        // }
      }
    },
    [typed, words]
  );
  const clearTyped = useCallback(() => {
    setTyped("");
    setCursor(0);
  }, []);

  const resetTotalTyped = useCallback(() => {
    totalTyped.current = 0;
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);

    return () => window.removeEventListener("keydown", keydownHandler);
  }, [keydownHandler]);

  return {
    typed,
    cursor,
    clearTyped,
    resetTotalTyped,
    totalTyped: totalTyped.current,
    errors,
    setErrors,
    sumErrors,
  };
};

export default useTypings;
