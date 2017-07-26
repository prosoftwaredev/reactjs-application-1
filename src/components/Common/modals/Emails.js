import React from 'react';
import { Modal, Row, Col, FormGroup, FormControl, ControlLabel, Button, Glyphicon } from 'react-bootstrap';
import { getValidationStatus } from 'common/utils';
import { fetchEmailAutoComplete } from 'redux/modules/common/requests';
import Email from './Email';
import NoDataFound from '../NoDataFound';

class Emails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      template: null
    };
    fetchEmailAutoComplete()
      .then(({ data }) => this.setState({ emailTemplates: data }));
  }
  handleTemplateChange = (e) => {
    e.preventDefault();
    const id = parseInt(e.target.value, 10);
    this.setState({ template: id });
    const emailTemplate = [...this.state.emailTemplates].find(item => item.id === id);
    this.props.handleTemplateChange(emailTemplate);
  }
  render() {
    const {
       user,
      emails,
      handleClose,
      email = {},
      handleEmailCreate,
      handleEmailChange,
      error,
      printedDoc = {},
      handleAttachmentRemove,
    } = this.props;
    const { emailTemplates, template } = this.state;
    return (
      <Modal show onHide={handleClose} className="notes">
        <Modal.Header closeButton>
          <Modal.Title>Emails</Modal.Title>
        </Modal.Header>
        <Modal.Body className="properties-page create">
          <div className="panel-body">
            {handleEmailCreate && (
              <Row>
                <form onSubmit={handleEmailCreate}>
                  {emailTemplates ? (
                    <FormGroup>
                      <Col componentClass={ControlLabel} sm={2}>
                        Template
                  </Col>
                      <Col sm={10}>
                        <FormControl
                          componentClass="select"
                          name="template_id"
                          value={template || ''}
                          onChange={this.handleTemplateChange}
                        >
                          <option value="" disabled>Select template</option>
                          {emailTemplates && emailTemplates.map(item => (
                            <option key={item.id} value={item.id}>{item.subject}</option>
                          ))}
                        </FormControl>
                      </Col>
                    </FormGroup>
                  ) : null}
                  <FormGroup validationState={getValidationStatus(error, 'to', email)}>
                    <Col componentClass={ControlLabel} sm={2}>
                      To
                </Col>
                    <Col sm={10}>
                      <FormControl
                        value={email.to || ''}
                        name="to"
                        type="email"
                        onChange={handleEmailChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup validationState={getValidationStatus(error, 'subject', email)}>
                    <Col componentClass={ControlLabel} sm={2}>
                      Subject
                  </Col>
                    <Col sm={10}>
                      <FormControl
                        value={email.subject || ''}
                        componentClass="input"
                        name="subject"
                        onChange={handleEmailChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup validationState={getValidationStatus(error, 'message', email)}>
                    <Col componentClass={ControlLabel} sm={2}>
                      Message
                </Col>
                    <Col sm={10}>
                      <FormControl
                        value={email.message || ''}
                        componentClass="textarea"
                        name="message"
                        onChange={handleEmailChange}
                      />
                    </Col>
                  </FormGroup>
                  {printedDoc && printedDoc.id ? (
                    <FormGroup>
                      <Col componentClass={ControlLabel} sm={2}>
                        Attachment
                      </Col>
                      <Col sm={9}><span>{printedDoc.filename}</span></Col>
                      <Col sm={1}>
                        <Glyphicon glyph="remove-circle" onClick={handleAttachmentRemove} />
                      </Col>
                    </FormGroup>
                  ) : null}
                  <Col sm={2} smOffset={10}>
                    <Button bsStyle="primary" type="submit">Send</Button>
                  </Col>
                </form>
              </Row>
            )}
            <Row className="table-header">
              <Col sm={4} className="column">
                Created
          </Col>
              <Col sm={8} className="column">
                Subject (click for details)
          </Col>
            </Row>
            {!emails || emails.length === 0 ? <NoDataFound /> :
              emails.map(emailItem => (
                <Email key={emailItem.id} user={user} email={emailItem} />
              )
              )}
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

Emails.propTypes = {
  user: React.PropTypes.object,
  emails: React.PropTypes.array,
  handleClose: React.PropTypes.func.isRequired,
  email: React.PropTypes.object,
  handleEmailCreate: React.PropTypes.func,
  handleEmailChange: React.PropTypes.func,
  handleTemplateChange: React.PropTypes.func,
};

export default Emails;
