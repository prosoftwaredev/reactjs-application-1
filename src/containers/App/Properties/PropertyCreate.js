import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  setPropertyDateUpdate,
  setPropertyUpdateLocal,
  handleMainFormSubmit,
  clearError,
  handleOwnerChange,
  handleOwnerSelect,
  addNewContact,
  quickCreateContact,
  fillAddress,
  handleAssetTypeChange,
  handleAssetsUpload,
  changeDescription,
  toggleInlineStyle,
  toggleBlockType,
} from 'redux/modules/app/properties';

import PropertyCreateComponent from 'components/App/Properties/PropertyCreate';

class PropertyCreate extends Component {
  componentWillReceiveProps(props) {
    if (props.error && props.error.callback) {
      props.error.callback();
      this.props.clearError();
    }
  }
  render() {
    return (
      <PropertyCreateComponent
        {...this.props}
        />
    );
  }
}

const mapStateToProps = state => ({
  user: state.app.properties.user,
  property: state.app.properties.property,
  types: state.app.properties.types,
  prices: state.app.properties.prices,
  statuses: state.app.properties.statuses,
  categories: state.app.properties.categories,
  loading: state.app.properties.propertyLoading,
  error: state.app.properties.propertyError,
  owners: state.app.properties.owners,
  newContact: state.app.properties.newContact,
  assetsType: state.app.properties.assetsType,
  description: state.app.properties.description,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  mainFormChange: setPropertyUpdateLocal,
  mainFormDateChange: setPropertyDateUpdate,
  mainFormSubmit: handleMainFormSubmit,
  clearError,
  handleOwnerChange,
  handleOwnerSelect,
  addNewContact,
  quickCreateContact,
  fillAddress,
  handleAssetTypeChange,
  handleAssetsUpload,
  changeDescription,
  toggleInlineStyle,
  toggleBlockType,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PropertyCreate);
