import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import {Link} from 'react-router';
import moment from 'moment';
import { momentFormats } from 'common/utils';

class Management extends React.Component {
  handleEditClick = () => {
    this.props.handleEditManagement(this.props.management.id);
  }
  handleDeleteClick = () => {
    this.props.handleManagementDelete(this.props.management.id);
  }
  render() {
    const { management, user = {}, category, index } = this.props;
    return (
      <Row className={`contact-row management ${index % 2 === 0 ? '' : 'even'}`}>
        <Col sm={2} className="flex start">
          {moment(management.due_date).format(user.dateDisplayFormat || momentFormats['d/m/Y'])}
        </Col>
        <Col sm={2} className="flex start">
          {user.name}
        </Col>
        <Col sm={3} className="flex start">
          {management.feedback}
        </Col>
        <Col sm={3} className="flex start">
          <Link to={`/${category}/${management.info.id}`}>
            {management.info.name}
          </Link>
        </Col>
        <Col sm={2} className="flex end">
          <Button bsStyle="primary" onClick={this.handleEditClick}>Edit</Button>
          <Button bsStyle="danger" onClick={this.handleDeleteClick}>Delete</Button>
        </Col>
      </Row>
    );
  }
}

Management.propTypes = {
  management: React.PropTypes.object.isRequired,
  user: React.PropTypes.object,
  category: React.PropTypes.string.isRequired,
  handleEditManagement: React.PropTypes.func.isRequired,
  handleManagementDelete: React.PropTypes.func.isRequired,
};

export default Management;
