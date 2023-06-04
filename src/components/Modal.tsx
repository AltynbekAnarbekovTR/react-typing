import React from "react";
import { useState } from "react";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

function StartModal({
  show,
  setShowModal,
  lang,
  setLang,
}: {
  show: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  lang: string;
  setLang: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [numParagraphs, setNumParagraphs] = useState(1);
  // const [lang, setLang] = useState("english");
  const [checked, setChecked] = useState(false);
  // const [, setRadioValue] = useState("1");

  const [paras, setParas] = useState("1");

  const langs = [
    { name: "English", value: "eng" },
    { name: "Russian", value: "ru" },
  ];

  return (
    <>
      <Modal
        centered
        show={show}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Text options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label className="d-inline-block mr-13">
              Number of Paragraphs
            </Form.Label>
            <DropdownButton
              className="d-inline-block ml-13"
              variant="primary"
              title={paras}
              onSelect={(e) => {
                if (e) {
                  setParas(e);
                }
              }}
            >
              {[1, 2, 3, 4, 5].map((number) => (
                <Dropdown.Item key={number} eventKey={number}>
                  {number}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Form.Group>
          <Form.Group>
            <Form.Label className="d-block mt-4">Text language</Form.Label>
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
                  onChange={(e) => setLang(e.currentTarget.value)}
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
            // onClick={generateParagraphs}
          >
            Generate
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default StartModal;
