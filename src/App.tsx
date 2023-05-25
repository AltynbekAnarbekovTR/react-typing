import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { faker } from "@faker-js/faker";
import RestartButton from "./components/RestartButton";

const words = faker.random.words(10);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CountdownTimer timeLeft={30} />
      <GenerateWords words={words} />
      <RestartButton />
    </>
  );
}

const GenerateWords = ({ words }: { words: string }) => {
  return <div>{words}</div>;
};

const CountdownTimer = ({ timeLeft }: { timeLeft: number }) => {
  return <h2 className="text-primary-400 font-medium">Time: {timeLeft}</h2>;
};

export default App;
