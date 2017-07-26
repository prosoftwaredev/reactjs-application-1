import React from 'react';
import {
  Grid,
  Panel,
  Row,
  Col,
  Form,
  FormControl,
  Button,
  FormGroup,
  ControlLabel,
  Alert,
} from 'react-bootstrap';
import { Link } from 'react-router';
import Datetime from 'react-datetime';
import moment from 'moment';
import { Typeahead } from 'react-bootstrap-typeahead';
import { StickyContainer, Sticky } from 'react-sticky';
import scrollToComponent from 'react-scroll-to-component';
import 'react-datetime/css/react-datetime.css';
import FollowUpManagement from 'containers/FollowUpManagement';
import { typeaheadFilterBy } from 'common/utils';
import juvo from 'juvo';
import CollapsiblePanel from 'components/Common/CollapsiblePanel';
import LeftNavLink from 'components/Common/LeftNavLink';
import QuickContact from 'containers/QuickContact';
import QuickProperty from 'containers/QuickProperty';
import ConfirmDelete from 'components/Common/modals/ConfirmDelete';

class AddAppointment extends React.Component {
  state = {
    active: 'Details',
    deleteModal: false,
  }
  panels = {}
  handleBasicClick = (element, title) => {
    console.log('element: ', element);
    console.log(this);
    console.log(this.panels);
    Object.values(this.panels).forEach(panel => panel.collapse());
    element.expand();
    this.setState({ active: title }, () => {
      setTimeout(() => {
        scrollToComponent(element, {
          offset: -50,
          align: 'top',
          duration: 300
        });
      }, 300);
    });
  }

