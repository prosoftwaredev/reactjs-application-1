import React from 'react';
import { Grid, Panel, Row, Col, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import moment from 'moment';
import Datetime from 'react-datetime';
import { Link } from 'react-router';
import { StickyContainer, Sticky } from 'react-sticky';
import scrollToComponent from 'react-scroll-to-component';
import juvo from 'juvo';
import { momentFormats } from 'common/utils';
import FollowUpManagement from 'containers/FollowUpManagement';
import CollapsiblePanel from 'components/Common/CollapsiblePanel';
import NoDataFound from 'components/Common/NoDataFound';
import UploadManager from '../../Common/UploadManager';
import LeftNavLink from '../../Common/LeftNavLink';
import MainForm from './MainForm';
import TenancyJob from './TenancyJob';
import TenancyDisbursement from './TenancyDisbursement';
import TenancyRent from './TenancyRent';
import TenancyStatement from './TenancyStatement';

class TenancyInfo extends React.Component {
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
      printValues = {},
      activity = {},
      user = {},
      documents = [],
      tenancy = {},
      tenancyJobs = {},
      disbursments = {},
      tenancyRents = {},
      tenancyGenerateRent = {},
      tenancyAccountOverview = {},
      tenancyStatements = {},
      tenancyStatement = {},
      tenancyStatementTemplates = {},
      tenancyStatementTypes = {
        1: 'Landlord',
        2: 'Tenant',
      },
      types = {
        4: 'Inspection',
        5: 'Notification',
        6: 'Section 21',
      },
      getTenancyJobInfo,
      deleteTenancyJob,
      addTenancyJob,
      addDisbursement,
      getDisbursementInfo,
      deleteDisbursement,
      getNextRents,
      getPreviousRents,
      getNextDisbursments,
      getPreviousDisbursments,
      getNextJobs,
      getPreviousJobs,
      addTenancyRent,
      handleTenancyRentStartDateChange,
      handleTenancyRentEndDateChange,
      handleGenerateRentSubmit,
      getTenancyRentInfo,
      deleteTenancyRent,
      getTenancyPayments,
      handleTenancyStatementNext,
      handleTenancyStatementPrevious,
      // getTenancyStatementInfo,
      handleTenancyStatementChange,
      handleTenancyStatementStartDateChange,
      handleTenancyStatementEndtDateChange,
      handleTenancyStatementSubmit,
      deleteTenancyStatement,
      // getTenancyStatementTemplate,
      handleTemplateDownload,
      getTenancyLandlords,
  } = this.props;
    const dateDisplayFormat = user.dateDisplayFormat || momentFormats['d/m/Y'];
    const { active } = this.state;
    return (
      <section className="tenancy">
        <Grid fluid className="properties-page create">
          <StickyContainer>
            <header>
              <div>
                <div>
                  <Row>
                    <Col xs={12} sm={5} md={3} className="modals">
                      <Button bsStyle="primary" onClick={this.props.handleNotesClick}>Notes</Button>
                      <Button bsStyle="primary" onClick={this.props.handleAccountClick}>Account</Button>
                    </Col>
                    <Col xs={12} sm={7} md={9}>
                      <form onSubmit={this.props.handlePrintSubmit} className="row mt5">
                        <Col xs={12} sm={6} md={4}>
                          <FormControl
                            componentClass="select"
                            name="template_id"
                            value={printValues.template_id || ''}
                            onChange={this.props.handlePrintChange}
                          >
                            <option value="" disabled>Select template</option>
                            {this.props.printTemplates && this.props.printTemplates.map(template => (
                              <option key={template.id} value={template.id}>{template.name}</option>
                            ))}
                          </FormControl>
                        </Col>
                        <Col xs={12} sm={6} md={3}>
                          <FormControl
                            componentClass="select"
                            name="format"
                            value={printValues.format || ''}
                            onChange={this.props.handlePrintChange}
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
                              onChange={this.props.handlePrintChange}
                            />
                            <label htmlFor="sendViaEmail"><span>send via email?</span></label>
                          </FormGroup>
                        </Col>
                        <Col xs={6} sm={4} md={2}>
                          <Button bsStyle="primary" type="submit" className="small" disabled={!(printValues.template_id && printValues.format)}>{this.props.loading && this.props.loading.print && <i className="fa fa-circle-o-notch fa-spin" />} Print</Button>
                        </Col>
                      </form>
                    </Col>
                  </Row>
                </div>
                <Row>
                  <Col xs={12} sm={12}>
                    <p><span>Property</span>{tenancy.property && (<Link to={juvo.properties.infoLink(tenancy.property.id)}>{tenancy.property.address}</Link>)}</p>
                    <p><span>Tenants</span>{tenancy.tenant && tenancy.tenant.map(tenant => (<Link key={tenant.id} to={juvo.contacts.infoLink(tenant.id)}>{tenant.name}</Link>))}</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} className="amounts">
                    <span>Rent Due: <b>{user.currency}{tenancyAccountOverview.rent_due || 0}</b></span>
                    <span>Landlord Due: <b>{user.currency}{tenancyAccountOverview.landlord_due || 0}</b></span>
                    <span>Next Rent Due: <b>{tenancyAccountOverview.next_rent_due_date ? moment(tenancyAccountOverview.next_rent_due_date).format(user && user.dateDisplayFormat) : 'N/A'}</b></span>
                    <span>Credit: <b>{user.currency}{tenancyAccountOverview.credit || 0}</b></span>
                    <span>Debit: <b>{user.currency}{tenancyAccountOverview.debit || 0}</b></span>
                    <span>Balance: <b>{user.currency}{tenancyAccountOverview.balance || 0}</b></span>
                  </Col>
                </Row>
              </div>
            </header>
            <Row className="propertyContent">
              <Col sm={2} xsHidden>
                <Sticky topOffset={-50} stickyStyle={{ top: 50 }}>
                  <ul className="propertyInfoNav">
                    <LeftNavLink scrollTo={this.handleBasicClick} title="Details" element={this.panels.basicInfo} active={active === 'Details'} />
                    <LeftNavLink scrollTo={this.handleBasicClick} title="Statements" element={this.panels.statements} active={active === 'Statements'} />
                    <LeftNavLink scrollTo={this.handleBasicClick} title="Rents" element={this.panels.rents} active={active === 'Rents'} />
                    <LeftNavLink scrollTo={this.handleBasicClick} title="Disbursements" element={this.panels.disbursements} active={active === 'Disbursements'} />
                    <LeftNavLink scrollTo={this.handleBasicClick} title="Jobs" element={this.panels.jobs} active={active === 'Jobs'} />
                    <LeftNavLink scrollTo={this.handleBasicClick} title="Management" element={this.panels.followUp} active={active === 'Management'} />
                    <LeftNavLink scrollTo={this.handleBasicClick} title="Documents" element={this.panels.documents} active={active === 'Documents'} />
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
                    <MainForm {...this.props} />
                  </CollapsiblePanel>
                  <CollapsiblePanel
                    ref={(b) => { this.panels.statements = b; }}
                    title="Statements"
                    className="propertyInfo"
                    default={false}
                  >
                    <section className="followUp">
                      <form onSubmit={handleTenancyStatementSubmit}>
                        <Row>
                          <Col sm={6}>
                            <FormGroup>
                              <Col componentClass={ControlLabel} sm={3}>
                                Type
                              </Col>
                              <Col sm={9}>
                                <FormControl
                                  componentClass="select"
                                  name="type_id"
                                  value={tenancyStatement.type_id || ''}
                                  onChange={handleTenancyStatementChange}
                                >
                                  <option value="" disabled>Type</option>
                                  {Object.keys(tenancyStatementTypes).map(key => (
                                    <option key={key} value={key}>{tenancyStatementTypes[key]}</option>
                                  ))}
                                </FormControl>
                              </Col>
                            </FormGroup>
                          </Col>
                          {tenancyStatement.type_id === '2' ? (
                            <Col sm={6}>
                              <FormGroup>
                                <Col componentClass={ControlLabel} sm={3}>
                                  Tenant
                                </Col>
                                <Col sm={9}>
                                  <FormControl
                                    componentClass="select"
                                    name="people_id"
                                    value={tenancyStatement.people_id || ''}
                                    onChange={handleTenancyStatementChange}
                                  >
                                    <option value="" disabled>Select tenant</option>
                                    {tenancy.tenant && tenancy.tenant.map(tenant => (
                                      <option key={tenant.id} value={tenant.id}>{tenant.name}</option>
                                    ))}
                                  </FormControl>
                                </Col>
                              </FormGroup>
                            </Col>
                          ) : null}
                          <Col sm={6}>
                            <FormGroup>
                              <Col componentClass={ControlLabel} sm={3}>
                                Template
                              </Col>
                              <Col sm={9}>
                                <FormControl
                                  componentClass="select"
                                  name="template_id"
                                  value={tenancyStatement.template_id || ''}
                                  onChange={handleTenancyStatementChange}
                                >
                                  <option value="" disabled>Template</option>
                                  {Object.keys(tenancyStatementTemplates).map(key => (
                                    <option key={key} value={tenancyStatementTemplates[key].id}>{tenancyStatementTemplates[key].name}</option>
                                  ))}
                                </FormControl>
                              </Col>
                            </FormGroup>
                          </Col>
                          <Col sm={6}>
                            <FormGroup>
                              <Col componentClass={ControlLabel} sm={3}>
                                Start Date
                              </Col>
                              <Col sm={9}>
                                <Datetime
                                  dateFormat={user && user.dateDisplayFormat}
                                  inputprops={{ name: 'start_date', placeholder: 'Start date' }}
                                  value={tenancyStatement.start_date ? moment(tenancyStatement.start_date) : ''}
                                  onChange={handleTenancyStatementStartDateChange}
                                  closeOnSelect
                                  timeFormat={false}
                                />
                              </Col>
                            </FormGroup>
                          </Col>
                          <Col sm={6}>
                            <FormGroup>
                              <Col componentClass={ControlLabel} sm={3}>
                                End Date
                              </Col>
                              <Col sm={9}>
                                <Datetime
                                  dateFormat={user && user.dateDisplayFormat}
                                  inputprops={{ name: 'end_date', placeholder: 'End date' }}
                                  value={tenancyStatement.end_date ? moment(tenancyStatement.end_date) : ''}
                                  onChange={handleTenancyStatementEndtDateChange}
                                  closeOnSelect
                                  timeFormat={false}
                                />
                              </Col>
                            </FormGroup>
                          </Col>
                          <Col sm={2}>
                            <FormGroup>
                              <Col sm={12}>
                                <Button bsStyle="success" type="submit">Add statement</Button>
                              </Col>
                            </FormGroup>
                          </Col>
                        </Row>
                      </form>
                      <Row className="managements">
                        <Panel className="table">
                          <Row className="table-header">
                            <Col xs={2} sm={2}>
                              <div className="column">Type</div>
                            </Col>
                            <Col xs={2} sm={2}>
                              <div className="column">Start Date</div>
                            </Col>
                            <Col xs={2} sm={3}>
                              <div className="column">End Date</div>
                            </Col>
                          </Row>
                          {!tenancyStatements.data || tenancyStatements.data.length === 0 ? <NoDataFound /> :
                            tenancyStatements.data.map((statement, index) => (
                              <TenancyStatement
                                key={statement.id}
                                index={index}
                                type={tenancyStatementTypes[statement.type_id]}
                                statement={statement}
                                dateDisplayFormat={dateDisplayFormat}
                                deleteTenancyStatement={deleteTenancyStatement}
                                handleTemplateDownload={handleTemplateDownload}
                                setDocument={this.props.setDocument}
                              />
                            )
                          )}
                          {(tenancyStatements.current_page && tenancyStatements.current_page < tenancyStatements.total_page) ? (
                            <Button bsStyle="link" onClick={handleTenancyStatementNext}>Next...</Button>
                          ) : null}
                          {(tenancyStatements.current_page && tenancyStatements.current_page > 1) ? (
                            <Button bsStyle="link" onClick={handleTenancyStatementPrevious}>Previous...</Button>
                          ) : null}
                        </Panel>
                      </Row>
                    </section>
                  </CollapsiblePanel>
                  <CollapsiblePanel
                    ref={(b) => { this.panels.rents = b; }}
                    title="Rents"
                    className="propertyInfo"
                    default={false}
                  >
                    <section className="followUp">
                      {tenancyRents.data && tenancyRents.data.length <= 0 ? (
                        <form onSubmit={handleGenerateRentSubmit}>
                          <Row>
                            <Col sm={5}>
                              <FormGroup>
                                <Col sm={3} componentClass={ControlLabel}>
                                  Start Date
                                </Col>
                                <Col sm={9}>
                                  <Datetime
                                    inputprops={{ name: 'start_date', placeholder: 'Start date' }}
                                    value={tenancyGenerateRent.start_date ? moment(tenancyGenerateRent.start_date) : ''}
                                    timeFormat={false}
                                    dateFormat={user.dateDisplayFormat}
                                    onChange={handleTenancyRentStartDateChange}
                                    closeOnSelect
                                  />
                                </Col>
                              </FormGroup>
                            </Col>
                            <Col sm={5}>
                              <FormGroup>
                                <Col sm={3} componentClass={ControlLabel}>
                                  End Date
                                </Col>
                                <Col sm={9}>
                                  <Datetime
                                    inputprops={{ name: 'end_date', placeholder: 'End date' }}
                                    value={tenancyGenerateRent.end_date ? moment(tenancyGenerateRent.end_date) : ''}
                                    timeFormat={false}
                                    dateFormat={user.dateDisplayFormat}
                                    onChange={handleTenancyRentEndDateChange}
                                    closeOnSelect
                                  />
                                </Col>
                              </FormGroup>
                            </Col>
                            <Col sm={2}>
                              <FormGroup>
                                <Button bsStyle="success" type="submit">Generate</Button>
                              </FormGroup>
                            </Col>
                          </Row>
                        </form>
                      ) : (
                        <Row>
                          <Col sm={4}>
                            <Col sm={12}>
                              <Button bsStyle="success" bsSize="xsmall" onClick={addTenancyRent}>Create Rent Demand</Button>
                            </Col>
                          </Col>
                          <Col sm={4}>
                            <Button bsStyle="warning" bsSize="xsmall" onClick={getTenancyPayments}>Rental Payments</Button>
                          </Col>
                          <Col sm={4}>
                            <Button bsStyle="warning" bsSize="xsmall" onClick={getTenancyLandlords}>Landlord Payments</Button>
                          </Col>
                        </Row>
                      )}
                      <Row className="managements">
                        <Panel className="table">
                          <Row className="table-header">
                            <Col xs={2} sm={2}>
                              <div className="column">Date</div>
                            </Col>
                            <Col xs={2} sm={2}>
                              <div className="column">Amount</div>
                            </Col>
                            <Col xs={2} sm={3}>
                              <div className="column">Management Fee Due</div>
                            </Col>
                          </Row>
                          {!tenancyRents.data || tenancyRents.data.length === 0 ? <NoDataFound /> :
                            tenancyRents.data.map((rent, index) => (
                              <TenancyRent
                                key={rent.id}
                                index={index}
                                rent={rent}
                                dateDisplayFormat={dateDisplayFormat}
                                getTenancyRentInfo={getTenancyRentInfo}
                                deleteTenancyRent={deleteTenancyRent}
                                user={user}
                              />
                            )
                          )}
                          {(tenancyRents.current_page && tenancyRents.current_page < tenancyRents.total_page) ? (
                            <Button bsStyle="link" onClick={getNextRents}>Next...</Button>
                          ) : null}
                          {(tenancyRents.current_page && tenancyRents.current_page > 1) ? (
                            <Button bsStyle="link" onClick={getPreviousRents}>Previous...</Button>
                          ) : null}
                        </Panel>
                      </Row>
                    </section>
                  </CollapsiblePanel>
                  <CollapsiblePanel
                    ref={(b) => { this.panels.disbursements = b; }}
                    title="Disbursements"
                    className="propertyInfo"
                    default={false}
                  >
                    <section className="followUp">
                      <Row>
                        <Col sm={12}>
                          <FormGroup>
                            <Col sm={12}>
                              <Button bsStyle="success" bsSize="xsmall" onClick={addDisbursement}>Add Disbursement</Button>
                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="managements">
                        <Panel className="table">
                          <Row className="table-header">
                            <Col xs={1} sm={1}>
                              <div className="column">VAT</div>
                            </Col>
                            <Col xs={2} sm={2}>
                              <div className="column">Date</div>
                            </Col>
                            <Col xs={2} sm={2}>
                              <div className="column">Amount</div>
                            </Col>
                            <Col xs={6} sm={6}>
                              <div className="column">Description</div>
                            </Col>
                          </Row>
                          {!disbursments.data || disbursments.data.length === 0 ? <NoDataFound /> :
                            disbursments.data.map((disbursement, index) => (
                              <TenancyDisbursement
                                key={disbursement.id}
                                index={index}
                                disbursement={disbursement}
                                dateDisplayFormat={dateDisplayFormat}
                                getDisbursementInfo={getDisbursementInfo}
                                deleteDisbursement={deleteDisbursement}
                                user={user}
                              />
                            )
                          )}
                          {(disbursments.current_page && disbursments.current_page < disbursments.total_page) ? (
                            <Button bsStyle="link" onClick={getNextDisbursments}>Next...</Button>
                          ) : null}
                          {(disbursments.current_page && disbursments.current_page > 1) ? (
                            <Button bsStyle="link" onClick={getPreviousDisbursments}>Previous...</Button>
                          ) : null}
                        </Panel>
                      </Row>
                    </section>
                  </CollapsiblePanel>
                  <CollapsiblePanel
                    ref={(b) => { this.panels.jobs = b; }}
                    title="Jobs"
                    className="propertyInfo"
                    default={false}
                  >
                    <section className="followUp">
                      <Row>
                        <Col sm={12}>
                          <Col sm={12}>
                            <Button bsStyle="success" bsSize="xsmall" onClick={addTenancyJob}>Add Job</Button>
                          </Col>
                        </Col>
                      </Row>
                      <Row className="managements">
                        <Panel className="table">
                          <Row className="table-header">
                            <Col xs={1} sm={1}>
                              <div className="column">Complete</div>
                            </Col>
                            <Col xs={2} sm={2}>
                              <div className="column">Date</div>
                            </Col>
                            <Col xs={2} sm={2}>
                              <div className="column">Price</div>
                            </Col>
                            <Col xs={6} sm={6}>
                              <div className="column">Description</div>
                            </Col>
                          </Row>
                          {!tenancyJobs.data || tenancyJobs.data.length === 0 ? <NoDataFound /> :
                            tenancyJobs.data.map((job, index) => (
                              <TenancyJob
                                key={job.id}
                                index={index}
                                job={job}
                                dateDisplayFormat={dateDisplayFormat}
                                getTenancyJobInfo={getTenancyJobInfo}
                                deleteTenancyJob={deleteTenancyJob}
                                user={user}
                              />
                            )
                          )}
                          {(tenancyJobs.current_page && tenancyJobs.current_page < tenancyJobs.total_page) ? (
                            <Button bsStyle="link" onClick={getNextJobs}>Next...</Button>
                          ) : null}
                          {(tenancyJobs.current_page && tenancyJobs.current_page > 1) ? (
                            <Button bsStyle="link" onClick={getPreviousJobs}>Previous...</Button>
                          ) : null}
                        </Panel>
                      </Row>
                    </section>
                  </CollapsiblePanel>
                  <CollapsiblePanel
                    ref={(b) => { this.panels.followUp = b; }}
                    title="Management"
                    className="propertyInfo"
                    default={false}
                  >
                    {tenancy && <FollowUpManagement element={tenancy.id} category={4} types={types} />}
                  </CollapsiblePanel>
                  <CollapsiblePanel
                    id="Documents"
                    ref={(b) => { this.panels.documents = b; }}
                    title="Documents"
                    className="propertyInfo"
                    default={false}
                  >
                    <UploadManager
                      handleDocumentUpload={this.props.handleDocumentUpload}
                      handleDocumentDelete={this.props.handleDocumentDelete}
                      handleDocumentDownload={this.props.handleDocumentDownload}
                      documents={documents}
                      uploadDocumentProgress={this.props.uploadDocumentProgress}
                      setDocument={this.props.setDocument}
                    />
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
      </section>
    );
  }
}

