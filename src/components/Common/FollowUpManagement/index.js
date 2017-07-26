import React from 'react';
import { Panel, Row, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import Datetime from 'react-datetime';
import moment from 'moment';
import NoDataFound from 'components/Common/NoDataFound';
import { getValidationStatus } from 'common/utils';
import Management from './Management';

const getCategoryById = (id) => {
  const categories = {
    1: 'Appointment',
    2: 'Contact',
    3: 'Property',
    4: 'Tenancy',
    5: 'Offer'
  };
  return categories[id];
};

const FollowUpManagementComponent = ({
  error,
  user = {},
  users = [],
  management = {},
  editManagement = {},
  managements = {},
  element,
  types,
  handleManagementChange,
  handleEditManagementChange,
  handleManagementDateChange,
  handleEditManagementDateChange,
  handleManagementSubmit,
  handleEditManagementSubmit,
  handleManagementDelete,
  getManagementInfo,
  handleDimissChanges,
  category,
}) => (
  <section className="followUp">
    <Row>
      {types && (
        <Col lg={4}>
          <FormGroup validationState={getValidationStatus(error, 'type_id', management)}>
            {element && <input hidden name="element_id" defaultValue={element} />}
            <Col componentClass={ControlLabel} sm={3}>
              Type
            </Col>
            <Col sm={9}>
              <FormControl
                value={management.type_id || ''}
                name="type_id"
                componentClass="select"
                disabled={management.chased}
                onChange={handleManagementChange}
              >
                <option value="" disabled>Select type</option>
                {Object.keys(types).map(key => (
                  <option key={key} value={key}>{types[key]}</option>
                ))}
              </FormControl>
            </Col>
          </FormGroup>
        </Col>
      )}
      <Col lg={4}>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={3}>
            User
        </Col>
          <Col sm={9}>
            <FormControl
              componentClass="select"
              name="user_responsible_id"
              value={management.user_responsible_id || ''}
              onChange={handleManagementChange}
              disabled={management.chased}
            >
              <option value="" disabled>Select User</option>
              {users.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </FormControl>
          </Col>
        </FormGroup>
      </Col>
      <Col lg={4}>
        <FormGroup validationState={getValidationStatus(error, 'due_date', management)}>
          <Col componentClass={ControlLabel} sm={3}>
            Due Date
        </Col>
          <Col sm={9}>
            <Datetime
              dateFormat={user && user.dateDisplayFormat}
              inputProps={{ name: 'due_date', disabled: management.chased }}
              value={management.due_date ? moment(management.due_date) : ''}
              onChange={handleManagementDateChange}
              closeOnSelect
              timeFormat={false}
            />
          </Col>
        </FormGroup>
      </Col>
      <Col lg={4}>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={3}>
            Note
        </Col>
          <Col sm={9}>
            <FormControl
              name="feedback"
              type="text"
              value={management.feedback || ''}
              onChange={handleManagementChange}
              disabled={management.chased}
            />
          </Col>
        </FormGroup>
      </Col>
      <Col lg={4}>
        <FormGroup className="form-checkbox">
          <Col componentClass={ControlLabel} sm={3}>
            Complete
          </Col>
          <Col sm={1}>
            <input
              id="chasedCheckbox"
              type="checkbox"
              name="chased_local"
              checked={management.chased || management.chased_local || false}
              onChange={handleManagementChange}
              disabled={management.chased ? management.chased && true : false}
            />
            <label htmlFor="chasedCheckbox" />
          </Col>
          {management.chased ? (
            <Col sm={9}>
              Complete on {moment(management.chased_date).format((user && user.dateDisplayFormat) || 'YYYY-MM-DD')} by {users.find(itemUser => itemUser.id === management.chased_by).name}
            </Col>
          ) : null}
        </FormGroup>
      </Col>

      <Col lg={4}>
        <FormGroup>
          {management.chased ? null : (
            <Col sm={3} className="control-label">
              <Button
                bsStyle="success"
                onClick={handleManagementSubmit}
                disabled={types && !management.type_id}
              >Add</Button>
            </Col>
          )}
        </FormGroup>
      </Col>
    </Row>
    <Row className="managements">
      <Panel className="table">
        <Row className="table-header">
          <Col xs={2} sm={2}>
            <div className="column">Date</div>
          </Col>
          <Col xs={2} sm={2}>
            <div className="column">User</div>
          </Col>
          <Col xs={2} sm={types ? 2 : 4}>
            <div className="column">Note</div>
          </Col>
          {types && (
            <Col xs={2} sm={2}>
              <div className="column">Type</div>
            </Col>
          )}
          <Col xs={2} sm={3}>
            <div className="column">{getCategoryById(category)}</div>
          </Col>
        </Row>
        {!managements.data || managements.data.length === 0 ? <NoDataFound /> :
          managements.data.map(item => (
            <Management
              user={users.find(userItem => userItem.id === item.user_responsible_id)}
              key={item.id}
              management={item}
              handleManagementDelete={handleManagementDelete}
              getManagementInfo={getManagementInfo}
              dateDisplayFormat={(user && user.dateDisplayFormat) || 'YYYY-MM-DD'}
              editManagement={editManagement}
              users={users}
              category={category}
              handleEditManagementChange={handleEditManagementChange}
              handleEditManagementDateChange={handleEditManagementDateChange}
              handleDimissChanges={handleDimissChanges}
              handleEditManagementSubmit={handleEditManagementSubmit}
              types={types}
            />
          )
        )}
      </Panel>
    </Row>
  </section>
);

FollowUpManagementComponent.propTypes = {
  user: React.PropTypes.object,
  types: React.PropTypes.object,
  users: React.PropTypes.array,
  management: React.PropTypes.object,
  editManagement: React.PropTypes.object,
  managements: React.PropTypes.object,
  handleEditManagementChange: React.PropTypes.func.isRequired,
  handleManagementChange: React.PropTypes.func.isRequired,
  handleManagementDateChange: React.PropTypes.func.isRequired,
  handleEditManagementDateChange: React.PropTypes.func.isRequired,
  handleManagementSubmit: React.PropTypes.func.isRequired,
  handleEditManagementSubmit: React.PropTypes.func.isRequired,
  handleManagementDelete: React.PropTypes.func.isRequired,
  getManagementInfo: React.PropTypes.func.isRequired,
  handleDimissChanges: React.PropTypes.func.isRequired,
};

export default FollowUpManagementComponent;
