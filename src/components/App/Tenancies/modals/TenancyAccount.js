import React from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import moment from 'moment';

class TenancyAccount extends React.Component {
  handleClick = (event) => {
    event.stopPropagation();
    this.props.getTenancyAccountInfo(this.props.account.id);
  }
  handleDeleteClick = (event) => {
    event.stopPropagation();
    this.props.deleteTenancyAccount(this.props.account.id);
  }
  render() {
    const { account, user } = this.props;
    return (
      <Row onClick={this.handleClick} className="table-row modal-row">
        <Col sm={2}>{`${user.currency} ${account.amount}`}</Col>
        <Col sm={2}>{moment(account.date_received).format(user.dateDisplayFormat)}</Col>
        <Col sm={6}>{account.description}</Col>
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

TenancyAccount.propTypes = {
  account: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
  getTenancyAccountInfo: React.PropTypes.func.isRequired,
  deleteTenancyAccount: React.PropTypes.func.isRequired,
};

export default TenancyAccount;
