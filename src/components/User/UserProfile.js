import React from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class UserProfile extends React.Component {
  editUser = () => {
    this.props.editUser(this.props.user.id);
  }
  deleteUser = () => {
    this.props.deleteUser(this.props.user.id);
  }
  render() {
    const uid = this.props.identity && this.props.identity.id;
    return (
      <Row className="table-row user-row">
        <Col xs={11}>
          {this.props.user.name}
        </Col>
        <Col xs={1} className="flex pull-right">
          <LinkContainer to={`/user/${this.props.user.id}`}>
            <Glyphicon glyph="pencil" />
          </LinkContainer>
          {uid !== this.props.user.id && (
            <Glyphicon glyph="remove-circle" onClick={this.deleteUser} />
          )}
        </Col>
      </Row>
    );
  }
}

UserProfile.propTypes = {
  user: React.PropTypes.object.isRequired,
  identity: React.PropTypes.object.isRequired,
  deleteUser: React.PropTypes.func.isRequired,
};

export default UserProfile;
