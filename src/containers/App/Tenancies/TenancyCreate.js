import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TenancyCreateComponent from 'components/App/Tenancies/TenancyCreate';
import {
  mainFormChange,
  mainFormSubmit,
  handleClientChange,
  handleClientSelect,
  handlePropertyChange,
  handlePropertySelect,
  mainFormAgreedDateChange,
  mainFormStartDateChange,
  mainFormEndDateChange,
  toggleBlockType,
  toggleInlineStyle,
  changeComment,
  clearError,
  quickCreateContact,
  quickCreateProperty,
  addNewContact,
  addNewProperty,
} from 'redux/modules/app/tenancies';

class TenancyCreate extends React.Component {
  componentWillReceiveProps(nextState) {
    if (nextState.error && nextState.error.callback) {
      nextState.error.callback();
      this.props.clearError();
    }
  }
  render() {
    return (
      <TenancyCreateComponent {...this.props} />
    );
  }
}

const mapStateToProps = state => ({
  user: state.app.tenancies.user,
  tenancy: state.app.tenancies.tenancy,
  peoples: state.app.tenancies.peoples,
  properties: state.app.tenancies.properties,
  comment: state.app.tenancies.comment,
  error: state.app.tenancies.error,
  newContact: state.app.tenancies.newContact,
  newProperty: state.app.tenancies.newProperty,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  mainFormChange,
  mainFormSubmit,
  handleClientChange,
  handleClientSelect,
  handlePropertyChange,
  handlePropertySelect,
  mainFormAgreedDateChange,
  mainFormStartDateChange,
  mainFormEndDateChange,
  toggleBlockType,
  toggleInlineStyle,
  changeComment,
  clearError,
  quickCreateContact,
  quickCreateProperty,
  addNewContact,
  addNewProperty,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TenancyCreate);
