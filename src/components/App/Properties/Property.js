import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import juvo from 'juvo';

class Property extends React.Component {
  handleClick = (e) => {
    e.stopPropagation();
    browserHistory.push(juvo.properties.infoLink(this.props.property.id));
  }
  handleDelete = (e) => {
    e.stopPropagation();
    this.props.onDelete(this.props.property.id);
  }
  render() {
    const { user, property, types } = this.props;
    return (
      <Row className="contact-row" onClick={this.handleClick}>
        <Col xs={4} sm={2} className="flex start">
          <i className={`fa fa-circle-o ${property.marketed ? 'green' : 'red'}`} />
          {property.first_image || (<img src={property.thumbnail} alt="error" />)}
        </Col>
        <Col xs={8} sm={3}>
          <span>{property.advertise_address}</span>
        </Col>
        <Col xs={4} sm={3}>
          {types[property.type_id] ? types[property.type_id].name : ''}
        </Col>
        <Col xs={4} sm={2}>
          {(user && user.currency) || '$'}{property.price}
        </Col>
        <Col xs={12} sm={2} className="flex end">
          <Button bsStyle="primary" onClick={this.handleClick}>Edit</Button>
          <Button bsStyle="danger" onClick={this.handleDelete}>Delete</Button>
        </Col>
      </Row>
    );
  }
}

Property.propTypes = {
  user: React.PropTypes.object,
  types: React.PropTypes.object,
  property: React.PropTypes.object,
  onDelete: React.PropTypes.func,
};

export default Property;
