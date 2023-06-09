import Results from "./components/Results/Results";
import StartModal from "./components/Modal/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button } from "react-bootstrap";
import { wordsActions } from "./store/store";
import { useAppDispatch, useAppSelector } from "./hooks/typedStoreHooks";
import Text from "./components/Text/Text";

function App() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.isLoading);
  return (
    <>
      <Container className="d-flex flex-column align-items-center mb-3">
        <StartModal />
        <Results />
        <Text />
        <Button
          disabled={isLoading}
          className="mt-3 fs-5"
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
