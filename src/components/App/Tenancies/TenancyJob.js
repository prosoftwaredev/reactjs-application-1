import React from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import moment from 'moment';

class TenancyJob extends React.Component {
  handleDeleteClick = (event) => {
    event.stopPropagation();
    this.props.deleteTenancyJob(this.props.job.id);
  }
  handleClick = (event) => {
    event.stopPropagation(event);
    this.props.getTenancyJobInfo(this.props.job.id);
  }
  render() {
    const { user, job, dateDisplayFormat, index } = this.props;
    return (
      <Row onClick={this.handleClick} className={`table-row${index % 2 === 0 ? ' odd' : ' even'}`}>
        <Col sm={1}>{job.completed ? <Glyphicon glyph="ok" /> : null}</Col>
        <Col sm={2}>{moment(job.scheluded_date).format(dateDisplayFormat)}</Col>
        <Col sm={2}><b>{user.currency}</b>{job.price}</Col>
        <Col sm={6}>{job.description}</Col>
        <Col sm={1} className="flex">
          <Glyphicon glyph="pencil" onClick={this.handleClick} title="edit" />
          <Glyphicon glyph="remove-circle" onClick={this.handleDeleteClick} title="remove" />
        </Col>
      </Row>
    );
  }
}

TenancyJob.propTypes = {
  job: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired,
  dateDisplayFormat: React.PropTypes.string.isRequired,
  getTenancyJobInfo: React.PropTypes.func.isRequired,
  deleteTenancyJob: React.PropTypes.func.isRequired,
};

export default TenancyJob;
