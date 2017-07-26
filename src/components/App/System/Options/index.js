import React from 'react';
import { Grid, Panel, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import juvo from 'juvo';

const OptionsComponent = () => (
  <Grid className="properties-page create">
    <Panel>
      <h2>System Options</h2>
      <Row>
        <Row>
          <Col md={4}>
            <div>
              <Link to={juvo.options.notesLink}>
                <h3>Note Types</h3>
                <span>Manage your note types.</span>
              </Link>
            </div>
          </Col>
          <Col md={4}>
            <div>
              <Link to={juvo.options.propertiesLink}>
                <h3>Property Types</h3>
                <span>Manage your property types.</span>
              </Link>
            </div>
          </Col>
          <Col md={4}>
            <div>
              <Link to={juvo.options.sourcesLink}>
                <h3>Client Source</h3>
                <span>Manage your client sources.</span>
              </Link>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <div>
              <Link to={juvo.options.countriesLink}>
                <h3>Mobile Countries</h3>
                <span>Manage your mobile country codes allowed.</span>
              </Link>
            </div>
          </Col>
          <Col md={4}>
            <div>
              <Link to={juvo.options.locationsLink}>
                <h3>Locations</h3>
                <span>Manage your client and property match locations.</span>
              </Link>
            </div>
          </Col>
        </Row>
      </Row>
    </Panel>
  </Grid>
);

export default OptionsComponent;
