import React from "react";
import { formatPercentage } from "../utils/helpers";

const Results = ({
  errors,
  accuracyPercentage,
  total,
  className = "",
}: {
  errors: number;
  accuracyPercentage: number;
  total: number;
  className?: string;
}) => {
  return (
    <ul className="results-list">
      <li className="results">Results</li>
      <li>Accuracy: {formatPercentage(accuracyPercentage)}</li>
      <li className="errors">Errors: {errors}</li>
      <li>Typed: {total}</li>
    </ul>
  );
};

export default Results;
