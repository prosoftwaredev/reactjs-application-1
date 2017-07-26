import React from 'react';
import { Link } from 'react-router';
import { Grid, Panel, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { Editor, EditorState } from 'draft-js';
import juvo from 'juvo';
import BlockStyleControls from 'components/Common/Draft/BlockStyleControls';
import InlineStyleControls from 'components/Common/Draft/InlineStyleControls';
import { getValidationStatus, renderHelpBlock } from 'common/utils';

class UserEditComponent extends React.Component {
  state = {
    touched: {},
  }
  focus = () => this.editor.focus()

  handleTouch = (e) => {
    const touched = { ...this.state.touched };
    console.log(e.target.name);
    this.setState({ touched });
  }

  render() {
    const {
      breadcrumb,
      user = {},
      identity,
      userChange,
      signature = EditorState.createEmpty(),
      signatureChange,
      userSave,
      toggleBlockType,
      toggleInlineStyle,
      error,
    } = this.props;
    const {touched} = this.state;
    return (
      <Grid className="properties-page create">
        <Panel>
          {breadcrumb && (
            <h2 className="flex sb">
              <Link to={juvo.user.index} className="undoLink">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 20 20"
                >
                  <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z" />
                </svg>
                User List
            </Link>
              <span>{user.id ? 'Edit User' : 'Add User'}</span>
            </h2>
          )}
          <Row>
            <Form onSubmit={userSave}>
              {user.id && (<input hidden defaultValue={user.id} name="id" />)}
              <FormGroup className="clearfix" validationState={getValidationStatus(error, 'name', user)}>
                <Col componentClass={ControlLabel} sm={3}>
                  Full Name
                </Col>
                <Col sm={9}>
                  <FormControl
                    value={user.name || ''}
                    name="name"
                    type="text"
                    onChange={userChange}
                  />
                  {renderHelpBlock(error, 'name')}
                </Col>
              </FormGroup>
              <FormGroup className="clearfix" validationState={getValidationStatus(error, 'email', user)}>
                <Col componentClass={ControlLabel} sm={3}>
                  Email
                </Col>
                <Col sm={9}>
                  <FormControl
                    value={user.email || ''}
                    name="email"
                    type="email"
                    onChange={userChange}
                  />
                  {renderHelpBlock(error, 'email')}
                </Col>
              </FormGroup>
              <FormGroup className="clearfix">
                <Col componentClass={ControlLabel} sm={3}>
                  Email Signature
                </Col>
                <Col sm={9}>
                  <div className="RichEditor-root" onFocus={this.focus}>
                    <BlockStyleControls className="upper-control" editorState={signature} onToggle={toggleBlockType} />
                    <InlineStyleControls editorState={signature} onToggle={toggleInlineStyle} />
                    <Editor
                      editorState={signature}
                      onChange={signatureChange}
                      ref={(e) => { this.editor = e; }}
                    />
                  </div>
                </Col>
              </FormGroup>
              <FormGroup className="clearfix" validationState={getValidationStatus(error, 'password', user.password ? user : touched)}>
                <Col componentClass={ControlLabel} sm={3}>
                  Password
                </Col>
                <Col sm={9}>
                  <FormControl
                    value={user.password || ''}
                    name="password"
                    type="password"
                    onChange={userChange}
                    onFocus={this.handleTouch}
                  />
                  {renderHelpBlock(error, 'password')}
                </Col>
              </FormGroup>
              <FormGroup
                className="clearfix"
                validationState={getValidationStatus(user.password === user.password_confirm ?
                  {} : {
                    errors: {
                      confirm: 'Passwords not match!'
                    }
                  }, 'confirm', {})}
              >
                <Col componentClass={ControlLabel} sm={3}>
                  Confirm Password
                </Col>
                <Col sm={9}>
                  <FormControl
                    value={user.password_confirm || ''}
                    name="password_confirm"
                    type="password"
                    onChange={userChange}
                  />
                  {renderHelpBlock(user.password === user.password_confirm ? {} : {
                    errors: {
                      confirm: 'Passwords not match!'
                    }
                  }, 'confirm')}
                </Col>
              </FormGroup>
              <FormGroup className="clearfix" validationState={getValidationStatus(error, 'mobile', user)}>
                <Col componentClass={ControlLabel} sm={3}>
                  Mobile
                </Col>
                <Col sm={9}>
                  <FormControl
                    value={user.mobile || ''}
                    name="mobile"
                    type="tel"
                    onChange={userChange}
                  />
                </Col>
              </FormGroup>
              {identity.allowed_admin && location.pathname !== juvo.user.profile ? (
                <Row>
                  <Col lg={12}>
                    <FormGroup className="checkboxList" validationState={getValidationStatus(error, 'modules', user)}>
                      <Col componentClass={ControlLabel} sm={12}>
                        Permissions
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col lg={4}>
                    <FormGroup className="form-checkbox">
                      <Col componentClass={ControlLabel} sm={3}>
                        Diary
                      </Col>
                      <Col sm={9}>
                        <input
                          type="checkbox"
                          onChange={userChange}
                          id="allowedDiary"
                          name="allowed_diary"
                          checked={user.allowed_diary || false}
                        />
                        <label htmlFor="allowedDiary" />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col lg={4}>
                    <FormGroup className="form-checkbox">
                      <Col componentClass={ControlLabel} sm={3}>
                        Properties
                      </Col>
                      <Col sm={9}>
                        <input
                          type="checkbox"
                          onChange={userChange}
                          id="allowedProperty"
                          name="allowed_property"
                          checked={user.allowed_property || false}
                        />
                        <label htmlFor="allowedProperty" />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col lg={4}>
                    <FormGroup className="form-checkbox">
                      <Col componentClass={ControlLabel} sm={3}>
                        Contacts
                      </Col>
                      <Col sm={9}>
                        <input
                          type="checkbox"
                          onChange={userChange}
                          id="allowedContact"
                          name="allowed_contact"
                          checked={user.allowed_contact || false}
                        />
                        <label htmlFor="allowedContact" />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col lg={4}>
                    <FormGroup className="form-checkbox">
                      <Col componentClass={ControlLabel} sm={3}>
                        Documents
                      </Col>
                      <Col sm={9}>
                        <input
                          type="checkbox"
                          onChange={userChange}
                          id="allowedDocument"
                          name="allowed_document"
                          checked={user.allowed_document || false}
                        />
                        <label htmlFor="allowedDocument" />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col lg={4}>
                    <FormGroup className="form-checkbox">
                      <Col componentClass={ControlLabel} sm={3}>
                        Tenancies
                      </Col>
                      <Col sm={9}>
                        <input
                          type="checkbox"
                          onChange={userChange}
                          id="allowedTenancy"
                          name="allowed_tenancy"
                          checked={user.allowed_tenancy || false}
                        />
                        <label htmlFor="allowedTenancy" />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col lg={4}>
                    <FormGroup className="form-checkbox">
                      <Col componentClass={ControlLabel} sm={3}>
                        Offers
                      </Col>
                      <Col sm={9}>
                        <input
                          type="checkbox"
                          onChange={userChange}
                          id="allowedOffer"
                          name="allowed_offer"
                          checked={user.allowed_offer || false}
                        />
                        <label htmlFor="allowedOffer" />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col lg={4}>
                    <FormGroup className="form-checkbox">
                      <Col componentClass={ControlLabel} sm={3}>
                        Plugins
                      </Col>
                      <Col sm={9}>
                        <input
                          type="checkbox"
                          onChange={userChange}
                          id="allowedPlugin"
                          name="allowed_plugin"
                          checked={user.allowed_plugin || false}
                        />
                        <label htmlFor="allowedPlugin" />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col lg={4}>
                    <FormGroup className="form-checkbox">
                      <Col componentClass={ControlLabel} sm={3}>
                        Admin
                      </Col>
                      <Col sm={9}>
                        <input
                          type="checkbox"
                          onChange={userChange}
                          id="allowedAdmin"
                          name="allowed_admin"
                          checked={user.allowed_admin || false}
                          disabled={user.id === identity.id}
                        />
                        <label htmlFor="allowedAdmin" />
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
              ) : null}
              <FormGroup className="clearfix">
                <Col sm={9} smOffset={3}>
                  <Button bsStyle="primary" type="submit" disabled={user.password !== user.password_confirm}>Save</Button>
                </Col>
              </FormGroup>
            </Form>
          </Row>
        </Panel>
      </Grid>
    );
  }
}

UserEditComponent.propTypes = {
  breadcrumb: React.PropTypes.bool.isRequired,
  user: React.PropTypes.object.isRequired,
  userChange: React.PropTypes.func.isRequired,
  signatureChange: React.PropTypes.func.isRequired,
  toggleBlockType: React.PropTypes.func.isRequired,
  toggleInlineStyle: React.PropTypes.func.isRequired,
  userSave: React.PropTypes.func.isRequired,
};

export default UserEditComponent;
