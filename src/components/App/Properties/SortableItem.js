import React from 'react';
import { sortable } from 'react-sortable';
import { Glyphicon } from 'react-bootstrap';

const GridItem = props => (
  <div {...props} className="grid-item">{props.children}</div>
);

const SortableListItem = sortable(GridItem);

const img = require('img/loading.gif');


class SortableItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: this.props.item.thumbnail,
      count: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ img: nextProps.item.thumbnail });
  }

  handleImageError = () => {
    this.setState({ img });
    if (this.state && this.state.count < 10) {
      const timeout = setTimeout(() => this.setState({ img: this.props.item.thumbnail, count: this.state.count + 1, }), 2000 * (this.state.count + 1));
      this.setState({ timeout });
    } else {
      clearTimeout(this.state.timeout);
      this.setState({ timeout: null, img: require('img/404.jpg') });
    }
  }
  handleDelete = () => {
    this.props.setDeletedAsset(this.props.item.id);
  }

  render() {
    const {
      index,
      items,
      item,
      updateState,
      draggingIndex,
      childProps,
    } = this.props;
    return (
      <SortableListItem
        updateState={updateState}
        items={items}
        draggingIndex={draggingIndex}
        sortId={index}
        outline="grid"
        childProps={childProps}
        >
        <Glyphicon glyph="remove" onClick={this.handleDelete} />
        <img src={this.state && this.state.img} alt={item.id} onError={this.handleImageError} />
      </SortableListItem>
    );
  }
}

SortableItem.propTypes = {
  index: React.PropTypes.number.isRequired,
  items: React.PropTypes.array.isRequired,
  item: React.PropTypes.object.isRequired,
  updateState: React.PropTypes.func.isRequired,
  setDeletedAsset: React.PropTypes.func.isRequired,
  draggingIndex: React.PropTypes.any,
  childProps: React.PropTypes.object.isRequired,
};

export default SortableItem;
