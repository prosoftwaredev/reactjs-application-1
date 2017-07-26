import React from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import moment from 'moment';

class TenancyPayment extends React.Component {
  handleClick = (event) => {
    event.stopPropagation();
    this.props.getTenancyPaymentInfo(this.props.payment.id);
  }
  handleDeleteClick = (event) => {
    event.stopPropagation();
    this.props.deleteTenancyPayment(this.props.payment.id);
  }
  render() {
    const { payment, index, user } = this.props;
    return (
      <Row onClick={this.handleClick} className={`tenancyJob${index % 2 === 0 ? ' odd' : ' even'}`}>
        <Col sm={2}>{`${user.currency} ${payment.amount}`}</Col>
        <Col sm={3}>
          {payment.tenant.map(tenant => <p key={tenant.id}>{tenant.name}</p>)}
        </Col>
        <Col sm={2}>{moment(payment.date_received).format(user.dateDisplayFormat)}</Col>
        <Col sm={4}>{payment.description}</Col>
        <Col sm={1} className="flex">
          <Glyphicon glyph="pencil" onClick={this.handleClick} title="edit" />
          <Glyphicon glyph="remove-circle" onClick={this.handleDeleteClick} />
        </Col>
      </Row>
    );
  }
}

TenancyPayment.propTypes = {
  payment: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired,
  getTenancyPaymentInfo: React.PropTypes.func.isRequired,
  deleteTenancyPayment: React.PropTypes.func.isRequired,
};

export default TenancyPayment;
