import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import moment from 'moment';
import juvo from 'juvo';
import { momentFormats } from 'common/utils';

class Document extends React.Component {
  handleDelete = () => {
    this.props.deleteDocument(this.props.document.id);
  }
  handleDownload = () => {
    this.props.downloadDocument(this.props.document.id, this.props.document.filename);
  }
  handleEmail = () => {
    this.props.setDocument(this.props.document);
  }
  render() {
    const { document, user, index } = this.props;
    const assigned = (document.property_id && (
      <Link to={juvo.properties.infoLink(document.property_id)}>
        {document.property_address || document.property_id}
      </Link>
    )) || (document.people_id && (
      <Link to={juvo.contacts.infoLink(document.people_id)}>
        {document.people_name || document.people_id}
      </Link>
    )) || (document.offer_id && (
      <Link to={juvo.offers.infoLink(document.offer_id)}>
        {document.offer_address || document.offer_id}
      </Link>
    )) || (document.tenancy_id && (
      <Link to={juvo.tenancies.infoLink(document.tenancy_id)}>
        {document.tenancy_address || document.tenancy_id}
      </Link>
    )) || 'No linked data';
    const dateFormat = `${(user && user.dateDisplayFormat) || momentFormats['d/m/Y']} hh:mm:ss`;
    return (
      <Row className={`contact-row ${index % 2 === 0 ? '' : 'even'}`}>
        <Col md={2} className="flex start">{moment(document.created_date).format(dateFormat)}</Col>
        <Col md={2} className="flex start">
          {assigned}
        </Col>
        <Col md={5} className="flex start">
          <Button bsStyle="link" onClick={this.handleDownload}>{document.filename}</Button>
        </Col>
        <Col md={3} className="flex end">
          <Button bsStyle="primary" onClick={this.handleEmail}>Send Email</Button>
          <Button bsStyle="danger" onClick={this.handleDelete}>Delete</Button>
        </Col>
      </Row>
    );
  }
}

Document.propTypes = {
  user: React.PropTypes.object,
  document: React.PropTypes.object.isRequired,
  deleteDocument: React.PropTypes.func.isRequired,
  downloadDocument: React.PropTypes.func.isRequired,
  setDocument: React.PropTypes.func.isRequired,
};

export default Document;
