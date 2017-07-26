import React from 'react';
import { Link } from 'react-router';
import juvo from 'juvo';

console.log(juvo);

const routes = {
  appointment: `/diary${juvo.managements.pageLink(1)}`,
  contact: `/contacts${juvo.managements.pageLink(1)}`,
  property: `/properties${juvo.managements.pageLink(1)}`,
  tenancy: `/tenancy${juvo.managements.pageLink(1)}`,
  offer: `/offers${juvo.managements.pageLink(1)}`,
  rent: juvo.tenancies.rents.index,
};

class Managements extends React.Component {
  componentDidMount() {
    this.props.actions.fetchManagements();
  }
  render() {
    const { loading, managements = {} } = this.props;
    return (
      <div className="dashboard-todo panel panel-default">
        <table className="table table-bordered table-hover">
          <tbody>
            {loading && (
              <tr>
                <td>Loading...</td>
              </tr>
            )}
            {Object.keys(managements).map((key, index) => (
              <tr key={index}>
                <td>
                  <Link
                    to={routes[key]}
                    className="managementDashboard"
                  >
                    {key}<span>{managements[key]}</span>
                  </Link>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    );
  }
}

Managements.propTypes = {
  managements: React.PropTypes.object,
  actions: React.PropTypes.object.isRequired,
};

export default Managements;
