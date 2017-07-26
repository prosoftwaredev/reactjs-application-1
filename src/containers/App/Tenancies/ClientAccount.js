import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTenancyClient, getTenancyClientOverview, exportManagementFees, exportVats } from 'redux/modules/app/tenancies';
import ClientAccountComponent from 'components/App/Tenancies/ClientAccount';

const mapStateToProps = state => ({
  user: state.common.user,
  clientAccounts: state.app.tenancies.clientAccounts,
  overview: state.app.tenancies.clientAccountsOverview,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getTenancyClient,
  getTenancyClientOverview,
  exportManagementFees,
  exportVats,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClientAccountComponent);
