import React from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router';
import juvo from 'juvo';
import moment from 'moment';

class Rent extends React.Component {
  handleEditClick = () => {
    this.props.getTenancyRentInfo(this.props.rent.id);
  }
  handleDeleteClick = () => {
    this.props.deleteTenancyRent(this.props.rent.id);
  }
  handlePaymentsClick = () => {
    this.props.getTenancyPayments(this.props.rent.tenancy_id);
  }
  handleRentSelect = () => {
    this.props.setSelectedRent(this.props.rent);
  }
  render() {
    const { rent, user = {}, dateDisplayFormat, index } = this.props;
    return (
      <Row className={`contact-row rent ${index % 2 === 0 ? '' : 'even'}`} onClick={this.handleRentSelect}>
        <Col sm={2}>{moment(rent.due_date).format(dateDisplayFormat)}</Col>
        <Col sm={2} className="flex start">
          {rent.tenancy && rent.tenancy.map(tenancy => (
            <Link key={tenancy.id} to={juvo.tenancies.infoLink(tenancy.id)}><img src={tenancy.thumbnail} alt="error" /></Link>
          ))}
        </Col>
        <Col sm={3} className="flex start">
          {rent.tenant && rent.tenant.map(tenant => (
            <Link key={tenant.id} to={juvo.contacts.infoLink(tenant.id)}>{tenant.name}</Link>
          ))}
        </Col>
        <Col sm={2}><b>{user.currency}</b>{rent.rent_amount}</Col>
        <Col sm={2}>{rent.fee || 0.00}</Col>
        <Col sm={1} className="flex">
          <Glyphicon glyph="credit-card" onClick={this.handlePaymentsClick} title="show payments" />
          <Glyphicon glyph="pencil" onClick={this.handleEditClick} title="edit" />
          <Glyphicon glyph="remove-circle" onClick={this.handleDeleteClick} title="remove" />
        </Col>
      </Row>
    );
  }
}

Rent.propTypes = {
  rent: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired,
  user: React.PropTypes.object,
  dateDisplayFormat: React.PropTypes.string,
  getTenancyRentInfo: React.PropTypes.func.isRequired,
  deleteTenancyRent: React.PropTypes.func.isRequired,
  setSelectedRent: React.PropTypes.func.isRequired,
};

export default Rent;
