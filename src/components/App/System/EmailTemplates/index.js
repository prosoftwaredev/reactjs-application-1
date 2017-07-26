import React from 'react';
import { Grid, Panel, Row, Col, Button } from 'react-bootstrap';
import Template from './Template';

const TemplatesComponent = ({
  templates,
  user = {},
  deleteTemplate,
  editTemplate,
  createTemplate,
}) => (
  <Grid className="properties-page create">
    <Panel>
      <h2>System templates</h2>
      <Row>
        <Col sm={12}>
          <Button bsStyle="primary" onClick={createTemplate}>Add Template</Button>
        </Col>
      </Row>
      <Row className="templates">
        <Col xs={12}>
          <Panel className="table">
            <Row className="table-header">
              <Col xs={2} sm={2}>
                <div className="column">Created</div>
              </Col>
              <Col xs={2} sm={2}>
                <div className="column">Name</div>
              </Col>
              <Col xs={2} sm={2}>
                <div className="column">Subject</div>
              </Col>
              <Col xs={2} sm={2}>
                <div className="column">Message</div>
              </Col>
            </Row>
            {templates && templates.map(template => (
              <Template
                key={template.id}
                template={template}
                deleteTemplate={deleteTemplate}
                editTemplate={editTemplate}
                user={user}
              />
            ))}
          </Panel>
        </Col>
      </Row>
    </Panel>
  </Grid>
);

TemplatesComponent.propTypes = {
  templates: React.PropTypes.array,
  user: React.PropTypes.object,
  deleteTemplate: React.PropTypes.func.isRequired,
  editTemplate: React.PropTypes.func.isRequired,
  createTemplate: React.PropTypes.func.isRequired,
};

export default TemplatesComponent;
