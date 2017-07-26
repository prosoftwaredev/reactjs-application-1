import React from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import moment from 'moment';
import { toCurrency } from 'common/utils';

class TenancyRent extends React.Component {
  handleDeleteClick = (event) => {
    event.stopPropagation();
    this.props.deleteTenancyRent(this.props.rent.id);
  }
  handleClick = (event) => {
    event.stopPropagation();
    this.props.getTenancyRentInfo(this.props.rent.id);
  }
  render() {
    const { user, rent, dateDisplayFormat, index } = this.props;
    return (
      <Row onClick={this.handleClick} className={`table-row rent${index % 2 === 0 ? ' odd' : ' even'}${rent.confirm ? ' active' : ''}${rent.overdue ? ' overdue' : ''}`}>
        <Col sm={2}>{moment(rent.due_date).format(dateDisplayFormat)}</Col>
        <Col sm={2}>
          <p><b>{user.currency}{rent.rent_amount}</b></p>
          <p>Fee: {rent.fee_type === 2 ? user.currency : '%'}{rent.fee || 0}</p>
        </Col>
        <Col sm={2}>{rent.rent_amount - rent.fee_type === 2 ? toCurrency(rent.fee, user.currency) : toCurrency((rent.rent_amount / 100) * (rent.fee || 100), user.currency)}</Col>
        <Col sm={1} smOffset={5} className="flex">
          <Glyphicon glyph="pencil" onClick={this.handleClick} title="edit" />
          <Glyphicon glyph="remove-circle" onClick={this.handleDeleteClick} title="remove" />
        </Col>
      </Row>
    );
  }
}

TenancyRent.propTypes = {
  rent: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired,
  dateDisplayFormat: React.PropTypes.string.isRequired,
  getTenancyRentInfo: React.PropTypes.func.isRequired,
  deleteTenancyRent: React.PropTypes.func.isRequired,
};

export default TenancyRent;
