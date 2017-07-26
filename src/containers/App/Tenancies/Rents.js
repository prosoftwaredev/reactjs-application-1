import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RentsComponent from 'components/App/Tenancies/Rents';
import TenancyRentModal from 'components/App/Tenancies/modals/TenancyRentModal';
import TenancyPaymentModal from 'components/App/Tenancies/modals/TenancyPaymentModal';
import {
  handleTenancyRentChange,
  handleTenancyRentSubmit,
  handleTenancyRentDateChange,
  getTenancyRentInfo,
  getTenancyPayments,
  deleteTenancyRent,
  handleClose,
  handleTenancyPatmentSubmit,
  handleTenancyPaymentChange,
  handleTenancyPaymentDateChange,
  handleTenancyPaymentNext,
  handleTenancyPaymentPrevious,
  getTenancyPaymentInfo,
  deleteTenancyPayment,
  clearTenancyPayment,
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
  setSelectedRent,
  handleRentPaymentsModalClose,
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
        <RentsComponent {...this.props} />
        {this.props.modal === 'rent' ? (
          <TenancyRentModal
            tenancyRent={this.props.rent}
            user={this.props.user}
            handleTenancyRentChange={this.props.handleTenancyRentChange}
            handleTenancyRentSubmit={this.props.handleTenancyRentSubmit}
            handleTenancyRentDateChange={this.props.handleTenancyRentDateChange}
            handleClose={this.props.handleClose}
          />
        ) : null}
        {this.props.modal === 'payment' ? (
          <TenancyPaymentModal
            amount={(this.props.tenancyAccountOverview && this.props.tenancyAccountOverview.rent_due) || 0}
            tenancyPayment={this.props.tenancyPayment}
            tenancyPayments={this.props.tenancyPayments}
            user={this.props.user}
            tenants={this.props.tenants}
            handleClose={this.props.handleRentPaymentsModalClose}
            handleTenancyPatmentSubmit={this.props.handleTenancyPatmentSubmit}
            handleTenancyPaymentChange={this.props.handleTenancyPaymentChange}
            handleTenancyPaymentDateChange={this.props.handleTenancyPaymentDateChange}
            handleTenancyPaymentNext={this.props.handleTenancyPaymentNext}
            handleTenancyPaymentPrevious={this.props.handleTenancyPaymentPrevious}
            getTenancyPaymentInfo={this.props.getTenancyPaymentInfo}
            deleteTenancyPayment={this.props.deleteTenancyPayment}
            clearTenancyPayment={this.props.clearTenancyPayment}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rents: state.app.tenancies.tenancyRents,
  tenants: state.app.tenancies.tenants,
  rent: state.app.tenancies.tenancyRent,
  tenancyAccountOverview: state.app.tenancies.tenancyAccountOverview,
  tenancyPayment: state.app.tenancies.tenancyPayment,
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
  setSelectedRent,
  handleRentPaymentsModalClose,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Rents);
