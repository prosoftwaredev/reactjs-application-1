import React from 'react';
import { Row, Col, Button, Glyphicon } from 'react-bootstrap';
import moment from 'moment';
import { momentFormats } from 'common/utils';

class Template extends React.Component {
  handleDelete = () => {
    this.props.deleteTemplate(this.props.template.id);
  }
  handleEditClick = () => {
    this.props.editTemplate(this.props.template.id);
  }
  handleDownload = () => {
    this.props.handleTemplateDownload(this.props.template.id, this.props.template.filename);
  }
  render() {
    const { template, user, categories = {} } = this.props;
    const dateFormat = `${(user && user.dateDisplayFormat) || momentFormats['d/m/Y']} hh:mm:ss`;
    return (
      <Row className="table-row">
        <Col md={2}>
          {moment(template.created_date).format(dateFormat)}
        </Col>
        <Col md={2}>
          {template.name}
        </Col>
        <Col md={2}>
          {categories[template.category_id]}
        </Col>
        <Col md={5}>
          <Button bsStyle="link" onClick={this.handleDownload}>{template.filename || template.file}</Button>
        </Col>
        <Col md={1} className="flex">
          {template.software === 0 ? <Glyphicon glyph="pencil" onClick={this.handleEditClick} /> : null}
          <Glyphicon glyph="remove-circle" onClick={this.handleDelete} />
        </Col>
      </Row>
    );
  }
}

Template.propTypes = {
  template: React.PropTypes.object.isRequired,
  categories: React.PropTypes.object.isRequired,
  user: React.PropTypes.object,
  deleteTemplate: React.PropTypes.func.isRequired,
  editTemplate: React.PropTypes.func.isRequired,
  handleTemplateDownload: React.PropTypes.func.isRequired,
};

export default Template;
