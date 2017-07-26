import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TenancyInfoComponent from 'components/App/Tenancies/TenancyInfo';
import Notes from 'components/Common/modals/Notes';
import Emails from 'components/Common/modals/Emails';
import TenancyJobModal from 'components/App/Tenancies/modals/TenancyJobModal';
import TenancyDisbursementModal from 'components/App/Tenancies/modals/TenancyDisbursementModal';
import TenancyRentModal from 'components/App/Tenancies/modals/TenancyRentModal';
import TenancyPaymentModal from 'components/App/Tenancies/modals/TenancyPaymentModal';
import TenancyLandlordModal from 'components/App/Tenancies/modals/TenancyLandlordModal';
import TenancyAccountModal from 'components/App/Tenancies/modals/TenancyAccountModal';

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
  getTenancyJobs,
  getTenancyJobInfo,
  addTenancyJob,
  handleTenancyJobChange,
  handleTenancyJobSubmit,
  deleteTenancyJob,
  handleJobClientSelect,
  handleJobClientChange,
  jobScheludeDateChange,
  jobCompletionDateChange,
  getDisbursementInfo,
  addDisbursement,
  handleDisbursementChange,
  handleDisbursementSubmit,
  deleteDisbursement,
  disbursementDateChange,
  getTenancyRents,
  getNextRents,
  getPreviousRents,
  getNextDisbursments,
  getPreviousDisbursments,
  getNextJobs,
  getPreviousJobs,
  getTenancyRentInfo,
  addTenancyRent,
  handleTenancyRentChange,
  handleTenancyRentDateChange,
  handleTenancyRentStartDateChange,
  handleTenancyRentEndDateChange,
  handleGenerateRentSubmit,
  handleTenancyRentSubmit,
  deleteTenancyRent,
  getTenancyPayments,
  handleTenancyPatmentSubmit,
  handleTenancyPaymentChange,
  handleTenancyPaymentDateChange,
  handleTenancyPaymentNext,
  handleTenancyPaymentPrevious,
  getTenancyPaymentInfo,
  deleteTenancyPayment,
  clearTenancyPayment,
  confirmTenancyRent,
  handleAccountClick,
  getTenancyAccountOverview,
  handleTenancyAccountNext,
  handleTenancyAccountPrevious,
  getTenancyAccountInfo,
  handleTenancyAccountChange,
  handleTenancyAccountDateChange,
  handleTenancyAccountSubmit,
  clearTenancyAccount,
  deleteTenancyAccount,
  handleTenancyStatementNext,
  handleTenancyStatementPrevious,
  getTenancyStatementInfo,
  handleTenancyStatementChange,
  handleTenancyStatementStartDateChange,
  handleTenancyStatementEndtDateChange,
  handleTenancyStatementSubmit,
  deleteTenancyStatement,
  getTenancyStatementTemplate,
  handleTemplateDownload,
  getTenancyLandlords,
  handleTenancyLandlordChange,
  handleTenancyLandlordDateChange,
  handleTenancyLandlordSubmit,
  handleTenancyLandlordNext,
  handleTenancyLandlordPrevious,
  clearTenancyLandlord,
  getTenancyLandlordInfo,
  deleteTenancyLandlord,
  quickCreateContact,
  quickCreateProperty,
  addNewContact,
  addNewProperty,
  handleEmailCreate,
  handleEmailChange,
  handleAttachmentRemove,
  handleTemplateChange,
  setDocument,
  handleTenancyPaymentsModalClose,
} from 'redux/modules/app/tenancies';

