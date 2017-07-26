import React from 'react';
import { Grid, Panel, Row, Col, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

const SettingsComponent = ({ values = {}, handleChange, handleSubmit, uploadLogo }) => (
  <Grid className="properties-page create settings">
    <Panel>
      <Row>
        <Col md={12}>
          <form onSubmit={handleSubmit}>
            {values.id && (<input type="hidden" value={values.is} />)}
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Col componentClass={ControlLabel} sm={3}>
                    Company Logo
                  </Col>
                  <Col sm={9}>
                    <div className="upload-manager">
                      <div>
                        <label htmlFor="document" className="upload"><img src={values.logo || require('img/multimedia.svg')} alt="upload logo" /></label>
                        <input
                          type="file"
                          className="file"
                          id="document"
                          onChange={uploadLogo}
                        />
                      </div>
                    </div>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} sm={3}>
                    Diary Week Day Start
                  </Col>
                  <Col sm={9}>
                    <FormControl
                      componentClass="select"
                      name="diary_day_start"
                      value={values.diary_day_start || ''}
                      onChange={handleChange}
                      >
                      <option value={0}>Sunday</option>
                      <option value={1}>Monday</option>
                      <option value={2}>Tuesday</option>
                      <option value={3}>Wednesday</option>
                      <option value={4}>Thursday</option>
                      <option value={5}>Friday</option>
                      <option value={6}>Saturday</option>
                    </FormControl>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} sm={3}>
                    Currency Symbol
                  </Col>
                  <Col sm={9}>
                    <FormControl
                      componentClass="select"
                      name="currency_symbol"
                      value={values.currency_symbol || ''}
                      onChange={handleChange}
                      >
                      <option value="#36;">$</option>
                      <option value="#163;">£</option>
                      <option value="#165;">¥</option>
                      <option value="#128;">€</option>
                      <option value="#8361;">₩</option>
                      <option value="#8377;">₹</option>
                    </FormControl>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} sm={3}>
                    Company Name
                  </Col>
                  <Col sm={9}>
                    <FormControl
                      type="text"
                      name="name"
                      value={values.name || ''}
                      onChange={handleChange}
                      />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} sm={3}>
                    Company Phone
                  </Col>
                  <Col sm={9}>
                    <FormControl
                      type="tel"
                      name="company_phone"
                      value={values.company_phone || ''}
                      onChange={handleChange}
                      />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} sm={3}>
                    Administration Email
                  </Col>
                  <Col sm={9}>
                    <FormControl
                      type="email"
                      name="admin_email"
                      value={values.admin_email || ''}
                      onChange={handleChange}
                      />
                    <small>Email used to receive Juvo notification emails.</small>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} sm={3}>
                    Website Address
                  </Col>
                  <Col sm={9}>
                    <FormControl
                      type="text"
                      name="website_url"
                      value={values.website_url || ''}
                      onChange={handleChange}
                      />
                    <small>e.g. http://www.juvo.io</small>
                  </Col>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Col componentClass={ControlLabel} sm={3}>
                    SMS From Name
                  </Col>
                  <Col sm={9}>
                    <FormControl
                      type="text"
                      name="sms_from"
                      value={values.sms_from || ''}
                      onChange={handleChange}
                      />
                    <small>Name the SMS will appear from when sending from Juvo.</small>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} sm={3}>
                    Email From Name
                  </Col>
                  <Col sm={9}>
                    <FormControl
                      type="text"
                      name="email_from"
                      value={values.email_from || ''}
                      onChange={handleChange}
                      />
                    <small>Name the Email will appear from when sending from Juvo.</small>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} sm={3}>
                    Email Reply Address
                  </Col>
                  <Col sm={9}>
                    <FormControl
                      type="email"
                      name="email_reply"
                      value={values.email_reply || ''}
                      onChange={handleChange}
                      />
                    <small>Reply email address for any emails sent from the Juvo system.</small>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} sm={3}>
                    Marketing Email Subject
                  </Col>
                  <Col sm={9}>
                    <FormControl
                      type="text"
                      name="email_subject"
                      value={values.email_subject || ''}
                      onChange={handleChange}
                      />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} sm={3}>
                    System Date Format
                  </Col>
                  <Col sm={9}>
                    <FormControl
                      componentClass="select"
                      name="date_format"
                      value={values.date_format || ''}
                      onChange={handleChange}
                      >
                      <option value="d/m/Y">Day/Month/Year</option>
                      <option value="m/d/Y">Month/Day/Year</option>
                      <option value="Y/m/d">Year/Month/Day</option>
                    </FormControl>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} sm={3}>
                    Date Display Format
                  </Col>
                  <Col sm={9}>
                    <FormControl
                      componentClass="select"
                      name="date_display_format"
                      value={values.date_display_format || ''}
                      onChange={handleChange}
                    >
                      <option value="d/m/Y">Day/Month/Year (01/09/2015)</option>
                      <option value="m/d/Y">Month/Day/Year (09/01/2015)</option>
                      <option value="Y/m/d">Year/Month/Day (2015/09/01)</option>
                      <option value="d M Y">Day Month-Name Year (1st September 2015)</option>
                      <option value="M d Y">Month-Name Day Year (September 1st, 2015)</option>
                    </FormControl>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} sm={3}>
                    VAT Rate
                  </Col>
                  <Col sm={9}>
                    <FormControl
                      type="text"
                      name="vat_rate"
                      value={values.vat_rate || ''}
                      onChange={handleChange}
                      />
                  </Col>
                </FormGroup>
              </Col>
              <FormGroup>
                <Col sm={2} smOffset={10}>
                  <Col sm={12} className="flex end">
                    <Button bsStyle="primary" type="submit">
                      Save
                    </Button>
                  </Col>
                </Col>
              </FormGroup>
            </Row>
          </form>
        </Col>
      </Row>
    </Panel>
  </Grid>
);

SettingsComponent.propTypes = {
  values: React.PropTypes.object,
  handleChange: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  uploadLogo: React.PropTypes.func.isRequired,
};

export default SettingsComponent;
