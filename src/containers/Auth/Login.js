import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginFormChange, loginFormSubmit } from 'redux/modules/auth/';
import LoginComponent from 'components/Auth/Login';

const mapDispatchToProps = dispatch => bindActionCreators({
  loginFormChange,
  loginFormSubmit,
}, dispatch);

export default connect(state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  values: state.auth.values,
}), mapDispatchToProps)(LoginComponent);
