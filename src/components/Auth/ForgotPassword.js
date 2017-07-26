import React from 'react';
import { Link } from 'react-router';
import { FormControl, FormGroup, Button, InputGroup, Alert } from 'react-bootstrap';
import juvo from 'juvo';

const ForgotPasswordComponent = ({ values = {}, error, forgot, forgotFormSubmit, forgotFormChange }) => {
  return (
    <form className="forgot-password-form" onSubmit={forgotFormSubmit}>
      <h2 className="text-center">
        <img className="logo" src={require('img/logo_big.png')} alt="" />
      </h2>
      <div className="forgot-password-block">
        <h3 className="text-center no-top-margin">Forgot your password?</h3>
        <main>
          {error && <Alert bsStyle="danger">{error.message}</Alert>}
          {forgot && <Alert bsStyle="info">{forgot.message}</Alert>}
          <p>Enter your email address below and we will send you a link to reset your password.</p>
          <FormGroup>
            <InputGroup>
              <InputGroup.Addon><i className="glyphicon glyphicon-envelope" /></InputGroup.Addon>
              <FormControl
                value={values.email || ''}
                required
                name="email"
                type="email"
                placeholder="Enter your email address..."
                onChange={forgotFormChange}
                />
            </InputGroup>
          </FormGroup>
          <Button type="submit" block >Reset Password</Button>
        </main>
        <p className="text-right"><Link to={juvo.signIn.index}>Back To Login</Link></p>
      </div>
    </form>
  );
};

ForgotPasswordComponent.propTypes = {
  values: React.PropTypes.object,
  forgot: React.PropTypes.object,
  error: React.PropTypes.object,
  forgotFormSubmit: React.PropTypes.func.isRequired,
  forgotFormChange: React.PropTypes.func.isRequired,
};

export default ForgotPasswordComponent;
