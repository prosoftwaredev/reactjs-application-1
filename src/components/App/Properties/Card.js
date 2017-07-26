import React, { PropTypes } from 'react';
import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd';
import { Glyphicon } from 'react-bootstrap';

const img = require('img/loading.gif');

const style = {
  // border: '1px dashed gray',
  padding: '0.5rem 0.5rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
};

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      originalIndex: props.findCard(props.id).index
    };
  },

  endDrag(props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop();

    if (!didDrop) {
      props.moveCard(droppedId, originalIndex);
    }
  }
};

const cardTarget = {
  canDrop() {
    return false;
  },

  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;

    if (draggedId !== overId) {
      const { index: overIndex } = props.findCard(overId);
      // console.log('cardTarget');
      // console.log(overIndex);
      props.moveCard(draggedId, overIndex);
    }
  }
};

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: this.props.asset.thumbnail,
      count: 0,
    };
  }
  handleImageError = () => {
    this.setState({ img });
    if (this.state && this.state.count < 10) {
      const timeout = setTimeout(() => this.setState({ img: this.props.asset.thumbnail, count: this.state.count + 1, }), 2000 * (this.state.count + 1));
      this.setState({ timeout });
    } else {
      clearTimeout(this.state.timeout);
      this.setState({ timeout: null, img: require('img/404.jpg') });
    }
  }

  handleDelete = () => {
    this.props.onDelete(this.props.asset.id);
  }
  render() {
    const { isDragging, connectDragSource, connectDropTarget, asset } = this.props;
    const opacity = isDragging ? 0 : 1;
    console.log(opacity);
    return connectDragSource(connectDropTarget(
      <div style={{ ...style, opacity }}>
        <Glyphicon glyph="remove" onClick={this.handleDelete} />
        <img src={this.state && this.state.img} alt={asset.id} onError={this.handleImageError} />
      </div>
    ));
  }
}

Card.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.any.isRequired,
  asset: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

// const CardDnD = DropTarget('card', cardTarget, connect => ({
//   connectDropTarget: connect.dropTarget()
// }))(Card);

const CardDnD = dragSource('card', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Card);

export default dropTarget('card', cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(CardDnD);
