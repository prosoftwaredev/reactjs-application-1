import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  setPropertyUpdateLocal,
  setPropertyDateUpdate,
  handleMainFormSubmit,
  setDetailedProperty,
  hideModal,
  getContacts,
  setNote,
  getNotes,
  setDeleteNote,
  setCreateNote,
  getPropertyEmails,
  autocompleteContact,
  setAutocompleteContact,
  handleSendDirectChange,
  handleSendDirectSubmit,
  handleSendChange,
  handleSendSubmit,
  setCreateAsset,
  handleAssetTypeChange,
  handleAssetsUpload,
  handleDocumentUpload,
  setCreateDocument,
  handleDocumentDownload,
  setProperyLocations,
  setProperyLocationsLocal,
  handleSubmitLocations,
  setDeletedDocument,
  setPrintValues,
  handlePrintSubmit,
  setLoading,
  clearError,
  handleOwnerChange,
  handleOwnerSelect,
  addNewContact,
  quickCreateContact,
  fillAddress,
  changeDescription,
  toggleInlineStyle,
  toggleBlockType,
  handleEmailCreate,
  handleEmailChange,
  handleAttachmentRemove,
  handleTemplateChange,
  setDocument,
} from 'redux/modules/app/properties';
import PropertyInfoComponent from 'components/App/Properties/PropertyInfo';

class PropertyInfo extends React.Component {
  componentDidMount() {
    this.props.setDetailedProperty(this.props.params.id);
  }

  componentWillReceiveProps(props) {
    if (props.error && props.error.callback) {
      props.error.callback();
      this.props.clearError();
    }
  }

  render() {
    return (
      <PropertyInfoComponent
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
  contacts: state.app.properties.contacts,
  note: state.app.properties.note,
  notes: state.app.properties.notes,
  noteCategories: state.app.properties.noteCategories,
  email: state.app.properties.email,
  emails: state.app.properties.emails,
  autocomplete: state.app.properties.autocomplete,
  directValues: state.app.properties.directValues,
  sendValues: state.app.properties.sendValues,
  modal: state.app.properties.modal,
  templates: state.app.properties.marketingTemplates,
  printTemplates: state.app.properties.printTemplates,
  printValues: state.app.properties.printValues,
  locations: state.app.properties.locations,
  error: state.app.properties.propertyError,
  loading: state.app.properties.propertyLoading,
  activity: state.app.properties.activity,
  appointments: state.app.properties.appointments,
  assets: state.app.properties.assets,
  assetsType: state.app.properties.assetsType,
  uploadImageProgress: state.app.properties.uploadImageProgress,
  uploadDocumentProgress: state.app.properties.uploadDocumentProgress,
  documents: state.app.properties.documents,
  propertyLocations: state.app.properties.propertyLocations,
  owners: state.app.properties.owners,
  newContact: state.app.properties.newContact,
  description: state.app.properties.description,
  printedDoc: state.app.properties.printedDoc,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  mainFormChange: setPropertyUpdateLocal,
  mainFormDateChange: setPropertyDateUpdate,
  mainFormSubmit: handleMainFormSubmit,
  setDetailedProperty,
  handleModalClose: hideModal,
  handleContactsClick: getContacts,
  handleNoteChange: setNote,
  handleNotesClick: getNotes,
  handleNoteDelete: setDeleteNote,
  handleNoteCreate: setCreateNote,
  handleEmailsClick: getPropertyEmails,
  handleAutocomplete: autocompleteContact,
  handleAutocompleteDone: setAutocompleteContact,
  handleSendDirectChange,
  handleSendDirectSubmit,
  handleSendChange,
  handleSendSubmit,
  setCreateAsset,
  handleAssetTypeChange,
  handleAssetsUpload,
  handleDocumentUpload,
  setCreateDocument,
  handleDocumentDownload,
  handleDocumentDelete: setDeletedDocument,
  setProperyLocations,
  handleChangeLocations: setProperyLocationsLocal,
  handleSubmitLocations,
  handlePrintChange: setPrintValues,
  handlePrintSubmit,
  setLoading,
  clearError,
  handleOwnerChange,
  handleOwnerSelect,
  addNewContact,
  quickCreateContact,
  fillAddress,
  changeDescription,
  toggleInlineStyle,
  toggleBlockType,
  handleEmailCreate,
  handleEmailChange,
  handleAttachmentRemove,
  handleTemplateChange,
  setDocument,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PropertyInfo);
