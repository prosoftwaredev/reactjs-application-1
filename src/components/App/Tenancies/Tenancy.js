import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { browserHistory, Link } from 'react-router';
import moment from 'moment';
import { momentFormats } from 'common/utils';
import juvo from 'juvo';

class Tenancy extends React.Component {
  handleClick = (e) => {
    e.stopPropagation();
    browserHistory.push(juvo.tenancies.infoLink(this.props.tenancy.id));
  }
  handleDelete = (e) => {
    e.stopPropagation();
    this.props.deleteTenancy(this.props.tenancy.id);
  }
  render() {
    const {
      tenancy,
      types = {
        1: 'Managed',
        2: 'Tenant Find & Rent Collection',
        3: 'Let Only',
      },
      fees = {
        1: '%',
        2: 'Fixed Fee',
      },
      user = {},
      index,
    } = this.props;
    return (
      <Row className={`contact-row ${index % 2 === 0 ? '' : 'even'}`} onClick={this.handleClick}>
        <Col sm={2} className="flex">
          <img src={tenancy.property.thumbnail} alt="error" />
        </Col>
        <Col sm={2}>
          {tenancy.tenant && tenancy.tenant.map(tenant => (tenant.id ? (
            <p key={tenant.id}>
              <Link to={juvo.contacts.infoLink(tenant.id)}>{tenant.name}</Link>
            </p>
           ) : null
          ))}
        </Col>
        <Col sm={1} className="flex">
          {`${user.currency || '$'}${tenancy.rent_amount}`}
        </Col>
        <Col sm={5}>
          <div>
            <p>{types[tenancy.tenancy_type_id]}</p>
            <p>Fee: {tenancy.fee} {fees[tenancy.fee_type]}</p>
            <p>Start Date: {moment(tenancy.start_date).format(user.dateDisplayFormat || momentFormats['d/m/Y'])}</p>
            <p>End Date: {moment(tenancy.end_date).format(user.dateDisplayFormat || momentFormats['d/m/Y'])}</p>
            <div dangerouslySetInnerHTML={{ __html: tenancy.comment || '' }} />
          </div>
        </Col>
        <Col sm={2} className="flex end">
          <LinkContainer to={juvo.tenancies.infoLink(tenancy.id)}>
            <Button bsStyle="primary">Edit</Button>
          </LinkContainer>
          <Button bsStyle="danger" onClick={this.handleDelete}>Delete</Button>
        </Col>
      </Row>
    );
  }
}

Tenancy.propTypes = {
  tenancy: React.PropTypes.object.isRequired,
  types: React.PropTypes.object.isRequired,
  user: React.PropTypes.object,
  index: React.PropTypes.number.isRequired,
  deleteTenancy: React.PropTypes.func.isRequired,
};

export default Tenancy;
