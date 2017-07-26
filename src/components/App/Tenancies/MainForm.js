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
      tenancy = {},
      tenancyTypes = {
        1: 'Managed',
        2: 'Tenant Find & Rent Collection',
        3: 'Let Only',
      },
      rentsFrequency = {
        1: 'Weekly',
        2: 'Monthly',
        3: 'Quarterly',
        4: 'Annual',
        5: 'Per person per week',
        6: 'Four Weeks',
      },
      fees = {
        1: 'Percentage',
        2: 'Fixed Fee',
      },
      leases = {
        1: 'Rolling Tenancy',
        2: '3 Month Shorthold',
        3: '6 Month Shorthold',
        4: '9 Month Shorthold',
        5: '12 Month Shorthold',
        6: '24 Month Shorthold',
        7: '36 Month Shorthold',
        8: 'Periodic',
      },
      loading,
      mainFormSubmit,
      mainFormChange,
      mainFormStartDateChange,
      mainFormEndDateChange,
      mainFormAgreedDateChange,
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
      newContact,
      newProperty,
      quickCreateContact,
      quickCreateProperty,
      addNewContact,
      addNewProperty,
    } = this.props;
    return (
      <div>
        {tenancy && (
          <Form onSubmit={mainFormSubmit} horizontal>
            <Row>
              <Col sm={6} lg={4}>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    Tenancy Type
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={tenancy.tenancy_type_id || ''}
                      name="tenancy_type_id"
                      componentClass="select"
                      onChange={mainFormChange}
                      >
                      <option value="" disabled>Select Type</option>
                      {Object.keys(tenancyTypes).map(key => (
                        <option key={key} value={key}>{tenancyTypes[key]}</option>
                      ))}
                    </FormControl>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    Lease Type
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={tenancy.lease_type || ''}
                      name="lease_type"
                      componentClass="select"
                      onChange={mainFormChange}
                      >
                      <option value="" disabled>Select Type</option>
                      {Object.keys(leases).map(key => (
                        <option key={key} value={key}>{leases[key]}</option>
                      ))}
                    </FormControl>
                  </Col>
                </FormGroup>
                <FormGroup validationState={getValidationStatus(error, 'property_id', tenancy)}>
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
                        selected={[tenancy.property]}
                        />
                      <button onClick={addNewProperty}><i className={`fa ${newProperty ? 'fa-minus' : 'fa-plus'}`} aria-hidden="true" /></button>
                    </div>
                  </Col>
                </FormGroup>
                <FormGroup validationState={getValidationStatus(error, 'tenant', tenancy)}>
                  <Col componentClass={ControlLabel} lg={5}>
                    Tenants
                  </Col>
                  <Col lg={7}>
                    <div className="owner">
                      <Typeahead
                        onChange={handleClientSelect}
                        onInputChange={handleClientChange}
                        options={peoples}
                        filterBy={typeaheadFilterBy}
                        labelKey="name"
                        name="people"
                        selected={tenancy.tenant || []}
                        multiple
                        />
                      <button onClick={addNewContact}><i className={`fa ${newContact ? 'fa-minus' : 'fa-plus'}`} aria-hidden="true" /></button>
                    </div>
                  </Col>
                </FormGroup>
              </Col>
              <Col sm={6} lg={4}>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    Agreed Date
                  </Col>
                  <Col lg={7}>
                    <Datetime
                      inputProps={{ name: 'let_date_agreed' }}
                      value={tenancy.let_date_agreed ? moment(tenancy.let_date_agreed) : ''}
                      timeFormat={false}
                      dateFormat={user.dateDisplayFormat}
                      onChange={mainFormAgreedDateChange}
                      closeOnSelect
                      />
                  </Col>
                </FormGroup>
                <FormGroup validationState={getValidationStatus(error, 'start_date', tenancy)}>
                  <Col componentClass={ControlLabel} lg={5}>
                    Start Date
                  </Col>
                  <Col lg={7}>
                    <Datetime
                      inputProps={{ name: 'start_date' }}
                      value={tenancy.start_date ? moment(tenancy.start_date) : ''}
                      timeFormat={false}
                      dateFormat={user.dateDisplayFormat}
                      onChange={mainFormStartDateChange}
                      closeOnSelect
                      />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    End Date
                  </Col>
                  <Col lg={7}>
                    <Datetime
                      inputProps={{ name: 'end_date' }}
                      value={tenancy.end_date ? moment(tenancy.end_date) : ''}
                      timeFormat={false}
                      dateFormat={user.dateDisplayFormat}
                      onChange={mainFormEndDateChange}
                      closeOnSelect
                      />
                  </Col>
                </FormGroup>
                <FormGroup validationState={getValidationStatus(error, 'rent_amount', tenancy)}>
                  <Col componentClass={ControlLabel} lg={5}>
                    Rent Amount {user.currency}
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={tenancy.rent_amount || ''}
                      name="rent_amount"
                      type="number"
                      step="0.1"
                      onChange={mainFormChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup validationState={getValidationStatus(error, 'rent_frequency_id', tenancy)}>
                  <Col componentClass={ControlLabel} lg={5}>
                    Rent Freq
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={tenancy.rent_frequency_id || ''}
                      name="rent_frequency_id"
                      componentClass="select"
                      onChange={mainFormChange}
                      >
                      <option value="" disabled>Select Frequency</option>
                      {Object.keys(rentsFrequency).map(key => (
                        <option key={key} value={key}>{rentsFrequency[key]}</option>
                      ))}
                    </FormControl>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    Fee
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={tenancy.fee || ''}
                      name="fee"
                      type="number"
                      step="0.1"
                      onChange={mainFormChange}
                      />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    Fee Type
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={tenancy.fee_type || ''}
                      name="fee_type"
                      componentClass="select"
                      onChange={mainFormChange}
                      >
                      <option value="" disabled>Select Type</option>
                      {Object.keys(fees).map(key => (
                        <option key={key} value={key}>{fees[key]}</option>
                      ))}
                    </FormControl>
                  </Col>
                </FormGroup>
              </Col>
              <Col sm={6} lg={4}>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    Deposit
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={tenancy.deposit || ''}
                      name="deposit"
                      type="number"
                      step="0.1"
                      onChange={mainFormChange}
                      />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    Deposit Held By
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={tenancy.deposit_held_by || ''}
                      name="deposit_held_by"
                      type="text"
                      onChange={mainFormChange}
                      />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    Deposit Reference
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={tenancy.deposit_reference || ''}
                      name="deposit_reference"
                      type="text"
                      onChange={mainFormChange}
                      />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    Deposit Note
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={tenancy.deposit_note || ''}
                      name="deposit_note"
                      type="text"
                      onChange={mainFormChange}
                      />
                  </Col>
                </FormGroup>
                <FormGroup className="form-checkbox">
                  <Col componentClass={ControlLabel} xs={7} lg={5}>
                    Terminated
                  </Col>
                  <Col xs={5} lg={7} className="flex end">
                    <input
                      id="terminated"
                      type="checkbox"
                      checked={tenancy.terminated || false}
                      name="terminated"
                      onChange={mainFormChange}
                    />
                    <label htmlFor="terminated" />
                  </Col>
                </FormGroup>
              </Col>
              <Col sm={12} lg={12}>
                <FormGroup className="clearfix">
                  <Col componentClass={ControlLabel} lg={2}>
                    Comment
                  </Col>
                  <Col lg={10}>
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
        {newContact && <QuickContact quickCreateContact={quickCreateContact} onHide={addNewContact} />}
        {newProperty && <QuickProperty quickCreateProperty={quickCreateProperty} onHide={addNewProperty} />}
      </div>
    );
  }
}

MainForm.propTypes = {
  user: PropTypes.object,
  tenancy: PropTypes.object,
  leases: PropTypes.array,
  fees: PropTypes.array,
  loading: PropTypes.object,
  mainFormSubmit: PropTypes.func.isRequired,
  mainFormChange: PropTypes.func.isRequired,
  mainFormStartDateChange: PropTypes.func.isRequired,
  mainFormEndDateChange: PropTypes.func.isRequired,
  mainFormAgreedDateChange: PropTypes.func.isRequired,
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
