import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import OfferCreateComponent from 'components/App/Offers/OfferCreate';
import {
  mainFormChange,
  mainFormSubmit,
  handleClientChange,
  handleClientSelect,
  handlePropertyChange,
  handlePropertySelect,
  mainFormDateChange,
  toggleBlockType,
  toggleInlineStyle,
  changeComment,
  clearError,
  quickCreateContact,
  quickCreateProperty,
  addNewClient,
  addNewProperty,
  addNewApplicant,
  addNewVendor,
  handleVendorSelect,
  handleVendorChange,
  handleApplicantSelect,
  handleApplicantChange,
  hideQuickModal,
} from 'redux/modules/app/offers';

class OfferCreate extends React.Component {
  componentWillReceiveProps(nextState) {
    if (nextState.error && nextState.error.callback) {
      nextState.error.callback();
      this.props.clearError();
    }
  }
  render() {
    return (
      <OfferCreateComponent {...this.props} />
    );
  }
}

const mapStateToProps = state => ({
  offer: state.app.offers.offer,
  peoples: state.app.offers.peoples,
  properties: state.app.offers.properties,
  comment: state.app.offers.comment,
  error: state.app.offers.error,
  users: state.common.users,
  newClient: state.app.offers.newClient,
  newProperty: state.app.offers.newProperty,
  newApplicant: state.app.offers.newApplicant,
  newVendor: state.app.offers.newVendor,
  vendors: state.app.offers.vendors,
  applicants: state.app.offers.applicants,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  mainFormChange,
  mainFormSubmit,
  handleClientChange,
  handleClientSelect,
  handlePropertyChange,
  handlePropertySelect,
  mainFormDateChange,
  toggleBlockType,
  toggleInlineStyle,
  changeComment,
  clearError,
  quickCreateContact,
  quickCreateProperty,
  addNewClient,
  addNewProperty,
  addNewApplicant,
  addNewVendor,
  handleVendorSelect,
  handleVendorChange,
  handleApplicantSelect,
  handleApplicantChange,
  hideQuickModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OfferCreate);
