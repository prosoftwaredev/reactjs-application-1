import React, { PropTypes } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Row, Col, Button } from 'react-bootstrap';
import Datetime from 'react-datetime';
import moment from 'moment';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Editor, EditorState } from 'draft-js';
import BlockStyleControls from 'components/Common/Draft/BlockStyleControls';
import InlineStyleControls from 'components/Common/Draft/InlineStyleControls';
import { typeaheadFilterBy, getValidationStatus } from 'common/utils';
import QuickContact from 'containers/QuickContact';
import QuickProperty from 'containers/QuickProperty';

class MainForm extends React.Component {
  focus = () => this.editor.focus()

  render() {
    const {
      error,
      user = {},
      users = [],
      offer = {},
      stages = {
        1: 'Completed',
        2: 'Interest',
        3: 'Negotiation',
        4: 'Offer Accepted',
        5: 'Offer Proposed',
      },
      loading,
      mainFormSubmit,
      mainFormChange,
      mainFormDateChange,
      peoples = [],
      handleClientChange,
      handleClientSelect,
      properties = [],
      handlePropertySelect,
      handlePropertyChange,
      comment = EditorState.createEmpty(),
      changeComment,
      toggleBlockType,
      toggleInlineStyle,
      newClient,
      newApplicant,
      newVendor,
      quickCreateContact,
      addNewClient,
      addNewApplicant,
      addNewVendor,
      handleVendorSelect,
      handleVendorChange,
      vendors = [],
      handleApplicantSelect,
      handleApplicantChange,
      applicants = [],
      hideQuickModal,
      addNewProperty,
      newProperty,
      quickCreateProperty,
    } = this.props;
    // const applicant = offer.applicant || null;
    const applicantSolicitor = offer.applicant_solicitor ? {
      id: offer.applicant_solicitor_id,
      name: offer.applicant_solicitor.full_name || offer.applicant_solicitor.name,
    } : null;
    const vendorSolicitor = offer.vendor_solicitor ? {
      id: offer.vendor_solicitor_id,
      name: offer.vendor_solicitor.full_name || offer.vendor_solicitor.name,
    } : null;

    return (
      <div>
        {offer && (
          <Form onSubmit={mainFormSubmit} horizontal>
            <Row>
              <Col sm={6} lg={4}>
                <FormGroup validationState={getValidationStatus(error, 'status_id', offer)}>
                  <Col componentClass={ControlLabel} lg={5}>
                    Stage
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={offer.status_id || ''}
                      name="status_id"
                      componentClass="select"
                      onChange={mainFormChange}
                    >
                      <option value="" disabled>Select stage</option>
                      {Object.keys(stages).map(key => (
                        <option key={key} value={key}>{stages[key]}</option>
                      ))}
                    </FormControl>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    User
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={offer.user_responsible_id || ''}
                      name="user_responsible_id"
                      componentClass="select"
                      onChange={mainFormChange}
                    >
                      <option value="" disabled>Select user</option>
                      {users.map(userItem => (
                        <option key={userItem.id} value={userItem.id}>{userItem.name}</option>
                      ))}
                    </FormControl>
                  </Col>
                </FormGroup>
                <FormGroup validationState={getValidationStatus(error, 'property_id', offer)}>
                  <Col componentClass={ControlLabel} lg={5}>
                    Property
                  </Col>
                  <Col lg={7}>
                    <div className="owner">
                      <Typeahead
                        onChange={handlePropertySelect}
                        onInputChange={handlePropertyChange}
                        options={properties}
                        filterBy={typeaheadFilterBy}
                        labelKey="address"
                        name="property_id"
                        selected={offer.property ? [offer.property] : []}
                      />
                      <button onClick={addNewProperty}><i className={`fa ${newProperty ? 'fa-minus' : 'fa-plus'}`} aria-hidden="true" /></button>
                    </div>
                  </Col>
                </FormGroup>
                <FormGroup validationState={getValidationStatus(error, 'price', offer)}>
                  <Col componentClass={ControlLabel} lg={5}>
                    Amount {user.currency}
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={offer.price || ''}
                      name="price"
                      type="number"
                      step="0.1"
                      onChange={mainFormChange}
                    />
                  </Col>
                </FormGroup>
              </Col>
              <Col sm={6} lg={8}>
                <FormGroup validationState={getValidationStatus(error, 'people_id', offer)}>
                  <Col componentClass={ControlLabel} lg={5}>
                    Applicant
                  </Col>
                  <Col lg={7}>
                    <div className="owner">
                      <Typeahead
                        onChange={handleClientSelect}
                        onInputChange={handleClientChange}
                        options={peoples}
                        filterBy={typeaheadFilterBy}
                        labelKey="name"
                        name="people_id"
                        selected={[offer.applicant]}
                      />
                      <button onClick={addNewClient}><i className={`fa ${newClient ? 'fa-minus' : 'fa-plus'}`} aria-hidden="true" /></button>
                    </div>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    Applicant Solicitor
                  </Col>
                  <Col lg={7}>
                    <div className="owner">
                      <Typeahead
                        onChange={handleApplicantSelect}
                        onInputChange={handleApplicantChange}
                        options={applicants}
                        filterBy={typeaheadFilterBy}
                        labelKey="name"
                        name="applicant_solicitor_id"
                        selected={[applicantSolicitor]}
                      />
                      <button onClick={addNewApplicant}><i className={`fa ${newApplicant ? 'fa-minus' : 'fa-plus'}`} aria-hidden="true" /></button>
                    </div>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    Vendor Solicitor
                  </Col>
                  <Col lg={7}>
                    <div className="owner">
                      <Typeahead
                        onChange={handleVendorSelect}
                        onInputChange={handleVendorChange}
                        options={vendors}
                        filterBy={typeaheadFilterBy}
                        labelKey="name"
                        name="vendor_solicitor_id"
                        selected={[vendorSolicitor]}
                      />
                      <button onClick={addNewVendor}><i className={`fa ${newVendor ? 'fa-minus' : 'fa-plus'}`} aria-hidden="true" /></button>
                    </div>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    Completion Date
                  </Col>
                  <Col lg={7}>
                    <Datetime
                      inputProps={{ name: 'chase_date' }}
                      value={offer.chase_date ? moment(offer.chase_date) : ''}
                      timeFormat={false}
                      dateFormat={user.dateDisplayFormat}
                      onChange={mainFormDateChange}
                    />
                  </Col>
                </FormGroup>
              </Col>
              <Col sm={12}>
                <FormGroup className="clearfix">
                  <Col componentClass={ControlLabel} lg={12}>
                    Comments
                  </Col>
                  <Col lg={12}>
                    <div className="RichEditor-root" onFocus={this.focus}>
                      <BlockStyleControls className="upper-control" editorState={comment} onToggle={toggleBlockType} />
                      <InlineStyleControls editorState={comment} onToggle={toggleInlineStyle} />
                      <Editor
                        editorState={comment}
                        onChange={changeComment}
                        ref={(e) => { this.editor = e; }}
                      />
                    </div>
                  </Col>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <FormGroup>
                  <Button bsStyle="primary" type="submit" className="submit">{loading && loading.general && <i className="fa fa-circle-o-notch fa-spin" />} Save</Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        )}
        {(newClient || newApplicant || newVendor) && <QuickContact quickCreateContact={quickCreateContact} onHide={hideQuickModal} />}
        {newProperty && <QuickProperty quickCreateProperty={quickCreateProperty} onHide={addNewProperty} />}
      </div>
    );
  }
}

MainForm.propTypes = {
  user: PropTypes.object,
  offer: PropTypes.object,
  stages: PropTypes.array,
  users: PropTypes.array,
  loading: PropTypes.object,
  mainFormSubmit: PropTypes.func.isRequired,
  mainFormChange: PropTypes.func.isRequired,
  mainFormDateChange: PropTypes.func.isRequired,
  peoples: PropTypes.array,
  properties: PropTypes.array,
  handleClientChange: PropTypes.func.isRequired,
  handleClientSelect: PropTypes.func.isRequired,
  handlePropertyChange: PropTypes.func.isRequired,
  handlePropertySelect: PropTypes.func.isRequired,
  changeComment: PropTypes.func.isRequired,
  toggleBlockType: PropTypes.func.isRequired,
  toggleInlineStyle: PropTypes.func.isRequired,
};

export default MainForm;
