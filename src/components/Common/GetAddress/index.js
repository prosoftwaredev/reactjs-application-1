import React, { Component } from 'react';
import { Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import superagent from 'superagent-defaults';

class GetAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: props.apiKey || '03pRH2-zdU2YZoG3GEqTRw622',
      zipCode: '',
      house: '',
      addresses: [],
      address: '',
      loading: false,
    };
  }
  handleChange = (event) => {
    if (event.target.name === 'zipCode') {
      this.setState({ zipCode: event.target.value });
    } else {
      this.props.callback({ zipCode: this.state.zipCode, address: event.target.value });
      // this.setState({ address: event.target.value });
      this.setState({ addresses: [], zipCode: '' });
    }
  }
  handleSearchClick = (event) => {
    event.preventDefault();
    const request = superagent();
    this.setState({ addresses: [], loading: true });
    request
      .get(`https://api.getAddress.io/v2/uk/${this.state.zipCode}?api-key=${this.state.apiKey}`)
      .end((error, result) => {
        if (error) {
          console.log(error);
          this.setState({loading: false, zipCode: ''});
        } else if (result) {
          console.log(result);
          this.setState({ addresses: result.body.Addresses, loading: false });
        }
      });
  }
  handleClearClick = (event) => {
    event.preventDefault();
    this.setState({ addresses: [], loading: false, zipCode: '' });
  }
  render() {
    const { zipCode, addresses, address, loading } = this.state;
    return (
      <div className="getAddress">
        <FormGroup>
          <Col componentClass={ControlLabel} lg={this.props.labelSize || 4}>
            Postcode Lookup
          </Col>
          {addresses.length > 0 ? (
            <Col lg={this.props.inputSize || 8}>
              <FormControl
                value={address}
                componentClass="select"
                onChange={this.handleChange}
              >
                <option disabled value="">Choose Address</option>
                {addresses.map(item => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </FormControl>
              <button onClick={this.handleClearClick} className="clear">
                <i className="fa fa-times" />
              </button>
            </Col>
          ) : (
            <Col lg={this.props.inputSize || 8} className="searchAddress">
              <FormControl
                value={zipCode}
                name="zipCode"
                type="text"
                onChange={this.handleChange}
              />
              <button onClick={this.handleSearchClick}>
                {loading ? (
                  <i className="fa fa-circle-o-notch fa-spin" />
                ) : (
                  <i className="fa fa-search" aria-hidden="true" />
                )}
              </button>
            </Col>
          )}
        </FormGroup>

      </div>
    );
  }
}

export default GetAddress;
