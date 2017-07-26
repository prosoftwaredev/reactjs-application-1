import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import SupportComponent from 'components/Support';
import { changeValues, sendSupport, clearError } from 'redux/modules/support';

class Support extends React.Component {
  componentWillReceiveProps(props) {
    if (props.error && props.error.callback) {
      props.error.callback();
      this.props.dispatch(clearError());
    }
  }
  handleChange = (e) => {
    const values = { ...this.props.values} || {};
    values[e.target.name] = e.target.value;
    this.props.dispatch(changeValues(values));
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(sendSupport(this.props.values));
  }
  render() {
    return (
      <SupportComponent
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        values={this.props.values}
        error={this.props.error}
      />
    );
  }
}


const mapStateToProps = state => ({
  values: state.support.values || {},
  error: state.support.error,
});

// const mapDispatchToProps = dispatch => bindActionCreators({
//   setProperties,
//   setDetailedProperty,
//   setDeletedPropery,
//   setPropertiesSearch,
//   setPropertyPagination,
//   dispatch,
// }, dispatch);

export default connect(mapStateToProps)(Support);
