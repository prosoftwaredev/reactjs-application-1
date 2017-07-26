import React from 'react';
import {
  Modal,
  Form,
  // Row,
  Col,
  FormControl,
  Button,
  FormGroup,
  ControlLabel
} from 'react-bootstrap';

const AppointmentModal = ({ item, closeModal, changeItem, submitItem }) => (
  <Modal show onHide={closeModal}>
    <Modal.Header closeButton>
      <Modal.Title>Add Appointment</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Col>
        <Form onSubmit={submitItem}>
          {item.id && <input type="hidden" defaultValue={item.id} name="id" />}
          <FormGroup className="clearfix">
            <Col componentClass={ControlLabel} sm={4}>
              Appointment name
              </Col>
            <Col sm={8}>
              <FormControl
                name="name"
                type="text"
                value={item.name || ''}
                onChange={changeItem}
                />
            </Col>
          </FormGroup>
          <FormGroup className="clearfix">
            <Col componentClass={ControlLabel} sm={4}>
              Background color
              </Col>
            <Col sm={8}>
              <FormControl
                name="colour_background"
                type="text"
                value={item.colour_background || ''}
                onChange={changeItem}
                />
            </Col>
          </FormGroup>
          <FormGroup className="clearfix">
            <Col componentClass={ControlLabel} sm={4}>
              Font color
              </Col>
            <Col sm={8}>
              <FormControl
                name="colour_font"
                type="text"
                value={item.colour_font || ''}
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

AppointmentModal.propTypes = {
  item: React.PropTypes.object.isRequired,
  closeModal: React.PropTypes.func.isRequired,
  changeItem: React.PropTypes.func.isRequired,
  submitItem: React.PropTypes.func.isRequired,
};

export default AppointmentModal;
