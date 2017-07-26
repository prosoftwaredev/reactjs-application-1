import React from 'react';
import { Grid, Row, Col, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Link } from 'react-router';
import Datetime from 'react-datetime';
import moment from 'moment';
import juvo from 'juvo';
import NoDataFound from 'components/Common/NoDataFound';
import TenancyStatement from '../TenancyStatement';

export default ({
  tenancyStatements = {},
  tenancyStatementTypes = {
    1: 'Landlord',
    2: 'Tenant',
  },
  dateDisplayFormat,
  tenancy = {},
  tenancyStatement = {},
  tenancyStatementTemplates = {},
  deleteTenancyStatement,
  handleTemplateDownload,
  setDocument,
  handleTenancyStatementNext,
  handleTenancyStatementPrevious,
  handleTenancyStatementSubmit,
  handleTenancyStatementChange,
  handleTenancyStatementStartDateChange,
  handleTenancyStatementEndtDateChange,
}) => (
  <Grid fluid className="contacts-page">
    <div className="contacts-content panel panel-box">
      <Col className="breadcrumb">
        <div>
          <Link to={juvo.tenancies.index}>Tenancies</Link>
          <span> / </span>
          <Link to={juvo.tenancies.landlords.index}>Landlord Payments</Link>
          <span> / Landlord Statements</span>
        </div>
        <div className="total">
          <span>Total: {tenancyStatements.total}</span>
        </div>
      </Col>
      <div className="client" />
    </div>
    <div className="contacts-content list">
      <section className="landlordStatements">
        <form onSubmit={handleTenancyStatementSubmit}>
          <Row>
            <Col sm={6} lg={tenancyStatement.type_id === '2' ? 4 : 3}>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                  Type
                </Col>
                <Col sm={9}>
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
              </FormGroup>
            </Col>
            {tenancyStatement.type_id === '2' ? (
              <Col sm={6} lg={4}>
                <FormGroup>
                  <Col componentClass={ControlLabel} sm={3}>
                    Tenant
                  </Col>
                  <Col sm={9}>
                    <FormControl
                      componentClass="select"
                      name="people_id"
                      value={tenancyStatement.people_id || ''}
                      onChange={handleTenancyStatementChange}
                    >
                      <option value="" disabled>Select tenant</option>
                      {tenancy.tenant && tenancy.tenant.map(tenant => (
                        <option key={tenant.id} value={tenant.id}>{tenant.name}</option>
                      ))}
                    </FormControl>
                  </Col>
                </FormGroup>
              </Col>
            ) : null}
            <Col sm={6} lg={tenancyStatement.type_id === '2' ? 4 : 3}>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                  Template
                </Col>
                <Col sm={9}>
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
              </FormGroup>
            </Col>
            <Col sm={6} lg={tenancyStatement.type_id === '2' ? 4 : 3}>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                  Start Date
                </Col>
                <Col sm={9}>
                  <Datetime
                    dateFormat={dateDisplayFormat}
                    inputprops={{ name: 'start_date', placeholder: 'Start date' }}
                    value={tenancyStatement.start_date ? moment(tenancyStatement.start_date) : ''}
                    onChange={handleTenancyStatementStartDateChange}
                    closeOnSelect
                    timeFormat={false}
                  />
                </Col>
              </FormGroup>
            </Col>
            <Col sm={6} lg={tenancyStatement.type_id === '2' ? 4 : 3}>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                  End Date
                </Col>
                <Col sm={9}>
                  <Datetime
                    dateFormat={dateDisplayFormat}
                    inputprops={{ name: 'end_date', placeholder: 'End date' }}
                    value={tenancyStatement.end_date ? moment(tenancyStatement.end_date) : ''}
                    onChange={handleTenancyStatementEndtDateChange}
                    closeOnSelect
                    timeFormat={false}
                  />
                </Col>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={2}>
              <FormGroup>
                <Col sm={12}>
                  <Button bsStyle="success" type="submit">Add statement</Button>
                </Col>
              </FormGroup>
            </Col>
          </Row>
        </form>
      </section>
      <Row className="table-row table-header">
        <Col xs={2} sm={2}>
          <div className="column">Type</div>
        </Col>
        <Col xs={2} sm={2}>
          <div className="column">Start Date</div>
        </Col>
        <Col xs={2} sm={3}>
          <div className="column">End Date</div>
        </Col>
      </Row>
      {!tenancyStatements.data || tenancyStatements.data.length === 0 ? <NoDataFound /> :
        tenancyStatements.data.map(statement => (
          <TenancyStatement
            key={statement.id}
            standalone
            type={tenancyStatementTypes[statement.type_id]}
            statement={statement}
            dateDisplayFormat={dateDisplayFormat}
            deleteTenancyStatement={deleteTenancyStatement}
            handleTemplateDownload={handleTemplateDownload}
            setDocument={setDocument}
          />
        )
        )}
      {(tenancyStatements.current_page && tenancyStatements.current_page < tenancyStatements.total_page) ? (
        <Button bsStyle="link" onClick={handleTenancyStatementNext}>Next...</Button>
      ) : null}
      {(tenancyStatements.current_page && tenancyStatements.current_page > 1) ? (
        <Button bsStyle="link" onClick={handleTenancyStatementPrevious}>Previous...</Button>
      ) : null}
    </div>
  </Grid>
);
