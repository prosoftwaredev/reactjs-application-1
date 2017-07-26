import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { StickyContainer, Sticky } from 'react-sticky';
// import CircularProgressbar from 'react-circular-progressbar';
import scrollToComponent from 'react-scroll-to-component';
import {
  Button,
  Grid,
  Panel,
  Row,
  Col,
  Nav,
  NavItem,
  FormControl,
  FormGroup,
  ControlLabel,
  ProgressBar,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import juvo from 'juvo';
import FollowUpManagement from 'containers/FollowUpManagement';
import CollapsiblePanel from 'components/Common/CollapsiblePanel';
import NoDataFound from 'components/Common/NoDataFound';
import { momentFormats, typeaheadFilterBy } from 'common/utils';
import MainForm from './MainForm';
import Contacts from './modals/Contacts';
import Notes from '../../Common/modals/Notes';
import Emails from '../../Common/modals/Emails';
import UploadManager from '../../Common/UploadManager';
import LeftNavLink from '../../Common/LeftNavLink';
import Plugin from './Plugin';

class PropertyInfoComponent extends React.Component {
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
      property = {},
      types,
      followUpTypes = {
        1: 'Gas Safety',
        2: 'Electrical',
        3: 'EPC',
      },
      prices,
      statuses,
      categories,
      contacts,
      note,
      notes,
      noteCategories,
      email,
      emails,
      autocomplete,
      directValues,
      sendValues,
      modal,
      location,
      locations,
      templates,
      printTemplates,
      printValues = {},
      loading,
      assetsType,
      uploadImageProgress,
      uploadDocumentProgress,
      activity,
      appointments,
      documents,
      propertyLocations,
      handleNotesClick,
      handleEmailsClick,
      handlePrintSubmit,
      handlePrintChange,
      mainFormSubmit,
      mainFormChange,
      mainFormDateChange,
      handleAssetTypeChange,
      handleAssetsUpload,
      handleContactsClick,
      handleSendSubmit,
      handleSendChange,
      handleSendDirectSubmit,
      handleAutocompleteDone,
      handleAutocomplete,
      handleSendDirectChange,
      handleSubmitLocations,
      handleChangeLocations,
      handleDocumentUpload,
      handleDocumentDelete,
      handleDocumentDownload,
      handleModalClose,
      handleNoteCreate,
      handleNoteDelete,
      handleNoteChange,
      owners,
      handleOwnerChange,
      handleOwnerSelect,
      addNewContact,
      newContact,
      handleEmailCreate,
      handleEmailChange,
      handleAttachmentRemove,
      printedDoc,
    } = this.props;
    console.log(printTemplates);
    const disabled = (assetsType) || 'disabled';
    const dateDisplayFormat = (user && user.dateDisplayFormat) || momentFormats['d/m/Y'];
    const owner = (property.owner && property.owner.full_name) || property.owner;
    const { active } = this.state;
    return (<section className="property">
      {property && (
        <Grid fluid className="properties-page create">
          <StickyContainer>
            <header>
              <img src={property.thumbnail} alt="" />
              <div>
                <div>
                  <Row>
                    <Col xs={12} sm={5} md={3}>
                      <h2>{property.advertise_address}</h2>
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
                  <Col xs={12} sm={9}>
                    <p><span>Address</span> {property.full_address}</p>
                    <p><span>price</span> {`${user.currency}${property.price}`}</p>
                    <p><span>owner</span> <Link to={juvo.contacts.infoLink(property.owner_id)}>{owner}</Link></p>
                  </Col>
                  <Col xs={12} sm={3} className="modals">
                    <Button bsStyle="primary" onClick={handleNotesClick}>Notes</Button>
                    <Button bsStyle="primary" onClick={handleEmailsClick}>Emails</Button>
                  </Col>
                </Row>
                <Row>
                  {property.plugin && Object.keys(property.plugin).map(key => (
                    <Plugin key={key} plugin={key} pluginRemove={this.props.pluginRemove} pluginUpdate={this.props.pluginUpdate} />
                  ))}
                </Row>
              </div>
            </header>
            <Row className="propertyContent">
              <Col sm={2} xsHidden>
                <Sticky topOffset={-50} stickyStyle={{ top: 50 }}>
                  <ul className="propertyInfoNav">
                    <LeftNavLink scrollTo={this.handleBasicClick} title="Details" element={this.panels.basicInfo} active={active === 'Details'} />
                    <LeftNavLink scrollTo={this.handleBasicClick} title="Images" element={this.panels.images} active={active === 'Images'} />
                    <LeftNavLink scrollTo={this.handleBasicClick} title="Marketing" element={this.panels.marketing} active={active === 'Marketing'} />
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
                  <CollapsiblePanel
                    ref={(b) => { this.panels.basicInfo = b; }}
                    title="Details"
                    className="propertyInfo"
                    default
                  >
                    <MainForm
                      error={error}
                      user={user}
                      values={property || {}}
                      types={types}
                      prices={prices}
                      statuses={statuses}
                      categories={categories}
                      loading={loading}
                      onSubmit={mainFormSubmit}
                      onChange={mainFormChange}
                      onDateChange={mainFormDateChange}
                      owners={owners}
                      handleOwnerChange={handleOwnerChange}
                      handleOwnerSelect={handleOwnerSelect}
                      addNewContact={addNewContact}
                      newContact={newContact}
                      quickCreateContact={this.props.quickCreateContact}
                      fillAddress={this.props.fillAddress}
                      changeDescription={this.props.changeDescription}
                      toggleInlineStyle={this.props.toggleInlineStyle}
                      toggleBlockType={this.props.toggleBlockType}
                      description={this.props.description}
                    />
                  </CollapsiblePanel>
                  <CollapsiblePanel
                    ref={(b) => { this.panels.images = b; }}
                    title="Images"
                    className="propertyInfo"
                    default={false}
                  >
                    <Row className="assetsUpload">
                      <Col md={6} className="flex end">
                        <FormControl
                          componentClass="select"
                          className="inline"
                          value={assetsType || ''}
                          onChange={handleAssetTypeChange}
                        >
                          <option value="" disabled>Select file type</option>
                          <option value="1">Images</option>
                          <option value="2">Floorplans</option>
                          <option value="3">EPC</option>
                          <option value="4">Brochures</option>
                        </FormControl>
                        <label htmlFor="asset" className={`upload ${disabled}`}>
                          {/* uploadImageProgress && parseInt(uploadImageProgress, 10) !== -1 ? <CircularProgressbar percentage={parseInt(uploadImageProgress, 10)} /> : null */}
                          Upload
                        </label>
                        <input
                          type="file"
                          className="file"
                          id="asset"
                          onChange={handleAssetsUpload}
                          accept="image/*|.pdf"
                          disabled={!(assetsType)}
                          multiple
                        />
                      </Col>
                      <Col md={6}>
                        {uploadImageProgress && parseInt(uploadImageProgress, 10) !== -1 ? (
                          <ProgressBar
                            now={parseInt(uploadImageProgress, 10) || 0}
                            label={parseInt(uploadImageProgress, 10) !== -1 ? `${parseInt(uploadImageProgress, 10) || 0}%` : false}
                          />
                        ) : null}
                      </Col>
                    </Row>
                    <Row className="assetsContainer">
                      <Col xs={12}>
                        <Nav bsStyle="tabs" activeKey={1}>
                          <LinkContainer
                            to={juvo.properties.assets.imagesLink(this.props.params.id)}
                            className={location.pathname === juvo.properties.infoLink(this.props.params.id) ||
                              location.pathname === juvo.properties.infoLink(this.props.params.id) + '/' ? 'active' : ''}
                          >
                            <NavItem eventKey={1}>Images</NavItem>
                          </LinkContainer>
                          <LinkContainer to={juvo.properties.assets.floorplansLink(this.props.params.id)}>
                            <NavItem eventKey={2}>Floorplans</NavItem>
                          </LinkContainer>
                          <LinkContainer to={juvo.properties.assets.epcLink(this.props.params.id)}>
                            <NavItem eventKey={3}>EPC</NavItem>
                          </LinkContainer>
                          <LinkContainer to={juvo.properties.assets.brochuresLink(this.props.params.id)}>
                            <NavItem eventKey={4}>Brochures</NavItem>
                          </LinkContainer>
                        </Nav>
                        <div className="assets">{this.props.children}</div>
                      </Col>
                    </Row>
                  </CollapsiblePanel>

                  <CollapsiblePanel
                    ref={(b) => { this.panels.marketing = b; }}
                    title="Marketing"
                    className="propertyInfo"
                    default={false}
                  >
                    <Row className="marketing">
                      <Col md={4}>
                        <form onSubmit={handleSendSubmit}>
                          <p>send to all</p>
                          <FormControl
                            value={(sendValues && sendValues.template_id) || ''}
                            componentClass="select"
                            name="template_id"
                            onChange={handleSendChange}
                          >
                            <option value="">Email template</option>
                            {templates && templates.map(template => <option key={template.id} value={template.id}>{template.name}</option>)}
                          </FormControl>
                          <Button
                            bsStyle="primary"
                            type="submit"
                            disabled={!sendValues}
                            className={sendValues ? 'send' : 'disabled'}
                          >Send</Button>
                        </form>
                      </Col>
                      <Col md={5} lg={6}>
                        <form onSubmit={handleSendDirectSubmit}>
                          <p>send direct to contact</p>
                          <Typeahead
                            onChange={handleAutocompleteDone}
                            onInputChange={handleAutocomplete}
                            options={autocomplete || []}
                            filterBy={typeaheadFilterBy}
                            labelKey="name"
                            name="contact_id"
                          />
                          <FormControl
                            value={(directValues && directValues.template_id) || ''}
                            componentClass="select"
                            name="template_id"
                            onChange={handleSendDirectChange}
                          >
                            <option value="">Email template</option>
                            {templates && templates.map(template => <option key={template.id} value={template.id}>{template.name}</option>)}
                          </FormControl>
                          <Button bsStyle="primary" type="submit">Send</Button>
                        </form>
                      </Col>
                      <Col xs={12} md={1} lg={1}>
                        <Button bsStyle="primary" onClick={handleContactsClick}>View Matched Contacts</Button>
                      </Col>

                    </Row>
                  </CollapsiblePanel>
                  <CollapsiblePanel
                    ref={(b) => { this.panels.followUp = b; }}
                    title="Management"
                    className="propertyInfo"
                    default={false}
                  >
                    {property && <FollowUpManagement element={property.id} category={3} types={followUpTypes} />}
                  </CollapsiblePanel>
                  <CollapsiblePanel
                    ref={(b) => { this.panels.locations = b; }}
                    title="Locations"
                    className="propertyInfo"
                    default={false}
                  >
                    <form onSubmit={handleSubmitLocations} className="locations">
                      <Row>
                        {locations && locations.map(propertyLocation => (
                          <Col sm={3} key={propertyLocation.id}>
                            <FormGroup className="form-checkbox">
                              <Col componentClass={ControlLabel} sm={6}>
                                {propertyLocation.name}
                              </Col>
                              <Col sm={6}>
                                <input
                                  type="checkbox"
                                  id={`location${propertyLocation.id}`}
                                  name={propertyLocation.id}
                                  checked={propertyLocations && propertyLocations.map(item => item.id).indexOf(propertyLocation.id) !== -1}
                                  onChange={handleChangeLocations}
                                />
                                <label htmlFor={`location${propertyLocation.id}`} />
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
                    default={false}
                  >
                    <UploadManager
                      setDocument={this.props.setDocument}
                      handleDocumentUpload={handleDocumentUpload}
                      handleDocumentDelete={handleDocumentDelete}
                      handleDocumentDownload={handleDocumentDownload}
                      documents={documents}
                      uploadDocumentProgress={uploadDocumentProgress}
                    />
                  </CollapsiblePanel>
                  <CollapsiblePanel
                    ref={(b) => { this.panels.appointments = b; }}
                    title="Appointments"
                    className="propertyInfo"
                    default={false}
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
                              <Col sm={2} style={{ color: appointment.color }}>{moment(appointment.start).format(dateDisplayFormat)}</Col>
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
                    default={false}
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
                              <Col sm={2}>{moment(action.date).format(dateDisplayFormat)}</Col>
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
      )}

      {modal === 'contacts' && (
        <Contacts
          contacts={contacts}
          handleClose={handleModalClose}
          error={error}
        />
      )}

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
          error={error}
          handleEmailCreate={handleEmailCreate}
          handleEmailChange={handleEmailChange}
          handleAttachmentRemove={handleAttachmentRemove}
          printedDoc={printedDoc}
          handleTemplateChange={this.props.handleTemplateChange}
        />
      )}
    </section>
    );
  }
}

