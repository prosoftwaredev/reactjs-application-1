import React from 'react';
import {
  Modal,
  Form,
  Col,
  FormControl,
  Button,
  FormGroup,
  ControlLabel
} from 'react-bootstrap';

const SourceModal = ({ item, closeModal, changeItem, submitItem }) => (
  <Modal show onHide={closeModal}>
    <Modal.Header closeButton>
      <Modal.Title>Add Source</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Col>
        <Form onSubmit={submitItem}>
          {item.id && <input type="hidden" name="id" defaultValue={item.id} />}
          <FormGroup className="clearfix">
            <Col componentClass={ControlLabel} sm={3}>
              {item.id}
              Source name
              </Col>
            <Col sm={9}>
              <FormControl
                name="name"
                type="text"
                value={item.name || ''}
                onChange={changeItem}
                />
            </Col>
          </FormGroup>
          <FormGroup className="clearfix">
            <Col sm={2}>
              <Button bsStyle="primary" type="submit">Submit</Button>
            </Col>
          </FormGroup>
        </Form>
      </Col>
    </Modal.Body>
  </Modal>
);

SourceModal.propTypes = {
  item: React.PropTypes.object.isRequired,
  closeModal: React.PropTypes.func.isRequired,
  changeItem: React.PropTypes.func.isRequired,
  submitItem: React.PropTypes.func.isRequired,
};

export default SourceModal;
