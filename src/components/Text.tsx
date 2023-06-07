import { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../hooks/typedStoreHooks";
import { fetchEnglishWords, wordsActions } from "../store/store";
import Spinner from "react-bootstrap/Spinner";

const Text = () => {
  const words = useAppSelector((state) => state.words);
  const cursor = useAppSelector((state) => state.cursor);
  const isCorrect = useAppSelector((state) => state.isCorrect);
  const typed = useAppSelector((state) => state.typed);
  const remaining = useAppSelector((state) => state.remaining);
  const phase = useAppSelector((state) => state.phase);
  const paras = useAppSelector((state) => state.paras);
  const lang = useAppSelector((state) => state.lang);
  const isLoading = useAppSelector((state) => state.isLoading);

  const dispatch = useAppDispatch();
  // const typed = dispatch(wordsActions.getTyped);
  // const remaining = dispatch(wordsActions.getRemaining);

  const isStarting = phase === "start" && cursor > 0;
  // const isStarting = cursor > 0;

  // if (words.length) {
  // const remaining = words.substring(cursor);
  // const typed = words.substring(0, cursor);
  // }

  const keydownHandler = (event: KeyboardEvent) => {
    if (phase !== "configure") {
      const { key, code } = event;

      if (event.code === "Space") {
        event.preventDefault();
      }
      const englishCharacters = /^[A-Za-z0-9.,!?-\s]+$/;
      if (!isKeyboardCodeAllowed(event.code)) {
        return;
      } else if (!englishCharacters.test(key)) {
        console.log("Please use english");
      }

      if (key === words[cursor] && isKeyboardCodeAllowed(code)) {
        dispatch(wordsActions.setCursor());
        dispatch(wordsActions.setIsCorrect(true));
        dispatch(wordsActions.setTotalTyped());
      } else if (isKeyboardCodeAllowed(code)) {
        dispatch(wordsActions.setIsCorrect(false));
        // dispatch(wordsActions.setErrors());
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
    // if (phase === "start") {
    if (words.length <= 0) {
      dispatch(fetchEnglishWords());
    }
    // }
  }, [lang]);

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);

    return () => window.removeEventListener("keydown", keydownHandler);
  }, [keydownHandler]);

  // dispatch(wordsActions.setTyped(words.substring(0, cursor)));
  // dispatch(wordsActions.setRemaining(words.substring(cursor)));
  // dispatch(wordsActions.setTyped());
  // dispatch(wordsActions.setRemaining());

  useEffect(() => {
    dispatch(wordsActions.setTyped());
    dispatch(wordsActions.setRemaining());
    if (words.length > 0 && cursor === words.length) {
      dispatch(wordsActions.setState("finish"));
    }
  }, [cursor, words]);

  return (
    <Row className="justify-content-center w-100">
      <Col
        // md={10}
        xs={11}
        className="justify-content-center"
      >
        <Row className="mt-4">
          <Card>
            <div className="white">
              {isLoading && (
                // <div className="w-100 text-center">"Loading..." </div>
                <div className="w-100 h-100 ">
                  {/* <div className="position-absolute top-0 left-0 w-100 h-100 bg-primary"></div> */}
                  <div className="position-absolute top-50 start-50 translate-middle">
                    <Spinner animation="border" variant="primary" />
                  </div>
                </div>
              )}
              {!isLoading && (
                <>
                  <span className="typed">
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
                            index === 0 ? (isCorrect ? "current" : "wrong") : ""
                          }
                        >
                          {letter}
                        </span>
                      );
                    })}{" "}
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
