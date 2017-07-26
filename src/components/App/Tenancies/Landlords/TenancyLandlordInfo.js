import React from 'react';
import { Modal, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import Datetime from 'react-datetime';
import moment from 'moment';

const TenancyLandlordInfo = ({
  user = {},
  tenancyLandlord = {},
  handleClose,
  handleTenancyLandlordSubmit,
  handleTenancyLandlordChange,
  handleTenancyLandlordDateChange,
  paymentTypes = {
    1: 'Standing Order',
    2: 'Housing Benefit',
    3: 'BACS',
    4: 'Cash',
    5: 'Credit/Debit Card',
    6: 'Direct Debit',
  },
}) => (
  <Modal show onHide={handleClose} className="jobs">
    <Modal.Header closeButton>
      <Modal.Title>Landlords</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form onSubmit={handleTenancyLandlordSubmit}>
        <FormGroup className="clearfix">
          <Col componentClass={ControlLabel} sm={3}>
            Amount
          </Col>
          <Col sm={3}>
            <FormControl
              value={tenancyLandlord.amount || ''}
              name="amount"
              type="number"
              step="0.1"
              onChange={handleTenancyLandlordChange}
            />
          </Col>
          <Col sm={2} componentClass={ControlLabel}>
            Date Received
          </Col>
          <Col sm={4}>
            <Datetime
              inputProps={{ name: 'date_received', placeholder: 'Date Received' }}
              value={tenancyLandlord.date_received ? moment(tenancyLandlord.date_received) : ''}
              timeFormat={false}
              dateFormat={user.dateDisplayFormat}
              onChange={handleTenancyLandlordDateChange}
              closeOnSelect
            />
          </Col>
        </FormGroup>
        <FormGroup className="clearfix">
          <Col componentClass={ControlLabel} sm={3}>
            Payment Type
          </Col>
          <Col sm={9}>
            <FormControl
              value={tenancyLandlord.payment_type_id || ''}
              name="payment_type_id"
              componentClass="select"
              onChange={handleTenancyLandlordChange}
            >
              <option value="" disabled>Select Payment Type</option>
              {Object.keys(paymentTypes).map(key => (
                <option key={key} value={key}>{paymentTypes[key]}</option>
              ))}
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup className="clearfix">
          <Col componentClass={ControlLabel} sm={3}>
            Description
          </Col>
          <Col sm={9}>
            <FormControl
              name="description"
              type="text"
              value={tenancyLandlord.description || ''}
              onChange={handleTenancyLandlordChange}
            />
          </Col>
        </FormGroup>
        <FormGroup className="clearfix">
          <Col sm={2} smOffset={10}>
            <Button bsStyle="primary" type="submit">{tenancyLandlord.id ? 'Save' : 'Create'}</Button>
          </Col>
        </FormGroup>
      </form>
    </Modal.Body>
  </Modal>
);

TenancyLandlordInfo.propTypes = {
  user: React.PropTypes.object,
  tenancyLandlord: React.PropTypes.object,
  handleClose: React.PropTypes.func.isRequired,
  handleTenancyLandlordSubmit: React.PropTypes.func.isRequired,
  handleTenancyLandlordChange: React.PropTypes.func.isRequired,
  handleTenancyLandlordDateChange: React.PropTypes.func.isRequired,
};

export default TenancyLandlordInfo;
