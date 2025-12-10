import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Stack,
  StackItem,
} from "@patternfly/react-core";
import PropTypes from "prop-types";

const DetailsModal = ({ isOpen, onClose, architecture, version, trace }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="large"
      aria-labelledby="details-modal-title"
      aria-describedby="details-modal-body"
    >
      <ModalHeader title="Error details" labelId="details-modal-title" />
      <ModalBody
        tabIndex={0}
        id="details-modal-body"
        aria-label="Details about the issue"
      >
        <Stack>
          <StackItem>
            <p>
              <strong>Linux kernel version: </strong>
              {version}
            </p>
          </StackItem>
          <StackItem>
            <p>
              <strong>Architecture: </strong>
              {architecture}
            </p>
          </StackItem>
          <StackItem>
            <p>
              <strong>Error log:</strong>
            </p>
          </StackItem>
          <StackItem isFilled>
            <textarea
              readOnly={true}
              style={{
                minWidth: "100%",
                maxWidth: "100%",
                padding: "4px",
                fontFamily: "monospace",
                height: "30vh",
              }}
              value={trace}
            />
          </StackItem>
        </Stack>
      </ModalBody>
      <ModalFooter>
        <Button key="confirm" variant="primary" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

DetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  architecture: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  trace: PropTypes.string.isRequired,
};

export default DetailsModal;
