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
    <div className="results">
      <h2>Results</h2>
      <ul className="results-list">
        <li>
          <div className="result-value">
            {formatPercentage(accuracyPercentage)}
          </div>{" "}
          <div>Accuracy</div>
        </li>
        <li>
          <div className="result-value">{errors}</div>
          <div>Errors</div>
        </li>
        <li>
          <div className="result-value"> {total}</div>
          <div>Typed</div>
        </li>
        <li>
          <div className="result-value">{speed}</div>
          <div>words/min</div>
        </li>
      </ul>
    </div>
  );
};

export default Results;
