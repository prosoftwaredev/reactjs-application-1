import React from 'react';
import { Grid, Panel, Row, Col, Button, FormGroup, ControlLabel } from 'react-bootstrap';
import { Link } from 'react-router';
import juvo from 'juvo';

const PropertiesComponent = ({ types = {}, active = {}, toggleCheckbox, saveCurrentTypes }) => (
  <Grid className="properties-page create">
    <Panel>
      <h2 className="flex sb">
        <Link to={juvo.options.index} className="undoLink">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 20 20"
          >
            <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z" />
          </svg>
          System Options
        </Link>
        Property Status
      </h2>
      <form onSubmit={saveCurrentTypes} className="countryCodes">
        <Row>
          <Col sm={12} className="flex sb">
            <span>Select which property types you would like to have available in your profile.</span>
            <Button bsStyle="success" type="submit">Save</Button>
          </Col>
        </Row>
        <Row>
          {Object.keys(types).map(item => (
            <Col lg={4} key={item}>
              <FormGroup className="form-checkbox">
                <Col componentClass={ControlLabel} lg={8}>
                  {types[item].name}
                </Col>
                <Col lg={4}>
                  <input
                    id={`propertyType${item}`}
                    type="checkbox"
                    name={item}
                    checked={active[item] || false}
                    onChange={toggleCheckbox}
                  />
                  <label htmlFor={`propertyType${item}`} />
                </Col>
              </FormGroup>
            </Col>
          ))}
        </Row>
      </form>
    </Panel>
  </Grid>
);

PropertiesComponent.propTypes = {
  types: React.PropTypes.object,
  active: React.PropTypes.object,
  toggleCheckbox: React.PropTypes.func.isRequired,
  saveCurrentTypes: React.PropTypes.func.isRequired,
};


export default PropertiesComponent;
