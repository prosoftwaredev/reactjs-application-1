import React from 'react';
import { Modal, Button, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';

class QuickContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: {}
    };
  }
  handleSubmit = () => {
    this.props.quickCreateContact({ ...this.state.contact });
  }
  handleChange = (event) => {
    const contact = { ...this.state.contact };
    contact[event.target.name] = event.target.value;
    this.setState({ contact });
  }
  render() {
    const { contact } = this.state;
    const { categories = [], countryCodes = [], onHide } = this.props;
    return (
      <Modal show onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div key="quickContact" className="quickContact">
            <FormGroup className="clearfix" >
              <Col componentClass={ControlLabel} sm={3}>
                Category
              </Col>
              <Col sm={9}>
                <FormControl
                  value={contact.category_id || ''}
                  name="category_id"
                  type="text"
                  componentClass="select"
                  onChange={this.handleChange}
                >
                  <option value="" disabled>Select category</option>
                  {categories && categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup className="clearfix" >
              <Col componentClass={ControlLabel} sm={3}>
                First Name
              </Col>
              <Col sm={9} className="contactTitle">
                <FormControl
                  value={contact.title_1 || ''}
                  name="title_1"
                  componentClass="select"
                  onChange={this.handleChange}
                >
                  <option value="" disabled>Title</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                  <option value="Miss">Miss</option>
                  <option value="Dr">Dr</option>
                </FormControl>
                <FormControl
                  value={contact.forename_1 || ''}
                  name="forename_1"
                  type="text"
                  onChange={this.handleChange}
                />
                <FormControl
                  value={contact.surname_1 || ''}
                  name="surname_1"
                  type="text"
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup className="clearfix" >
              <Col componentClass={ControlLabel} sm={3}>
                Secondary Name
              </Col>
              <Col sm={9} className="contactTitle">
                <FormControl
                  value={contact.title_2 || ''}
                  name="title_2"
                  componentClass="select"
                  onChange={this.handleChange}
                >
                  <option value="" disabled>Title</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                  <option value="Miss">Miss</option>
                  <option value="Dr">Dr</option>
                </FormControl>
                <FormControl
                  value={contact.forename_2 || ''}
                  name="forename_2"
                  type="text"
                  onChange={this.handleChange}
                />
                <FormControl
                  value={contact.surname_2 || ''}
                  name="surname_2"
                  type="text"
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup className="clearfix" >
              <Col componentClass={ControlLabel} sm={3}>
                Phone
              </Col>
              <Col sm={9}>
                <FormControl
                  defaultValue={contact.phone || ''}
                  name="phone"
                  type="tel"
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup className="clearfix" >
              <Col componentClass={ControlLabel} sm={3}>
                Mobile
              </Col>
              <Col sm={4}>
                <FormControl
                  value={contact.mobile_country_code_id || ''}
                  name="mobile_country_code_id"
                  componentClass="select"
                  onChange={this.handleChange}
                >
                  <option value="" disabled>Select country</option>
                  {countryCodes && countryCodes.map((code, index) => (
                    <option key={index} value={code.id}>{`${code.name} (+${code.prefix})`}</option>
                  ))}
                </FormControl>
              </Col>
              <Col sm={5}>
                <FormControl
                  value={contact.mobile || ''}
                  name="mobile"
                  type="tel"
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup className="clearfix" >
              <Col componentClass={ControlLabel} sm={3}>
                Email
              </Col>
              <Col sm={9}>
                <FormControl
                  value={contact.email || ''}
                  name="email"
                  type="email"
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup className="clearfix" >
              <Col sm={2} smOffset={10}>
                <Button bsStyle="success" onClick={this.handleSubmit}>Create</Button>
              </Col>
            </FormGroup>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

QuickContact.propTypes = {
  categories: React.PropTypes.array,
  countryCodes: React.PropTypes.array,
  quickCreateContact: React.PropTypes.func.isRequired,
  onHide: React.PropTypes.func.isRequired,
};

export default QuickContact;
