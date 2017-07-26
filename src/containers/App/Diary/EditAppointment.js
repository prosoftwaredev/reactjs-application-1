import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  clearError,
  setUsers,
  handleSubmit,
  handleChange,
  handleStartDateChange,
  handleEndDateChange,
  deleteAppointment,
  selectPeople,
  autocompletePeople,
  selectProperty,
  autocompleteProperty,
  handleNewPropertyChange,
  handleNewPropertySubmit,
  getManagementInfo,
  handleManagementDelete,
  handleManagementChange,
  handleManagementSubmit,
  handleManagementDateChange,
  addNewProperty,
  addNewContact,
  quickCreateContact,
} from 'redux/modules/app/diary';
import AddAppointmentComponent from 'components/App/Diary/AddAppointment';

class EditAppointment extends React.Component {
  componentDidMount() {
    const { users } = this.props;
    if (!users) {
      this.props.setUsers();
    }
  }
  componentWillReceiveProps(props) {
    if (props.error && props.error.callback) {
      props.error.callback();
      this.props.clearError();
    }
  }

  render() {
    return (
      <AddAppointmentComponent title="Change Appointment" {...this.props} />
    );
  }
}

const mapStateToProps = state => ({
  user: state.app.diary.user,
  categories: state.app.diary.categories,
  users: state.app.diary.users,
  contact: state.app.diary.contact,
  error: state.app.diary.error,
  property: state.app.diary.property,
  newProperty: state.app.diary.newProperty,
  newContact: state.app.diary.newContact,
  peoples: state.app.diary.peoples,
  properties: state.app.diary.properties,
  values: state.app.diary.appointment,
  propertyCategories: state.app.diary.propertyCategories,
  types: state.app.diary.types,
  managements: state.app.diary.managements,
  management: state.app.diary.management,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  clearError,
  setUsers,
  handleSubmit,
  handleChange,
  handleStartDateChange,
  handleEndDateChange,
  handleDelete: deleteAppointment,
  peopleAutocomplete: selectPeople,
  peopleChange: autocompletePeople,
  propertyAutocomplete: selectProperty,
  propertyChange: autocompleteProperty,
  handleNewPropertyChange,
  handleNewPropertySubmit,
  getManagementInfo,
  handleManagementDelete,
  handleManagementChange,
  handleManagementSubmit,
  handleManagementDateChange,
  addNewProperty,
  addNewContact,
  quickCreateContact,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditAppointment);
