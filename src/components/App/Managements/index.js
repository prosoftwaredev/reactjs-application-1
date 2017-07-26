import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import Pagination from 'components/Common/Pagination';
import NoDataFound from 'components/Common/NoDataFound';
import juvo from 'juvo';
import Management from './Management';

const ManagementsComponent = ({
  managements = {},
  users = [],
  params = {},
  handleManagementDelete,
  handleEditManagement,
}) => (
  <Grid fluid className="contacts-page">
    <div className="contacts-content panel panel-box">
      <Col className="breadcrumb">
        <div>
          <Link to={`/${params.category}`}>{params.category}</Link>
          <span> / Managements</span>
        </div>
        <div className="total">
          <span>Total: {managements.total}</span>
        </div>
      </Col>
      <div className="client" />
    </div>
    <div className="contacts-content list">
      <Row className="table-row table-header">
        <Col sm={2}>
          <div className="column">Due Date</div>
        </Col>
        <Col sm={2}>
          <div className="column">User</div>
        </Col>
        <Col sm={3}>
          <div className="column">Feedback</div>
        </Col>
        <Col sm={5}>
          <div className="column" style={{textTransform: 'capitalize'}}>{params.category}</div>
        </Col>
      </Row>
      {!managements.data || managements.data.length === 0 ? <NoDataFound /> :
        managements.data.map((item, index) => (
          <Management
            key={item.id}
            index={index}
            management={item}
            user={users.find(userItem => userItem.id === item.user_responsible_id)}
            category={params.category}
            handleManagementDelete={handleManagementDelete}
            handleEditManagement={handleEditManagement}
          />
        )
      )}
    </div>
    {managements && managements.total ? (
      <Pagination pagination={managements} route={juvo.managements.pageLink} category={params.category} />
    ) : null}
  </Grid>
);

ManagementsComponent.propTypes = {
  managements: React.PropTypes.object,
  users: React.PropTypes.array,
  handleManagementDelete: React.PropTypes.func.isRequired,
  handleEditManagement: React.PropTypes.func.isRequired,
};

export default ManagementsComponent;
