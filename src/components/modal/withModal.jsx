import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const withModal = (WrappedComponent) => {
  return (props) => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const { modalBody: ModalBody } = props;

    return (
      <>
        <WrappedComponent {...props} handleShowModal={handleShow} />
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>標準化 Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {ModalBody ? <ModalBody /> : '這是標準化的 Bootstrap modal 內容。'}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              關閉
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
};

export default withModal;