import React from 'react';
import { Modal, Col, FormGroup, FormControl, ControlLabel, Checkbox, Button } from 'react-bootstrap';
import moment from 'moment';
import Datetime from 'react-datetime';

const ManagementModal = ({
  management,
  user,
  users = [],
  handleManagementChange,
  handleManagementSubmit,
  handleManagementDateChange,
  handleClose,
}) => (
  <Modal show onHide={handleClose} className="jobs">
    <Modal.Header closeButton>
      <Modal.Title>Management</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form onSubmit={handleManagementSubmit}>
        <FormGroup className="managementRow clearfix">
          <Col componentClass={ControlLabel} sm={1}>
            User
          </Col>
          <Col sm={4}>
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
          <Col componentClass={ControlLabel} sm={2}>
            Due Date
          </Col>
          <Col sm={5}>
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
        <FormGroup className="managementRow clearfix">
          <Col componentClass={ControlLabel} sm={2}>
            Complete
          </Col>
          <Col sm={1}>
            <Checkbox
              name="chased_local"
              checked={management.chased || management.chased_local || false}
              onChange={handleManagementChange}
              disabled={management.chased ? management.chased && true : false}
            />
          </Col>
          {management.chased ? (
            <Col sm={9}>
              Complete on {moment(management.chased_date).format((user && user.dateDisplayFormat) || 'YYYY-MM-DD')} by {users.find(itemUser => itemUser.id === management.chased_by).name}
            </Col>
          ) : null}
        </FormGroup>
        <FormGroup className="managementRow clearfix">
          <Col componentClass={ControlLabel} sm={2}>
            Feedback
          </Col>
          <Col sm={10}>
            <FormControl
              name="feedback"
              type="text"
              value={management.feedback || ''}
              onChange={handleManagementChange}
              disabled={management.chased}
            />
          </Col>
        </FormGroup>
        <FormGroup className="managementRow clearfix">
          {management.chased ? null : (
            <Col sm={2} className="control-label">
              <Button bsStyle="primary" type="submit">Save</Button>
            </Col>
          )}
        </FormGroup>
      </form>
    </Modal.Body>
  </Modal>
);

ManagementModal.propTypes = {
  management: React.PropTypes.object.isRequired,
  user: React.PropTypes.object,
  users: React.PropTypes.array,
  handleManagementChange: React.PropTypes.func.isRequired,
  handleManagementSubmit: React.PropTypes.func.isRequired,
  handleManagementDateChange: React.PropTypes.func.isRequired,
  handleClose: React.PropTypes.func.isRequired,
};

export default ManagementModal;
