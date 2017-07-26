import React from 'react';
import OptionsStandartComponent from 'components/App/System/Options/Standart';
import SourceModal from 'components/App/System/Options/Standart/SourceModal';
import { fetch, createPost, updatePost, deletePost } from 'redux/modules/app/system/options/sources/requests';
import { toastr } from 'react-redux-toastr';


class Sources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      items: [],
      titles: {
        breadcrumb: 'Client Source List',
        add: 'Add Client Source',
      },
      modal: false,
    };
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
    console.log(this.state.item);
    if (this.state.item.id) {
      updatePost(this.state.item)
        .then((response) => {
          const item = response.data;
          const items = [...this.state.items].map((arrayItem) => {
            return arrayItem.id === item.id ? item : arrayItem;
          });
          this.setState({ modal: false, item: {}, items });
          toastr.success('Update Source Success', 'Source updated');
        })
        .catch(error => toastr.error('Update Source Error', error.message));
    } else {
      createPost(this.state.item)
        .then((response) => {
          const item = response.data;
          const items = [...this.state.items];
          items.push(item);
          this.setState({ modal: false, item: {}, items });
          toastr.success('Create Source Success', 'Source created');
        })
        .catch(error => toastr.error('Create Source Error', error.message));
    }
  }

  handleEditItem = (id) => {
    const item = this.state.items.find(arrayItem => arrayItem.id === id);
    this.setState({ item, modal: true });
  }

  handleDeleteItem = (id) => {
    deletePost(id)
      .then((response) => {
        const items = [...this.state.items].filter(arrayItem => arrayItem.id !== parseInt(response.id, 10));
        this.setState({ modal: false, item: {}, items });
        toastr.info('Delete Source Success', 'Source deleted');
      })
      .catch(error => toastr.error('Delete Source Error', error.message));
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
          <SourceModal
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

export default Sources;