  toggleDeleteModal = () => this.setState({ deleteModal: !this.state.deleteModal })
  render() {
    const {
      title,
      user,
      error,
      values = {},
      categories,
      users = [],
      contact,
      property,
      newProperty,
      peoples,
      properties,
      handleSubmit,
      handleChange,
      handleStartDateChange,
      handleEndDateChange,
      handleDelete,
      peopleAutocomplete,
      peopleChange,
      propertyAutocomplete,
      propertyChange,
      handleNewPropertySubmit,
      addNewProperty,
      newContact,
      quickCreateContact,
      addNewContact,
    } = this.props;
    const selectedUsers = (values && values.users) || [];
    const defaultContact = contact;
    const defaultProperty = property;
    // if (defaultContact) {
    //   defaultContact.name = defaultContact.full_name;
    // }
    // if (defaultProperty) {
    //   defaultProperty.address = defaultProperty.address_1;
    // }
    const { active } = this.state;
    console.log('render: ', values);
    return (
      <Grid fluid className="properties-page create">
        <StickyContainer>
          <header>
            <div>
              <div>
                <h4>
                  <Link to={juvo.diary.index}>
                    <i className="fa fa-chevron-circle-left" /><span>Back to Diary</span>
                  </Link>
                  {title}
                </h4>
              </div>
              <div />
              <div />
            </div>
          </header>
          <Row className="propertyContent">
            <Col sm={2} xsHidden smHidden={!values.id} mdHidden={!values.id} lgHidden={!values.id}>
              <Sticky topOffset={-50} stickyStyle={{ top: 50 }}>
                <ul className="propertyInfoNav">
                  <LeftNavLink scrollTo={this.handleBasicClick} title="Details" element={this.panels.basicInfo} active={active === 'Details'} />
                  <LeftNavLink scrollTo={this.handleBasicClick} title="Management" element={this.panels.followUp} active={active === 'Management'} />
                </ul>
              </Sticky>
            </Col>
            <Col xs={12} sm={values.id ? 10 : 12}>
              <Panel>
                <CollapsiblePanel
                  ref={(b) => { this.panels.basicInfo = b; }}
                  title="Details"
                  className="propertyInfo"
                  default
                >
                  <Form onSubmit={handleSubmit}>
                    {values.id && <input type="hidden" value={values.id} name="id" />}
                    {error && <Alert bsStyle="danger">{error.message}</Alert>}
                    <Row>
                      <Col sm={6}>
                        <FormGroup>
                          <Col componentClass={ControlLabel} lg={5}>
                            Appointment Type
                          </Col>
                          <Col lg={7}>
                            <FormControl
                              componentClass="select"
                              name="category_id"
                              value={values.category_id || ''}
                              onChange={handleChange}
                            >
                              <option value="" disabled>Select Type</option>
                              {categories && categories.map(category => (
                                <option key={`${category.id}${Date.now()}${Math.random()}`} value={category.id}>{category.name}</option>
                              ))}
                            </FormControl>
                          </Col>
                        </FormGroup>
                        <FormGroup>
                          <Col componentClass={ControlLabel} lg={5}>
                            Start Date
                          </Col>
                          <Col lg={7}>
                            <Datetime
                              dateFormat={user && user.dateDisplayFormat}
                              timeFormat="HH:mm:ss"
                              inputProps={{ name: 'start_date' }}
                              value={values.start ? moment(values.start) : ''}
                              onChange={handleStartDateChange}
                              timeConstraints={{ hours: { min: 8, max: 20 }, minutes: { step: 5 } }}
                              closeOnSelect
                              amPmClock
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup>
                          <Col componentClass={ControlLabel} lg={5}>
                            End Date
                          </Col>
                          <Col lg={7}>
                            <Datetime
                              dateFormat={user && user.dateDisplayFormat}
                              timeFormat="HH:mm:ss"
                              inputProps={{ name: 'end_date' }}
                              value={values.end ? moment(values.end) : ''}
                              onChange={handleEndDateChange}
                              timeConstraints={{ hours: { min: 8, max: 20 }, minutes: { step: 5 } }}
                              closeOnSelect
                              amPmClock
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup>
                          <Col componentClass={ControlLabel} lg={5}>
                            Title
                          </Col>
                          <Col lg={7}>
                            <FormControl
                              name="title"
                              type="text"
                              value={values.title || ''}
                              onChange={handleChange}
                            />
                          </Col>
                        </FormGroup>
                      </Col>
                      <Col sm={6}>
                        <FormGroup>
                          <Col componentClass={ControlLabel} lg={5}>
                            Contact
                          </Col>
                          <Col lg={7}>
                            <div className="owner">
                              <Typeahead
                                onChange={peopleAutocomplete}
                                onInputChange={peopleChange}
                                options={peoples || []}
                                filterBy={typeaheadFilterBy}
                                labelKey="name"
                                name="people_id"
                                defaultSelected={[defaultContact]}
                                selected={[defaultContact]}
                              />
                              <button onClick={addNewContact}><i className={`fa ${newContact ? 'fa-minus' : 'fa-plus'}`} aria-hidden="true" /></button>
                            </div>
                          </Col>
                        </FormGroup>
                        <FormGroup>
                          <Col componentClass={ControlLabel} lg={5}>
                            Property
                          </Col>
                          <Col lg={7}>
                            <div className="owner">
                              <Typeahead
                                style={{ flexGrow: 2 }}
                                onChange={propertyAutocomplete}
                                onInputChange={propertyChange}
                                options={properties || []}
                                filterBy={typeaheadFilterBy}
                                labelKey="address"
                                name="property_id"
                                defaultSelected={[defaultProperty]}
                                selected={[defaultProperty]}
                              />
                              <button onClick={addNewProperty}><i className={`fa ${newProperty ? 'fa-minus' : 'fa-plus'}`} aria-hidden="true" /></button>
                            </div>
                          </Col>
                        </FormGroup>
                        <FormGroup>
                          <Col componentClass={ControlLabel} lg={2}>
                            Users
                          </Col>
                          <Col lg={10}>
                            {users.map(item => (
                              <Col lg={6} key={item.id}>
                                <FormGroup className="form-checkbox list">
                                  <input
                                    type="checkbox"
                                    id={`user${item.id}`}
                                    name={item.id}
                                    checked={selectedUsers.indexOf(item.id) !== -1}
                                    onChange={handleChange}
                                  />
                                  <label htmlFor={`user${item.id}`}><span>{item.name}</span></label>
                                </FormGroup>
                              </Col>
                            ))}
                          </Col>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12}>
                        <FormGroup>
                          <Col componentClass={ControlLabel} lg={2}>
                            Description
                          </Col>
                          <Col lg={10}>
                            <FormControl
                              name="description"
                              componentClass="textarea"
                              rows={4}
                              value={values.description || ''}
                              onChange={handleChange}
                            />
                          </Col>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <FormGroup>
                        {values.id && (
                          <Col smOffset={9} sm={1}>
                            <Button bsStyle="danger" onClick={this.toggleDeleteModal}>
                              Delete
                          </Button>
                          </Col>
                        )}
                        <Col smOffset={values.id ? 0 : 11} sm={1}>
                          <Button bsStyle="primary" type="submit">
                            Save
                        </Button>
                        </Col>
                      </FormGroup>
                    </Row>
                  </Form>
                </CollapsiblePanel>
                <CollapsiblePanel
                  ref={(b) => { this.panels.followUp = b; }}
                  title="Management"
                  className="propertyInfo"
                  default={false}
                  hidden={Boolean(!values.id)}
                >
                  <FollowUpManagement element={values.id} category={1} />
                </CollapsiblePanel>
                {newContact && <QuickContact quickCreateContact={quickCreateContact} onHide={addNewContact} />}
                {newProperty && <QuickProperty quickCreateProperty={handleNewPropertySubmit} onHide={addNewProperty} />}
              </Panel>
            </Col>
          </Row>
        </StickyContainer>
        <ConfirmDelete shown={this.state.deleteModal} handleDelete={handleDelete} handleClose={this.toggleDeleteModal} />
      </Grid>
    );
  }
}

AddAppointment.propTypes = {
  user: React.PropTypes.object,
  error: React.PropTypes.object,
  values: React.PropTypes.object,
  contact: React.PropTypes.object,
  property: React.PropTypes.object,
  newProperty: React.PropTypes.object,
  categories: React.PropTypes.array,
  users: React.PropTypes.array,
  peoples: React.PropTypes.array,
  properties: React.PropTypes.array,
  handleSubmit: React.PropTypes.func.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  handleStartDateChange: React.PropTypes.func.isRequired,
  handleEndDateChange: React.PropTypes.func.isRequired,
  handleDelete: React.PropTypes.func.isRequired,
  peopleAutocomplete: React.PropTypes.func.isRequired,
  peopleChange: React.PropTypes.func.isRequired,
  propertyAutocomplete: React.PropTypes.func.isRequired,
  propertyChange: React.PropTypes.func.isRequired,
  handleNewPropertySubmit: React.PropTypes.func.isRequired,
  addNewProperty: React.PropTypes.func.isRequired,
  newContact: React.PropTypes.bool,
  quickCreateContact: React.PropTypes.func.isRequired,
  addNewContact: React.PropTypes.func.isRequired,

};

export default AddAppointment;
