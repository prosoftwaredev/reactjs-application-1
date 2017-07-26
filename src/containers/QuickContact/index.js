import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import QuickContact from 'components/Common/QuickContact';

const mapStateToProps = state => ({
  categories: state.app.contacts.categories,
  countryCodes: state.app.contacts.countryCodes,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(QuickContact);
