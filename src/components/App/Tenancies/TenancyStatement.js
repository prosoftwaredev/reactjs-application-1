import React from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import moment from 'moment';

class TenancyStatement extends React.Component {
  handleDeleteClick = (event) => {
    event.stopPropagation();
    this.props.deleteTenancyStatement(this.props.statement.id);
  }
  handleDownload = (event) => {
    event.stopPropagation(event);
    this.props.handleTemplateDownload(this.props.statement.id, this.props.statement.filename || `${this.props.statement.id}.docx`);
  }
  handleEmail = () => {
    this.props.setDocument({id: this.props.statement.document_id, filename: this.props.statement.document_filename});
  }
  render() {
    const { type, statement, dateDisplayFormat } = this.props;
    return (
      <Row className={`${this.props.standalone ? 'contact-row' : 'table-row'}`}>
        <Col sm={2} className="flex start">{type}</Col>
        <Col sm={2} className="flex start">{moment(statement.start_date).format(dateDisplayFormat)}</Col>
        <Col sm={2} className="flex start">{moment(statement.end_date).format(dateDisplayFormat)}</Col>
        <Col sm={1} smOffset={5} className="flex">
          <Glyphicon glyph="envelope" onClick={this.handleEmail} />
          <Glyphicon glyph="download" onClick={this.handleDownload} title="download" />
          <Glyphicon glyph="remove-circle" onClick={this.handleDeleteClick} title="remove" />
        </Col>
      </Row>
    );
  }
}

TenancyStatement.propTypes = {
  type: React.PropTypes.string.isRequired,
  statement: React.PropTypes.object.isRequired,
  dateDisplayFormat: React.PropTypes.string.isRequired,
  handleTemplateDownload: React.PropTypes.func.isRequired,
  deleteTenancyStatement: React.PropTypes.func.isRequired,
};

export default TenancyStatement;
