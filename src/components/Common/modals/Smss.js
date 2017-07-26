import React from 'react';
import { Modal, Row, Col, FormControl, FormGroup, Button, ControlLabel, } from 'react-bootstrap';
import { getValidationStatus } from 'common/utils';
import NoDataFound from '../NoDataFound';

const Smss = ({ sms = {}, smss, countryCodes, handleClose, handleSMSCreate, handleSMSChange, error }) => (
  <Modal show onHide={handleClose} className="notes">
    <Modal.Header closeButton>
      <Modal.Title>SMSs</Modal.Title>
    </Modal.Header>
    <Modal.Body className="properties-page create">
      <div className="panel-body">
        <Row>
          <form onSubmit={handleSMSCreate}>
            <FormGroup validationState={getValidationStatus(error, 'mobile_country_code_id', sms)}>
              <Col componentClass={ControlLabel} sm={2}>
                Country
              </Col>
              <Col sm={10}>
                <FormControl
                  value={sms.mobile_country_code_id || ''}
                  name="mobile_country_code_id"
                  componentClass="select"
                  onChange={handleSMSChange}
                  >
                  <option value="" disabled>Select country</option>
                  {countryCodes && countryCodes.map((code, index) => (
                    <option key={index} value={code.id}>{`${code.name} (+${code.prefix})`}</option>
                  ))}
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup validationState={getValidationStatus(error, 'to', sms)}>
              <Col componentClass={ControlLabel} sm={2}>
                Mobile
              </Col>
              <Col sm={10}>
                <FormControl
                  value={sms.to || ''}
                  name="to"
                  type="tel"
                  onChange={handleSMSChange}
                  />
              </Col>
            </FormGroup>
            <FormGroup validationState={getValidationStatus(error, 'message', sms)}>
              <Col componentClass={ControlLabel} sm={2}>
                Message
              </Col>
              <Col sm={10}>
                <FormControl
                  value={sms.message || ''}
                  componentClass="textarea"
                  name="message"
                  onChange={handleSMSChange}
                  />
              </Col>
            </FormGroup>
            <Col sm={2} smOffset={10}>
              <Button bsStyle="primary" type="submit">Send</Button>
            </Col>
          </form>
        </Row>
        <Row>
          <Col sm={3}>
            From
          </Col>
          <Col sm={3}>
            To
          </Col>
        </Row>
        {!smss || smss.length === 0 ? <NoDataFound /> :
          smss.map((item, index) => (
            <Row key={item.id} className={`note-row ${index % 2 === 0 ? 'even' : ''}`}>
              <Col sm={3}>
                {item.from}
              </Col>
              <Col sm={3}>
                {item.to}
              </Col>
              <Col sm={6}>
                {item.message}
              </Col>
            </Row>
          )
        )}
      </div>
    </Modal.Body>
  </Modal>
);

Smss.propTypes = {
  sms: React.PropTypes.object.isRequired,
  smss: React.PropTypes.array,
  countryCodes: React.PropTypes.array,
  handleClose: React.PropTypes.func.isRequired,
  handleSMSCreate: React.PropTypes.func.isRequired,
  handleSMSChange: React.PropTypes.func.isRequired,
};

export default Smss;
