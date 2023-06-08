import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks/typedStoreHooks";
import { selectTypedChars, wordsActions } from "../../store/store";
import styles from "./Results.module.css";

const Results = () => {
  const errors = useAppSelector((state) => state.errors);
  const totalTyped = useAppSelector((state) => state.totalTyped);
  const speed = useAppSelector((state) => state.speed);
  const accuracy = useAppSelector((state) => state.accuracy);
  const timePassed = useAppSelector((state) => state.timer.timePassed);
  const phase = useAppSelector((state) => state.phase);
  const cursor = useAppSelector((state) => state.cursor);
  const typed = useAppSelector(selectTypedChars);

  const dispatch = useAppDispatch();

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
    dispatch(
      wordsActions.setTimerRef(
        setInterval(() => {
          dispatch(wordsActions.setTimePassed());
        }, 1000)
      )
    );
  };

  useEffect(() => {
    if (isStarting) {
      dispatch(wordsActions.setState("run"));
      startCountdown();
    }
  }, [typed, errors]);

  useEffect(() => {
    calcSpeed();
    calcAccuracy();
  }, [timePassed, typed, errors]);

  return (
    <Row className="align-items-end mb-10">
      <Col className="order-sm-2 d-flex justify-content-center">
        {results.map(({ title, value }) => (
          <div key={title + value} className={styles.result}>
            <span className={styles["result-value"]}>{value}</span>
            <span className={styles["result-title"]}>{title}</span>
          </div>
        ))}
      </Col>
      <Col className="order-md-1 d-flex justify-content-center align-items-center">
        <div className={styles.timer}>
          <span className={styles["result-value"]}>{timePassed}</span>
          <span className={styles["result-title"]}>seconds</span>
        </div>
      </Col>
    </Row>
  );
};

export default Results;
