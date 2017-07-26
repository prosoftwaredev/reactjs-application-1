import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LandlordsComponent from 'components/App/Tenancies/Landlords';
import TenancyLandlordInfo from 'components/App/Tenancies/Landlords/TenancyLandlordInfo';
import TenancyStatementModal from 'components/App/Tenancies/modals/TenancyStatementModal';
import TenancyLandlordModal from 'components/App/Tenancies/modals/TenancyLandlordModal';
import {
  handleTenancyRentChange,
  handleTenancyRentSubmit,
  handleTenancyRentDateChange,
  getTenancyRentInfo,
  getTenancyPayments,
  deleteTenancyRent,
  confirmTenancyRent,
  handleClose,
  handleTenancyPatmentSubmit,
  handleTenancyPaymentChange,
  handleTenancyPaymentDateChange,
  handleTenancyPaymentNext,
  handleTenancyPaymentPrevious,
  getTenancyPaymentInfo,
  deleteTenancyPayment,
  clearTenancyPayment,
  getTenancyLandlordsStandalone,
  handleTenancyLandlordChange,
  handleTenancyLandlordDateChange,
  handleTenancyLandlordSubmit,
  handleTenancyLandlordNext,
  handleTenancyLandlordPrevious,
  clearTenancyLandlord,
  getTenancyLandlordInfo,
  deleteTenancyLandlord,
  handleModalClose,
  clearError,
  handleTenancyStatementSubmit,
  handleTenancyStatementChange,
  handleTenancyStatementStartDateChange,
  handleTenancyStatementEndtDateChange,
  deleteTenancyStatement,
  handleTemplateDownload,
  handleTenancyStatementNext,
  handleTenancyStatementPrevious,
  getTenancyStatements,
  getTenancyStatementTemplate,
  setSelectedRent,
} from 'redux/modules/app/tenancies';

class Rents extends React.Component {
  componentWillReceiveProps(props) {
    if (props.error && props.error.callback) {
      props.error.callback();
      this.props.clearError();
    }
  }
  render() {
    return (
      <div>
        <LandlordsComponent {...this.props} />
        {this.props.modal === 'landlordInfo' ? (
          <TenancyLandlordInfo
            tenancyRent={this.props.rent}
            user={this.props.user}
            handleTenancyRentChange={this.props.handleTenancyRentChange}
            handleTenancyRentSubmit={this.props.handleTenancyRentSubmit}
            handleTenancyRentDateChange={this.props.handleTenancyRentDateChange}
            handleClose={this.props.handleClose}
          />
        ) : null}
        {this.props.modal === 'landlord' ? (
          <TenancyLandlordModal
            amount={this.props.tenancyAccountOverview ? this.props.tenancyAccountOverview.landlord_due : 0}
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
          />
        ) : null}
        {this.props.modal === 'statement' ? (
          <TenancyStatementModal
            user={this.props.user}
            tenancyStatement={this.props.tenancyStatement}
            tenants={this.props.tenants}
            tenancyStatementTemplates={this.props.tenancyStatementTemplates}
            tenancyStatements={this.props.tenancyStatements}
            handleClose={this.props.handleModalClose}
            handleTenancyStatementSubmit={this.props.handleTenancyStatementSubmit}
            handleTenancyStatementChange={this.props.handleTenancyStatementChange}
            handleTenancyStatementStartDateChange={this.props.handleTenancyStatementStartDateChange}
            handleTenancyStatementEndtDateChange={this.props.handleTenancyStatementEndtDateChange}
            deleteTenancyStatement={this.props.deleteTenancyStatement}
            handleTemplateDownload={this.props.handleTemplateDownload}
            handleTenancyStatementNext={this.props.handleTenancyStatementNext}
            handleTenancyStatementPrevious={this.props.handleTenancyStatementPrevious}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rents: state.app.tenancies.landlordsDue,
  tenants: state.app.tenancies.tenants,
  rent: state.app.tenancies.tenancyRent,
  tenancyPayment: state.app.tenancies.tenancyPayment,
  tenancyAccountOverview: state.app.tenancies.tenancyAccountOverview,
  tenancyPayments: state.app.tenancies.tenancyPayments,
  tenancyStatement: state.app.tenancies.tenancyStatement,
  tenancyStatements: state.app.tenancies.tenancyStatements,
  tenancyStatementTemplates: state.app.tenancies.tenancyStatementTemplates,
  tenancyLandlords: state.app.tenancies.tenancyLandlords,
  tenancyLandlord: state.app.tenancies.tenancyLandlord,
  user: state.app.tenancies.user,
  modal: state.app.tenancies.modal,
  error: state.app.tenancies.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getTenancyRentInfo,
  deleteTenancyRent,
  handleTenancyRentChange,
  handleTenancyRentSubmit,
  handleTenancyRentDateChange,
  getTenancyPayments,
  confirmTenancyRent,
  handleClose,
  clearError,
  handleTenancyPatmentSubmit,
  handleTenancyPaymentChange,
  handleTenancyPaymentDateChange,
  handleTenancyPaymentNext,
  handleTenancyPaymentPrevious,
  getTenancyPaymentInfo,
  deleteTenancyPayment,
  clearTenancyPayment,
  getTenancyLandlordsStandalone,
  handleTenancyLandlordChange,
  handleTenancyLandlordDateChange,
  handleTenancyLandlordSubmit,
  handleTenancyLandlordNext,
  handleTenancyLandlordPrevious,
  clearTenancyLandlord,
  getTenancyLandlordInfo,
  deleteTenancyLandlord,
  handleModalClose,
  handleTenancyStatementSubmit,
  handleTenancyStatementChange,
  handleTenancyStatementStartDateChange,
  handleTenancyStatementEndtDateChange,
  deleteTenancyStatement,
  handleTemplateDownload,
  handleTenancyStatementNext,
  handleTenancyStatementPrevious,
  getTenancyStatements,
  getTenancyStatementTemplate,
  setSelectedRent,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Rents);
