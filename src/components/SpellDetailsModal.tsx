import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

import { Spell } from "../models/Spells";

interface SpellDetailsModalProps {
  show: boolean;
  isLoading: boolean;
  onHide: () => void;
  spell: Spell | null;
}

const SpellDetailsModal: React.FC<SpellDetailsModalProps> = (props) => (
  <Modal
    centered
    size="lg"
    show={props.show}
    onHide={props.onHide}
    data-testid="spell-detail-modal"
  >
    <Modal.Header closeButton>
      <Modal.Title>{props.spell?.name}</Modal.Title>
    </Modal.Header>

    {props.isLoading && (
      <Row className="my-5 justify-content-center">
        <Spinner animation="border" />
      </Row>
    )}

    {props.spell?.detail && (
      <>
        <Modal.Body>
          <h4>Description</h4>
          <p>
            {props.spell?.detail?.desc ? props.spell?.detail?.desc[0] : "n/a"}
          </p>
          <h4>Higher Level</h4>
          <p>
            {props.spell?.detail?.higher_level
              ? props.spell?.detail?.higher_level[0]
              : "n/a"}
          </p>
          <h4>Range</h4>
          <p>{props.spell?.detail?.range || "n/a"}</p>
        </Modal.Body>
      </>
    )}
  </Modal>
);

export default SpellDetailsModal;
