import React from "react";
import Caret from "./Caret";

const UserTypings = ({
  userInput,
  words,
  cursor,
}: {
  userInput: string;
  words: string;
  cursor: number;
  // className?: string;
}) => {
  console.log("userInput: ", userInput);
  console.log("words from UserTypings: ", words);

  const typedCharacters = userInput.split("");
  const current = userInput.length === cursor;

  return (
    <div
      // className={className}
      className="user-typings"
    >
      {typedCharacters.map((char, index) => (
        <Character
          key={`${char}_${index}`}
          actual={char}
          expected={words[index]}
          cursor={cursor}
          isCurrent={current}
        />
      ))}
      <Caret />
    </div>
  );
};

const Character = ({
  actual,
  expected,
  cursor,
  isCurrent,
}: {
  actual: string;
  expected: string;
  cursor: number;
  isCurrent: boolean;
}) => {
  const isCorrect = actual === expected;
  const isWhiteSpace = expected === " ";

  return (
    <span
      className={`${"green"} ${!isCorrect && !isWhiteSpace && "red"} ${
        isCorrect && !isWhiteSpace && "yellow"
      } ${!isCorrect && isWhiteSpace && "light-red"}`}
    >
      {expected}
    </span>
  );
};

export default UserTypings;
