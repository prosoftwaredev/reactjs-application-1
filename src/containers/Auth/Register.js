import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HelpBlock } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { toastr } from 'react-redux-toastr';
import juvo from 'juvo';
import { signUpRequest } from 'redux/modules/auth/requests';
import RegisterComponent from 'components/Auth/Register';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      captcha: localStorage.getItem('CAPTCHA'),
      disabled: true,
    };
  }
  getValidationStatus = (name) => {
    const { error } = this.state || {};
    if (error) {
      const { errors = {} } = error;
      if (Object.prototype.hasOwnProperty.call(errors, name)) {
        return 'error';
      }
    }

    return 'success';
  }

  handleChange = (e) => {
    const values = this.state ? { ...this.state.values } : {};
    if (e.target.type === 'checkbox') {
      values[e.target.name] = e.target.checked ? 1 : 0;
    } else {
      values[e.target.name] = e.target.value;
    }
    this.setState({ values });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ data: false, error: false });
    const values = this.state ? { ...this.state.values } : {};
    signUpRequest(values)
      .then(() => {
        toastr.success('Creater', 'New account registred!');
        browserHistory.push(juvo.signIn.login);
      })
      .catch(error => this.setState({ error }));
  }

  handleVerify = (captcha) => {
    console.log('captcha');
    console.log(captcha);
    this.setState({ disabled: false });
  }

  handleCaptchaOnload = (captcha) => {
    console.log('captcha');
    console.log(captcha);
  }

  renderHelpBlock = (name) => {
    const { error } = this.state || {};
    if (error) {
      const { errors = {} } = error;
      if (Object.prototype.hasOwnProperty.call(errors, name)) {
        return <HelpBlock>{errors[name]}</HelpBlock>;
      }
    }

    return null;
  }

  render() {
    const { timezones, countries } = this.props;
    return (
      <RegisterComponent
        state={this.state}
        handleSubmit={this.handleSubmit}
        getValidationStatus={this.getValidationStatus}
        handleChange={this.handleChange}
        renderHelpBlock={this.renderHelpBlock}
        timezones={timezones}
        countries={countries}
        verifyCallback={this.handleVerify}
        onloadCallback={this.handleCaptchaOnload}
      />
    );
  }
}

export default connect(state => ({ timezones: state.auth.timezones, countries: state.auth.countries }))(Register);
