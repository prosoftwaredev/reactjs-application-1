import React from 'react';
import SortableItem from './SortableItem';

class SortableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draggingIndex: null,
      items: this.props.assets,
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ items: nextProps.assets });
  }
  updateState = (obj) => {
    console.log(obj);
    this.setState(obj);
    if (obj.draggingIndex === null) {
      this.props.setAssetsOrder(this.state.items);
    }
  }
  render() {
    const childProps = {
      className: 'asset',
      style: {
        // border: '1px dashed gray',
        padding: '0.5rem 0.5rem',
        marginBottom: '.5rem',
        backgroundColor: 'white',
        cursor: 'move'
      },
    };
    return (
      <div>
        {this.state.items && this.state.items.map((item, index) => (
          <SortableItem
            key={index}
            index={index}
            items={this.state.items}
            item={item}
            updateState={this.updateState}
            draggingIndex={this.state.draggingIndex}
            childProps={childProps}
            setDeletedAsset={this.props.setDeletedAsset}
            />
        ))}
      </div>
    );
  }
}

SortableList.propTypes = {
  assets: React.PropTypes.array.isRequired,
  // setAssetsOrder: React.PropTypes.func.isRequired,
  setDeletedAsset: React.PropTypes.func.isRequired,
};

export default SortableList;
