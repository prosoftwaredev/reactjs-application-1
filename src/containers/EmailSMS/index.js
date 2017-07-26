import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { handleBundleChange, handleSMSSubmit, handleEmailSubmit, clearError } from 'redux/modules/emailsms';
import EmailSMSComponent from 'components/EmailSMS';

class EmailSMS extends React.Component {
  componentWillReceiveProps(props) {
    if (props.error && props.error.callback) {
      props.error.callback();
      this.props.clearError();
    }
  }
  render() {
    return (
      <EmailSMSComponent {...this.props} />
    );
  }
}

const mapStateToProps = state => ({
  bundle: state.emailsms.bundle,
  bundleSMS: state.emailsms.bundleSMS,
  bundleEmail: state.emailsms.bundleEmail,
  user: state.common.user,
  error: state.emailsms.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  handleBundleChange,
  handleSMSSubmit,
  handleEmailSubmit,
  clearError,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EmailSMS);
