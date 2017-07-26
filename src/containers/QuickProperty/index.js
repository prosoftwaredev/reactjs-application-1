import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import QuickProperty from 'components/Common/QuickProperty';

const mapStateToProps = state => ({
  categories: state.app.properties.categories,
  types: state.app.properties.types,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(QuickProperty);
