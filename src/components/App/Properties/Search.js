import React, { PropTypes } from 'react';
import {
  Row,
  Col,
  FormGroup,
  Button,
  ControlLabel,
  Form,
} from 'react-bootstrap';

const SearchForm = (props) => {
  const {
    user,
    values,
    types,
    prices,
    statuses,
    categories,
    onSubmit,
    onChange,
    priceMin,
    priceMax,
    onReset,
  } = props;
  return (
    <Form
      onSubmit={onSubmit}
      className="collapsible-search container"
    >
      <Row>
        <Col xs={12} sm={6} md={6}>
          <FormGroup controlId="price">
            <ControlLabel>
              Search Keyword
              <input
                value={values.search_string || ''}
                name="search_string"
                type="search"
                placeholder="Search..."
                className="form-control"
                onChange={onChange}
              />
            </ControlLabel>
          </FormGroup>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <FormGroup controlId="price">
            <ControlLabel>
              Category
              <select
                value={values.search_category || ''}
                name="search_category"
                className="form-control"
                onChange={onChange}
              >
                <option value={''}>All Categories</option>
                {categories && categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </ControlLabel>
          </FormGroup>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <FormGroup controlId="price">
            <ControlLabel>
              Type
              <select
                value={values.search_type || ''}
                name="search_type"
                className="form-control select"
                onChange={onChange}
              >
                <option value={''}>All Types</option>
                {types && types.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </ControlLabel>
          </FormGroup>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <FormGroup controlId="price">
            <ControlLabel>
              Status
              <select
                value={values.search_status || ''}
                name="search_status"
                className="form-control select"
                onChange={onChange}
              >
                <option value={''}>All Statuses</option>
                {statuses && statuses.map(status => (
                  <option key={status.id} value={status.id}>{status.name}</option>
                ))}
              </select>
            </ControlLabel>
          </FormGroup>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <FormGroup controlId="price">
            <ControlLabel>
              Pricing type
              <select
                value={values.search_price || ''}
                name="search_price"
                className="form-control select"
                onChange={onChange}
              >
                <option value={''}>All types of pricing</option>
                {prices && prices.map(price => (
                  <option key={price.id} value={price.id}>{price.name}</option>
                ))}
              </select>
            </ControlLabel>
          </FormGroup>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <FormGroup controlId="price">
            <ControlLabel>
              Price range {user && user.currency}
              <div className="flex beds">
                <input
                  value={values.search_price_min || ''}
                  name="search_price_min"
                  type="number"
                  step="0.1"
                  placeholder="From"
                  className="form-control"
                  onChange={onChange}
                  min={priceMin}
                  max={priceMax}
                />
                <input
                  value={values.search_price_max || ''}
                  name="search_price_max"
                  type="number"
                  step="0.1"
                  placeholder="To"
                  className="form-control"
                  onChange={onChange}
                  min={priceMin}
                  max={priceMax}
                />
              </div>
            </ControlLabel>
          </FormGroup>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <div className="flex beds">
            <FormGroup controlId="beds">
              <ControlLabel>
                min Beds
                <input
                  value={values.search_beds_min || ''}
                  name="search_beds_min"
                  type="number"
                  step="0.1"
                  className="form-control"
                  onChange={onChange}
                />
              </ControlLabel>
            </FormGroup>
            <FormGroup controlId="baths">
              <ControlLabel>
                min Bathrooms
                <input
                  value={values.search_bath_min || ''}
                  name="search_bath_min"
                  type="number"
                  step="0.1"
                  className="form-control"
                  onChange={onChange}
                />
              </ControlLabel>
            </FormGroup>
          </div>
        </Col>
        <Col xs={6} sm={3} md={6}>
          <FormGroup>
            <Button bsStyle="primary" type="submit">Search</Button>
          </FormGroup>
        </Col>
        <Col xs={6} sm={3} md={6}>
          <FormGroup>
            <Button bsStyle="warning" type="reset" onClick={onReset}>Reset</Button>
          </FormGroup>
        </Col>
      </Row>
    </Form>
  );
};

SearchForm.propTypes = {
  values: PropTypes.object.isRequired,
  priceMin: PropTypes.number,
  priceMax: PropTypes.number,
  user: PropTypes.object,
  types: PropTypes.array,
  prices: PropTypes.array,
  statuses: PropTypes.array,
  categories: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default SearchForm;
