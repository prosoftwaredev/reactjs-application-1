import React from 'react';
import { Grid, Row, Col, Form, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Pagination from 'components/Common/Pagination';
import juvo from 'juvo';
import ManagementButton from 'components/Common/ManagementButton';
import NoDataFound from 'components/Common/NoDataFound';

import Tenancy from './Tenancy';

const TenanciesComponent = ({
  tenancies = [],
  types = {
    1: 'Managed',
    2: 'Tenant Find & Rent Collection',
    3: 'Let Only',
  },
  user = {},
  pagination = {},
  searchValues = {},
  handleSearchChange,
  deleteTenancy,
  toggleSearch,
  searchPanel,
  handleSearchReset,
  handleSearchSubmit,
}) => (
  <Grid fluid className="contacts-page">
    <div className="contacts-content panel panel-box">
      <div className="listControls flex sb tenancy">
        <h2>Tenancy {pagination && pagination.total ? <span>({pagination.total})</span> : <span>(0)</span>}</h2>
        <div>
          <Button className={searchPanel ? 'active' : ''} bsStyle="primary" onClick={toggleSearch}><i className="fa fa-search" aria-hidden="true" /> Search Tenancies</Button>
          <div>
            <LinkContainer to={juvo.tenancies.create} className={searchPanel ? 'active' : ''}>
              <Button bsStyle="success">Create Tenancy</Button>
            </LinkContainer>
            <LinkContainer to={juvo.tenancies.client.index} className={`viewManagement btn-pink ${searchPanel ? 'active' : ''}`}>
              <Button>Client Account</Button>
            </LinkContainer>
            <LinkContainer to={juvo.tenancies.landlords.index} className={`viewManagement btn-pink ${searchPanel ? 'active' : ''}`}>
              <Button>Landlord Due
              <span>{pagination.landlord_due_count || 0}</span>
              </Button>
            </LinkContainer>
            <LinkContainer to={juvo.tenancies.rents.index} className={`viewManagement btn-pink ${searchPanel ? 'active' : ''}`}>
              <Button>Rent Due
              <span>{pagination.rent_due_count || 0}</span>
              </Button>
            </LinkContainer>
            <ManagementButton category={juvo.tenancies.index} count={pagination.management_count || 0} fill={searchPanel} />
          </div>
        </div>
      </div>
      <div className={`searchPanel ${searchPanel ? 'expanded' : 'collapsed'}`}>
        <Form className="properties-search-form container" onSubmit={handleSearchSubmit}>
          <FormGroup>
            <ControlLabel>
              Search Keyword
              <FormControl type="text" name="s" value={searchValues.s || ''} onChange={handleSearchChange} placeholder="Enter search phrase..." />
            </ControlLabel>
          </FormGroup>
          <FormGroup className="clearfix">
            <ControlLabel>
              Type
              <FormControl componentClass="select" name="stage_id" value={searchValues.stage_id || ''} onChange={handleSearchChange} >
                <option value="" disabled>Select Type</option>
                {Object.keys(types).map(key => (
                  <option key={key} value={key}>{types[key]}</option>
                ))}
              </FormControl>
            </ControlLabel>
          </FormGroup>
          <FormGroup>
            <Button bsStyle="primary" type="submit">Search</Button>
          </FormGroup>
          <FormGroup>
            <Button bsStyle="warning" type="reset" onClick={handleSearchReset}>Reset</Button>
          </FormGroup>
        </Form>
      </div>
    </div>
    <div className="contacts-content list">
      <Row className="table-row table-header">
        <Col sm={2}>
          <div className="column">Property</div>
        </Col>
        <Col sm={2}>
          <div className="column">Tenants</div>
        </Col>
        <Col sm={1}>
          <div className="column">Amount</div>
        </Col>
        <Col sm={7}>
          <div className="column">Details</div>
        </Col>
      </Row>
      {!tenancies || tenancies.length === 0 ? <NoDataFound /> :
        tenancies.map((item, index) => (
          <Tenancy
            key={item.id}
            index={index}
            tenancy={item}
            user={user}
            types={types}
            deleteTenancy={deleteTenancy}
          />
        )
      )}
    </div>
    {pagination && (
      <Pagination pagination={pagination} route={juvo.documents.pageLink} />
    )}
  </Grid>
);

TenanciesComponent.propTypes = {
  tenancies: React.PropTypes.array,
  pagination: React.PropTypes.object,
  user: React.PropTypes.object,
  searchValues: React.PropTypes.object,
  searchPanel: React.PropTypes.bool.isRequired,
  deleteTenancy: React.PropTypes.func.isRequired,
  toggleSearch: React.PropTypes.func.isRequired,
  handleSearchChange: React.PropTypes.func,
  handleSearchSubmit: React.PropTypes.func,
  handleSearchReset: React.PropTypes.func.isRequired,
};

export default TenanciesComponent;
