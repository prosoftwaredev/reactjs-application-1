import React, { Component } from 'react';
import { Grid, Row, Col, Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { Link } from 'react-router';
import Datetime from 'react-datetime';
import moment from 'moment';
import juvo from 'juvo';
import { momentFormats, toCurrency } from 'common/utils';
import Pagination from 'components/Common/Pagination';
import NoDataFound from 'components/Common/NoDataFound';
import Account from './Account';

class ClientAccountComponent extends Component {
  state = {
    vat: {},
    managementFee: {},
    search: {},
  }
  componentDidMount() {
    this.props.getTenancyClientOverview();
  }
  handleVatFromChange = (date) => {
    const vat = { ...this.state.vat };
    vat.from = date;
    this.setState({ vat });
  }
  handleVatToChange = (date) => {
    const vat = { ...this.state.vat };
    vat.to = date;
    this.setState({ vat });
  }
  handleManagementFromChange = (date) => {
    const managementFee = { ...this.state.managementFee };
    managementFee.from = date;
    this.setState({ managementFee });
  }
  handleManagementToChange = (date) => {
    const managementFee = { ...this.state.managementFee };
    managementFee.to = date;
    this.setState({ managementFee });
  }
  handleSearchFromChange = (date) => {
    const search = { ...this.state.search };
    search.from = date;
    this.setState({ search });
  }
  handleSearchToChange = (date) => {
    const search = { ...this.state.search };
    search.to = date;
    this.setState({ search });
  }
  handleSearchChange = event => this.setState({ search: { text: event.target.value }})
  toggleSearch = () => this.setState({ searchPanel: !this.state.searchPanel })
  handleSearchSubmit = (event) => {
    event.preventDefault();
    const { search = {} } = this.state;
    this.props.getTenancyClient({ page: 1, s: search.text, from: search.from, to: search.to });
  }
  handleManagementExport = () => {
    const { managementFee = {} } = this.state;
    this.props.exportManagementFees({
      start_date: moment(managementFee.from).format('YYYY/MM/DD'),
      end_date: moment(managementFee.to).format('YYYY/MM/DD')
    });
  }
  handleVatExport = () => {
    const { vat } = this.state;
    this.props.exportVats({
      start_date: moment(vat.from).format('YYYY/MM/DD'),
      end_date: moment(vat.to).format('YYYY/MM/DD')
    });
  }
  render() {
    const { user = {}, clientAccounts = {}, overview = {} } = this.props;
    const { managementFee, searchPanel, search } = this.state;
    return (
      <Grid fluid className="contacts-page">
        <div className="contacts-content panel panel-box">
          <Col className="breadcrumb">
            <div>
              <Link to={juvo.tenancies.index}>Tenancies</Link>
              <span> / Client Account</span>
            </div>
          </Col>
          <div className="client flex start">
            <span>Management Fee List Export:</span>
            <Datetime
              inputProps={{ name: 'from', placeholder: 'From' }}
              value={managementFee.from ? moment(managementFee.from) : ''}
              timeFormat={false}
              dateFormat={user.dateDisplayFormat}
              onChange={this.handleManagementFromChange}
              closeOnSelect
            />
            <Datetime
              inputProps={{ name: 'to', placeholder: 'To' }}
              value={managementFee.to ? moment(managementFee.to) : ''}
              timeFormat={false}
              dateFormat={user.dateDisplayFormat}
              onChange={this.handleManagementToChange}
              closeOnSelect
            />
            <Button className="btn-pink" onClick={this.handleManagementExport}>Generate CSV</Button>
          </div>
          <div className="client flex sb">
            <span><b>Credit: {toCurrency(overview.credit || 0, user.currency)}</b></span>
            <span><b>Debit: {toCurrency(overview.debit || 0, user.currency)}</b></span>
            <span><b>Balance: {toCurrency(overview.balance || 0, user.currency)}</b></span>
            <span><b>Vat Total: {toCurrency(overview.vat || 0, user.currency)}</b></span>
            <span><b>Management Fee Total: {toCurrency(overview.management || 0, user.currency)}</b></span>
          </div>
        </div>
        <div className="contacts-content panel panel-box">
          <div className="listControls flex sb">
            <h2>Payments {clientAccounts && clientAccounts.total ? <span>({clientAccounts.total})</span> : <span>(0)</span>}</h2>
            <div>
              <Button className={searchPanel ? 'active' : ''} bsStyle="primary" onClick={this.toggleSearch}><i className="fa fa-search" aria-hidden="true" /> Search Accounts</Button>
              <div>
                <Button className="btn-pink" onClick={this.handleManagementExport}>Export To Csv</Button>
              </div>
            </div>
          </div>
          <div className={`searchPanel ${searchPanel ? 'expanded' : 'collapsed'}`}>
            <Form className="properties-search-form container" onSubmit={this.handleSearchSubmit}>
              <FormGroup>
                <ControlLabel>
                 From
                  <Datetime
                    inputProps={{ name: 'from', placeholder: 'From' }}
                    value={managementFee.from ? moment(managementFee.from) : ''}
                    timeFormat={false}
                    dateFormat={user.dateDisplayFormat}
                    onChange={this.handleManagementFromChange}
                    closeOnSelect
                  />
                </ControlLabel>
              </FormGroup>
              <FormGroup>
                <ControlLabel>
                  To
                  <Datetime
                    inputProps={{ name: 'to', placeholder: 'To' }}
                    value={managementFee.to ? moment(managementFee.to) : ''}
                    timeFormat={false}
                    dateFormat={user.dateDisplayFormat}
                    onChange={this.handleManagementFromChange}
                    closeOnSelect
                  />
                </ControlLabel>
              </FormGroup>
              <FormGroup>
                <ControlLabel>
                  Search Keyword
                  <FormControl
                    type="text"
                    name="s"
                    value={search.s || ''}
                    onChange={this.handleSearchChange}
                    placeholder="Enter search phrase..."
                  />
                </ControlLabel>
              </FormGroup>
              <FormGroup>
                <Button bsStyle="primary" type="submit">Search</Button>
              </FormGroup>
            </Form>
          </div>
        </div>

        <div className="contacts-content list">
          <Row className="table-row table-header">
            <Col sm={2}>
              <div className="column">Date Received</div>
            </Col>
            <Col sm={2}>
              <div className="column">Tenancy</div>
            </Col>
            <Col sm={2}>
              <div className="column">Tenant</div>
            </Col>
            <Col sm={2}>
              <div className="column">Amount</div>
            </Col>
            <Col sm={4}>
              <div className="column">Description</div>
            </Col>
          </Row>
          {!clientAccounts.data || clientAccounts.data.length === 0 ? <NoDataFound /> :
            clientAccounts.data.map((item, index) => (
              <Account
                key={item.id}
                account={item}
                user={user}
                index={index}
                dateDisplayFormat={user.dateDisplayFormat || momentFormats['d/m/Y']}
              />
            )
          )}
        </div>
        {clientAccounts.total ? (
          <Pagination pagination={clientAccounts} route={juvo.tenancies.client.pageLink} />
        ) : null}
      </Grid >
    );
  }
}

export default ClientAccountComponent;
