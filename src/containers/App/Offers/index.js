import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getOffers,
  deleteOffer,
  toggleSearch,
  clearError,
  handleSearchReset,
  handleSearchChange,
  handleSearchSubmit,
} from 'redux/modules/app/offers';
import OffersComponent from 'components/App/Offers';
import ConfirmDelete from 'components/Common/modals/ConfirmDelete';

class Offers extends React.Component {
  state = {
    deleteModal: false,
  }
  componentDidMount() {
    this.props.getOffers();
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
    this.props.deleteOffer(this.state.itemToDelete);
  }
  toggleDeleteModal = () => this.setState({ deleteModal: false, itemToDelete: null })
  render() {
    return (
      <section>
        <OffersComponent {...this.props} deleteOffer={this.requestDelete} />
        <ConfirmDelete shown={this.state.deleteModal} handleDelete={this.handleDelete} handleClose={this.toggleDeleteModal} />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  offers: state.app.offers.offers,
  pagination: state.app.offers.pagination,
  searchPanel: state.app.offers.searchPanel,
  searchValues: state.app.offers.searchValues,
  user: state.common.user,
  error: state.app.offers.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getOffers,
  deleteOffer,
  toggleSearch,
  clearError,
  handleSearchReset,
  handleSearchChange,
  handleSearchSubmit,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Offers);
