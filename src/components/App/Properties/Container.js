import React from 'react';
import update from 'react/lib/update';
import { DropTarget as dropTarget, DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { deleteAsset } from 'redux/modules/app/properties/requests';
import Card from './Card';

const cardTarget = {
  drop() {
  }
};

class Container extends React.Component {
  componentWillReceiveProps(nextProps) {
    this.setState({ assets: nextProps.assets });
    console.log('componentWillReceiveProps');
  }
  deleteCard = (id) => {
    deleteAsset(id).catch(error => console.log(error));
    this.props.onDeleteAsset(id);
  }

  moveCard = (id, atIndex) => {
    const { card, index } = this.findCard(id);
    // const props = update(this.props, {
    //   assets: {
    //     $splice: [
    //       [index, 1],
    //       [atIndex, 0, card],
    //     ]
    //   }
    // });
    this.setState(update(this.state, {
      assets: {
        $splice: [
          [index, 1],
          [atIndex, 0, card],
        ]
      }
    }));
    console.log('card moved');
    // console.log(props.assets);
    // this.props.onDrop(props.assets);
  }

  findCard = (id) => {
    // const assets = [...this.props.assets];
    const {assets} = this.state;
    // console.log(id);
    // console.log(assets);
    const card = assets[id];
    // const card = assets.find(asset => asset.id === id);
    // const card = assets.filter(asset => asset.id === id)[0];
    // console.log(card);
    console.log(id);
    console.log(assets.indexOf(card));
    return {
      card,
      index: assets.indexOf(card),
    };
  }

  render() {
    // const { assets } = this.props || [];
    const assets = (this.state && [...this.state.assets]) || [];
    return (
      <div>
        {assets.map((asset, index) => (
          <Card
            key={asset.id}
            id={index}
            moveCard={this.moveCard}
            findCard={this.findCard}
            asset={asset}
            onDelete={this.deleteCard}
            />
        ))}
      </div>
    );
  }
}

Container.propTypes = {
  // assets: React.PropTypes.array,
  // onDrop: React.PropTypes.func.isRequired,
  onDeleteAsset: React.PropTypes.func.isRequired,
};

const ContainerDnD = dropTarget('card', cardTarget, connectDnD => ({
  connectDropTarget: connectDnD.dropTarget()
}))(Container);

export default (dragDropContext(HTML5Backend)(ContainerDnD));
