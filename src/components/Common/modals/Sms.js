import React from 'react';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';

class Sms extends React.Component {
  handleDelete = () => {
    this.props.deleteSms(this.props.sms.id);
  }
  render() {
    const { user, sms } = this.props;
    return (
      <Row key={sms.id} className="table-row modal-row">
        <Col sm={4}>
          {moment(sms.created_date).format(user.dateDisplayFormat)}
        </Col>
        <Col sm={8}>
          {sms.message}
        </Col>
      </Row>
    );
  }
}

Sms.propTypes = {
  user: React.PropTypes.object,
  sms: React.PropTypes.object.isRequired,
};

export default Sms;
