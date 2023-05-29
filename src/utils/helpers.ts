export const formatPercentage = (percentage: number) => {
  return percentage.toFixed(0) + "%";
};

export const countErrors = (acutal: string, expected: string) => {
  const expectedCharacters = expected.split("");
  console.log("acutal: ", acutal);
  console.log("expected: ", expected);

  return expectedCharacters.reduce((errors, expectedCharacter, i) => {
    if (acutal[i] !== expectedCharacter) {
      errors++;
    }
    return errors;
  }, 0);
};

export const calculateAccuracyPercentage = (errors: number, total: number) => {
  if (total > 0) {
    const corrects = total - errors;
    return (corrects / total) * 100;
  }

  return 0;
};
