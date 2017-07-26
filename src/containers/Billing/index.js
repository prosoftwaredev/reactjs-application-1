import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BillingComponent from 'components/Billing/';
import {
  getCurrentSubscription,
  getInvoices,
  showCancelModal,
  showCardModal,
  closeModal,
  togleCheckbox,
  cancelSubscription,
  changeCardForm,
  submitCardForm,
  handleInvoiceClick,
} from 'redux/modules/billing/';

class Billing extends React.Component {
  componentDidMount() {
    this.props.getCurrentSubscription();
    this.props.getInvoices();
  }
  render() {
    return (
      <BillingComponent {...this.props} />
    );
  }
}

const mapStateToProps = state => ({
  subscription: state.billing.subscription,
  invoices: state.billing.invoices,
  user: state.billing.user,
  modal: state.billing.modal,
  approve: state.billing.approve,
  partial: state.billing.partial,
  error: state.billing.error,
  cardError: state.billing.cardError,
  card: state.billing.card,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getCurrentSubscription,
  getInvoices,
  showCancelModal,
  showCardModal,
  closeModal,
  togleCheckbox,
  cancelSubscription,
  changeCardForm,
  submitCardForm,
  handleInvoiceClick,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Billing);
