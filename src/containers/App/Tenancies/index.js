import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getTenancies,
  deleteTenancy,
  toggleSearch,
  clearError,
  handleSearchReset,
  handleSearchChange,
  handleSearchSubmit,
 } from 'redux/modules/app/tenancies';
import TenanciesComponent from 'components/App/Tenancies';
import ConfirmDelete from 'components/Common/modals/ConfirmDelete';

class Tenancies extends React.Component {
  state = {
    deleteModal: false,
  }
  componentDidMount() {
    this.props.getTenancies();
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
    this.props.deleteTenancy(this.state.itemToDelete);
  }
  toggleDeleteModal = () => this.setState({ deleteModal: false, itemToDelete: null })
  render() {
    return (
      <section>
        <TenanciesComponent {...this.props} deleteTenancy={this.requestDelete} />
        <ConfirmDelete shown={this.state.deleteModal} handleDelete={this.handleDelete} handleClose={this.toggleDeleteModal} />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  tenancies: state.app.tenancies.tenancies,
  pagination: state.app.tenancies.pagination,
  searchPanel: state.app.tenancies.searchPanel,
  searchValues: state.app.tenancies.searchValues,
  user: state.common.user,
  error: state.app.tenancies.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getTenancies,
  deleteTenancy,
  toggleSearch,
  clearError,
  handleSearchReset,
  handleSearchChange,
  handleSearchSubmit,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Tenancies);
