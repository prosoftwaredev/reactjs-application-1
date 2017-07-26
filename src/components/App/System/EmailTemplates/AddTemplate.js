import React from 'react';
import {
  Modal,
  Form,
  // Row,
  Col,
  FormControl,
  Button,
  FormGroup,
  ControlLabel,
  Alert,
} from 'react-bootstrap';

const AddTemplate = ({
  template = {},
  closeModal,
  changeTemplate,
  submitTemplate,
  error = null,
}) => (
  <Modal show onHide={closeModal}>
    <Modal.Header closeButton>
      <Modal.Title>Add Template</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Col className="template">
        {error && <Alert bsStyle="danger">{error.message}</Alert>}
        <Form onSubmit={submitTemplate}>
          {template.id && <input type="hidden" defaultValue={template.id} name="id" />}
          <FormGroup className="clearfix">
            <Col componentClass={ControlLabel} sm={4}>
              Template name
            </Col>
            <Col sm={8}>
              <FormControl
                name="name"
                type="text"
                value={template.name || ''}
                onChange={changeTemplate}
                />
            </Col>
          </FormGroup>
          <FormGroup className="clearfix">
            <Col componentClass={ControlLabel} sm={4}>
              Template subject
            </Col>
            <Col sm={8}>
              <FormControl
                name="subject"
                type="text"
                value={template.subject || ''}
                onChange={changeTemplate}
                />
            </Col>
          </FormGroup>
          <FormGroup className="clearfix">
            <Col componentClass={ControlLabel} sm={4}>
              Template message
            </Col>
            <Col sm={8}>
              <FormControl
                name="message"
                type="text"
                value={template.message || ''}
                onChange={changeTemplate}
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

AddTemplate.propTypes = {
  template: React.PropTypes.object.isRequired,
  closeModal: React.PropTypes.func.isRequired,
  changeTemplate: React.PropTypes.func.isRequired,
  submitTemplate: React.PropTypes.func.isRequired,
  error: React.PropTypes.object,
};

export default AddTemplate;
