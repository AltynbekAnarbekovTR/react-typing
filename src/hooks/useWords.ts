import { faker } from "@faker-js/faker";
import { useCallback, useEffect, useState } from "react";

const generateWords = (count: number) => {
  return faker.random.words(count).toLowerCase();
};

// useEffect(() => {}, []);

// const fetchWords = async () => {
//   const response = await fetch(
//     "https://baconipsum.com/api/?type=meat-and-filler&paras=1"
//   );
//   // if (response.ok) {
//   const words = await response.json();
//   console.log("bacon words: ", words);
//   // callback(words[0]);
//   return words;
//   // } else {
//   // throw new Error("An error occurred while fetching data from the API.");
//   // }
// };

const useWords = () => {
  // const [words, setWords] = useState(generateWords(count));
  const [words, setWords] = useState("");

  const fetchWords = async () => {
    const response = await fetch(
      "https://baconipsum.com/api/?type=meat-and-filler&paras=1"
    );

    // if (response.ok) {
    const words = await response.json();
    console.log("bacon words: ", words);
    setWords(words[0]);
    // } else {
    // throw new Error("An error occurred while fetching data from the API.");
    // }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  const updateWords = useCallback(() => {
    // setWords(generateWords(count));
    // fetchWords();
  }, []);

  return { words, updateWords };
};

export default useWords;
