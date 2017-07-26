import React from 'react';
import OptionsStandartComponent from 'components/App/System/Options/Standart';
import AppointmentModal from 'components/App/System/Options/Standart/AppointmentModal';
import { fetch, createPost, updatePost, deletePost } from 'redux/modules/app/system/options/appointments/requests';


class Appointments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      items: [],
      titles: {
        breadcrumb: 'Appointment Type List',
        add: 'Add Appointment Type',
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
        })
        .catch(error => console.log(error));
    } else {
      createPost(this.state.item)
        .then((response) => {
          const item = response.data;
          const items = [...this.state.items];
          items.push(item);
          this.setState({ modal: false, item: {}, items });
        })
        .catch(error => console.log(error));
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
      })
      .catch(error => console.log(error));
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
          <AppointmentModal
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

export default Appointments;
