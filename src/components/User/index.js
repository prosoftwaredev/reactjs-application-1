import React from 'react';
import { Grid, Panel, Row, Col, Alert, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import juvo from 'juvo';
import UserProfile from './UserProfile';

const UserComponent = ({
  subscription = {},
  users,
  identity,
  usersMap = [],
  deleteUser,
}) => (
  <Grid className="properties-page create">
    <Panel>
      <h2>User Management</h2>
      <Row className="subscriptionInfo">
        <Col xs={12}>
          <Alert bsStyle="info" className="clearfix nomargin">
            <p>
              <strong>Current User Limit: </strong>{subscription.quantity}
              <span className="pull-right">
                <LinkContainer to={juvo.billing.index}>
                  <Button bsStyle="link">Click here to increase your user limit</Button>
                </LinkContainer>
              </span>
            </p>
          </Alert>
        </Col>
      </Row>
      <Row className="systemOptions">
        <Row>
          <LinkContainer to={juvo.user.create}>
            <Button bsStyle="primary">Add User</Button>
          </LinkContainer>
        </Row>
        <Col xs={12}>
          <Panel className="table">
            <Row className="table-header">
              <Col xs={2} sm={2}>
                <div className="column">User</div>
              </Col>
            </Row>
            {usersMap.map(key => (
              <UserProfile key={key} user={users[key]} deleteUser={deleteUser} identity={identity} />
            ))}
          </Panel>
        </Col>
      </Row>
    </Panel>
  </Grid>
);

UserComponent.propTypes = {
  subscription: React.PropTypes.object,
  users: React.PropTypes.object,
  identity: React.PropTypes.object,
  usersMap: React.PropTypes.array,
  deleteUser: React.PropTypes.func.isRequired,
};

export default UserComponent;