PropertyInfoComponent.propTypes = {
  user: React.PropTypes.object,
  property: React.PropTypes.object,
  types: React.PropTypes.array,
  prices: React.PropTypes.array,
  statuses: React.PropTypes.array,
  categories: React.PropTypes.array,
  contacts: React.PropTypes.array,
  note: React.PropTypes.object,
  notes: React.PropTypes.array,
  noteCategories: React.PropTypes.array,
  emails: React.PropTypes.array,
  modal: React.PropTypes.string,
  templates: React.PropTypes.array,
  printTemplates: React.PropTypes.array,
  printValues: React.PropTypes.object,
  locations: React.PropTypes.array,
  loading: React.PropTypes.object,
  activity: React.PropTypes.object,
  appointments: React.PropTypes.array,
  assetsType: React.PropTypes.number,
  uploadImageProgress: React.PropTypes.number,
  uploadDocumentProgress: React.PropTypes.number,
  documents: React.PropTypes.array,
  propertyLocations: React.PropTypes.array,
  owners: React.PropTypes.array,
  handleNotesClick: React.PropTypes.func.isRequired,
  handleEmailsClick: React.PropTypes.func.isRequired,
  handlePrintSubmit: React.PropTypes.func.isRequired,
  handlePrintChange: React.PropTypes.func.isRequired,
  mainFormSubmit: React.PropTypes.func.isRequired,
  mainFormChange: React.PropTypes.func.isRequired,
  mainFormDateChange: React.PropTypes.func.isRequired,
  handleAssetTypeChange: React.PropTypes.func.isRequired,
  handleAssetsUpload: React.PropTypes.func.isRequired,
  handleContactsClick: React.PropTypes.func.isRequired,
  handleSendSubmit: React.PropTypes.func.isRequired,
  handleSendChange: React.PropTypes.func.isRequired,
  handleSendDirectSubmit: React.PropTypes.func.isRequired,
  handleAutocompleteDone: React.PropTypes.func.isRequired,
  handleAutocomplete: React.PropTypes.func.isRequired,
  handleSendDirectChange: React.PropTypes.func.isRequired,
  handleSubmitLocations: React.PropTypes.func.isRequired,
  handleChangeLocations: React.PropTypes.func.isRequired,
  handleDocumentUpload: React.PropTypes.func.isRequired,
  handleDocumentDelete: React.PropTypes.func.isRequired,
  handleDocumentDownload: React.PropTypes.func.isRequired,
  handleModalClose: React.PropTypes.func.isRequired,
  handleNoteCreate: React.PropTypes.func.isRequired,
  handleNoteDelete: React.PropTypes.func.isRequired,
  handleNoteChange: React.PropTypes.func.isRequired,
  handleOwnerChange: React.PropTypes.func.isRequired,
  handleOwnerSelect: React.PropTypes.func.isRequired,
  handleEmailCreate: React.PropTypes.func.isRequired,
  handleEmailChange: React.PropTypes.func.isRequired,
};


export default PropertyInfoComponent;