TenancyInfo.propTypes = {
  loading: React.PropTypes.object,
  printValues: React.PropTypes.object,
  printTemplates: React.PropTypes.array,
  documents: React.PropTypes.array,
  tenancyJobs: React.PropTypes.object,
  tenancyRents: React.PropTypes.object,
  tenancyGenerateRent: React.PropTypes.object,
  disbursments: React.PropTypes.object,
  tenancyAccountOverview: React.PropTypes.object,
  tenancyStatements: React.PropTypes.object,
  tenancyStatement: React.PropTypes.object,
  tenancyStatementTemplates: React.PropTypes.array,
  handleTenancyStatementNext: React.PropTypes.func.isRequired,
  handleTenancyStatementPrevious: React.PropTypes.func.isRequired,
  // getTenancyStatementInfo: React.PropTypes.func.isRequired,
  handleTenancyStatementChange: React.PropTypes.func.isRequired,
  handleTenancyStatementStartDateChange: React.PropTypes.func.isRequired,
  handleTenancyStatementEndtDateChange: React.PropTypes.func.isRequired,
  handleTenancyStatementSubmit: React.PropTypes.func.isRequired,
  deleteTenancyStatement: React.PropTypes.func.isRequired,
  // getTenancyStatementTemplate: React.PropTypes.func.isRequired,
  handleTemplateDownload: React.PropTypes.func.isRequired,
  handlePrintSubmit: React.PropTypes.func.isRequired,
  handlePrintChange: React.PropTypes.func.isRequired,
  handleNotesClick: React.PropTypes.func.isRequired,
  getTenancyJobInfo: React.PropTypes.func.isRequired,
  addTenancyJob: React.PropTypes.func.isRequired,
  deleteTenancyJob: React.PropTypes.func.isRequired,
  addDisbursement: React.PropTypes.func.isRequired,
  getDisbursementInfo: React.PropTypes.func.isRequired,
  deleteDisbursement: React.PropTypes.func.isRequired,
  getNextRents: React.PropTypes.func.isRequired,
  getPreviousRents: React.PropTypes.func.isRequired,
  getNextDisbursments: React.PropTypes.func.isRequired,
  getPreviousDisbursments: React.PropTypes.func.isRequired,
  getNextJobs: React.PropTypes.func.isRequired,
  getPreviousJobs: React.PropTypes.func.isRequired,
  addTenancyRent: React.PropTypes.func.isRequired,
  handleGenerateRentSubmit: React.PropTypes.func.isRequired,
  handleTenancyRentEndDateChange: React.PropTypes.func.isRequired,
  handleTenancyRentStartDateChange: React.PropTypes.func.isRequired,
  getTenancyRentInfo: React.PropTypes.func.isRequired,
  deleteTenancyRent: React.PropTypes.func.isRequired,
  getTenancyPayments: React.PropTypes.func.isRequired,
  handleAccountClick: React.PropTypes.func.isRequired,
  getTenancyLandlords: React.PropTypes.func.isRequired,
};

export default TenancyInfo;
