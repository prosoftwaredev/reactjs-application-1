import React, { PropTypes } from 'react';
import {
  FormGroup,
  FormControl,
  Button,
  Form,
  ControlLabel,
} from 'react-bootstrap';

const SearchForm = (props) => {
  const { defaults, categories, onSubmit, onChange, users = [], onReset } = props;
  return (
    <Form horizontal onSubmit={onSubmit} className="properties-search-form container">
      <FormGroup>
        <ControlLabel>
          Search Keyword
          <FormControl
            value={defaults.search_string || ''}
            name="search_string"
            type="text"
            placeholder="Search..."
            onChange={onChange}
          />
        </ControlLabel>
      </FormGroup>
      <FormGroup controlId="price">
        <ControlLabel>
          Category
          <FormControl
            value={defaults.search_category || ''}
            name="search_category"
            componentClass="select"
            onChange={onChange}
          >
            <option value={''}>All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </FormControl>
        </ControlLabel>
      </FormGroup>
      <FormGroup controlId="price">
        <ControlLabel>
          User
          <FormControl
            placeholder="User..."
            value={defaults.search_owner || ''}
            name="search_owner"
            type="text"
            componentClass="select"
            onChange={onChange}
          >
            <option value="" disabled>Select User</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </FormControl>
        </ControlLabel>
      </FormGroup>
      <FormGroup>
        <Button bsStyle="primary" type="submit">Search</Button>
      </FormGroup>
      <FormGroup>
        <Button bsStyle="warning" type="reset" onClick={onReset}>Reset</Button>
      </FormGroup>
    </Form>
  );
};

SearchForm.propTypes = {
  defaults: PropTypes.object.isRequired,
  categories: PropTypes.array,
  users: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default SearchForm;
