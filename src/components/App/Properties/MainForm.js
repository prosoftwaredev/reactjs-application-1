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
import GetAddress from 'components/Common/GetAddress';

class MainForm extends React.Component {
  focus = () => this.editor.focus()
  render() {
    const {
      error,
      user = {},
      values,
      types,
      prices,
      statuses,
      categories,
      loading,
      onSubmit,
      onChange,
      onDateChange,
      owners = [],
      handleOwnerChange,
      handleOwnerSelect,
      newContact = false,
      addNewContact,
      fillAddress,
      description = EditorState.createEmpty(),
    } = this.props;
    const owner = values.owner ? {
      id: values.owner_id,
      name: values.owner.full_name || values.owner,
    } : null;
    const fees = {
      1: 'Percentage',
      2: 'Fixed Fee',
    };
    return (
      <div>
        {values && (
          <Form onSubmit={onSubmit}>
            <Row>
              <Col sm={6} lg={4}>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    Ref
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={values.ref || ''}
                      name="ref"
                      type="text"
                      onChange={onChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup validationState={getValidationStatus(error, 'owner_id', values)}>
                  <Col componentClass={ControlLabel} lg={5}>
                    Owner
                  </Col>
                  <Col lg={7}>
                    <div className="owner">
                      <Typeahead
                        onChange={handleOwnerSelect}
                        onInputChange={handleOwnerChange}
                        options={owners}
                        filterBy={typeaheadFilterBy}
                        labelKey="name"
                        name="owner_id"
                        selected={[owner]}
                      />
                      <button onClick={addNewContact}><i className={`fa ${newContact ? 'fa-minus' : 'fa-plus'}`} aria-hidden="true" /></button>
                    </div>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    Status
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={values.status_id || ''}
                      name="status_id"
                      type="text"
                      componentClass="select"
                      onChange={onChange}
                    >
                      {statuses && statuses.map(status => (
                        <option key={status.id} value={status.id}>{status.name}</option>
                      ))}
                    </FormControl>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    Category
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={values.category_id || ''}
                      name="category_id"
                      type="text"
                      componentClass="select"
                      onChange={onChange}
                    >
                      {categories && categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </FormControl>
                  </Col>
                </FormGroup>
                {values.category_id === '1' && (
                  <FormGroup>
                    <Col componentClass={ControlLabel} lg={5}>
                      Sale Contract Type
                    </Col>
                    <Col lg={7}>
                      <FormControl
                        value={values.sale_contract_type_id || ''}
                        name="sale_contract_type_id"
                        type="text"
                        componentClass="select"
                        onChange={onChange}
                      >
                        <option value="" disabled>--Select Contract Type--</option>
                        <option value="1">Sole</option>
                        <option value="2">Joint</option>
                        <option value="3">Multiple Agency</option>
                      </FormControl>
                    </Col>
                  </FormGroup>
                )}
                {values.category_id === '1' && (
                  <FormGroup>
                    <Col componentClass={ControlLabel} lg={5}>
                      Sale Tenure
                    </Col>
                    <Col lg={7}>
                      <FormControl
                        value={values.sale_tenure_id || ''}
                        name="sale_tenure_id"
                        type="text"
                        componentClass="select"
                        onChange={onChange}
                      >
                        <option value="" disabled>--Property Tenure--</option>
                        <option value="1">Freehold</option>
                        <option value="2">Leasehold</option>
                        <option value="3">Feudal</option>
                        <option value="4">Commonhold</option>
                        <option value="5">Share of Freehold</option>
                      </FormControl>
                    </Col>
                  </FormGroup>
                )}
                {values.category_id === '2' && (
                  <FormGroup>
                    <Col componentClass={ControlLabel} lg={5}>
                      Letting Rental Type
                    </Col>
                    <Col lg={7}>
                      <FormControl
                        value={values.letting_rental_type_id || ''}
                        name="letting_rental_type_id"
                        type="text"
                        componentClass="select"
                        onChange={onChange}
                      >
                        <option value="" disabled>--Please Select--</option>
                        <option value="0">Not Specified</option>
                        <option value="1">Long Term</option>
                        <option value="2">Short Term</option>
                        <option value="3">Student</option>
                        <option value="4">Commercial</option>
                      </FormControl>
                    </Col>
                  </FormGroup>
                )}
                {values.category_id === '2' && (
                  <FormGroup>
                    <Col componentClass={ControlLabel} lg={5}>
                      Letting Furnished
                    </Col>
                    <Col lg={7}>
                      <FormControl
                        value={values.letting_furnished_id || ''}
                        name="letting_furnished_id"
                        type="text"
                        componentClass="select"
                        onChange={onChange}
                      >
                        <option value="" disabled>--Please Select--</option>
                        <option value="0">Furnished</option>
                        <option value="1">Part Furnished</option>
                        <option value="2">Unfurnished</option>
                        <option value="3">Not Specified</option>
                        <option value="4">Furnished/Un Furnished</option>
                      </FormControl>
                    </Col>
                  </FormGroup>
                )}
                <FormGroup validationState={getValidationStatus(error, 'advertise_address', values)}>
                  <Col componentClass={ControlLabel} lg={5}>
                    Advertise Address
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={values.advertise_address || ''}
                      name="advertise_address"
                      type="text"
                      onChange={onChange}
                    />
                  </Col>
                </FormGroup>
                <GetAddress callback={fillAddress} labelSize={5} inputSize={7} />
                <FormGroup validationState={getValidationStatus(error, 'address_1', values)}>
                  <Col componentClass={ControlLabel} lg={5}>
                    Address Line 1
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={values.address_1 || ''}
                      name="address_1"
                      type="text"
                      onChange={onChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    Address Line 2
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={values.address_2 || ''}
                      name="address_2"
                      type="text"
                      onChange={onChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    Address Line 3
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={values.address_3 || ''}
                      name="address_3"
                      type="text"
                      onChange={onChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    Town
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={values.town || ''}
                      name="town"
                      type="text"
                      onChange={onChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    County
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={values.county || ''}
                      name="county"
                      type="text"
                      onChange={onChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup validationState={getValidationStatus(error, 'postcode', values)}>
                  <Col componentClass={ControlLabel} lg={5}>
                    Postcode
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={values.postcode || ''}
                      name="postcode"
                      type="text"
                      onChange={onChange}
                    />
                  </Col>
                </FormGroup>
              </Col>
              <Col sm={6} lg={4}>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    Type
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={values.type_id || ''}
                      name="type_id"
                      type="text"
                      componentClass="select"
                      onChange={onChange}
                    >
                      {types && types.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </FormControl>
                  </Col>
                </FormGroup>
                <FormGroup validationState={getValidationStatus(error, 'price', values)}>
                  <Col componentClass={ControlLabel} lg={5}>
                    Price {user.currency}
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={values.price || ''}
                      name="price"
                      type="number"
                      step="0.1"
                      onChange={onChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    Price Label
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={values.price_label_id || ''}
                      name="price_label_id"
                      type="text"
                      componentClass="select"
                      onChange={onChange}
                    >
                      {prices && prices.map(price => (
                        <option key={price.id} value={price.id}>{price.name}</option>
                      ))}
                    </FormControl>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    Price valuation
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={values.price_valuation || ''}
                      name="price_valuation"
                      type="text"
                      onChange={onChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    Fee
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={values.fee || ''}
                      name="fee"
                      type="number"
                      step="0.1"
                      onChange={onChange}
                    // style={{ width: 'initial' }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    Fee Type
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={values.fee_type || ''}
                      name="fee_type"
                      componentClass="select"
                      onChange={onChange}
                    >
                      <option value="" disabled>Select fee type</option>
                      {Object.keys(fees).map(key => (
                        <option key={key} value={key}>{fees[key]}</option>
                      ))}
                    </FormControl>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    Bedrooms
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={values.bedrooms || ''}
                      name="bedrooms"
                      type="text"
                      onChange={onChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    Bathrooms
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={values.bathrooms || ''}
                      name="bathrooms"
                      type="text"
                      onChange={onChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    Living Rooms
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={values.living_rooms || ''}
                      name="living_rooms"
                      type="text"
                      onChange={onChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    Date Available
                  </Col>
                  <Col lg={7}>
                    <Datetime
                      inputProps={{ name: 'available_date' }}
                      value={values.available_date ? moment(values.available_date) : ''}
                      timeFormat={false}
                      dateFormat={user.dateDisplayFormat}
                      onChange={onDateChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    Website Address(URL)
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={values.url || ''}
                      name="url"
                      type="text"
                      onChange={onChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    Video Link
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={values.video_url || ''}
                      name="video_url"
                      type="text"
                      onChange={onChange}
                    />
                  </Col>
                </FormGroup>
              </Col>
              <Col sm={6} lg={4}>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    feature 1
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={values.feature_1 || ''}
                      name="feature_1"
                      type="text"
                      onChange={onChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    feature 2
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={values.feature_2 || ''}
                      name="feature_2"
                      type="text"
                      onChange={onChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    feature 3
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={values.feature_3 || ''}
                      name="feature_3"
                      type="text"
                      onChange={onChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    feature 4
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={values.feature_4 || ''}
                      name="feature_4"
                      type="text"
                      onChange={onChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    feature 5
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={values.feature_5 || ''}
                      name="feature_5"
                      type="text"
                      onChange={onChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    feature 6
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={values.feature_6 || ''}
                      name="feature_6"
                      type="text"
                      onChange={onChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    feature 7
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={values.feature_7 || ''}
                      name="feature_7"
                      type="text"
                      onChange={onChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    feature 8
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={values.feature_8 || ''}
                      name="feature_8"
                      type="text"
                      onChange={onChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    feature 9
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={values.feature_9 || ''}
                      name="feature_9"
                      type="text"
                      onChange={onChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={5}>
                    feature 10
                  </Col>
                  <Col lg={7}>
                    <FormControl
                      value={values.feature_10 || ''}
                      name="feature_10"
                      type="text"
                      onChange={onChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup className="form-checkbox">
                  <Col componentClass={ControlLabel} xs={7} lg={5}>
                    New Home?
                  </Col>
                  <Col xs={5} lg={7} className="flex end">
                    <input
                      id="newHome"
                      type="checkbox"
                      // className="form-checkbox"
                      checked={values.new_home || false}
                      name="new_home"
                      onChange={onChange}
                    />
                    <label htmlFor="newHome" />
                  </Col>
                </FormGroup>
                <FormGroup className="form-checkbox">
                  <Col componentClass={ControlLabel} xs={7} lg={5}>
                    Website Featured?
                  </Col>
                  <Col xs={5} lg={7} className="flex end">
                    <input
                      id="websiteFeatured"
                      type="checkbox"
                      // className="form-checkbox"
                      checked={values.featured || false}
                      name="featured"
                      onChange={onChange}
                    />
                    <label htmlFor="websiteFeatured" />
                  </Col>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={3}>
                    Summary
                  </Col>
                  <Col lg={9}>
                    <FormControl
                      value={values.summary || ''}
                      name="summary"
                      componentClass="textarea"
                      onChange={onChange}
                    />
                  </Col>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={3}>
                    Administration Fee
                  </Col>
                  <Col lg={9}>
                    <FormControl
                      value={values.administration_fee || ''}
                      name="administration_fee"
                    componentClass="textarea"
                      onChange={onChange}
                    />
                  </Col>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={3}>
                    Viewing Arrangements
                  </Col>
                  <Col lg={9}>
                    <FormControl
                      value={values.viewing_arrangement || ''}
                      name="viewing_arrangement"
                      componentClass="textarea"
                      onChange={onChange}
                    />
                  </Col>
                </FormGroup>
              </Col>
              <Col lg={12}>
                <FormGroup>
                  <Col componentClass={ControlLabel} lg={12}>
                    Description
                  </Col>
                  <Col lg={12}>
                    <div className="RichEditor-root" onFocus={this.focus}>
                      <BlockStyleControls className="upper-control" editorState={description} onToggle={this.props.toggleBlockType} />
                      <InlineStyleControls editorState={description} onToggle={this.props.toggleInlineStyle} />
                      <Editor
                        editorState={description}
                        onChange={this.props.changeDescription}
                        ref={(e) => { this.editor = e; }}
                      />
                    </div>
                    {/*
                    <FormControl
                      value={values.description || ''}
                      name="description"
                      componentClass="textarea"
                      onChange={onChange}
                    />
                    */}
                  </Col>
                </FormGroup>
              </Col>
              {/* !values.id && (
              <Col sm={6} lg={4}>
                <FormGroup className="uploadImage smallPadding">
                  <Col componentClass={ControlLabel} lg={5}>
                    Images
                  </Col>
                  <Col lg={4}>
                    <FormControl
                      componentClass="select"
                      className="inline"
                      onChange={handleAssetTypeChange}
                      value={assetsType || ''}
                    >
                      <option value="" disabled>File type</option>
                      <option value="1">Images</option>
                      <option value="2">Floorplans</option>
                      <option value="3">EPC</option>
                      <option value="4">Brochures</option>
                    </FormControl>
                  </Col>
                  <Col lg={3}>
                    <label htmlFor="asset" className={`upload ${disabled}`}>Upload</label>
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
                </FormGroup>
              </Col>
              )*/}
            </Row>
            <Row>
              <Col lg={12}>
                <FormGroup>
                  <Col smOffset={11} sm={1}>
                    <Button bsStyle="primary" type="submit" className="submit">{loading && loading.general && <i className="fa fa-circle-o-notch fa-spin" />} Save</Button>
                  </Col>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        )}
        {newContact && <QuickContact quickCreateContact={this.props.quickCreateContact} onHide={addNewContact} />}
      </div>
    );
  }
}

MainForm.propTypes = {
  user: PropTypes.object,
  values: PropTypes.object.isRequired,
  types: PropTypes.array,
  prices: PropTypes.array,
  statuses: PropTypes.array,
  categories: PropTypes.array,
  loading: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  owners: PropTypes.array,
  // assetsType: React.PropTypes.number,
  handleOwnerChange: PropTypes.func.isRequired,
  handleOwnerSelect: PropTypes.func.isRequired,
  newContact: PropTypes.bool,
  addNewContact: PropTypes.func.isRequired,
  quickCreateContact: PropTypes.func.isRequired,
  // handleAssetTypeChange: React.PropTypes.func.isRequired,
  // handleAssetsUpload: React.PropTypes.func.isRequired,
};

export default MainForm;
