import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default ({shown, handleDelete, handleClose}) => (
  <Modal show={shown} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Are you Sure?</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="flex sb">
        <Button bsStyle="danger" onClick={handleDelete}>YES</Button>
        <Button bsStyle="primary" onClick={handleClose}>NO</Button>
      </div>
    </Modal.Body>
  </Modal>
);
