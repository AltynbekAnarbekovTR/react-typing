import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { faker } from "@faker-js/faker";
import RestartButton from "./components/RestartButton";
import UserTypings from "./components/UserTypings";
import Results from "./components/Results";

const words = faker.random.words(10);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CountdownTimer timeLeft={30} />
      <GeneratedWords key={words} words={words} />
      {/* User typed characters will be overlayed over the generated words */}
      <Results errors={10} accuracyPercentage={100} total={200} />
      <RestartButton onRestart={() => null} />
    </>
  );
}

const GeneratedWords = ({ words }: { words: string }) => {
  return <div>{words}</div>;
};

const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="words-container">{children}</div>;
};

const CountdownTimer = ({ timeLeft }: { timeLeft: number }) => {
  return <h2>Time: {timeLeft}</h2>;
};

export default App;
