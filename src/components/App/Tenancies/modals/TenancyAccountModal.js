import React from 'react';
import { Modal, Row, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import Datetime from 'react-datetime';
import moment from 'moment';
import { getValidationStatus } from 'common/utils';
import TenancyAccount from './TenancyAccount';

const TenancyAccountModal = ({
  user = {},
  tenancyAccount = {},
  handleClose,
  handleTenancyAccountSubmit,
  handleTenancyAccountChange,
  handleTenancyAccountDateChange,
  categories = {
    1: 'Credit',
    2: 'Debit',
  },
  paymentTypes = {
    1: 'Standing Order',
    2: 'Housing Benefit',
    3: 'BACS',
    4: 'Cash',
    5: 'Credit/Debit Card',
    6: 'Direct Debit',
  },
  tenancyAccounts = {},
  handleTenancyAccountNext,
  handleTenancyAccountPrevious,
  getTenancyAccountInfo,
  deleteTenancyAccount,
  clearTenancyAccount,
  error
}) => (
  <Modal show onHide={handleClose} className="jobs">
    <Modal.Header closeButton>
      <Modal.Title>Accounts</Modal.Title>
    </Modal.Header>
    <Modal.Body className="properties-page create">
      <div className="panel-body">
        <Row>
          <form onSubmit={handleTenancyAccountSubmit}>
            <FormGroup validationState={getValidationStatus(error, 'amount', tenancyAccount)}>
              <Col componentClass={ControlLabel} sm={3}>
                Amount
              </Col>
              <Col sm={9}>
                <FormControl
                  value={tenancyAccount.amount || ''}
                  name="amount"
                  type="number"
                  step="0.1"
                  onChange={handleTenancyAccountChange}
                />
              </Col>
            </FormGroup>
            <FormGroup validationState={getValidationStatus(error, 'category', tenancyAccount)}>
              <Col componentClass={ControlLabel} sm={3}>
                Category
              </Col>
              <Col sm={9}>
                <FormControl
                  value={tenancyAccount.category || ''}
                  name="category"
                  componentClass="select"
                  onChange={handleTenancyAccountChange}
                >
                  <option value="" disabled>Select category</option>
                  {Object.keys(categories).map(key => (
                    <option key={key} value={key}>{categories[key]}</option>
                  ))}
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup validationState={getValidationStatus(error, 'payment_type_id', tenancyAccount)}>
              <Col componentClass={ControlLabel} sm={3}>
                Payment Type
              </Col>
              <Col sm={9}>
                <FormControl
                  value={tenancyAccount.payment_type_id || ''}
                  name="payment_type_id"
                  componentClass="select"
                  onChange={handleTenancyAccountChange}
                >
                  <option value="" disabled>Select Payment Type</option>
                  {Object.keys(paymentTypes).map(key => (
                    <option key={key} value={key}>{paymentTypes[key]}</option>
                  ))}
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup validationState={getValidationStatus(error, 'date_received', tenancyAccount)}>
              <Col componentClass={ControlLabel} sm={3}>
                Date Received
              </Col>
              <Col sm={9}>
                <Datetime
                  inputProps={{ name: 'date_received', placeholder: 'Date Received' }}
                  value={tenancyAccount.date_received ? moment(tenancyAccount.date_received) : ''}
                  timeFormat={false}
                  dateFormat={user.dateDisplayFormat}
                  onChange={handleTenancyAccountDateChange}
                  closeOnSelect
                />
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
                  value={tenancyAccount.description || ''}
                  onChange={handleTenancyAccountChange}
                />
              </Col>
            </FormGroup>
            <FormGroup className="clearfix">
              <Col sm={2} smOffset={8}>
                <Button bsStyle="warning" onClick={clearTenancyAccount}>Clear</Button>
              </Col>
              <Col sm={2}>
                <Button bsStyle="primary" type="submit">{tenancyAccount.id ? 'Save' : 'Create'}</Button>
              </Col>
            </FormGroup>
          </form>
        </Row>
        <Row className="table-header">
          <Col sm={2} className="column">
            Amount
          </Col>
          <Col sm={2} className="column">
            Recieved
          </Col>
          <Col sm={8} className="column">
            Description
          </Col>
        </Row>
        {tenancyAccounts.data ? tenancyAccounts.data.map((account, index) => (
          <TenancyAccount
            key={account.id}
            account={account}
            user={user}
            index={index}
            getTenancyAccountInfo={getTenancyAccountInfo}
            deleteTenancyAccount={deleteTenancyAccount}
          />
        )) : null}
        {(tenancyAccounts.current_page && tenancyAccounts.current_page < tenancyAccounts.total_page) ? (
          <Button bsStyle="link" onClick={handleTenancyAccountNext}>Next...</Button>
        ) : null}
        {(tenancyAccounts.current_page && tenancyAccounts.current_page > 1) ? (
          <Button bsStyle="link" onClick={handleTenancyAccountPrevious}>Previous...</Button>
        ) : null}
      </div>
    </Modal.Body>
  </Modal>
);

TenancyAccountModal.propTypes = {
  user: React.PropTypes.object,
  tenancyAccount: React.PropTypes.object,
  tenancyAccounts: React.PropTypes.object,
  handleClose: React.PropTypes.func.isRequired,
  handleTenancyAccountSubmit: React.PropTypes.func.isRequired,
  handleTenancyAccountChange: React.PropTypes.func.isRequired,
  handleTenancyAccountDateChange: React.PropTypes.func.isRequired,
  handleTenancyAccountNext: React.PropTypes.func.isRequired,
  handleTenancyAccountPrevious: React.PropTypes.func.isRequired,
  getTenancyAccountInfo: React.PropTypes.func.isRequired,
  deleteTenancyAccount: React.PropTypes.func.isRequired,
  clearTenancyAccount: React.PropTypes.func.isRequired,
};

export default TenancyAccountModal;
