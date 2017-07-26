import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropertiesComponent from 'components/App/System/Options/Properties/';
import { fetchAllTypes, fetchActiveTypes, toggleCheckbox, saveCurrentTypes, clearError } from 'redux/modules/app/system/options/properties/';

class Properties extends React.Component {
  componentDidMount() {
    this.props.fetchAllTypes();
    this.props.fetchActiveTypes();
  }
  componentWillReceiveProps(props) {
    console.log(props);
    if (props.error && props.error.callback) {
      props.error.callback();
      this.props.clearError();
    }
  }
  render() {
    return (
      <PropertiesComponent {...this.props} />
    );
  }
}

const mapStateToProps = state => ({
  types: state.app.system.options.properties.types,
  active: state.app.system.options.properties.active,
  error: state.app.system.options.properties.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAllTypes,
  fetchActiveTypes,
  toggleCheckbox,
  saveCurrentTypes,
  clearError,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Properties);
