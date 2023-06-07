// import React from "react";
// import { formatPercentage } from "../utils/helpers";

// const Results = ({
//   errors,
//   accuracyPercentage,
//   total,
//   className = "",
//   speed,
// }: {
//   errors: number;
//   accuracyPercentage: number;
//   total: number;
//   className?: string;
//   speed: number;
// }) => {
//   return (
//     <div className="results">
//       <h2>Results</h2>
//       <ul className="results-list">
//         <li>
//           <div className="result-value">
//             {formatPercentage(accuracyPercentage)}
//           </div>{" "}
//           <div>Accuracy</div>
//         </li>
//         <li>
//           <div className="result-value">{errors}</div>
//           <div>Errors</div>
//         </li>
//         <li>
//           <div className="result-value"> {total}</div>
//           <div>Typed</div>
//         </li>
//         <li>
//           <div className="result-value">{speed}</div>
//           <div>words/min</div>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Results;

import { useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../hooks/typedStoreHooks";
import { wordsActions } from "../store/store";

const Results = () => {
  const errors = useAppSelector((state) => state.errors);
  const totalTyped = useAppSelector((state) => state.totalTyped);
  const speed = useAppSelector((state) => state.speed);
  const accuracy = useAppSelector((state) => state.accuracy);
  const timePassed = useAppSelector((state) => state.timer.timePassed);
  let timerRef = useAppSelector((state) => state.timer.timerRef);
  const phase = useAppSelector((state) => state.phase);
  const typed = useAppSelector((state) => state.typed);
  // const timerRef = useRef<NodeJS.Timer | null>(null);
  const dispatch = useAppDispatch();
  const cursor = useAppSelector((state) => state.cursor);

  const results = [
    { title: "errors", value: errors },
    { title: "characters", value: totalTyped },
    { title: "chars/min", value: speed },
    { title: "accuracy", value: accuracy },
  ];
  const isStarting = phase === "start" && cursor > 0;

  const calcSpeed = () => {
    if (phase === "run" && timePassed) {
      const speed = (typed.length / timePassed) * 60;
      dispatch(wordsActions.setSpeed(Math.ceil(speed)));
    }
  };

  const calcAccuracy = () => {
    if (totalTyped > 0) {
      const accuracyNum = Math.ceil(((totalTyped - errors) / totalTyped) * 100);

      dispatch(wordsActions.setAccuracy(accuracyNum));
    }
  };

  const startCountdown = () => {
    // timerRef = setInterval(() => {
    //   dispatch(wordsActions.setTimePassed());
    // }, 1000);
    dispatch(
      wordsActions.setTimerRef(
        setInterval(() => {
          dispatch(wordsActions.setTimePassed());
        }, 1000)
      )
    );
  };

  useEffect(() => {
    if (isStarting || (errors > 0 && timePassed === 0)) {
      dispatch(wordsActions.setState("run"));
      startCountdown();
    }
    // if (isStarting || (errors > 0 && timePassed === 0)) {
    // setState("run");
    // if (state !== "run")
    // if (state !== "run") {

    // }
    // }
  }, [
    // isStarting,
    // startCountdown,
    // cursor,
    typed,
  ]);

  useEffect(() => {
    // if (state === "run" && totalTyped > 0) {
    calcSpeed();
    calcAccuracy();
    // }
  }, [timePassed, typed, errors]);

  return (
    <Row className="align-items-end mb-10">
      <Col className="order-md-2 d-flex justify-content-center">
        {/* <div className="results"> */}
        {results.map(({ title, value }) => (
          <div key={title + value} className="result">
            <span className="result-value">{value}</span>
            <span className="result-title">{title}</span>
          </div>
        ))}
      </Col>
      <Col className="order-md-1 d-flex justify-content-center align-items-center">
        <div className="timer">
          <span className="result-value">{timePassed}</span>
          <span className="result-title">seconds</span>
        </div>
      </Col>
    </Row>
  );
};

export default Results;
