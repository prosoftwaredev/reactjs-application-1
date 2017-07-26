import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import {
  Navbar,
  Nav,
  MenuItem,
  Dropdown,
  NavDropdown,
  NavItem,
  Label,
  FormGroup,
  InputGroup,
} from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import juvo from 'juvo';
import { typeaheadFilterBy } from 'common/utils';
// import { juvoTypes } from 'redux/modules/common';
import Navigation from './Navigation';

const matchRoute = (route, match) => route.includes(match);

class HeaderComponent extends React.Component {
  _renderMenuItemChildren = (option) => {
    console.log('_renderMenuItemChildren: ', option);
    const icon = {
      appointment: (<i className="fa fa-calendar" />),
      contact: (<i className="fa fa-address-book-o" />),
      offer: (<i className="fa fa-handshake-o" />),
      property: (<i className="fa fa-home" />),
      rent: (<i className="fa fa-building" />),
      tenancy: (<i className="fa fa-building" />),
    };
    return (
      <span className="searchResult">
        {icon[option.type]}{option.name}
      </span>
    );
  }
  render() {
    const {
      user = {},
      identity,
      path,
      logout,
      search = [],
      getSearchData,
      setSelectedSearch,
      handleNotificationsClick,
      notifications
    } = this.props;
    const pathWithoutSlash = path.substr(1, path.length - 1);
    const i = pathWithoutSlash.search('/');
    // const component = i !== -1 ? pathWithoutSlash.substr(0, i) : pathWithoutSlash;
    const title = {
      dashboard: (<span><i className="fa fa-tachometer" /> Dashboard</span>),
      diary: (<span><i className="fa fa-calendar" /> Diary</span>),
      contacts: (<span><i className="fa fa-address-book-o" /> Contacts</span>),
      properties: (<span><i className="fa fa-home" /> Property</span>),
      tenancy: (<span><i className="fa fa-building" /> Tenancy</span>),
      offers: (<span><i className="fa fa-handshake-o" /> Offers</span>),
      documents: (<span><i className="fa fa-cloud-o" /> Documents Storage</span>),
      plugins: (<span><i className="fa fa-plug" /> Plugins</span>),
      notifications: (
        <span><i className="fa fa-bell-o" /> Notifications
        {identity.notification_count ? (<sup><Label bsStyle="danger">{identity.notification_count}</Label></sup>) : null}
        </span>
      ),
    };
    console.log(search);
    return (
      <div className="app-header">
        <div className="top-header-placement">
          <Navbar fixedTop>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to={juvo.index} style={{ cursor: 'pointer' }}>
                  <img
                    className="logo"
                    style={{ height: '100%' }}
                    src={require('img/logo.png')}
                    alt=""
                  />
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Navbar.Form pullLeft>
                <FormGroup>
                  <InputGroup>
                    <Typeahead
                      onChange={setSelectedSearch}
                      onInputChange={getSearchData}
                      options={search}
                      ignoreDiacritics
                      filterBy={typeaheadFilterBy}
                      labelKey="name"
                      // labelKey={option => (<span className={option.type}>{option.name}</span>)}
                      renderMenuItemChildren={this._renderMenuItemChildren}
                      name="search"
                      placeholder="Search"
                    />
                    <Dropdown id="quickadd" className="quickadd">
                      <Dropdown.Toggle>
                        <i className="fa fa-plus" /> Quick Add
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {identity && identity.allowed_diary ? (
                          <LinkContainer to={juvo.diary.create}>
                            <MenuItem><i className="fa fa-calendar" /> Appointment</MenuItem>
                          </LinkContainer>
                        ) : null}
                        {identity && identity.allowed_contact ? (
                          <LinkContainer to={juvo.contacts.create}>
                            <MenuItem><i className="fa fa-address-book-o" /> Contact</MenuItem>
                          </LinkContainer>
                        ) : null}
                        {identity && identity.allowed_property ? (
                          <LinkContainer to={juvo.properties.create}>
                            <MenuItem><i className="fa fa-home" /> Property</MenuItem>
                          </LinkContainer>
                        ) : null}
                        {identity && identity.allowed_tenancy ? (
                          <LinkContainer to={juvo.tenancies.create}>
                            <MenuItem><i className="fa fa-building" /> Tenancy</MenuItem>
                          </LinkContainer>
                        ) : null}
                        {identity && identity.allowed_offer ? (
                          <LinkContainer to={juvo.offers.create}>
                            <MenuItem><i className="fa fa-handshake-o" /> Offer</MenuItem>
                          </LinkContainer>
                        ) : null}
                      </Dropdown.Menu>
                    </Dropdown>
                  </InputGroup>
                </FormGroup>
              </Navbar.Form>
              <Nav pullRight>
                <LinkContainer to={juvo.dashboard.index} className={`mobile-navigation${matchRoute(this.props.path, juvo.dashboard.index) ? ' selected' : ''}`}>
                  <NavItem eventKey={1}><i className="fa fa-tachometer" /> Dashboard</NavItem>
                </LinkContainer>
                {identity && identity.allowed_diary ? (
                  <LinkContainer to={juvo.diary.index} className={`mobile-navigation${matchRoute(this.props.path, juvo.diary.index) ? ' selected' : ''}`}>
                    <NavItem eventKey={2}><i className="fa fa-calendar" /> Diary</NavItem>
                  </LinkContainer>
                ) : null}
                {identity && identity.allowed_contact ? (
                  <LinkContainer to={juvo.contacts.index} className={`mobile-navigation${matchRoute(this.props.path, juvo.contacts.index) ? ' selected' : ''}`}>
                    <NavItem eventKey={3}><i className="fa fa-address-book-o" /> Contacts</NavItem>
                  </LinkContainer>
                ) : null}
                {identity && identity.allowed_property ? (
                  <LinkContainer to={juvo.properties.index} className={`mobile-navigation${matchRoute(this.props.path, juvo.properties.index) ? ' selected' : ''}`}>
                    <NavItem eventKey={4}><i className="fa fa-home" /> Property</NavItem>
                  </LinkContainer>
                ) : null}
                {identity && identity.allowed_tenancy ? (
                  <LinkContainer to={juvo.tenancies.index} className={`mobile-navigation${matchRoute(this.props.path, juvo.tenancies.index) ? ' selected' : ''}`}>
                    <NavItem eventKey={5}><i className="fa fa-building" /> Tenancy</NavItem>
                  </LinkContainer>
                ) : null}
                {identity && identity.allowed_offer ? (
                  <LinkContainer to={juvo.offers.index} className={`mobile-navigation${matchRoute(this.props.path, juvo.offers.index) ? ' selected' : ''}`}>
                    <NavItem eventKey={6}><i className="fa fa-handshake-o" /> Offers</NavItem>
                  </LinkContainer>
                ) : null}
                {identity && identity.allowed_document ? (
                  <LinkContainer to={juvo.documents.index} className={`mobile-navigation${matchRoute(this.props.path, juvo.documents.index) ? ' selected' : ''}`}>
                    <NavItem eventKey={7}><i className="fa fa-cloud" /> Documents Storage</NavItem>
                  </LinkContainer>
                ) : null}
                {identity && identity.allowed_plugin ? (
                  <LinkContainer to={juvo.plugins.index} className={`mobile-navigation${matchRoute(this.props.path, juvo.plugins.index) ? ' selected' : ''}`}>
                    <NavItem eventKey={8}><i className="fa fa-plug" /> Plugins</NavItem>
                  </LinkContainer>
                ) : null}
                {identity.allowed_admin ? (
                  <LinkContainer to={juvo.emailsms.index} className="emailSMS">
                    <NavItem eventKey={3.7}>
                      <i className="fa fa-envelope-o" /><sup>{user.email_credit}</sup>
                      <i className="fa fa-mobile" /><sup>{user.sms_credit}</sup>
                    </NavItem>
                  </LinkContainer>
                ) : null}
                <NavDropdown id="notifications" className="notifications" title={title.notifications} onClick={handleNotificationsClick}>
                  {notifications && notifications.map((notification, index) => (
                    <LinkContainer key={index} to={notification.url}>
                      <MenuItem><div dangerouslySetInnerHTML={{ __html: notification.description || '' }} /></MenuItem>
                    </LinkContainer>
                  ))}
                </NavDropdown>
                <LinkContainer to={juvo.support.index}>
                  <NavItem eventKey={2} href="#">
                    <i className="fa fa-life-ring" /> Support
                </NavItem>
                </LinkContainer>
                <NavDropdown
                  eventKey={3}
                  className="userEmail"
                  title={<span className="userName"><i className="fa fa-user-o" aria-hidden="true" />{identity.email}</span>}
                  id="basic-nav-dropdown">
                  <LinkContainer to={juvo.user.profile}>
                    <MenuItem eventKey={3.1}>My Profile</MenuItem>
                  </LinkContainer>
                  <LinkContainer to={juvo.templates.index}>
                    <MenuItem eventKey={3.2}>System Templates</MenuItem>
                  </LinkContainer>
                  <LinkContainer to={juvo.emailtemplates.index}>
                    <MenuItem eventKey={3.2}>Email Templates</MenuItem>
                  </LinkContainer>
                  {identity.allowed_admin ? (
                    <LinkContainer to={juvo.user.index}>
                      <MenuItem eventKey={3.3}>User Management</MenuItem>
                    </LinkContainer>
                  ) : null}
                  {identity.allowed_admin ? (
                    <LinkContainer to={juvo.settings.index}>
                      <MenuItem eventKey={3.4}>System Settings</MenuItem>
                    </LinkContainer>
                  ) : null}
                  {identity.allowed_admin ? (
                    <LinkContainer to={juvo.options.index}>
                      <MenuItem eventKey={3.5}>System Options</MenuItem>
                    </LinkContainer>
                  ) : null}
                  {identity.allowed_admin ? (
                    <LinkContainer to={juvo.billing.index}>
                      <MenuItem eventKey={3.6}>Billing</MenuItem>
                    </LinkContainer>
                  ) : null}
                  {identity.allowed_admin ? (
                    <LinkContainer to={juvo.emailsms.index} className="emailSMSsub">
                      <MenuItem eventKey={3.7}>Email & SMS Credits</MenuItem>
                    </LinkContainer>
                  ) : null}
                </NavDropdown>
                <NavItem eventKey={4} onClick={logout}>
                  <i className="fa fa-sign-out" />
                  Logout
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <Navigation location={path} identity={identity} />
      </div >
    );
  }
}

HeaderComponent.propTypes = {
  notifications: React.PropTypes.array,
  identity: React.PropTypes.object.isRequired,
  user: React.PropTypes.object,
  path: React.PropTypes.string.isRequired,
  logout: React.PropTypes.func.isRequired,
  handleNotificationsClick: React.PropTypes.func.isRequired,
};

export default HeaderComponent;
