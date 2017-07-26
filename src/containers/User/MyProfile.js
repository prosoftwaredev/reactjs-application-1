import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserEditComponent from 'components/User/UserEdit';
import {
  userChange,
  profileSave as userSave,
  signatureChange,
  toggleBlockType,
  toggleInlineStyle,
  clearError,
} from 'redux/modules/user';

class MyProfile extends React.Component {
  componentWillReceiveProps(props) {
    console.log(props);
    if (props.error && props.error.callback) {
      props.error.callback();
      this.props.clearError();
    }
  }
  render() {
    return (
      <UserEditComponent {...this.props} breadcrumb={false} />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  identity: state.auth.identity,
  error: state.user.error,
  timezones: state.user.timezones,
  signature: state.user.signature,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  userChange,
  userSave,
  signatureChange,
  toggleBlockType,
  toggleInlineStyle,
  clearError,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
