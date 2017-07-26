import React from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import moment from 'moment';

class TenancyLandlord extends React.Component {
  handleClick = (event) => {
    event.stopPropagation();
    this.props.getTenancyLandlordInfo(this.props.landlord.id);
  }
  handleDeleteClick = (event) => {
    event.stopPropagation();
    this.props.deleteTenancyLandlord(this.props.landlord.id);
  }
  render() {
    const { landlord, index, user } = this.props;
    return (
      <Row onClick={this.handleClick} className={`tenancyJob${index % 2 === 0 ? ' odd' : ' even'}`}>
        <Col sm={2}>{`${user.currency} ${landlord.amount}`}</Col>
        <Col sm={2}>{moment(landlord.date_received).format(user.dateDisplayFormat)}</Col>
        <Col sm={6}>{landlord.description}</Col>
        <Col sm={1}>
          <Glyphicon glyph="pencil" onClick={this.handleClick} title="edit" />
        </Col>
        <Col sm={1}>
          <Glyphicon glyph="remove-circle" onClick={this.handleDeleteClick} />
        </Col>
      </Row>
    );
  }
}

TenancyLandlord.propTypes = {
  landlord: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired,
  getTenancyLandlordInfo: React.PropTypes.func.isRequired,
  deleteTenancyLandlord: React.PropTypes.func.isRequired,
};

export default TenancyLandlord;
