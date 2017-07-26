import React from 'react';
import {
  Modal,
  Row,
  Col,
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from 'react-bootstrap';
import Datetime from 'react-datetime';
import moment from 'moment';
import { getValidationStatus, renderHelpBlock } from 'common/utils';


const TenancyRentModal = ({
  tenancyRent = {},
  user,
  error = {},
  feeTypes = {
    1: 'Percentage',
    2: 'Fixed',
  },
  handleClose,
  handleTenancyRentSubmit,
  handleTenancyRentChange,
  handleTenancyRentDateChange,
}) => (
  <Modal show onHide={handleClose} className="notes">
    <Modal.Header closeButton>
      <Modal.Title>Rents</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Row>
        <form onSubmit={handleTenancyRentSubmit}>
          <FormGroup className="clearfix" validationState={getValidationStatus(error, 'due_date', tenancyRent)}>
            <Col componentClass={ControlLabel} sm={3}>
              Due Date
            </Col>
            <Col sm={9}>
              <Datetime
                inputProps={{ name: 'due_date', placeholder: 'Due Date' }}
                value={tenancyRent.due_date ? moment(tenancyRent.due_date) : ''}
                timeFormat={false}
                dateFormat={user.dateDisplayFormat}
                onChange={handleTenancyRentDateChange}
                closeOnSelect
              />
              {renderHelpBlock(error, 'due_date')}
            </Col>
          </FormGroup>
          <FormGroup className="clearfix" validationState={getValidationStatus(error, 'fee_type', tenancyRent)}>
            <Col componentClass={ControlLabel} sm={3}>
              Rent Amount {user.currency}
            </Col>
            <Col sm={9}>
              <FormControl
                value={tenancyRent.rent_amount || ''}
                name="rent_amount"
                type="number"
                step="0.1"
                onChange={handleTenancyRentChange}
              />
              {renderHelpBlock(error, 'rent_amount')}
            </Col>
          </FormGroup>
          <FormGroup className="clearfix">
            <Col componentClass={ControlLabel} sm={3}>
              Fee
            </Col>
            <Col sm={9}>
              <FormControl
                name="fee"
                type="number"
                step="0.1"
                value={tenancyRent.fee || ''}
                onChange={handleTenancyRentChange}
              />
            </Col>
          </FormGroup>
          <FormGroup className="clearfix" validationState={getValidationStatus(error, 'fee_type', tenancyRent)}>
            <Col componentClass={ControlLabel} sm={3}>
              Fee Type
            </Col>
            <Col sm={9}>
              <FormControl
                value={tenancyRent.fee_type || ''}
                name="fee_type"
                componentClass="select"
                onChange={handleTenancyRentChange}
              >
                <option value="" disabled>Select Fee Type</option>
                {Object.keys(feeTypes).map(key => (
                  <option key={key} value={key}>{feeTypes[key]}</option>
                ))}
              </FormControl>
              {renderHelpBlock(error, 'fee_type')}
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

TenancyRentModal.propTypes = {
  tenancyRent: React.PropTypes.object,
  user: React.PropTypes.object,
  handleClose: React.PropTypes.func.isRequired,
  handleTenancyRentSubmit: React.PropTypes.func.isRequired,
  handleTenancyRentChange: React.PropTypes.func.isRequired,
  handleTenancyRentDateChange: React.PropTypes.func.isRequired,
};

export default TenancyRentModal;
