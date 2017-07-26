import React from 'react';
import { Panel, Row, Col, FormControl, Button } from 'react-bootstrap';

const EmailSMSComponent = ({
  bundle = {},
  user = {},
  bundleSMS = [],
  bundleEmail = [],
  handleBundleChange,
  handleSMSSubmit,
  handleEmailSubmit,
}) => (
  <section>
    <Col sm={6} className="properties-page create emailSMS">
      <Panel>
        <h2>Email Credits</h2>
        <Row className="clearfix">
          <Col sm={12}>
            <form onSubmit={handleEmailSubmit}>
              <Col sm={12}>Current Email Credit: ({user.email_credit})</Col>
              <Col sm={9}>
                <FormControl
                  componentClass="select"
                  name="email"
                  value={bundle.email || ''}
                  onChange={handleBundleChange}
                >
                  <option value="" disabled>Select bundle</option>
                  {bundleEmail.map(email => (
                    <option key={email.id} value={email.id}>{email.name}</option>
                  ))}
                </FormControl>
              </Col>
              <Col sm={3}>
                <Button bsStyle="primary" type="submit">Submit</Button>
              </Col>
            </form>
          </Col>
        </Row>
      </Panel>
    </Col>
    <Col sm={6} className="properties-page create emailSMS">
      <Panel>
        <h2>SMS Credits</h2>
        <Row className="clearfix">
          <Col sm={12}>
            <form onSubmit={handleSMSSubmit}>
              <Col sm={12}>Current SMS Credit: ({user.sms_credit})</Col>
              <Col sm={9}>
                <FormControl
                  componentClass="select"
                  name="sms"
                  value={bundle.sms || ''}
                  onChange={handleBundleChange}
                >
                  <option value="" disabled>Select bundle</option>
                  {bundleSMS.map(sms => (
                    <option key={sms.id} value={sms.id}>{sms.name}</option>
                  ))}
                </FormControl>
              </Col>
              <Col sm={3}>
                <Button bsStyle="primary" type="submit">Submit</Button>
              </Col>
            </form>
          </Col>
        </Row>
      </Panel>
    </Col>
  </section>
);

EmailSMSComponent.propTypes = {
  bundle: React.PropTypes.object,
  user: React.PropTypes.object,
  bundleSMS: React.PropTypes.array,
  bundleEmail: React.PropTypes.array,
  handleBundleChange: React.PropTypes.func.isRequired,
  handleSMSSubmit: React.PropTypes.func.isRequired,
  handleEmailSubmit: React.PropTypes.func.isRequired,
};

export default EmailSMSComponent;
