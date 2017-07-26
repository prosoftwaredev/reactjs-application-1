import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Grid, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import juvo from 'juvo';
import {
  setUsers,
  fetchAppointments,
  setAppointments,
  moveAppointment,
  setFilter,
  setAppointment,
  showModal,
  clearError,
} from 'redux/modules/app/diary';

import Fullcalendar from 'components/App/Diary/Fullcalendar';
import Controls from 'components/App/Diary/Controls';
import ManagementButton from 'components/Common/ManagementButton';

class Diary extends React.Component {
  componentDidMount() {
    const { users, appointments, filter } = this.props;
    if (!users) {
      this.props.setUsers();
    }
    if (!appointments) {
      const curr = new Date(); // get current date
      const first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
      const last = first + 6; // last day is the first day + 6

      const firstday = new Date(curr.setDate(first)).toUTCString();
      const lastday = new Date(curr.setDate(last)).toUTCString();
      const req = {
        start_date: moment(firstday).format('YYYY-MM-DD HH:mm'),
        end_date: moment(lastday).format('YYYY-MM-DD HH:mm'),
        uid: filter ? filter.uid : 0,
      };
      this.props.setAppointments(req);
      this.props.setFilter(req);
    }
  }
  componentWillReceiveProps(props) {
    if (props.error && props.error.callback) {
      props.error.callback();
      this.props.clearError();
    }
  }

  render() {
    const {
      user,
      users,
      appointments,
      pagination = {},
    } = this.props;
    return (
      <Grid fluid className="diary-page">
        <div className="listControls flex sb">
          <Controls users={users} filter={this.props.fetchAppointments} onClick={this.props.showModal} />
          <ManagementButton category={juvo.diary.index} count={pagination.management_count || 0} />
        </div>
        <div className="diary-content panel panel-box">
          {appointments && (
            <Col md={12}>
              <Fullcalendar
                user={user}
                fetch={this.props.fetchAppointments}
                events={appointments}
                // add={this.props.addAppointment}
                move={this.props.moveAppointment}
                select={this.props.setAppointment}
                users={users}
                onClick={this.props.showModal}
                defaultDate={this.props.defaultDate}
              />
            </Col>
          )}
        </div>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  user: state.app.diary.user,
  users: state.app.diary.users,
  error: state.app.diary.error,
  appointments: state.app.diary.appointments,
  pagination: state.app.diary.pagination,
  filter: state.app.diary.filter,
  defaultDate: state.app.diary.defaultDate,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setUsers,
  fetchAppointments,
  setAppointments,
  moveAppointment,
  setFilter,
  setAppointment,
  showModal,
  clearError,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Diary);
