import React from 'react';
import { Link } from 'react-router';
import { Button, FormGroup, Alert } from 'react-bootstrap';
import juvo from 'juvo';

const LoginComponent = ({ loginFormSubmit, loginFormChange, error, loading, values }) => (
  <form className="login-form" onSubmit={loginFormSubmit}>
    <h2 className="text-center">
      <img className="logo" src={require('img/logo_big.png')} alt="" />
    </h2>
    <div className="login-block">
      <h3 className="text-center no-top-margin">Sign In</h3>
      <main>
        {error && <Alert bsStyle="danger">{error.message}</Alert>}
        <FormGroup>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address..."
            className="form-control form-control-lg"
            value={(values && values.email) || ''}
            onChange={loginFormChange}
            />
        </FormGroup>
        <FormGroup>
          <input
            type="password"
            name="password"
            placeholder="Enter your password..."
            className="form-control form-control-lg"
            value={(values && values.password) || ''}
            onChange={loginFormChange}
            />
        </FormGroup>
        <Button type="submit" block >{loading && <i className="fa fa-circle-o-notch fa-spin" />} Sign In</Button>
      </main>
      <p className="text-right"><Link to={juvo.forgot.index}>Forgot password?</Link></p>
    </div>
    <p>
      Don&apos;t have account? <Link to={juvo.signUp.index}>Create an account</Link>
    </p>
  </form>
);

LoginComponent.propTypes = {
  loginFormSubmit: React.PropTypes.func.isRequired,
  loginFormChange: React.PropTypes.func.isRequired,
  error: React.PropTypes.object,
  loading: React.PropTypes.bool,
  values: React.PropTypes.object,
};

export default LoginComponent;