class TenancyInfo extends React.Component {
  componentWillReceiveProps(nextState) {
    if (nextState.error && nextState.error.callback) {
      nextState.error.callback();
      this.props.clearError();
    }
  }
  render() {
    return (
      <div>
        <TenancyInfoComponent {...this.props} />
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
        {this.props.modal === 'job' && (
          <TenancyJobModal
            tenancyJob={this.props.tenancyJob}
            peoples={this.props.peoples}
            users={this.props.users}
            user={this.props.user}
            handleClose={this.props.handleModalClose}
            handleTenancyJobSubmit={this.props.handleTenancyJobSubmit}
            handleTenancyJobChange={this.props.handleTenancyJobChange}
            handleJobClientSelect={this.props.handleJobClientSelect}
            handleJobClientChange={this.props.handleJobClientChange}
            jobScheludeDateChange={this.props.jobScheludeDateChange}
            jobCompletionDateChange={this.props.jobCompletionDateChange}
          />
        )}
        {this.props.modal === 'disbursement' && (
          <TenancyDisbursementModal
            disbursement={this.props.disbursement}
            user={this.props.user}
            handleClose={this.props.handleModalClose}
            handleDisbursementSubmit={this.props.handleDisbursementSubmit}
            handleDisbursementChange={this.props.handleDisbursementChange}
            disbursementDateChange={this.props.disbursementDateChange}
          />
        )}
        {this.props.modal === 'rent' && (
          <TenancyRentModal
            tenancyRent={this.props.tenancyRent}
            user={this.props.user}
            handleClose={this.props.handleModalClose}
            handleTenancyRentSubmit={this.props.handleTenancyRentSubmit}
            handleTenancyRentChange={this.props.handleTenancyRentChange}
            handleTenancyRentDateChange={this.props.handleTenancyRentDateChange}
            error={this.props.error}
          />
        )}
        {this.props.modal === 'payment' && (
          <TenancyPaymentModal
            amount={(this.props.tenancyAccountOverview && this.props.tenancyAccountOverview.rent_due) || 0}
            tenancyPayment={this.props.tenancyPayment}
            tenancyPayments={this.props.tenancyPayments}
            user={this.props.user}
            tenants={this.props.tenancy.tenant}
            handleClose={this.props.handleTenancyPaymentsModalClose}
            handleTenancyPatmentSubmit={this.props.handleTenancyPatmentSubmit}
            handleTenancyPaymentChange={this.props.handleTenancyPaymentChange}
            handleTenancyPaymentDateChange={this.props.handleTenancyPaymentDateChange}
            handleTenancyPaymentNext={this.props.handleTenancyPaymentNext}
            handleTenancyPaymentPrevious={this.props.handleTenancyPaymentPrevious}
            getTenancyPaymentInfo={this.props.getTenancyPaymentInfo}
            deleteTenancyPayment={this.props.deleteTenancyPayment}
            clearTenancyPayment={this.props.clearTenancyPayment}
            error={this.props.error}
          />
        )}
        {this.props.modal === 'account' && (
          <TenancyAccountModal
            tenancyAccount={this.props.tenancyAccount}
            tenancyAccounts={this.props.tenancyAccounts}
            user={this.props.user}
            handleClose={this.props.handleModalClose}
            handleTenancyAccountSubmit={this.props.handleTenancyAccountSubmit}
            handleTenancyAccountChange={this.props.handleTenancyAccountChange}
            handleTenancyAccountDateChange={this.props.handleTenancyAccountDateChange}
            handleTenancyAccountNext={this.props.handleTenancyAccountNext}
            handleTenancyAccountPrevious={this.props.handleTenancyAccountPrevious}
            getTenancyAccountInfo={this.props.getTenancyAccountInfo}
            deleteTenancyAccount={this.props.deleteTenancyAccount}
            clearTenancyAccount={this.props.clearTenancyAccount}
            error={this.props.error}
          />
        )}
        {this.props.modal === 'landlord' && (
          <TenancyLandlordModal
            amount={this.props.tenancyAccountOverview.landlord_due}
            tenancyLandlord={this.props.tenancyLandlord}
            tenancyLandlords={this.props.tenancyLandlords}
            user={this.props.user}
            handleClose={this.props.handleModalClose}
            handleTenancyLandlordSubmit={this.props.handleTenancyLandlordSubmit}
            handleTenancyLandlordChange={this.props.handleTenancyLandlordChange}
            handleTenancyLandlordDateChange={this.props.handleTenancyLandlordDateChange}
            handleTenancyLandlordNext={this.props.handleTenancyLandlordNext}
            handleTenancyLandlordPrevious={this.props.handleTenancyLandlordPrevious}
            getTenancyLandlordInfo={this.props.getTenancyLandlordInfo}
            deleteTenancyLandlord={this.props.deleteTenancyLandlord}
            clearTenancyLandlord={this.props.clearTenancyLandlord}
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
  user: state.app.tenancies.user,
  users: state.common.users,
  email: state.app.tenancies.email,
  emails: state.app.tenancies.emails,
  printedDoc: state.app.tenancies.printedDoc,
  tenancy: state.app.tenancies.tenancy,
  peoples: state.app.tenancies.peoples,
  properties: state.app.tenancies.properties,
  printTemplates: state.app.tenancies.printTemplates,
  printValues: state.app.tenancies.printValues,
  documents: state.app.tenancies.documents,
  activity: state.app.tenancies.activity,
  uploadDocumentProgress: state.app.tenancies.uploadDocumentProgress,
  comment: state.app.tenancies.comment,
  error: state.app.tenancies.error,
  note: state.app.tenancies.note,
  notes: state.app.tenancies.notes,
  noteCategories: state.app.tenancies.noteCategories,
  modal: state.app.tenancies.modal,
  tenancyRents: state.app.tenancies.tenancyRents,
  tenancyRent: state.app.tenancies.tenancyRent,
  tenancyGenerateRent: state.app.tenancies.tenancyGenerateRent,
  tenancyJobs: state.app.tenancies.tenancyJobs,
  tenancyJob: state.app.tenancies.tenancyJob,
  tenancyStatements: state.app.tenancies.tenancyStatements,
  tenancyStatement: state.app.tenancies.tenancyStatement,
  tenancyStatementTemplates: state.app.tenancies.tenancyStatementTemplates,
  disbursments: state.app.tenancies.disbursments,
  disbursement: state.app.tenancies.disbursement,
  tenancyPayment: state.app.tenancies.tenancyPayment,
  tenancyPayments: state.app.tenancies.tenancyPayments,
  tenancyRentDueId: state.app.tenancies.tenancyRentDueId,
  tenancyAccounts: state.app.tenancies.tenancyAccounts,
  tenancyAccount: state.app.tenancies.tenancyAccount,
  tenancyAccountOverview: state.app.tenancies.tenancyAccountOverview,
  tenancyLandlords: state.app.tenancies.tenancyLandlords,
  tenancyLandlord: state.app.tenancies.tenancyLandlord,
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
  getTenancyJobs,
  getTenancyJobInfo,
  addTenancyJob,
  handleTenancyJobChange,
  handleTenancyJobSubmit,
  deleteTenancyJob,
  handleJobClientSelect,
  handleJobClientChange,
  jobScheludeDateChange,
  jobCompletionDateChange,
  getDisbursementInfo,
  addDisbursement,
  handleDisbursementChange,
  handleDisbursementSubmit,
  deleteDisbursement,
  disbursementDateChange,
  getTenancyRents,
  getNextRents,
  getPreviousRents,
  getNextDisbursments,
  getPreviousDisbursments,
  getNextJobs,
  getPreviousJobs,
  getTenancyRentInfo,
  addTenancyRent,
  handleTenancyRentChange,
  handleTenancyRentDateChange,
  handleTenancyRentStartDateChange,
  handleTenancyRentEndDateChange,
  handleGenerateRentSubmit,
  handleTenancyRentSubmit,
  deleteTenancyRent,
  getTenancyPayments,
  handleTenancyPatmentSubmit,
  handleTenancyPaymentChange,
  handleTenancyPaymentDateChange,
  handleTenancyPaymentNext,
  handleTenancyPaymentPrevious,
  getTenancyPaymentInfo,
  deleteTenancyPayment,
  clearTenancyPayment,
  confirmTenancyRent,
  handleAccountClick,
  getTenancyAccountOverview,
  handleTenancyAccountNext,
  handleTenancyAccountPrevious,
  getTenancyAccountInfo,
  handleTenancyAccountChange,
  handleTenancyAccountDateChange,
  handleTenancyAccountSubmit,
  clearTenancyAccount,
  deleteTenancyAccount,
  handleTenancyStatementNext,
  handleTenancyStatementPrevious,
  getTenancyStatementInfo,
  handleTenancyStatementChange,
  handleTenancyStatementStartDateChange,
  handleTenancyStatementEndtDateChange,
  handleTenancyStatementSubmit,
  deleteTenancyStatement,
  getTenancyStatementTemplate,
  handleTemplateDownload,
  getTenancyLandlords,
  handleTenancyLandlordChange,
  handleTenancyLandlordDateChange,
  handleTenancyLandlordSubmit,
  handleTenancyLandlordNext,
  handleTenancyLandlordPrevious,
  clearTenancyLandlord,
  getTenancyLandlordInfo,
  deleteTenancyLandlord,
  quickCreateContact,
  quickCreateProperty,
  addNewContact,
  addNewProperty,
  handleEmailCreate,
  handleEmailChange,
  handleAttachmentRemove,
  handleTemplateChange,
  setDocument,
  handleTenancyPaymentsModalClose,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TenancyInfo);
