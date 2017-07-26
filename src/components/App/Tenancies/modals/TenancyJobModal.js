import React from 'react';
import {
  Modal,
  Row,
  Col,
  FormGroup,
  FormControl,
  ControlLabel,
  Checkbox,
  Button
} from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import Datetime from 'react-datetime';
import moment from 'moment';
import { typeaheadFilterBy } from 'common/utils';


const TenancyJobModal = ({
  tenancyJob = {},
  peoples = [],
  users = [],
  user,
  priorities = {
    1: 'Low',
    2: 'Medium',
    3: 'High',
  },
  handleClose,
  handleTenancyJobSubmit,
  handleTenancyJobChange,
  handleJobClientSelect,
  handleJobClientChange,
  jobStatuses = {
    1: 'New',
    2: 'Pending',
    3: 'Completed',
  },
  jobScheludeDateChange,
  jobCompletionDateChange,
}) => (
  <Modal show onHide={handleClose} className="notes">
    <Modal.Header closeButton>
      <Modal.Title>Jobs</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Row>
        <form onSubmit={handleTenancyJobSubmit}>
          <FormGroup className="clearfix">
            <Col componentClass={ControlLabel} sm={2}>
              Contact
            </Col>
            <Col sm={10}>
              <Typeahead
                onChange={handleJobClientSelect}
                onInputChange={handleJobClientChange}
                options={peoples}
                filterBy={typeaheadFilterBy}
                labelKey="name"
                name="people_id"
                selected={tenancyJob.contact ? [tenancyJob.contact] : []}
              />
            </Col>
          </FormGroup>
          <FormGroup className="clearfix">
            <Col componentClass={ControlLabel} sm={2}>
              Status
            </Col>
            <Col sm={10}>
              <FormControl
                value={tenancyJob.status_id || ''}
                name="status_id"
                componentClass="select"
                onChange={handleTenancyJobChange}
              >
                <option value="" disabled>Select Status</option>
                {Object.keys(jobStatuses).map(key => (
                  <option key={key} value={key}>{jobStatuses[key]}</option>
                ))}
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup className="clearfix">
            <Col componentClass={ControlLabel} sm={2}>
              Responsible User
            </Col>
            <Col sm={10}>
              <FormControl
                componentClass="select"
                name="user_responsible_id"
                value={tenancyJob.user_responsible_id || ''}
                onChange={handleTenancyJobChange}
              >
                <option value="" disabled>Select User</option>
                {users.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup className="clearfix">
            <Col componentClass={ControlLabel} sm={2}>
              Priority
            </Col>
            <Col sm={10}>
              <FormControl
                value={tenancyJob.priority || ''}
                name="priority"
                componentClass="select"
                onChange={handleTenancyJobChange}
              >
                <option value="" disabled>Select Priority</option>
                {Object.keys(priorities).map(key => (
                  <option key={key} value={key}>{priorities[key]}</option>
                ))}
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup className="clearfix">
            <Col componentClass={ControlLabel} sm={2}>
              Price {user.currency}
            </Col>
            <Col sm={10}>
              <FormControl
                value={tenancyJob.price || ''}
                name="price"
                type="number"
                step="0.1"
                onChange={handleTenancyJobChange}
              />
            </Col>
          </FormGroup>
          <FormGroup className="clearfix">
            <Col componentClass={ControlLabel} sm={2}>
              Scheluded Date
            </Col>
            <Col sm={10}>
              <Datetime
                inputProps={{ name: 'scheduled_date', placeholder: 'Scheluded Date' }}
                value={tenancyJob.scheduled_date ? moment(tenancyJob.scheduled_date) : ''}
                timeFormat={false}
                dateFormat={user.dateDisplayFormat}
                onChange={jobScheludeDateChange}
                closeOnSelect
              />
            </Col>
          </FormGroup>
          <FormGroup className="clearfix">
            <Col componentClass={ControlLabel} sm={2}>
              Completion Date
            </Col>
            <Col sm={10}>
              <Datetime
                inputProps={{ name: 'completion_date', placeholder: 'Completion Date' }}
                value={tenancyJob.completion_date ? moment(tenancyJob.completion_date) : ''}
                timeFormat={false}
                dateFormat={user.dateDisplayFormat}
                onChange={jobCompletionDateChange}
                closeOnSelect
              />
            </Col>
          </FormGroup>
          <FormGroup className="clearfix">
            <Col componentClass={ControlLabel} sm={2}>
              Description
            </Col>
            <Col sm={10}>
              <FormControl
                name="description"
                type="text"
                value={tenancyJob.description || ''}
                onChange={handleTenancyJobChange}
              />
            </Col>
          </FormGroup>
          <FormGroup className="clearfix">
            <Col componentClass={ControlLabel} sm={2}>
              Completed
            </Col>
            <Col sm={10}>
              <Checkbox
                name="completed"
                checked={tenancyJob.completed || false}
                onChange={handleTenancyJobChange}
              />
            </Col>
          </FormGroup>
          <FormGroup className="clearfix">
            <Col sm={2} smOffset={10}>
              <Button bsStyle="primary" type="submit">Submit</Button>
            </Col>
          </FormGroup>
        </form>
      </Row>
    </Modal.Body>
  </Modal>
);

TenancyJobModal.propTypes = {
  tenancyJob: React.PropTypes.object,
  peoples: React.PropTypes.array,
  users: React.PropTypes.array,
  user: React.PropTypes.object,
  priorities: React.PropTypes.object,
  handleClose: React.PropTypes.func.isRequired,
  handleTenancyJobSubmit: React.PropTypes.func.isRequired,
  handleTenancyJobChange: React.PropTypes.func.isRequired,
  handleJobClientSelect: React.PropTypes.func.isRequired,
  handleJobClientChange: React.PropTypes.func.isRequired,
  jobStatuses: React.PropTypes.object,
  jobScheludeDateChange: React.PropTypes.func.isRequired,
  jobCompletionDateChange: React.PropTypes.func.isRequired,

};

export default TenancyJobModal;
