import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { forgotFormChange, forgotFormSubmit } from 'redux/modules/auth';
import ForgotPasswordComponent from 'components/Auth/ForgotPassword';

export default connect(state => ({
  values: state.auth.values,
  error: state.auth.error,
  forgot: state.auth.forgot,
}), dispatch => bindActionCreators({
  forgotFormChange,
  forgotFormSubmit,
}, dispatch))(ForgotPasswordComponent);
