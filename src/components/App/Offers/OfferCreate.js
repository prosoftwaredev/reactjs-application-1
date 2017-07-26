import React from 'react';
import { Grid, Panel } from 'react-bootstrap';
// import { Link } from 'react-router';
// import juvo from 'juvo';
import MainForm from './MainForm';

const OfferCreate = props => (
  <Grid fluid className="properties-page create">
    {/*
    <Row className="breadcrumb">
      <Link to={juvo.offers.index}>Deal List</Link>
      <span> / Add Deal</span>
    </Row>
    */}
    <Panel>
      <h2 className="page-header">Create Offer</h2>
      <MainForm {...props} />
    </Panel>
  </Grid>
);

export default OfferCreate;
