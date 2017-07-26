import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { browserHistory, Link } from 'react-router';
import juvo from 'juvo';

class Offer extends React.Component {
  handleClick = (e) => {
    e.stopPropagation();
    browserHistory.push(juvo.offers.infoLink(this.props.offer.id));
  }

  handleDelete = (e) => {
    e.stopPropagation();
    this.props.deleteOffer(this.props.offer.id);
  }
  render() {
    const {
      offer,
      stages = {
        1: 'Completed',
        2: 'Interest',
        3: 'Negotiation',
        4: 'Offer Accepted',
        5: 'Offer Proposed',
      },
      user = {},
      index,
    } = this.props;
    return (
      <Row className={`contact-row ${index % 2 === 0 ? '' : 'even'}`} onClick={this.handleClick}>
        <Col sm={2} className="flex start">
          <img src={offer.property.thumbnail} alt="error" />
        </Col>
        <Col sm={2} className="flex start">
          {stages[offer.status_id]}
        </Col>
        <Col sm={1} className="flex start">
          {`${user.currency || '$'}${offer.price}`}
        </Col>
        <Col sm={5} className="flex start">
          <div>
            <p>{offer.completion_date}</p>
            <p>Applicant: {offer.applicant && <Link key={offer.applicant.id} to={juvo.contacts.infoLink(offer.applicant.id)}>{offer.applicant.name}</Link>}</p>
            <p>Applicant Solicitor: {offer.applicant_solicitor && <Link key={offer.applicant_solicitor.id} to={juvo.contacts.infoLink(offer.applicant_solicitor.id)}>{offer.applicant_solicitor.name}</Link>}</p>
            <p>Vendor Solicitor: {offer.vendor_solicitor && <Link key={offer.vendor_solicitor.id} to={juvo.contacts.infoLink(offer.vendor_solicitor.id)}>{offer.vendor_solicitor.name}</Link>}</p>
            <div dangerouslySetInnerHTML={{ __html: offer.comment || '' }} />
          </div>
        </Col>
        <Col sm={2} className="flex end">
          <LinkContainer to={juvo.offers.infoLink(offer.id)}>
            <Button bsStyle="primary">Edit</Button>
          </LinkContainer>
          <Button bsStyle="danger" onClick={this.handleDelete}>Delete</Button>
        </Col>
      </Row>
    );
  }
}

Offer.propTypes = {
  offer: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired,
  stages: React.PropTypes.object.isRequired,
  user: React.PropTypes.object,
  deleteOffer: React.PropTypes.func.isRequired,
};

export default Offer;
