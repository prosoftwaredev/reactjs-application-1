import React from 'react';
import { Grid, Panel, Row, Col, Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router';
import { StickyContainer, Sticky } from 'react-sticky';
import scrollToComponent from 'react-scroll-to-component';
import juvo from 'juvo';
import FollowUpManagement from 'containers/FollowUpManagement';
import Loading from 'components/Common/Loading';
import CollapsiblePanel from 'components/Common/CollapsiblePanel';
import NoDataFound from 'components/Common/NoDataFound';
import Notes from '../../Common/modals/Notes';
import Smss from '../../Common/modals/Smss';
import Emails from '../../Common/modals/Emails';
import UploadManager from '../../Common/UploadManager';
import LeftNavLink from '../../Common/LeftNavLink';
import MainForm from './MainForm';

class ContactInfoComponent extends React.Component {
  state = {
    active: 'Details',
  }
  panels = {}
  handleBasicClick = (element, title) => {
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
  render() {
    const {
      error,
      user = {},
      params,
      contact = {},
      categories,
      sources,
      countryCodes,
      printTemplates,
      propertyTypes,
      printValues = {},
      note,
      notes,
      noteCategories,
      email,
      emails,
      sms,
      smss,
      modal,
      locations,
      activity,
      appointments,
      contactLocations,
      documents,
      loading,
      uploadDocumentProgress,
      handleNotesClick,
      handleSMSClick,
      handleEmailsClick,
      handlePrintSubmit,
      handlePrintChange,
      mainFormSubmit,
      mainFormChange,
      handleDocumentUpload,
      handleDocumentDelete,
      handleDocumentDownload,
      handleSubmitLocations,
      handleChangeLocations,
      handleModalClose,
      handleNoteCreate,
      handleNoteDelete,
      handleNoteChange,
      handleSMSCreate,
      handleSMSChange,
      handleEmailCreate,
      handleEmailChange,
      fillAddress,
      handleAttachmentRemove,
      printedDoc,
      handleTemplateChange,
    } = this.props;
    const totalDocuments = uploadDocumentProgress || [];
    let progressDocuments = 0;
    totalDocuments.forEach((percent) => {
      progressDocuments += percent / totalDocuments.length;
    });
    const { active } = this.state;
    return (
      <section className="property">
        <Grid fluid className="properties-page create">
          <StickyContainer>
            <header>
              <div>
                <div>
                  <div>
                    <Row>
                      <Col xs={12} sm={5} md={3}>
                        <h2>{contact.title_1} {contact.forename_1} {contact.surname_1}</h2>
                        <h5>{contact.title_2} {contact.forename_2} {contact.surname_2}</h5>
                      </Col>
                      <Col xs={12} sm={7} md={9}>
                        <form onSubmit={handlePrintSubmit} className="row">
                          <Col xs={12} sm={6} md={4}>
                            <FormControl
                              componentClass="select"
                              name="template_id"
                              value={printValues.template_id || ''}
                              onChange={handlePrintChange}
                            >
                              <option value="" disabled>Select template</option>
                              {printTemplates && printTemplates.map(template => (
                                <option key={template.id} value={template.id}>{template.name}</option>
                              ))}
                            </FormControl>
                          </Col>
                          <Col xs={12} sm={6} md={3}>
                            <FormControl
                              componentClass="select"
                              name="format"
                              value={printValues.format || ''}
                              onChange={handlePrintChange}
                            >
                              <option value="" disabled>Select format</option>
                              <option value="pdf">PDF</option>
                              <option value="doc">DOC</option>
                            </FormControl>
                          </Col>
                          <Col xs={12} sm={6} smOffset={2} mdOffset={0} md={3}>
                            <FormGroup className="form-checkbox col-xs-3 col-lg-3">
                              <input
                                id="sendViaEmail"
                                type="checkbox"
                                checked={printValues.sendEmail || false}
                                name="sendEmail"
                                onChange={handlePrintChange}
                              />
                              <label htmlFor="sendViaEmail"><span>send via email?</span></label>
                            </FormGroup>
                          </Col>
                          <Col xs={6} sm={4} md={2}>
                            <Button bsStyle="primary" type="submit" className="small" disabled={!(printValues.template_id && printValues.format)}>{loading && loading.print && <i className="fa fa-circle-o-notch fa-spin" />} Print</Button>
                          </Col>
                        </form>
                      </Col>
                    </Row>
                  </div>
                  <Row>
                    <Col xs={12} sm={8}>
                      <p><span>Phone</span> {contact.phone}</p>
                      <p><span>Mobile</span> {contact.mobile}</p>
                      <p><span>Email</span> {contact.email}</p>
                    </Col>
                    <Col xs={12} sm={4} className="modals flex end">
                      <Button bsStyle="primary" onClick={handleNotesClick}>Notes</Button>
                      <Button bsStyle="primary" onClick={handleEmailsClick}>Emails</Button>
                      <Button bsStyle="primary" onClick={handleSMSClick}>SMS</Button>
                    </Col>
                  </Row>
                </div>
                <div />
                <div />
              </div>
            </header>
            <Row className="propertyContent">
              <Col sm={2} xsHidden>
                <Sticky topOffset={-50} stickyStyle={{ top: 50 }}>
                  <ul className="propertyInfoNav">
                    <LeftNavLink scrollTo={this.handleBasicClick} title="Details" element={this.panels.basicInfo} active={active === 'Details'} />
                    <LeftNavLink scrollTo={this.handleBasicClick} title="Properties" element={this.panels.properties} active={active === 'Properties'} />
                    <LeftNavLink scrollTo={this.handleBasicClick} title="Management" element={this.panels.followUp} active={active === 'Management'} />
                    <LeftNavLink scrollTo={this.handleBasicClick} title="Locations" element={this.panels.locations} active={active === 'Locations'} />
                    <LeftNavLink scrollTo={this.handleBasicClick} title="Documents" element={this.panels.documents} active={active === 'Documents'} />
                    <LeftNavLink scrollTo={this.handleBasicClick} title="Appointments" element={this.panels.appointments} active={active === 'Appointments'} />
                    <LeftNavLink scrollTo={this.handleBasicClick} title="Activity" element={this.panels.activity} active={active === 'Activity'} />
                  </ul>
                </Sticky>
              </Col>

              <Col xs={12} sm={10}>
                <Panel>
                  {!contact && <Loading />}
                  <CollapsiblePanel
                    ref={(b) => { this.panels.basicInfo = b; }}
                    title="Details"
                    className="propertyInfo"
                    default={this.state.basic}
                  >
                    <MainForm
                      error={error}
                      user={user}
                      values={contact && contact.id && contact.id.toString() === params.id ? contact : {}}
                      categories={categories}
                      sources={sources}
                      countryCodes={countryCodes}
                      loading={loading}
                      onSubmit={mainFormSubmit}
                      onChange={mainFormChange}
                      propertyTypes={propertyTypes}
                      fillAddress={fillAddress}
                    />
                  </CollapsiblePanel>
                  <CollapsiblePanel
                    ref={(b) => { this.panels.properties = b; }}
                    title="Assigned properties"
                    className="propertyInfo"
                    default={this.state.properties}
                  >
                    <Row>
                      {contact && contact.properties && contact.properties.map(property => (
                        <Col xs={12} sm={3} key={property.id}>
                          <Link to={juvo.properties.infoLink(property.id)}>
                            {property.address}
                          </Link>
                        </Col>
                      ))}
                    </Row>
                  </CollapsiblePanel>
                  <CollapsiblePanel
                    ref={(b) => { this.panels.followUp = b; }}
                    title="Management"
                    className="propertyInfo"
                    default={this.state.followUp}
                  >
                    {contact && <FollowUpManagement element={contact.id} category={2} />}
                  </CollapsiblePanel>
                  <CollapsiblePanel
                    ref={(b) => { this.panels.locations = b; }}
                    title="Locations"
                    className="propertyInfo"
                    default={this.state.locations}
                  >
                    <form onSubmit={handleSubmitLocations}>
                      <Row>
                        {locations && locations.map(location => (
                          <Col sm={3} key={location.id}>
                            <FormGroup className="form-checkbox">
                              <Col componentClass={ControlLabel} sm={6}>
                                {location.name}
                              </Col>
                              <Col sm={6}>
                                <input
                                  type="checkbox"
                                  id={`location${location.id}`}
                                  name={location.id}
                                  checked={(contactLocations && contactLocations.map(contactLocation => contactLocation.id).indexOf(location.id) !== -1) || false}
                                  onChange={handleChangeLocations}
                                />
                                <label htmlFor={`location${location.id}`} />
                              </Col>
                            </FormGroup>
                          </Col>
                        ))}
                        <Col sm={12}>
                          <Button bsStyle="primary" type="submit">Save</Button>
                        </Col>
                      </Row>
                    </form>
                  </CollapsiblePanel>
                  <CollapsiblePanel
                    id="Documents"
                    ref={(b) => { this.panels.documents = b; }}
                    title="Documents"
                    className="propertyInfo"
                    default={this.state.documents}
                  >
                    <UploadManager
                      handleDocumentUpload={handleDocumentUpload}
                      handleDocumentDelete={handleDocumentDelete}
                      handleDocumentDownload={handleDocumentDownload}
                      documents={documents}
                      uploadDocumentProgress={progressDocuments}
                      setDocument={this.props.setDocument}
                    />
                  </CollapsiblePanel>
                  <CollapsiblePanel
                    ref={(b) => { this.panels.appointments = b; }}
                    title="Appointments"
                    className="propertyInfo"
                    default={this.state.appointments}
                  >
                    <Row className="appointments">
                      <Panel className="table">
                        <Row className="table-header">
                          <Col xs={2} sm={2}>
                            <div className="column">Date</div>
                          </Col>
                          <Col xs={2} sm={2}>
                            <div className="column">Description</div>
                          </Col>
                        </Row>
                        {!appointments || appointments.length === 0 ? <NoDataFound /> :
                          appointments.map(appointment => (
                            <Row key={appointment.id} className="table-row">
                              <Col sm={2} style={{ color: appointment.color }}>{moment(appointment.start).format(user.dateDisplayFormat)}</Col>
                              <Col sm={9} style={{ color: appointment.color }}>{appointment.title}</Col>
                              <Col sm={1} className="flex end">
                                <Link to={juvo.diary.infoLink(appointment.id)}>
                                  <i className="fa fa-calendar" />
                                </Link>
                              </Col>
                            </Row>
                          )
                        )}
                      </Panel>
                    </Row>
                  </CollapsiblePanel>
                  <CollapsiblePanel
                    ref={(b) => { this.panels.activity = b; }}
                    title="Activity"
                    className="propertyInfo"
                    default={this.state.activity}
                  >
                    <Row className="appointments">
                      <Panel className="table">
                        <Row className="table-header">
                          <Col xs={2} sm={2}>
                            <div className="column">Date</div>
                          </Col>
                          <Col xs={2} sm={2}>
                            <div className="column">Description</div>
                          </Col>
                        </Row>
                        {!activity || !activity.array || activity.array.length === 0 ? <NoDataFound /> :
                          activity.array.map(action => (
                            <Row key={action.id} className="table-row">
                              <Col sm={2}>{moment(action.date).format(user.dateDisplayFormat)}</Col>
                              <Col sm={9} dangerouslySetInnerHTML={{ __html: action.description || '' }} />
                            </Row>
                          )
                        )}
                      </Panel>
                    </Row>
                  </CollapsiblePanel>
                </Panel>
              </Col>
            </Row>
          </StickyContainer>
        </Grid>
        {modal === 'notes' && (
          <Notes
            user={user}
            note={note || {}}
            notes={notes}
            categories={noteCategories}
            handleClose={handleModalClose}
            createNote={handleNoteCreate}
            deleteNote={handleNoteDelete}
            onChange={handleNoteChange}
            error={error}
          />
        )}
        {modal === 'emails' && (
          <Emails
            user={user}
            email={email}
            emails={emails}
            handleClose={handleModalClose}
            handleEmailCreate={handleEmailCreate}
            handleEmailChange={handleEmailChange}
            error={error}
            handleAttachmentRemove={handleAttachmentRemove}
            printedDoc={printedDoc}
            handleTemplateChange={handleTemplateChange}
          />
        )}
        {modal === 'sms' && (
          <Smss
            smss={smss}
            sms={sms}
            handleSMSCreate={handleSMSCreate}
            handleSMSChange={handleSMSChange}
            handleClose={handleModalClose}
            countryCodes={countryCodes}
            error={error}
          />
        )}
      </section>
    );
  }
}

ContactInfoComponent.propTypes = {
  user: React.PropTypes.object,
  contact: React.PropTypes.object,
  categories: React.PropTypes.array,
  sources: React.PropTypes.array,
  countryCodes: React.PropTypes.array,
  printTemplates: React.PropTypes.array,
  propertyTypes: React.PropTypes.object,
  printValues: React.PropTypes.object,
  locations: React.PropTypes.array,
  activity: React.PropTypes.object,
  appointments: React.PropTypes.array,
  contactLocations: React.PropTypes.array,
  documents: React.PropTypes.array,
  note: React.PropTypes.object,
  notes: React.PropTypes.array,
  noteCategories: React.PropTypes.array,
  email: React.PropTypes.object,
  emails: React.PropTypes.array,
  sms: React.PropTypes.object,
  smss: React.PropTypes.array,
  modal: React.PropTypes.string,
  loading: React.PropTypes.object,
  uploadDocumentProgress: React.PropTypes.array,
  handleNotesClick: React.PropTypes.func.isRequired,
  handleSMSClick: React.PropTypes.func.isRequired,
  handleEmailsClick: React.PropTypes.func.isRequired,
  handlePrintSubmit: React.PropTypes.func.isRequired,
  handlePrintChange: React.PropTypes.func.isRequired,
  mainFormSubmit: React.PropTypes.func.isRequired,
  mainFormChange: React.PropTypes.func.isRequired,
  handleDocumentUpload: React.PropTypes.func.isRequired,
  handleDocumentDelete: React.PropTypes.func.isRequired,
  handleDocumentDownload: React.PropTypes.func.isRequired,
  handleSubmitLocations: React.PropTypes.func.isRequired,
  handleChangeLocations: React.PropTypes.func.isRequired,
  handleModalClose: React.PropTypes.func.isRequired,
  handleNoteCreate: React.PropTypes.func.isRequired,
  handleNoteDelete: React.PropTypes.func.isRequired,
  handleNoteChange: React.PropTypes.func.isRequired,
  handleSMSCreate: React.PropTypes.func.isRequired,
  handleSMSChange: React.PropTypes.func.isRequired,
  handleEmailCreate: React.PropTypes.func.isRequired,
  handleEmailChange: React.PropTypes.func.isRequired,
  fillAddress: React.PropTypes.func.isRequired,
  handleAttachmentRemove: React.PropTypes.func.isRequired,
};

export default ContactInfoComponent;
