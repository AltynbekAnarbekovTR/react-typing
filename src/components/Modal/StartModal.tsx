import React from "react";
import { useState } from "react";
import {
  Dropdown,
  DropdownButton,
  Form,
  Button,
  Modal,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks/typedStoreHooks";
import {
  fetchEnglishWords,
  fetchRussianWords,
  wordsActions,
} from "../../store/store";

function StartModal({
  // show,
  // setShowModal,
  // lang,
  setLang,
  state,
}: {
  // show: boolean;
  // setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  // lang: string;
  setLang: React.Dispatch<React.SetStateAction<string>>;
  state: string;
}) {
  // const [numParagraphs, setNumParagraphs] = useState(1);
  // const [lang, setLang] = useState("english");
  // const [checked, setChecked] = useState(false);
  // const [, setRadioValue] = useState("1");
  // const [paras, setParas] = useState("1");
  const paras = useAppSelector((state) => state.paras);
  const showModal = useAppSelector((state) => state.showModal);
  const lang = useAppSelector((state) => state.lang);

  const dispatch = useAppDispatch();

  const langs = [
    { name: "English", value: "eng" },
    { name: "Russian", value: "ru" },
  ];

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
          <Modal.Title>
            {state === "finish" ? "Congratulations!" : "Text options"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <div className="d-flex align-items-end gap-3">
              {/* <Col> */}
              <Form.Label className="d-inline mr-2">
                Number of Paragraphs:
              </Form.Label>
              {/* </Col> */}
              {/* <Col className="text-start"> */}
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
              {/* </Col> */}
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
                  // variant={idx % 2 ? "outline-success" : "outline-danger"}
                  variant="outline-primary"
                  name="radio"
                  value={radio.value}
                  checked={lang === radio.value}
                  // onChange={(e) => setRadioValue(e.currentTarget.value)}
                  onChange={(e) => {
                    // setLang(e.currentTarget.value)
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
              // setShowModal(false);
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
}

export default StartModal;
