import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocumentsComponent from 'components/App/Documents';
import {
  // getDocuments,
  handleDocumentUpload,
  handleDocumentDownload,
  setDeleteDocument,
  setDocumentPagination,
  setSearchValues,
  searchDocuments,
  toggleSearch,
  clearError,
  setDocument,
  handleModalClose,
  handleEmailCreate,
  handleEmailChange,
  handleAttachmentRemove,
  handleTemplateChange,
  handleSearchReset,
} from 'redux/modules/app/documents';
import ConfirmDelete from 'components/Common/modals/ConfirmDelete';
import Emails from 'components/Common/modals/Emails';

class Documents extends React.Component {
  state = {
    deleteModal: false,
  }
  componentWillReceiveProps(props) {
    if (props.error && props.error.callback) {
      props.error.callback();
      this.props.clearError();
      this.toggleDeleteModal();
    }
  }
  requestDelete = id => this.setState({ itemToDelete: id, deleteModal: true })
  handleDelete = () => {
    this.props.setDeleteDocument(this.state.itemToDelete);
  }
  toggleDeleteModal = () => this.setState({ deleteModal: false, itemToDelete: null })
  render() {
    return (
      <section>
        <DocumentsComponent {...this.props} setDeleteDocument={this.requestDelete} />
        <ConfirmDelete shown={this.state.deleteModal} handleDelete={this.handleDelete} handleClose={this.toggleDeleteModal} />
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
      </section>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.app.documents.modal,
  user: state.app.documents.user,
  email: state.app.documents.email,
  emails: state.app.documents.emails,
  printedDoc: state.app.documents.printedDoc,
  error: state.app.documents.error,
  documents: state.app.documents.documents,
  pagination: state.app.documents.pagination,
  searchValue: state.app.documents.searchValue,
  searchPanel: state.app.documents.searchPanel,
  uploadDocumentProgress: state.app.documents.uploadDocumentProgress,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  // getDocuments,
  handleDocumentUpload,
  handleDocumentDownload,
  setDeleteDocument,
  setDocumentPagination,
  setSearchValues,
  searchDocuments,
  toggleSearch,
  clearError,
  setDocument,
  handleModalClose,
  handleEmailCreate,
  handleEmailChange,
  handleAttachmentRemove,
  handleTemplateChange,
  handleSearchReset,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Documents);
