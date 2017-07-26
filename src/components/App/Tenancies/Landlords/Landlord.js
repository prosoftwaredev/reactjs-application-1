import React from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';
import juvo from 'juvo';
import moment from 'moment';

class Landlord extends React.Component {
  handleDeleteClick = () => {
    this.props.deleteTenancyRent(this.props.rent.id);
  }
  handleRentSelect = () => {
    this.props.setSelectedRent(this.props.rent);
  }
  handleLandlordsClick = () => {
    this.props.getTenancyLandlords({ tenancy_id: this.props.rent.tenancy_id });
  }
  handleStatementsClick = () => {
    browserHistory.push(juvo.tenancies.landlords.statementsLink(this.props.rent.tenancy_id, this.props.rent.id));
  }
  render() {
    const { rent, user = {}, dateDisplayFormat, index } = this.props;
    return (
      <Row className={`contact-row rent ${index % 2 === 0 ? '' : 'even'}`} onClick={this.handleRentSelect}>
        <Col sm={2} className="flex start">{moment(rent.due_date).format(dateDisplayFormat)}</Col>
        <Col sm={2} className="flex start">
          {rent.tenancy && rent.tenancy.map(tenancy => (
            <Link key={tenancy.id} to={juvo.tenancies.infoLink(tenancy.id)}><img src={tenancy.thumbnail} alt="error" /></Link>
          ))}
        </Col>
        <Col sm={3} className="flex start">
          {rent.landlord && rent.landlord.map(landlord => (
            <Link key={landlord.id} to={juvo.contacts.infoLink(landlord.id)}>{landlord.name}</Link>
          ))}
        </Col>
        <Col sm={2} className="flex start"><b>{user.currency}</b>{rent.rent_amount}</Col>
        <Col sm={2} className="flex start">{rent.fee || 0.00}</Col>
        <Col sm={1} className="flex">
          <Glyphicon glyph="credit-card" onClick={this.handleLandlordsClick} title="Payments" />
          <Glyphicon glyph="print" onClick={this.handleStatementsClick} title="Statements" />
        </Col>
      </Row>
    );
  }
}

Landlord.propTypes = {
  rent: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired,
  user: React.PropTypes.object,
  dateDisplayFormat: React.PropTypes.string,
  deleteTenancyRent: React.PropTypes.func.isRequired,
  setSelectedRent: React.PropTypes.func.isRequired,
  getTenancyLandlords: React.PropTypes.func.isRequired,
  // getTenancyStatements: React.PropTypes.func.isRequired,
  // getTenancyStatementTemplate: React.PropTypes.func.isRequired,
};

export default Landlord;
