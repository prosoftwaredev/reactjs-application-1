import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropertiesComponent from 'components/App/Properties';
import ConfirmDelete from 'components/Common/modals/ConfirmDelete';

import {
  fetchProperties,
  setProperties,
  setDetailedProperty,
  setDeletedPropery,
  setPropertiesSearch,
  handleSearchSubmit,
  handleSearchReset,
  setPropertyPagination,
  toggleSearch,
  clearError,
} from 'redux/modules/app/properties';

class Properties extends React.Component {
  state = {
    deleteModal: false,
  }
  componentWillReceiveProps(props) {
    if (props.propertyError && props.propertyError.callback) {
      props.propertyError.callback();
      this.props.clearError();
      this.toggleDeleteModal();
    }
  }
  requestDelete = id => this.setState({ propertyToDelete: id, deleteModal: true })
  handleDelete = () => {
    this.props.setDeletedPropery(this.state.propertyToDelete);
  }
  toggleDeleteModal = () => this.setState({ deleteModal: false, propertyToDelete: null })
  render() {
    return (
      <section>
        <PropertiesComponent
          {...this.props}
          handleSearchSubmit={this.props.handleSearchSubmit}
          handleSearchChange={this.props.setPropertiesSearch}
          load={this.props.fetchProperties}
          setDetailedProperty={this.props.setDetailedProperty}
          handleDelete={this.requestDelete}
        />
        <ConfirmDelete shown={this.state.deleteModal} handleDelete={this.handleDelete} handleClose={this.toggleDeleteModal} />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  properties: state.app.properties.list,
  loading: state.app.properties.loading,
  error: state.app.properties.error,
  propertyError: state.app.properties.propertyError,
  pagination: state.app.properties.pagination,
  types: state.app.properties.types,
  propertyTypes: state.app.properties.propertyTypes,
  prices: state.app.properties.prices,
  statuses: state.app.properties.statuses,
  categories: state.app.properties.categories,
  searchValues: state.app.properties.searchValues,
  searchPanel: state.app.properties.searchPanel,
  user: state.app.properties.user,
  priceMin: state.app.properties.priceMin,
  priceMax: state.app.properties.priceMax,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchProperties,
  setProperties,
  setDetailedProperty,
  setDeletedPropery,
  setPropertiesSearch,
  handleSearchSubmit,
  handleSearchReset,
  setPropertyPagination,
  toggleSearch,
  clearError,
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Properties);
