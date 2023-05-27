import React from "react";
import { formatPercentage } from "../utils/helpers";

const Results = ({
  errors,
  accuracyPercentage,
  total,
  className = "",
  speed,
}: {
  errors: number;
  accuracyPercentage: number;
  total: number;
  className?: string;
  speed: number;
}) => {
  return (
    <ul className="results-list">
      <li className="results">Results</li>
      <li>Accuracy: {formatPercentage(accuracyPercentage)}</li>
      <li className="errors">Errors: {errors}</li>
      <li>Typed: {total}</li>
      <li>Speed: {speed}</li>
    </ul>
  );
};

export default Results;
