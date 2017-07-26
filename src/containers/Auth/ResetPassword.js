import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResetPasswordComponent from 'components/Auth/ResetPassword';
import { resetPasswordRequest } from 'redux/modules/auth/requests';

class ResetPassword extends Component {
  handleChange = (e) => {
    const values = this.state ? { ...this.state.values } : {};
    values[e.target.name] = e.target.value;
    this.setState({ values });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ data: false, error: false });
    const formData = this.state ? { ...this.state.values } : {};
    formData.email = this.props.location.query.email;
    formData.key = this.props.location.query.key;
    resetPasswordRequest(formData)
      .then(data => this.setState({ data }))
      .catch(error => this.setState({ error }));
  }

  render() {
    return (
      <ResetPasswordComponent
        state={this.state}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
      />
    );
  }
}


export default connect()(ResetPassword);
