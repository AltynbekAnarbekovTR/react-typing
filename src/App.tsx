import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { faker } from "@faker-js/faker";
import RestartButton from "./components/RestartButton";
import UserTypings from "./components/UserTypings";
import Results from "./components/Results";
import useEngine from "./hooks/useEngine";
import { calculateAccuracyPercentage } from "./utils/helpers";

// const words = faker.random.words(10);

function App() {
  const [count, setCount] = useState(0);
  const { state, words, timePassed, typed, errors, restart, totalTyped } =
    useEngine();
  return (
    <>
      <CountdownTimer timeLeft={timePassed} />
      <WordsContainer>
        <GeneratedWords words={words} />
        <UserTypings userInput={typed} words={words} />
      </WordsContainer>

      {/* User typed characters will be overlayed over the generated words */}
      <Results
        errors={errors}
        accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
        total={totalTyped}
      />
      <RestartButton onRestart={restart} />
    </>
  );
}

const GeneratedWords = ({ words }: { words: string }) => {
  return <div className="generated-words">{words}</div>;
};

const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="words-container">{children}</div>;
};

const CountdownTimer = ({ timeLeft }: { timeLeft: number }) => {
  return <h2>Time: {timeLeft}</h2>;
};

export default App;
