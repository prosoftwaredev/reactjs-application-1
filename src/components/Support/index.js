import React from 'react';
import { Button, Panel, Row, Col, Grid, FormControl, FormGroup, ControlLabel, Alert } from 'react-bootstrap';

const SupportComponent = ({ values, error, onChange, onSubmit }) => (
  <Grid className="properties-page create">
    <Panel>
      <h2>Submit a Support Ticket</h2>
      <Row>
        <Col sm={9}>
          <form onSubmit={onSubmit}>
            {error && error.message && <Alert bsStyle="danger">{error.message}</Alert>}
            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                name="description"
                componentClass="textarea"
                rows={10}
                value={(values && values.description) || ''}
                onChange={onChange}
              />
            </FormGroup>
            <FormGroup>
              <Button bsStyle="success" type="submit">
                Send Ticket
              </Button>
            </FormGroup>
          </form>
        </Col>
      </Row>
    </Panel>
  </Grid>
);

SupportComponent.propTypes = {
  values: React.PropTypes.object,
  error: React.PropTypes.object,
  onChange: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
};

export default SupportComponent;
