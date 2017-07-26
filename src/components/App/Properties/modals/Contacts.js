import React from 'react';
import { Link } from 'react-router';
import { Modal, Row, Col, } from 'react-bootstrap';

const Contacts = ({ contacts, handleClose }) => (
  <Modal show onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Contacts</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Row>
        <Col sm={3}>
          Full Name
        </Col>
        <Col sm={3}>
          Email
        </Col>
        <Col sm={3}>
          Mobile
        </Col>
        <Col sm={3}>
          Phone
        </Col>
      </Row>
      {contacts && contacts.map((contact, index) => (
        <Link to={`/contacts/${contact.id}`} key={contact.id}>
          <Row className={`note-row ${index % 2 === 0 ? 'even' : ''}`}>
            <Col sm={3}>
              {contact.full_name}
            </Col>
            <Col sm={3}>
              {contact.email}
            </Col>
            <Col sm={3}>
              {contact.mobile}
            </Col>
            <Col sm={3}>
              {contact.phone}
            </Col>
          </Row>
        </Link>
        ))}
    </Modal.Body>
  </Modal>
);

Contacts.propTypes = {
  contacts: React.PropTypes.array,
  handleClose: React.PropTypes.func.isRequired,
};

export default Contacts;
