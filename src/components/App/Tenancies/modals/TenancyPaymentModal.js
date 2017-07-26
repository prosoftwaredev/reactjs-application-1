import React from 'react';
import { Modal, Row, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import Datetime from 'react-datetime';
import moment from 'moment';
import { getValidationStatus, renderHelpBlock } from 'common/utils';
import TenancyPayment from './TenancyPayment';

const TenancyPaymentModal = ({
  amount,
  user = {},
  tenants = [],
  tenancyPayment = {},
  handleClose,
  handleTenancyPatmentSubmit,
  handleTenancyPaymentChange,
  handleTenancyPaymentDateChange,
  paymentTypes = {
    1: 'Standing Order',
    2: 'Housing Benefit',
    3: 'BACS',
    4: 'Cash',
    5: 'Credit/Debit Card',
    6: 'Direct Debit',
  },
  tenancyPayments = {},
  handleTenancyPaymentNext,
  handleTenancyPaymentPrevious,
  getTenancyPaymentInfo,
  deleteTenancyPayment,
  clearTenancyPayment,
  error = {},
}) => (
  <Modal show onHide={handleClose} className="jobs">
    <Modal.Header closeButton>
      <Modal.Title>Payments</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form onSubmit={handleTenancyPatmentSubmit}>
        <FormGroup className="clearfix">
          <Col componentClass={ControlLabel} sm={12}>
            Total Due: {`${user.currency} ${amount || 0}`}
          </Col>
        </FormGroup>
        <Row>
          <Col sm={6}>
            <FormGroup className="clearfix" validationState={getValidationStatus(error, 'amount', tenancyPayment)}>
              <Col componentClass={ControlLabel} sm={3}>
                Amount
              </Col>
              <Col sm={9}>
                <FormControl
                  value={tenancyPayment.amount || ''}
                  name="amount"
                  type="number"
                  step="0.1"
                  onChange={handleTenancyPaymentChange}
                />
                {renderHelpBlock(error, 'amount')}
              </Col>
            </FormGroup>
          </Col>
          <Col sm={6}>
            <FormGroup className="clearfix" validationState={getValidationStatus(error, 'date_received', tenancyPayment)}>
              <Col sm={3} componentClass={ControlLabel}>
                Date Received
              </Col>
              <Col sm={9}>
                <Datetime
                  inputProps={{ name: 'date_received', placeholder: 'Date Received' }}
                  value={tenancyPayment.date_received ? moment(tenancyPayment.date_received) : ''}
                  timeFormat={false}
                  dateFormat={user.dateDisplayFormat}
                  onChange={handleTenancyPaymentDateChange}
                  closeOnSelect
                />
                {renderHelpBlock(error, 'date_received')}
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <FormGroup className="clearfix" validationState={getValidationStatus(error, 'payment_type_id', tenancyPayment)}>
          <Col componentClass={ControlLabel} sm={3}>
            Payment Type
          </Col>
          <Col sm={9}>
            <FormControl
              value={tenancyPayment.payment_type_id || ''}
              name="payment_type_id"
              componentClass="select"
              onChange={handleTenancyPaymentChange}
            >
              <option value="" disabled>Select Payment Type</option>
              {Object.keys(paymentTypes).map(key => (
                <option key={key} value={key}>{paymentTypes[key]}</option>
              ))}
            </FormControl>
            {renderHelpBlock(error, 'amount')}
          </Col>
        </FormGroup>
        <FormGroup className="clearfix">
          <Col componentClass={ControlLabel} sm={3}>
            Tenant
      </Col>
          <Col sm={9}>
            <FormControl
              componentClass="select"
              name="people_id"
              value={tenancyPayment.people_id || ''}
              onChange={handleTenancyPaymentChange}
            >
              <option value="" disabled>Select tenant</option>
              {tenants.map(tenant => (
                <option key={tenant.id} value={tenant.id}>{tenant.name}</option>
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
              value={tenancyPayment.description || ''}
              onChange={handleTenancyPaymentChange}
            />
          </Col>
        </FormGroup>
        <FormGroup className="clearfix">
          <Col sm={2} smOffset={8}>
            <Button bsStyle="warning" onClick={clearTenancyPayment}>Clear</Button>
          </Col>
          <Col sm={2}>
            <Button bsStyle="primary" type="submit">{tenancyPayment.id ? 'Save' : 'Create'}</Button>
          </Col>
        </FormGroup>
      </form>
      <div className="clearfix">
        {tenancyPayments.data ? tenancyPayments.data.map((payment, index) => (
          <Col sm={12} key={payment.id}>
            <TenancyPayment
              payment={payment}
              user={user}
              index={index}
              getTenancyPaymentInfo={getTenancyPaymentInfo}
              deleteTenancyPayment={deleteTenancyPayment}
            />
          </Col>
        )) : null}
      </div>
      {(tenancyPayments.current_page && tenancyPayments.current_page < tenancyPayments.total_page) ? (
        <Button bsStyle="link" onClick={handleTenancyPaymentNext}>Next...</Button>
      ) : null}
      {(tenancyPayments.current_page && tenancyPayments.current_page > 1) ? (
        <Button bsStyle="link" onClick={handleTenancyPaymentPrevious}>Previous...</Button>
      ) : null}
    </Modal.Body>
  </Modal>
);

TenancyPaymentModal.propTypes = {
  amount: React.PropTypes.number,
  user: React.PropTypes.object,
  tenants: React.PropTypes.array,
  tenancyPayment: React.PropTypes.object,
  tenancyPayments: React.PropTypes.object,
  handleClose: React.PropTypes.func.isRequired,
  handleTenancyPatmentSubmit: React.PropTypes.func.isRequired,
  handleTenancyPaymentChange: React.PropTypes.func.isRequired,
  handleTenancyPaymentDateChange: React.PropTypes.func.isRequired,
  handleTenancyPaymentNext: React.PropTypes.func.isRequired,
  handleTenancyPaymentPrevious: React.PropTypes.func.isRequired,
  getTenancyPaymentInfo: React.PropTypes.func.isRequired,
  deleteTenancyPayment: React.PropTypes.func.isRequired,
  clearTenancyPayment: React.PropTypes.func.isRequired,
};

export default TenancyPaymentModal;
