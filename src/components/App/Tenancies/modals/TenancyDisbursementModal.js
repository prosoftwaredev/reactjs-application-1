import React from 'react';
import {
  Modal,
  Row,
  Col,
  FormGroup,
  FormControl,
  ControlLabel,
  Checkbox,
  Button
} from 'react-bootstrap';
import Datetime from 'react-datetime';
import moment from 'moment';


const TenancyDisbursementModal = ({
  disbursement = {},
  user,
  handleClose,
  handleDisbursementSubmit,
  handleDisbursementChange,
  disbursementDateChange,
}) => (
  <Modal show onHide={handleClose} className="notes">
    <Modal.Header closeButton>
      <Modal.Title>Disbursments</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Row>
        <form onSubmit={handleDisbursementSubmit}>
          <FormGroup className="clearfix">
            <Col componentClass={ControlLabel} sm={2}>
              Date Raised
            </Col>
            <Col sm={10}>
              <Datetime
                inputProps={{ name: 'date_raised', placeholder: 'Raised Date' }}
                value={disbursement.date_raised ? moment(disbursement.date_raised) : ''}
                timeFormat={false}
                dateFormat={user.dateDisplayFormat}
                onChange={disbursementDateChange}
                closeOnSelect
              />
            </Col>
          </FormGroup>
          <FormGroup className="clearfix">
            <Col componentClass={ControlLabel} sm={2}>
              Amount {user.currency}
            </Col>
            <Col sm={10}>
              <FormControl
                value={disbursement.amount || ''}
                name="amount"
                type="number"
                step="0.1"
                onChange={handleDisbursementChange}
              />
            </Col>
          </FormGroup>
          <FormGroup className="clearfix">
            <Col componentClass={ControlLabel} sm={2}>
              Vat Applicable
            </Col>
            <Col sm={10}>
              <Checkbox
                name="vat_applicable"
                checked={disbursement.vat_applicable || false}
                onChange={handleDisbursementChange}
              />
            </Col>
          </FormGroup>
          <FormGroup className="clearfix">
            <Col componentClass={ControlLabel} sm={2}>
              Description
            </Col>
            <Col sm={10}>
              <FormControl
                name="description"
                type="text"
                value={disbursement.description || ''}
                onChange={handleDisbursementChange}
              />
            </Col>
          </FormGroup>
          <FormGroup className="clearfix">
            <Col sm={2} smOffset={10}>
              <Button bsStyle="primary" type="submit">Submit</Button>
            </Col>
          </FormGroup>
        </form>
      </Row>
    </Modal.Body>
  </Modal>
);

TenancyDisbursementModal.propTypes = {
  disbursement: React.PropTypes.object,
  user: React.PropTypes.object,
  handleClose: React.PropTypes.func.isRequired,
  handleDisbursementSubmit: React.PropTypes.func.isRequired,
  handleDisbursementChange: React.PropTypes.func.isRequired,
  disbursementDateChange: React.PropTypes.func.isRequired,
};

export default TenancyDisbursementModal;
