import React from "react";
import {
  Dropdown,
  DropdownButton,
  Form,
  Button,
  Modal,
  ButtonGroup,
  ToggleButton,
  ListGroup,
} from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks/typedStoreHooks";
import {
  fetchEnglishWords,
  fetchRussianWords,
  wordsActions,
} from "../../store/store";

function StartModal() {
  const paras = useAppSelector((state) => state.paras);
  const showModal = useAppSelector((state) => state.showModal);
  const lang = useAppSelector((state) => state.lang);
  const phase = useAppSelector((state) => state.phase);
  const results = useAppSelector((state) => {
    return [
      { title: "Errors", value: state.errors },
      { title: "Total Typed", value: state.totalTyped + " chars" },
      { title: "Speed", value: state.speed + " char/min" },
      { title: "Accuracy", value: state.accuracy + "%" },
      { title: "Time Passed", value: state.timer.timePassed + " sec" },
    ];
  });

  const dispatch = useAppDispatch();

  const langs = [
    { name: "English", value: "eng" },
    { name: "Russian", value: "ru" },
  ];
  if (phase === "finish")
    return (
      <Modal
        centered
        show={showModal}
        onHide={() => {
          dispatch(wordsActions.setShowModal(false));
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Congratulations!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Title>Your results:</Modal.Title>
          {results.map((result) => (
            <ListGroup key={result.title} horizontal className="my-2">
              <ListGroup.Item>{result.title}</ListGroup.Item>
              <ListGroup.Item>{result.value}</ListGroup.Item>
            </ListGroup>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="mt-2"
            onClick={() => {
              dispatch(wordsActions.resetApp());
            }}
          >
            Restart
          </Button>
        </Modal.Footer>
      </Modal>
    );
  if (phase === "configure")
    return (
      <>
        <Modal
          centered
          show={showModal}
          onHide={() => {
            dispatch(wordsActions.setState("start"));
            dispatch(wordsActions.setShowModal(false));
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Text Options</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <div className="d-flex align-items-end gap-3">
                <Form.Label className="d-inline mr-2">
                  Number of Paragraphs:
                </Form.Label>
                <DropdownButton
                  className="d-inline ml-2"
                  variant="primary"
                  title={paras}
                  onSelect={(e) => {
                    if (e) {
                      dispatch(wordsActions.setParas(e));
                    }
                  }}
                >
                  {[1, 2, 3, 4, 5].map((number) => (
                    <Dropdown.Item key={number} eventKey={number}>
                      {number}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label className="d-block mt-4">Text language:</Form.Label>
              <ButtonGroup>
                {langs.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant="outline-primary"
                    name="radio"
                    value={radio.value}
                    checked={lang === radio.value}
                    onChange={(e) => {
                      dispatch(wordsActions.setLang(e.currentTarget.value));
                    }}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                dispatch(wordsActions.setState("start"));
                dispatch(wordsActions.setShowModal(false));
                if (lang === "eng") {
                  dispatch(fetchEnglishWords(paras));
                } else if (lang === "ru") {
                  dispatch(fetchRussianWords(paras));
                }
              }}
            >
              Generate
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  return null;
}

export default StartModal;
