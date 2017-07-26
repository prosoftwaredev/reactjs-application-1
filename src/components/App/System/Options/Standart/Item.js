import React from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';

class Item extends React.Component {
  handleEdit = () => {
    this.props.editItem(this.props.item.id);
  }
  handleDelete = () => {
    this.props.deleteItem(this.props.item.id);
  }
  render() {
    const {item} = this.props;
    const style = (item.colour_background && { background: item.colour_background, color: item.colour_font }) || {};
    return (
      <Row
        className="table-row"
        style={style}
      >
        <Col xs={11}>
          {item.name}
        </Col>
        <Col xs={1} className="flex">
          <Glyphicon glyph="pencil" onClick={this.handleEdit} />
          <Glyphicon glyph="remove-circle" onClick={this.handleDelete} />
        </Col>
      </Row>
    );
  }
}

Item.propTypes = {
  item: React.PropTypes.object.isRequired,
  editItem: React.PropTypes.func.isRequired,
  deleteItem: React.PropTypes.func.isRequired,

};

export default Item;
