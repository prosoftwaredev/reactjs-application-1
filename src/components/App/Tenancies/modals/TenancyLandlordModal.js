import React from 'react';
import { Modal, Row, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import Datetime from 'react-datetime';
import moment from 'moment';
import { getValidationStatus, renderHelpBlock } from 'common/utils';
import TenancyLandlord from './TenancyLandlord';

const TenancyLandlordModal = ({
  amount = 0,
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
  tenancyLandlords = {},
  handleTenancyLandlordNext,
  handleTenancyLandlordPrevious,
  getTenancyLandlordInfo,
  deleteTenancyLandlord,
  clearTenancyLandlord,
  error = {},
}) => (
  <Modal show onHide={handleClose} className="jobs">
    <Modal.Header closeButton>
      <Modal.Title>Payments</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form onSubmit={handleTenancyLandlordSubmit}>
        <FormGroup className="clearfix">
          <Col componentClass={ControlLabel} sm={12}>
            Total Due: {`${user.currency} ${amount}`}
          </Col>
        </FormGroup>
        <Row>
          <Col sm={6}>
            <FormGroup className="clearfix" validationState={getValidationStatus(error, 'amount', tenancyLandlord)}>
              <Col componentClass={ControlLabel} sm={3}>
                Amount
              </Col>
              <Col sm={9}>
                <FormControl
                  value={tenancyLandlord.amount || ''}
                  name="amount"
                  type="number"
                  step="0.1"
                  onChange={handleTenancyLandlordChange}
                />
                {renderHelpBlock(error, 'amount')}
              </Col>
            </FormGroup>
          </Col>
          <Col sm={6}>
            <FormGroup className="clearfix" validationState={getValidationStatus(error, 'date_received', tenancyLandlord)}>
              <Col sm={3} componentClass={ControlLabel}>
                Date Received
              </Col>
              <Col sm={9}>
                <Datetime
                  inputProps={{ name: 'date_received', placeholder: 'Date Received' }}
                  value={tenancyLandlord.date_received ? moment(tenancyLandlord.date_received) : ''}
                  timeFormat={false}
                  dateFormat={user.dateDisplayFormat}
                  onChange={handleTenancyLandlordDateChange}
                  closeOnSelect
                />
                {renderHelpBlock(error, 'date_received')}
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <FormGroup className="clearfix" validationState={getValidationStatus(error, 'payment_type_id', tenancyLandlord)}>
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
            {renderHelpBlock(error, 'payment_type_id')}
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
          <Col sm={2} smOffset={8}>
            <Button bsStyle="warning" onClick={clearTenancyLandlord}>Clear</Button>
          </Col>
          <Col sm={2}>
            <Button bsStyle="primary" type="submit">{tenancyLandlord.id ? 'Save' : 'Create'}</Button>
          </Col>
        </FormGroup>
      </form>
      <div className="clearfix">
        {tenancyLandlords.data ? tenancyLandlords.data.map((landlord, index) => (
          <Col sm={12} key={landlord.id}>
            <TenancyLandlord
              landlord={landlord}
              user={user}
              index={index}
              getTenancyLandlordInfo={getTenancyLandlordInfo}
              deleteTenancyLandlord={deleteTenancyLandlord}
            />
          </Col>
        )) : null}
      </div>
      {(tenancyLandlords.current_page && tenancyLandlords.current_page < tenancyLandlords.total_page) ? (
        <Button bsStyle="link" onClick={handleTenancyLandlordNext}>Next...</Button>
      ) : null}
      {(tenancyLandlords.current_page && tenancyLandlords.current_page > 1) ? (
        <Button bsStyle="link" onClick={handleTenancyLandlordPrevious}>Previous...</Button>
      ) : null}
    </Modal.Body>
  </Modal>
);

TenancyLandlordModal.propTypes = {
  amount: React.PropTypes.number,
  user: React.PropTypes.object,
  tenancyLandlord: React.PropTypes.object,
  tenancyLandlords: React.PropTypes.object,
  handleClose: React.PropTypes.func.isRequired,
  handleTenancyLandlordSubmit: React.PropTypes.func.isRequired,
  handleTenancyLandlordChange: React.PropTypes.func.isRequired,
  handleTenancyLandlordDateChange: React.PropTypes.func.isRequired,
  handleTenancyLandlordNext: React.PropTypes.func.isRequired,
  handleTenancyLandlordPrevious: React.PropTypes.func.isRequired,
  getTenancyLandlordInfo: React.PropTypes.func.isRequired,
  deleteTenancyLandlord: React.PropTypes.func.isRequired,
  clearTenancyLandlord: React.PropTypes.func.isRequired,
};

export default TenancyLandlordModal;
