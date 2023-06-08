import React from "react";
import Results from "./components/Results/Results";
import StartModal from "./components/Modal/StartModal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button } from "react-bootstrap";
import { wordsActions } from "./store/store";
import { useAppDispatch } from "./hooks/typedStoreHooks";
import Text from "./components/Text/Text";

function App() {
  const dispatch = useAppDispatch();

  return (
    <>
      <Container className="d-flex flex-column align-items-center mb-3">
        <StartModal />
        <Results />
        <Text />

        <Button
          className="mt-2 mb-3"
          onClick={() => {
            dispatch(wordsActions.resetApp());
          }}
        >
          Restart
        </Button>
      </Container>
    </>
  );
}

export default App;
