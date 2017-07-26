import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Statements from 'components/App/Tenancies/Landlords/Statements';
import {
  deleteTenancyStatement,
  handleTemplateDownload,
  setDocument,
  handleTenancyStatementNext,
  handleTenancyStatementPrevious,
  handleModalClose,
  handleEmailCreate,
  handleEmailChange,
  handleAttachmentRemove,
  handleTemplateChange,
  handleTenancyStatementSubmit,
  handleTenancyStatementChange,
  handleTenancyStatementStartDateChange,
  handleTenancyStatementEndtDateChange,
} from 'redux/modules/app/tenancies';
import { momentFormats } from 'common/utils';
import Emails from 'components/Common/modals/Emails';

class LandlordStatements extends React.Component {
  componentWillReceiveProps(nextState) {
    if (nextState.error && nextState.error.callback) {
      nextState.error.callback();
      this.props.clearError();
    }
  }
  render() {
    return (
      <div>
        <Statements
          {...this.props}
          dateDisplayFormat={(this.props.user && this.props.user.dateDisplayFormat) || momentFormats['d/m/Y']}
        />
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
  tenancy: state.app.tenancies.tenancy,
  tenancyStatement: state.app.tenancies.tenancyStatement,
  tenancyStatementTemplates: state.app.tenancies.tenancyStatementTemplates,
  tenancyStatements: state.app.tenancies.tenancyStatements,
  user: state.app.tenancies.user,
  error: state.app.tenancies.error,
  modal: state.app.tenancies.modal,
  email: state.app.tenancies.email,
  emails: state.app.tenancies.emails,
  printedDoc: state.app.tenancies.printedDoc,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteTenancyStatement,
  handleTemplateDownload,
  setDocument,
  handleTenancyStatementNext,
  handleTenancyStatementPrevious,
  handleModalClose,
  handleEmailCreate,
  handleEmailChange,
  handleAttachmentRemove,
  handleTemplateChange,
  handleTenancyStatementSubmit,
  handleTenancyStatementChange,
  handleTenancyStatementStartDateChange,
  handleTenancyStatementEndtDateChange,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LandlordStatements);
