import React from 'react';
import { Row, Col, Glyphicon, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Link } from 'react-router';
import juvo from 'juvo';
import Datetime from 'react-datetime';
import moment from 'moment';

const getLinkById = (type, id) => {
  const categories = {
    1: juvo.diary.infoLink(id),
    2: juvo.contacts.infoLink(id),
    3: juvo.properties.infoLink(id),
    4: juvo.tenancies.infoLink(id),
    5: juvo.offers.infoLink(id),
  };
  return categories[type];
};

class Management extends React.Component {
  handleDelete = () => {
    this.props.handleManagementDelete(this.props.management.id);
  }
  handleClick = () => {
    this.props.getManagementInfo(this.props.management.id);
  }

  handleLinkClick = e => e.stopPropagation;
  render() {
    const {
      management,
      category,
      user = {},
      dateDisplayFormat,
      editManagement = {},
      users = [],
      handleEditManagementChange,
      handleEditManagementDateChange,
      handleDimissChanges,
      handleEditManagementSubmit,
      types,
    } = this.props;
    return (
      editManagement.id === management.id ? (
        <Row className="edit-row">
          <Col sm={2}>
            <Datetime
              dateFormat={user && user.dateDisplayFormat}
              inputProps={{ name: 'due_date', disabled: editManagement.chased }}
              value={editManagement.due_date ? moment(editManagement.due_date) : ''}
              onChange={handleEditManagementDateChange}
              closeOnSelect
              timeFormat={false}
            />
          </Col>
          <Col sm={2}>
            <FormControl
              componentClass="select"
              name="user_responsible_id"
              value={editManagement.user_responsible_id || ''}
              onChange={handleEditManagementChange}
              disabled={editManagement.chased}
            >
              <option value="" disabled>Select User</option>
              {users.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </FormControl>
          </Col>
          <Col sm={3} md={types ? 2 : 4}>
            <FormControl
              name="feedback"
              type="text"
              value={editManagement.feedback || ''}
              onChange={handleEditManagementChange}
              disabled={editManagement.chased}
            />
          </Col>
          {types && (
            <Col sm={3} md={2}>
              <FormControl
                value={editManagement.type_id || ''}
                name="type_id"
                componentClass="select"
                disabled={editManagement.chased}
                onChange={handleEditManagementChange}
              >
                <option value="" disabled>Select type</option>
                {Object.keys(types).map(key => (
                  <option key={key} value={key}>{types[key]}</option>
                ))}
              </FormControl>
            </Col>
          )}
          <Col sm={3}>
            <FormGroup className="form-checkbox">
              <Col componentClass={ControlLabel} sm={7}>
                Complete
              </Col>
              <Col sm={5}>
                <input
                  type="checkbox"
                  id={`chased_local${management.id}`}
                  name="chased_local"
                  checked={editManagement.chased || editManagement.chased_local || false}
                  onChange={handleEditManagementChange}
                  disabled={editManagement.chased ? editManagement.chased && true : false}
                />
                <label htmlFor={`chased_local${management.id}`} />
              </Col>
            </FormGroup>
          </Col>
          <Col xs={2} xsOffset={10} sm={2} smOffset={0} md={1} className="flex">
            <Glyphicon glyph="ban-circle" onClick={handleDimissChanges} />
            <Glyphicon glyph="ok-circle" onClick={handleEditManagementSubmit} />
            <Glyphicon glyph="remove-circle" onClick={this.handleDelete} />
            {/*
            <Button bsStyle="warning" bsSize="xsmall" onClick={handleDimissChanges}>Cancel</Button>
            <Button bsStyle="primary" bsSize="xsmall" onClick={handleEditManagementSubmit}>Save</Button>
            */}
          </Col>
          {/*
          <Col sm={1} className="flex">
            <Glyphicon glyph="pencil" onClick={this.handleClick} />
            <Glyphicon glyph="remove-circle" onClick={this.handleDelete} />
          </Col>
          */}
        </Row>
      ) : (
        <Row className="table-row" onClick={this.handleClick}>
          <Col sm={2}>{moment(management.due_date).format(dateDisplayFormat)}</Col>
          <Col sm={2}>{user.name}</Col>
          <Col sm={management.type_name ? 2 : 4}>{management.feedback}</Col>
          {management.type_name && (
            <Col sm={2}>{management.type_name}</Col>
          )}
          <Col sm={2}>{management.info && (<Link onClick={this.handleLinkClick} to={getLinkById(category, management.info.id)}>{management.info.name}</Link>)}</Col>
          <Col sm={1}>{management.chased ? <Glyphicon glyph="ok" /> : null}</Col>
          <Col xs={2} xsOffset={10} sm={1} smOffset={0} className="flex">
            <Glyphicon glyph="pencil" onClick={this.handleClick} />
            <Glyphicon glyph="remove-circle" onClick={this.handleDelete} />
          </Col>
        </Row>
      )
    );
  }
}

Management.propTypes = {
  user: React.PropTypes.object,
  dateDisplayFormat: React.PropTypes.string.isRequired,
  management: React.PropTypes.object.isRequired,
  getManagementInfo: React.PropTypes.func.isRequired,
  handleManagementDelete: React.PropTypes.func.isRequired,
};

export default Management;
