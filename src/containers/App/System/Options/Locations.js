import React from 'react';
import OptionsStandartComponent from 'components/App/System/Options/Standart';
import LocationModal from 'components/App/System/Options/Standart/LocationModal';
import { fetch, createPost, updatePost, deletePost } from 'redux/modules/app/system/options/locations/requests';
import { toastr } from 'react-redux-toastr';


class Locations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      items: [],
      titles: {
        breadcrumb: 'Contact & Property Locations',
        add: 'Add Location',
      },
      modal: false,
    };
    console.log('Appointments');
  }
  componentDidMount() {
    fetch().then(response => this.setState({ items: response.data }));
  }

  handleCreateClick = () => {
    this.setState({ item: {}, modal: true });
  }

  handleChangeItem = (event) => {
    const item = { ...this.state.item } || {};
    item[event.target.name] = event.target.value;
    this.setState({ item });
  }

  handleSubmitItem = (event) => {
    event.preventDefault();
    if (this.state.item.id) {
      updatePost(this.state.item)
        .then((response) => {
          const item = response.data;
          const items = [...this.state.items].map((arrayItem) => {
            return arrayItem.id === item.id ? item : arrayItem;
          });
          this.setState({ modal: false, item: {}, items });
          toastr.success('Update Location Success', 'Location updated');
        })
        .catch(error => toastr.error('Update Location Error', error.message));
    } else {
      createPost(this.state.item)
        .then((response) => {
          const item = response.data;
          const items = [...this.state.items];
          items.push(item);
          this.setState({ modal: false, item: {}, items });
          toastr.success('Create Location Success', 'Location created');
        })
        .catch(error => toastr.error('Create Location Error', error.message));
    }
  }

  handleEditItem = (id) => {
    const item = this.state.items.find(arrayItem => arrayItem.id === id);
    this.setState({ item, modal: true });
  }

  handleDeleteItem = (id) => {
    deletePost(id)
      .then((response) => {
        const items = [...this.state.items].filter(item => item.id !== parseInt(response.id, 10));
        this.setState({ modal: false, appointment: {}, items });
        toastr.info('Delete Location Success', 'Location deleted');
      })
        .catch(error => toastr.error('Delete Location Error', error.message));
  }

  closeModal = () => {
    this.setState({ modal: false, item: {} });
  }
  render() {
    return (
      <div>
        <OptionsStandartComponent
          titles={this.state.titles}
          items={this.state.items}
          createItem={this.handleCreateClick}
          deleteItem={this.handleDeleteItem}
          editItem={this.handleEditItem}
          />
        {this.state.modal && (
          <LocationModal
            item={this.state.item}
            changeItem={this.handleChangeItem}
            submitItem={this.handleSubmitItem}
            closeModal={this.closeModal}
            />
        )}
      </div>

    );
  }
}

export default Locations;
