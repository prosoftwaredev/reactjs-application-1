import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import OfferInfoComponent from 'components/App/Offers/OfferInfo';
import Notes from 'components/Common/modals/Notes';
import Emails from 'components/Common/modals/Emails';

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
  handleNotesClick,
  handleModalClose,
  handleNoteCreate,
  handleNoteChange,
  handleNoteDelete,
  handlePrintChange,
  handlePrintSubmit,
  handleDocumentUpload,
  handleDocumentDownload,
  handleDocumentDelete,
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
  handleEmailCreate,
  handleEmailChange,
  handleAttachmentRemove,
  handleTemplateChange,
  setDocument,
} from 'redux/modules/app/offers';

class OfferInfo extends React.Component {
  componentWillReceiveProps(nextState) {
    if (nextState.error && nextState.error.callback) {
      nextState.error.callback();
      this.props.clearError();
    }
  }
  render() {
    return (
      <div>
        <OfferInfoComponent {...this.props} />
        {this.props.modal === 'notes' && (
          <Notes
            user={this.props.user}
            note={this.props.note || {}}
            notes={this.props.notes}
            categories={this.props.noteCategories}
            handleClose={this.props.handleModalClose}
            createNote={this.props.handleNoteCreate}
            deleteNote={this.props.handleNoteDelete}
            onChange={this.props.handleNoteChange}
            error={this.props.error}
            />
        )}
        {this.props.modal === 'emails' && (
          <Emails
            user={this.props.user}
            email={this.props.email}
            emails={this.props.emails}
            handleClose={this.props.handleModalClose}
            error={this.props.error}
            handleEmailCreate={this.props.handleEmailCreate}
            handleEmailChange={this.props.handleEmailChange}
            handleAttachmentRemove={this.props.handleAttachmentRemove}
            printedDoc={this.props.printedDoc}
            handleTemplateChange={this.props.handleTemplateChange}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.app.offers.user,
  users: state.common.users,
  email: state.app.offers.email,
  emails: state.app.offers.emails,
  printedDoc: state.app.offers.printedDoc,
  offer: state.app.offers.offer,
  peoples: state.app.offers.peoples,
  properties: state.app.offers.properties,
  printTemplates: state.app.offers.printTemplates,
  printValues: state.app.offers.printValues,
  documents: state.app.offers.documents,
  activity: state.app.offers.activity,
  uploadDocumentProgress: state.app.offers.uploadDocumentProgress,
  comment: state.app.offers.comment,
  error: state.app.offers.error,
  note: state.app.offers.note,
  notes: state.app.offers.notes,
  noteCategories: state.app.offers.noteCategories,
  modal: state.app.offers.modal,
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
  handleNotesClick,
  handleModalClose,
  handleNoteCreate,
  handleNoteChange,
  handleNoteDelete,
  handlePrintChange,
  handlePrintSubmit,
  handleDocumentUpload,
  handleDocumentDownload,
  handleDocumentDelete,
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
  handleEmailCreate,
  handleEmailChange,
  handleAttachmentRemove,
  handleTemplateChange,
  setDocument,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OfferInfo);
