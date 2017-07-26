import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CountriesComponent from 'components/App/System/Options/Countries/';
import { fetchCodes, fetchActiveCodes, toggleCheckbox, saveCurrentCodes, clearError } from 'redux/modules/app/system/options/countries/';

class Countries extends React.Component {
  componentDidMount() {
    if (!this.props.result) {
      this.props.fetchCodes();
      this.props.fetchActiveCodes();
    }
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
      <CountriesComponent {...this.props} />
    );
  }
}

const mapStateToProps = state => ({
  entities: state.app.system.options.countries.entities,
  result: state.app.system.options.countries.result,
  active: state.app.system.options.countries.active,
  error: state.app.system.options.countries.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCodes,
  fetchActiveCodes,
  toggleCheckbox,
  saveCurrentCodes,
  clearError,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Countries);
