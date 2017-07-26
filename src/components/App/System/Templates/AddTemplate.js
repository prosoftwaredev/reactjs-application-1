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
  categories = {
    1: 'Property',
    2: 'Contact',
    3: 'Offer',
    4: 'Tenancy',
    5: 'Tenant Statement',
    6: 'Landlord Statement',
  },
  closeModal,
  changeTemplate,
  submitTemplate,
  handleTemplateUpload,
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
              Category
            </Col>
            <Col sm={8}>
              <FormControl
                name="category_id"
                componentClass="select"
                value={template.category_id || ''}
                onChange={changeTemplate}
              >
                <option value="" disabled>Select category</option>
                {categories && Object.keys(categories).map(key => (
                  <option key={key} value={key}>{categories[key]}</option>
                ))}
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={4}>
              File
            </Col>
            <Col sm={8}>
              <label htmlFor="document" className="upload">Upload Template</label>
              <input
                type="file"
                className="file"
                id="document"
                onChange={handleTemplateUpload}
              />
              {template.filename && (<span>{template.filename}</span>)}
              {template.file && template.file.name && (<span>{template.file.name}</span>)}
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
  categories: React.PropTypes.object,
  closeModal: React.PropTypes.func.isRequired,
  changeTemplate: React.PropTypes.func.isRequired,
  submitTemplate: React.PropTypes.func.isRequired,
  handleTemplateUpload: React.PropTypes.func.isRequired,
  error: React.PropTypes.object,
};

export default AddTemplate;
