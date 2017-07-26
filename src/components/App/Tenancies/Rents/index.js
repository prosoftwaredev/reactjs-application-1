import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import Pagination from 'components/Common/Pagination';
import NoDataFound from 'components/Common/NoDataFound';
import { momentFormats } from 'common/utils';
import juvo from 'juvo';
import Rent from './Rent';

const RentsComponent = ({
  rents = {},
  user = {},
  deleteTenancyRent,
  getTenancyRentInfo,
  getTenancyPayments,
  handleModalClose,
  setSelectedRent,
}) => (
  <Grid fluid className="contacts-page">
    <div className="contacts-content panel panel-box">
      <Col className="breadcrumb">
        <div>
          <Link to={juvo.tenancies.index}>Tenancies</Link>
          <span> / Rents</span>
        </div>
        <div className="total">
          <span>Total: {rents.total}</span>
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
          <div className="column">Tenancy</div>
        </Col>
        <Col sm={3}>
          <div className="column">Tenants</div>
        </Col>
        <Col sm={2}>
          <div className="column">Amount</div>
        </Col>
        <Col sm={3}>
          <div className="column">Fee</div>
        </Col>
      </Row>
      {!rents.data || rents.data.length === 0 ? <NoDataFound /> :
        rents.data.map((item, index) => (
          <Rent
            key={item.id}
            rent={item}
            user={user}
            index={index}
            dateDisplayFormat={user.dateDisplayFormat || momentFormats['d/m/Y']}
            deleteTenancyRent={deleteTenancyRent}
            getTenancyRentInfo={getTenancyRentInfo}
            getTenancyPayments={getTenancyPayments}
            handleClose={handleModalClose}
            setSelectedRent={setSelectedRent}
          />
        )
      )}
    </div>
    {rents && rents.total ? (
      <Pagination pagination={rents} route={juvo.tenancies.rents.pageLink} />
    ) : null}
  </Grid>
);

RentsComponent.propTypes = {
  rents: React.PropTypes.object,
  user: React.PropTypes.object,
  deleteTenancyRent: React.PropTypes.func.isRequired,
  getTenancyRentInfo: React.PropTypes.func.isRequired,
  getTenancyPayments: React.PropTypes.func.isRequired,
  handleModalClose: React.PropTypes.func.isRequired,
  setSelectedRent: React.PropTypes.func.isRequired,
};

export default RentsComponent;
