import React, { useEffect } from "react";
import { Alert, Card, Col, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks/typedStoreHooks";
import {
  fetchEnglishWords,
  selectRemainingChars,
  selectTypedChars,
  wordsActions,
} from "../../store/store";
import Spinner from "react-bootstrap/Spinner";
import styles from "./Text.module.css";

const Text = (): JSX.Element => {
  const words = useAppSelector((state) => state.words);
  const cursor = useAppSelector((state) => state.cursor);
  const isCorrect = useAppSelector((state) => state.isCorrect);
  const phase = useAppSelector((state) => state.phase);
  const lang = useAppSelector((state) => state.lang);
  const isLoading = useAppSelector((state) => state.isLoading);
  const error = useAppSelector((state) => state.error);

  const typed = useAppSelector(selectTypedChars);
  const remaining = useAppSelector(selectRemainingChars);

  const engCharacters = /^[A-Za-z0-9.,!?-\s]+$/;
  const ruCharacters = /^[А-Яа-я0-9.,!?-\s]+$/;

  const dispatch = useAppDispatch();

  const keydownHandler = (event: KeyboardEvent) => {
    if (phase !== "configure" && phase !== "finish" && !error) {
      const { key, code } = event;

      if (event.code === "Space") {
        event.preventDefault();
      }

      if (!isKeyboardCodeAllowed(event.code)) {
        return;
      } else if (lang === "eng" && !engCharacters.test(key)) {
        alert("Please use english layout");
      } else if (lang === "ru" && !ruCharacters.test(key)) {
        alert("Пожалуйста используйте русскую раскладку");
      }
      if (key === words[cursor] && isKeyboardCodeAllowed(code)) {
        dispatch(wordsActions.setCursor());
        dispatch(wordsActions.setIsCorrect(true));
        dispatch(wordsActions.setTotalTyped());
      } else if (isKeyboardCodeAllowed(code)) {
        dispatch(wordsActions.setIsCorrect(false));
      }
    }
  };

  const isKeyboardCodeAllowed = (code: string) => {
    return (
      !code.startsWith("Shift") &&
      !code.startsWith("Control") &&
      !code.startsWith("Alt")
    );
  };

  useEffect(() => {
    if (isCorrect === false) {
      dispatch(wordsActions.setErrors());
    }
  }, [isCorrect]);

  useEffect(() => {
    if (words.length <= 0) {
      dispatch(fetchEnglishWords());
    }
  }, [lang]);

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);

    return () => window.removeEventListener("keydown", keydownHandler);
  }, [keydownHandler]);

  useEffect(() => {
    if (words.length > 0 && cursor === words.length) {
      dispatch(wordsActions.setState("finish"));
      dispatch(wordsActions.setShowModal(true));
      dispatch(wordsActions.stopTimer());
    }
  }, [cursor, words, phase]);

  if (error)
    return (
      <Alert variant="danger" className="mt-4">
        <Alert.Heading>{error}</Alert.Heading>
      </Alert>
    );

  return (
    <Row className={`justify-content-center w-100 ${styles.text}`}>
      <Col md={10} className="justify-content-center">
        <Row className="mt-4">
          <Card>
            <div className="pt-2 p-md-4 fs-5">
              {isLoading && (
                <div className="w-100 h-100 ">
                  <div className="position-absolute top-50 start-50 translate-middle">
                    <Spinner animation="border" variant="primary" />
                  </div>
                </div>
              )}
              {!isLoading && (
                <>
                  <span className={styles.typed}>
                    {typed &&
                      typed
                        .split("")
                        .map((letter, index) => (
                          <span key={`${letter}_${index}`}>{letter}</span>
                        ))}
                  </span>
                  {remaining &&
                    remaining.split("").map((letter, index) => {
                      return (
                        <span
                          key={`${letter}_${index}`}
                          className={
                            index === 0
                              ? isCorrect
                                ? `${styles.current}`
                                : `${styles.wrong}`
                              : ""
                          }
                        >
                          {letter}
                        </span>
                      );
                    })}
                </>
              )}
            </div>
          </Card>
        </Row>
      </Col>
    </Row>
  );
};

export default Text;
