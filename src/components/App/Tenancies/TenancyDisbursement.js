import React from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import moment from 'moment';

class TenancyDisbursement extends React.Component {
  handleDeleteClick = (event) => {
    event.stopPropagation();
    this.props.deleteDisbursement(this.props.disbursement.id);
  }
  handleClick = (event) => {
    event.stopPropagation();
    this.props.getDisbursementInfo(this.props.disbursement.id);
  }
  render() {
    const { user, disbursement, dateDisplayFormat, index } = this.props;
    return (
      <Row onClick={this.handleClick} className={`table-row${index % 2 === 0 ? ' odd' : ' even'}`}>
        <Col sm={1}>{disbursement.vat_applicable ? <Glyphicon glyph="ok" /> : null}</Col>
        <Col sm={2}>{moment(disbursement.date_raised).format(dateDisplayFormat)}</Col>
        <Col sm={2}><b>{user.currency}</b>{disbursement.amount}</Col>
        <Col sm={6}>{disbursement.description}</Col>
        <Col sm={1} className="flex">
          <Glyphicon glyph="pencil" onClick={this.handleClick} title="edit" />
          <Glyphicon glyph="remove-circle" onClick={this.handleDeleteClick} title="remove" />
        </Col>
      </Row>
    );
  }
}

TenancyDisbursement.propTypes = {
  disbursement: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired,
  dateDisplayFormat: React.PropTypes.string.isRequired,
  getDisbursementInfo: React.PropTypes.func.isRequired,
  deleteDisbursement: React.PropTypes.func.isRequired,
};

export default TenancyDisbursement;
