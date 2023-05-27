import React from "react";
import Caret from "./Caret";

const UserTypings = ({
  userInput,
  words,
}: {
  userInput: string;
  words: string;
  // className?: string;
}) => {
  const typedCharacters = userInput.split("");

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
        />
      ))}
      <Caret />
    </div>
  );
};

const Character = ({
  actual,
  expected,
}: {
  actual: string;
  expected: string;
}) => {
  const isCorrect = actual === expected;
  const isWhiteSpace = expected === " ";

  return (
    <span
      className={`${!isCorrect && !isWhiteSpace && "red"} ${
        isCorrect && !isWhiteSpace && "yellow"
      } ${!isCorrect && isWhiteSpace && "light-red"}`}
    >
      {expected}
    </span>
  );
};

export default UserTypings;
