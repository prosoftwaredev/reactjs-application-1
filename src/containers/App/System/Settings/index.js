import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SettingsComponent from 'components/App/System/Settings';
import { fetchSettings, updateSettingsLocal, updateSettings, clearError, uploadLogo } from 'redux/modules/app/system/settings';

class Settings extends React.Component {
  componentDidMount() {
    this.props.fetchSettings();
  }
  componentWillReceiveProps(props) {
    if (props.error && props.error.callback) {
      props.error.callback();
      this.props.clearError();
    }
  }
  render() {
    return (
      <SettingsComponent {...this.props} />
    );
  }
}

export default connect(state => ({
  values: state.app.system.settings.values,
  error: state.app.system.settings.error,
}),
dispatch => bindActionCreators({
  fetchSettings,
  handleChange: updateSettingsLocal,
  handleSubmit: updateSettings,
  clearError,
  uploadLogo,
}, dispatch))(Settings);
