import React from 'react';
import { Grid, Row, Col, Form, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Pagination from 'components/Common/Pagination';
import juvo from 'juvo';
import ManagementButton from 'components/Common/ManagementButton';
import NoDataFound from 'components/Common/NoDataFound';
import Offer from './Offer';

const OffersComponent = ({
  offers = [],
  stages = {
    1: 'Completed',
    2: 'Interest',
    3: 'Negotiation',
    4: 'Offer Accepted',
    5: 'Offer Proposed',
  },
  user = {},
  pagination = {},
  searchValues = {},
  handleSearchChange,
  handleSearchReset,
  handleSearchSubmit,
  deleteOffer,
  searchPanel,
  toggleSearch,
}) => (
  <Grid fluid className="contacts-page offers">
    <div className="contacts-content panel panel-box">
      <div className="listControls flex sb">
        <h2>Offer {pagination && pagination.total ? <span>({pagination.total})</span> : <span>(0)</span>}</h2>
        <div>
          <Button className={searchPanel ? 'active' : ''} bsStyle="primary" onClick={toggleSearch}>Search Offers <i className="fa fa-search" aria-hidden="true" /></Button>
          <div>
            <LinkContainer to={juvo.offers.create} className={searchPanel ? 'active' : ''}>
              <Button bsStyle="success">Create Offer</Button>
            </LinkContainer>
            <ManagementButton category={juvo.offers.index} count={pagination.management_count || 0} fill={searchPanel} />
          </div>
        </div>
      </div>
      <div className={`searchPanel ${searchPanel ? 'expanded' : 'collapsed'}`}>
        <Form className="properties-search-form container" onSubmit={handleSearchSubmit}>
          <FormGroup>
            <ControlLabel>
              Search Keyword
              <FormControl type="text" name="s" value={searchValues.s} onChange={handleSearchChange} placeholder="Enter search phrase..." />
            </ControlLabel>
          </FormGroup>
          <FormGroup className="clearfix">
            <ControlLabel>
              Stage
              <FormControl componentClass="select" name="stage_id" value={searchValues.stage_id || ''} onChange={handleSearchChange} >
                <option value="" disabled>Select stage</option>
                {Object.keys(stages).map(key => (
                  <option key={key} value={key}>{stages[key]}</option>
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
          <div className="column">Stage</div>
        </Col>
        <Col sm={1}>
          <div className="column">Amount</div>
        </Col>
        <Col sm={7}>
          <div className="column">Details</div>
        </Col>
      </Row>
      {!offers || offers.length === 0 ? <NoDataFound /> :
        offers.map((item, index) => (
          <Offer
            key={item.id}
            index={index}
            offer={item}
            user={user}
            stages={stages}
            deleteOffer={deleteOffer}
          />
        )
      )}
    </div>
    {pagination && (
      <Pagination pagination={pagination} route={juvo.documents.pageLink} />
    )}
  </Grid>
);

OffersComponent.propTypes = {
  offers: React.PropTypes.array,
  pagination: React.PropTypes.object,
  user: React.PropTypes.object,
  searchValues: React.PropTypes.object,
  searchPanel: React.PropTypes.bool.isRequired,
  deleteOffer: React.PropTypes.func.isRequired,
  toggleSearch: React.PropTypes.func.isRequired,
  handleSearchChange: React.PropTypes.func,
  handleSearchSubmit: React.PropTypes.func,
  handleSearchReset: React.PropTypes.func.isRequired,
};

export default OffersComponent;
