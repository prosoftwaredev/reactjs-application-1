import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import juvo from 'juvo';

const Navigation = ({ location, identity }) => (
  <Navbar className="sub-menu">
    <Navbar.Toggle />
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to={juvo.dashboard.index} className={location && location.includes(juvo.dashboard.index) ? 'active' : ''}>
          <NavItem eventKey={1}><i className="fa fa-tachometer" aria-hidden="true" /> Dashboard</NavItem>
        </LinkContainer>
        {identity && identity.allowed_diary ? (
          <LinkContainer to={juvo.diary.index} className={location && location.includes(juvo.diary.index) ? 'active' : ''}>
            <NavItem eventKey={2}><i className="fa fa-calendar" aria-hidden="true" /> Diary</NavItem>
          </LinkContainer>
        ) : null}
        {identity && identity.allowed_contact ? (
          <LinkContainer to={juvo.contacts.index} className={location && location.includes(juvo.contacts.index) ? 'active' : ''}>
            <NavItem eventKey={3}><i className="fa fa-address-book-o" aria-hidden="true" /> Contacts</NavItem>
          </LinkContainer>
        ) : null}
        {identity && identity.allowed_property ? (
          <LinkContainer to={juvo.properties.index} className={location && location.includes(juvo.properties.index) ? 'active' : ''}>
            <NavItem eventKey={4}><i className="fa fa-home" aria-hidden="true" /> Property</NavItem>
          </LinkContainer>
        ) : null}
        {identity && identity.allowed_tenancy ? (
          <LinkContainer to={juvo.tenancies.index} className={location && location.includes(juvo.tenancies.index) ? 'active' : ''}>
            <NavItem eventKey={5}><i className="fa fa-building" aria-hidden="true" /> Tenancy</NavItem>
          </LinkContainer>
        ) : null}
        {identity && identity.allowed_offer ? (
          <LinkContainer to={juvo.offers.index} className={location && location.includes(juvo.offers.index) ? 'active' : ''}>
            <NavItem eventKey={6}><i className="fa fa-handshake-o" aria-hidden="true" /> Offers</NavItem>
          </LinkContainer>
        ) : null}
        {identity && identity.allowed_document ? (
          <LinkContainer to={juvo.documents.index} className={location && location.includes(juvo.documents.index) ? 'active' : ''}>
            <NavItem eventKey={7}><i className="fa fa-cloud" aria-hidden="true" /> Documents Storage</NavItem>
          </LinkContainer>
        ) : null}
        {identity && identity.allowed_plugin ? (
          <LinkContainer to={juvo.plugins.index} className={location && location.includes(juvo.plugins.index) ? 'active' : ''}>
            <NavItem eventKey={8}><i className="fa fa-plug" aria-hidden="true" /> Plugins</NavItem>
          </LinkContainer>
        ) : null}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

Navigation.propTypes = {
  location: React.PropTypes.string.isRequired,
  identity: React.PropTypes.object.isRequired,
};

export default Navigation;
