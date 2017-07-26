import React from 'react';
import { Grid, Panel } from 'react-bootstrap';
// import { Link } from 'react-router';
// import juvo from 'juvo';
import MainForm from './MainForm';

const TenancyCreate = props => (
  <Grid fluid className="properties-page create">
    {/*
    <Row className="breadcrumb">
      <Link to={juvo.tenancies.index}>Tenancies List</Link>
      <span> / Add Tenancy</span>
    </Row>
    */}
    <Panel>
      <h2 className="page-header">Create Tenancy</h2>
      <MainForm {...props} />
    </Panel>
  </Grid>
);

export default TenancyCreate;
