import React from 'react';
import { Link } from 'react-router';
import Recaptcha from 'react-recaptcha';
import { ControlLabel, FormControl, FormGroup, Button, Alert, Row, Col } from 'react-bootstrap';
import juvo from 'juvo';

const RegisterComponent = (props) => {
  const {
    state,
    handleSubmit,
    getValidationStatus,
    handleChange,
    renderHelpBlock,
    verifyCallback,
    onloadCallback,
  } = props;
  const { error, data, } = state || {};
  const values = (state && state.values) || {};
  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2 className="text-center">
        <img className="logo" src={require('img/logo_big.png')} alt="" />
      </h2>
      <div className="register-block">
        <h3 className="text-center no-top-margin">Create Your Free Juvo Account</h3>
        <main>
          {error && <Alert bsStyle="danger">{error.message}</Alert>}
          {data && <Alert bsStyle="info" />}
          <FormGroup validationState={getValidationStatus('name')}>
            <ControlLabel>Name: </ControlLabel>
            <FormControl
              value={values.name || ''}
              required
              name="name"
              placeholder=""
              type="text"
              onChange={handleChange}
            />
            {renderHelpBlock('name')}
          </FormGroup>
          <FormGroup validationState={getValidationStatus('company')}>
            <ControlLabel>Company: </ControlLabel>
            <FormControl
              value={values.company || ''}
              required
              name="company"
              placeholder="Company name..."
              type="text"
              onChange={handleChange}
            />
            {renderHelpBlock('company')}
          </FormGroup>
          <FormGroup validationState={getValidationStatus('quantity')}>
            <ControlLabel>Number of Users: </ControlLabel>
            <FormControl
              value={values.quantity || ''}
              required
              name="quantity"
              min="1"
              type="number"
              onChange={handleChange}
            />
            {renderHelpBlock('quantity')}
          </FormGroup>
          <FormGroup validationState={getValidationStatus('email')}>
            <ControlLabel>Email: </ControlLabel>
            <FormControl
              value={values.email || ''}
              required
              name="email"
              placeholder="Email"
              type="email"
              onChange={handleChange}
            />
            {renderHelpBlock('email')}
          </FormGroup>
          <FormGroup validationState={getValidationStatus('password')}>
            <ControlLabel>Password: </ControlLabel>
            <FormControl
              value={values.password || ''}
              required
              name="password"
              placeholder="Password"
              type="password"
              onChange={handleChange}
            />
            {renderHelpBlock('password')}
          </FormGroup>
          <FormGroup validationState={getValidationStatus('password_confirm')}>
            <ControlLabel>Confirm Password: </ControlLabel>
            <FormControl
              value={values.password_confirm || ''}
              required
              name="password_confirm"
              placeholder="Password Confirmation"
              type="password"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="form-checkbox">
            <Row>
              <Col xs={5} lg={2}>
                <input
                  id="terms"
                  type="checkbox"
                  // className="form-checkbox"
                  checked={values.terms || false}
                  name="terms"
                  onChange={handleChange}
                />
                <label htmlFor="terms" />
              </Col>
              <Col componentClass={ControlLabel} xs={7} lg={10}>
                <span className="Terms">
                I agree to the following <Link href="http://www.juvo.io/terms" target="_blank">Terms & Conditions</Link>
                </span>
              </Col>
              {renderHelpBlock('terms')}
            </Row>
          </FormGroup>
          <Recaptcha sitekey={state.captcha} verifyCallback={verifyCallback} onloadCallback={onloadCallback} />
          <Button type="submit" block disabled={state.disabled}>Submit</Button>
        </main>
      </div>
      <p>Already have account? <Link to={juvo.signIn.index}>Sign In</Link></p>
    </form>
  );
};

RegisterComponent.propTypes = {
  state: React.PropTypes.object,
  handleSubmit: React.PropTypes.func.isRequired,
  getValidationStatus: React.PropTypes.func.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  renderHelpBlock: React.PropTypes.func.isRequired,
};

export default RegisterComponent;
