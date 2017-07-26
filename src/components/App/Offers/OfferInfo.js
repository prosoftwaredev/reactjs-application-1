import React from 'react';
import { Grid, Panel, Row, Col, Button, FormControl, FormGroup } from 'react-bootstrap';
import moment from 'moment';
import { StickyContainer, Sticky } from 'react-sticky';
import scrollToComponent from 'react-scroll-to-component';
import FollowUpManagement from 'containers/FollowUpManagement';
import NoDataFound from 'components/Common/NoDataFound';
import { momentFormats } from 'common/utils';
import CollapsiblePanel from 'components/Common/CollapsiblePanel';
import LeftNavLink from '../../Common/LeftNavLink';
import UploadManager from '../../Common/UploadManager';
import MainForm from './MainForm';

class OfferInfo extends React.Component {
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
    const { printValues = {}, activity = {}, user = {}, documents = [], offer = {} } = this.props;
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
                    <Col xs={12} sm={5} md={3}>
                      <Button bsStyle="primary" onClick={this.props.handleNotesClick}>Notes</Button>
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
                <div>
                  <p><span>Property</span>{(offer.property && offer.property.address) || 'N/A'}</p>
                  <p><span>applicant</span>{(offer.applicant && offer.applicant.name) || 'N/A'}</p>
                  <p><span>applicant solicitor</span>{(offer.applicant_solicitor && offer.applicant_solicitor.name) || 'N/A'}</p>
                  <p><span>vendor solicitor</span>{(offer.vendor_solicitor && offer.vendor_solicitor.name) || 'N/A'}</p>
                  <p><span>amount</span>{offer.price}</p>
                </div>
                <div />
              </div>
            </header>
            <Row className="propertyContent">
              <Col sm={2} xsHidden>
                <Sticky topOffset={-50} stickyStyle={{ top: 50 }}>
                  <ul className="propertyInfoNav">
                    <LeftNavLink scrollTo={this.handleBasicClick} title="Details" element={this.panels.basicInfo} active={active === 'Details'} />
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
                    ref={(b) => { this.panels.followUp = b; }}
                    title="Management"
                    className="propertyInfo"
                    default={false}
                  >
                    {offer && <FollowUpManagement element={offer.id} category={5} />}
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

OfferInfo.propTypes = {
  loading: React.PropTypes.object,
  printValues: React.PropTypes.object,
  printTemplates: React.PropTypes.array,
  documents: React.PropTypes.array,
  handlePrintSubmit: React.PropTypes.func.isRequired,
  handlePrintChange: React.PropTypes.func.isRequired,
  handleNotesClick: React.PropTypes.func.isRequired,
};

export default OfferInfo;
