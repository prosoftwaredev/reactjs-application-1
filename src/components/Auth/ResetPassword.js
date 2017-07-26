import React from 'react';
import { Link } from 'react-router';
import { ControlLabel, FormControl, FormGroup, Button, InputGroup, Alert } from 'react-bootstrap';
import juvo from 'juvo';

const ResetPasswordComponent = ({ state, handleSubmit, handleChange }) => {
  const { values, error, data } = state || {};
  return (
    <form className="reset-password-form" onSubmit={handleSubmit}>
      <h2 className="text-center">
        <img className="logo" src={require('img/logo_big.png')} alt="" />
      </h2>
      <div className="reset-password-block">
        <h3 className="text-center no-top-margin">Reset your password</h3>
        <main>
          {error && <Alert bsStyle="danger">{error.message}</Alert>}
          {data && <Alert bsStyle="info">{data.message}</Alert>}
          <p>You will be able to log on to your acccount with the new password.</p>
          <FormGroup>
            <ControlLabel>New Password: </ControlLabel>
            <InputGroup>
              <InputGroup.Addon><i className="glyphicon glyphicon-lock" /></InputGroup.Addon>
              <FormControl
                value={(values && values.password) || ''}
                required
                name="password"
                placeholder="Password"
                type="password"
                onChange={handleChange}
                />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Confirm Password: </ControlLabel>
            <InputGroup>
              <InputGroup.Addon><i className="glyphicon glyphicon-thumbs-up" /></InputGroup.Addon>
              <FormControl
                value={(values && values.password_confirm) || ''}
                required
                name="password_confirm"
                placeholder="Confirmation"
                type="password"
                onChange={handleChange}
                />
            </InputGroup>
          </FormGroup>
          <Button type="submit" block>Continue</Button>
        </main>
        <p className="text-right"><Link to={juvo.signIn.index}>Back To Login</Link></p>
      </div>
    </form>
  );
};

ResetPasswordComponent.propTypes = {
  state: React.PropTypes.object,
  handleSubmit: React.PropTypes.func.isRequired,
  handleChange: React.PropTypes.func.isRequired,
};

export default ResetPasswordComponent;
