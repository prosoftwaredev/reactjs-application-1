import React, { PropTypes } from 'react';
import { Grid, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import juvo from 'juvo';
import Error from 'components/Common/Error';
// import Loading from 'components/Common/Loading';
import Pagination from 'components/Common/Pagination';
import ManagementButton from 'components/Common/ManagementButton';
import NoDataFound from 'components/Common/NoDataFound';

import Search from './Search';
import Property from './Property';


const PropertiesComponent = (props) => {
  const {
    user,
    properties,
    pagination = {},
    types,
    prices,
    statuses,
    categories,
    searchValues,
    loading,
    error,
    handleSearchSubmit,
    handleSearchChange,
    load,
    setDetailedProperty,
    handleDelete,
    toggleSearch,
    searchPanel,
    priceMin,
    priceMax,
    propertyTypes,
  } = props;
  const hasSystemInfoMessages = loading || error;

  return (
    <Grid fluid className="contacts-page">
      <div className="contacts-content panel panel-box">
        <div className="listControls flex sb">
          <h2>Property {pagination && pagination.total ? <span>({pagination.total}/<span className="green">{pagination.marketed_total} On Market</span>)</span> : <span>(0)</span>}</h2>
          <div>
            <Button className={searchPanel ? 'active' : ''} bsStyle="primary" onClick={toggleSearch}><i className="fa fa-search" aria-hidden="true" /> Search Properties</Button>
            <div>
              <LinkContainer to={juvo.properties.create} className={searchPanel ? 'active' : ''}>
                <Button bsStyle="success">Create Property</Button>
              </LinkContainer>
              <ManagementButton category={juvo.properties.index} count={pagination.management_count || 0} fill={searchPanel} />
            </div>
          </div>
        </div>
        <div className={`searchPanel ${searchPanel ? 'expanded' : 'collapsed'}`}>
          <Search
            values={searchValues || {}}
            priceMin={priceMin}
            priceMax={priceMax}
            onSubmit={handleSearchSubmit}
            onChange={handleSearchChange}
            onReset={props.handleSearchReset}
            types={types}
            prices={prices}
            statuses={statuses}
            categories={categories}
            user={user}
          />
        </div>
      </div>
      <div className="contacts-content list">
        {/* loading ? <Loading /> : null */}
        {error ? <Error onRetry={load} /> : null}
        {(
          (!hasSystemInfoMessages && !properties.length)
            ? (
              <div className="empty">
                <Link to={juvo.properties.create} className="btn btn-primary">New Property</Link>
              </div>
            ) : null
        )}
        <Row className="table-row table-header">
          <Col xs={2} xsOffset={4} sm={3} smOffset={2}>
            <div className="column">Title</div>
          </Col>
          <Col xs={2} sm={3}>
            <div className="column">Type</div>
          </Col>
          <Col xs={2} sm={2}>
            <div className="column">Price</div>
          </Col>
        </Row>
        {!properties || properties.length === 0 ? <NoDataFound /> :
          properties.map((property, index) => (
            <Property
              user={user}
              property={property}
              index={index}
              types={propertyTypes}
              key={index}
              onClick={setDetailedProperty}
              onDelete={handleDelete}
            />
          )
        )}
      </div>
      {pagination && (
        <Pagination pagination={pagination} route={juvo.properties.pageLink} />
      )}
    </Grid>
  );
};

PropertiesComponent.propTypes = {
  user: PropTypes.object,
  properties: PropTypes.array,
  pagination: PropTypes.object,
  types: PropTypes.array,
  prices: PropTypes.array,
  statuses: PropTypes.array,
  categories: PropTypes.array,
  searchValues: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  searchPanel: PropTypes.bool.isRequired,
  handleSearchSubmit: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  load: PropTypes.func.isRequired,
  setDetailedProperty: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  toggleSearch: PropTypes.func.isRequired,
};

export default PropertiesComponent;
