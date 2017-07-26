import React from 'react';
import { Modal, Col, Row, FormControl, Button } from 'react-bootstrap';
import Datetime from 'react-datetime';
import moment from 'moment';
import TenancyStatement from '../TenancyStatement';

const TenancyStatementModal = ({
  user = {},
  tenancyStatement = {},
  tenants = [],
  tenancyStatementTemplates = {},
  tenancyStatementTypes = {
    1: 'Landlord',
    2: 'Tenant',
  },
  tenancyStatements = {},
  handleClose,
  handleTenancyStatementSubmit,
  handleTenancyStatementChange,
  handleTenancyStatementStartDateChange,
  handleTenancyStatementEndtDateChange,
  deleteTenancyStatement,
  handleTemplateDownload,
  handleTenancyStatementNext,
  handleTenancyStatementPrevious,
}) => (
  <Modal show onHide={handleClose} className="jobs">
    <Modal.Header closeButton>
      <Modal.Title>Payments</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form onSubmit={handleTenancyStatementSubmit} className="TenancyStatementModal">
        <Row>
          <Col sm={6}>
            <FormControl
              componentClass="select"
              name="type_id"
              value={tenancyStatement.type_id || ''}
              onChange={handleTenancyStatementChange}
            >
              <option value="" disabled>Type</option>
              {Object.keys(tenancyStatementTypes).map(key => (
                <option key={key} value={key}>{tenancyStatementTypes[key]}</option>
              ))}
            </FormControl>
          </Col>
          {tenancyStatement.type_id === '2' ? (
            <Col sm={6}>
              <FormControl
                componentClass="select"
                name="people_id"
                value={tenancyStatement.people_id || ''}
                onChange={handleTenancyStatementChange}
              >
                <option value="" disabled>Select tenant</option>
                {tenants.map(tenant => (
                  <option key={tenant.id} value={tenant.id}>{tenant.name}</option>
                ))}
              </FormControl>
            </Col>
          ) : null}
        </Row>
        <Row>
          <Col sm={6}>
            <Datetime
              dateFormat={user && user.dateDisplayFormat}
              inputProps={{ name: 'start_date', placeholder: 'Start date' }}
              value={tenancyStatement.start_date ? moment(tenancyStatement.start_date) : ''}
              onChange={handleTenancyStatementStartDateChange}
              closeOnSelect
              timeFormat={false}
            />
          </Col>
          <Col sm={6}>
            <Datetime
              dateFormat={user && user.dateDisplayFormat}
              inputProps={{ name: 'end_date', placeholder: 'End date' }}
              value={tenancyStatement.end_date ? moment(tenancyStatement.end_date) : ''}
              onChange={handleTenancyStatementEndtDateChange}
              closeOnSelect
              timeFormat={false}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <FormControl
              componentClass="select"
              name="template_id"
              value={tenancyStatement.template_id || ''}
              onChange={handleTenancyStatementChange}
            >
              <option value="" disabled>Template</option>
              {Object.keys(tenancyStatementTemplates).map(key => (
                <option key={key} value={tenancyStatementTemplates[key].id}>{tenancyStatementTemplates[key].name}</option>
              ))}
            </FormControl>
          </Col>
          <Col sm={2}>
            <Button bsStyle="success" type="submit">Add statement</Button>
          </Col>
        </Row>
      </form>
      <div className="clearfix">
        {tenancyStatements.data && tenancyStatements.data.map((statement, index) => (
          <TenancyStatement
            key={statement.id}
            index={index}
            type={tenancyStatementTypes[statement.type_id]}
            statement={statement}
            dateDisplayFormat={user && user.dateDisplayFormat}
            deleteTenancyStatement={deleteTenancyStatement}
            handleTemplateDownload={handleTemplateDownload}
          />
        ))}
        {(tenancyStatements.current_page && tenancyStatements.current_page < tenancyStatements.total_page) ? (
          <Button bsStyle="link" onClick={handleTenancyStatementNext}>Next...</Button>
        ) : null}
        {(tenancyStatements.current_page && tenancyStatements.current_page > 1) ? (
          <Button bsStyle="link" onClick={handleTenancyStatementPrevious}>Previous...</Button>
        ) : null}
      </div>
    </Modal.Body>
  </Modal>
);

TenancyStatementModal.propTypes = {
  user: React.PropTypes.object,
  tenancyStatement: React.PropTypes.object,
  tenants: React.PropTypes.array,
  tenancyStatementTemplates: React.PropTypes.object,
  tenancyStatementTypes: React.PropTypes.object,
  tenancyStatements: React.PropTypes.object,
  handleClose: React.PropTypes.func.isRequired,
  handleTenancyStatementSubmit: React.PropTypes.func.isRequired,
  handleTenancyStatementChange: React.PropTypes.func.isRequired,
  handleTenancyStatementStartDateChange: React.PropTypes.func.isRequired,
  handleTenancyStatementEndtDateChange: React.PropTypes.func.isRequired,
  deleteTenancyStatement: React.PropTypes.func.isRequired,
  handleTemplateDownload: React.PropTypes.func.isRequired,
  handleTenancyStatementNext: React.PropTypes.func.isRequired,
  handleTenancyStatementPrevious: React.PropTypes.func.isRequired,
};

export default TenancyStatementModal;
