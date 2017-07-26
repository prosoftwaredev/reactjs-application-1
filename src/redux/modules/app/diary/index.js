import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import { browserHistory } from 'react-router';
import { objectToArray, momentFormats } from 'common/utils';
import juvo from 'juvo';
import { createContact } from '../contacts/requests';

import {
  fetchCategories,
  fetchUsers,
  fetchEvents,
  createEvent,
  moveEvent,
  updateEvent,
  peopleAutocomplete,
  propertyAutocomplete,
  getAppointmentInfo,
  deleteEvent,
  propertyQuickCreate,
} from './requests';

import { SET_STATIC_DATA, SET_USER_DATA } from '../../common';

const SET_APPOINTMENT_EVENT = 'juvo/app/diary/SET_APPOINTMENT_EVENT';
const SET_CATEGORIES = 'juvo/app/diary/SET_CATEGORIES';
const SET_USERS = 'juvo/app/diary/SET_USERS';
const SET_APPOINTMENTS = 'juvo/app/diary/SET_APPOINTMENTS';
const CREATE_APPOINTMENT = 'juvo/app/diary/CREATE_APPOINTMENT';
const UPDATE_APPOINTMENT = 'juvo/app/diary/UPDATE_APPOINTMENT';
const MOVE_APPOINTMENT = 'juvo/app/diary/MOVE_APPOINTMENT';
const SET_FILTER = 'juvo/app/diary/SET_FILTER';
const PEOPLE_AUTOCOMPLETE = 'juvo/app/diary/PEOPLE_AUTOCOMPLETE';
const PROPERTY_AUTOCOMPLETE = 'juvo/app/diary/PROPERTY_AUTOCOMPLETE';
const PEOPLE_SELECT = 'juvo/app/diary/PEOPLE_SELECT';
const PROPERTY_SELECT = 'juvo/app/diary/PROPERTY_SELECT';
const PROPERTY_NEW = 'juvo/app/diary/PROPERTY_NEW';
const SET_NEW_PROPERTY = 'juvo/app/diary/SET_NEW_PROPERTY';
const SET_NEW_CONTACT = 'juvo/app/diary/SET_NEW_CONTACT';
const CLEAR_AUTOCOMPLETE = 'juvo/app/diary/CLEAR_AUTOCOMPLETE';
const SET_APPOINTMENT = 'juvo/app/diary/SET_APPOINTMENT';
const DEL_APPOINTMENT = 'juvo/app/diary/DEL_APPOINTMENT';
const SET_MODAL = 'juvo/app/diary/SET_MODAL';
const SET_QUICK_PROPERTY = 'juvo/app/diary/SET_QUICK_PROPERTY';
const SET_QUICK_CONTACT = 'juvo/app/diary/SET_QUICK_CONTACT';
const SET_ERROR = 'juvo/app/diary/SET_ERROR';
const SET_NEW_APPOINTMENT = 'juvo/app/diary/SET_NEW_APPOINTMENT';

const SUCCESS = '_SUCCESS';
// const REQUEST = '_REQUEST';
const FAILURE = '_FAILURE';


const initialState = {
  modal: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${SET_STATIC_DATA}${SUCCESS}`: {
      const { a_category, p_category, p_type } = action.res;
      return {
        ...state,
        categories: a_category,
        propertyCategories: p_category,
        types: p_type,
      };
    }
    case `${SET_USER_DATA}${SUCCESS}`: {
      const { diary_day_start, date_format, date_display_format } = action.res.data;
      const dateFormat = momentFormats[date_format];
      const dateDisplayFormat = momentFormats[date_display_format];
      return {
        ...state,
        user: {
          diaryStart: diary_day_start,
          dateFormat,
          dateDisplayFormat,
        }
      };
    }
    case SET_APPOINTMENT_EVENT: {
      const appointment = (action.payload.data && { ...action.payload.data.appointment }) || { ...state.appointment };
      const { contact, property } = action.payload.data.appointment;
      delete appointment.contact;
      delete appointment.property;
      const appointments = state.appointments ? [...state.appointments] : [appointment];
      for (let i = 0, l = appointments.length; i < l; i++) {
        if (appointments[i].id === appointment.id) {
          appointments[i] = appointment;
        }
      }
      return { ...state, appointment, appointments, contact, property };
    }
    case `${SET_CATEGORIES}${SUCCESS}`: {
      return { ...state, categories: objectToArray(action.res) };
    }
    case `${SET_USERS}${SUCCESS}`: {
      return { ...state, users: action.res.data };
    }
    case `${SET_APPOINTMENTS}${SUCCESS}`: {
      const { data: appointments, ...pagination } = action.res;
      return { ...state, appointments, pagination };
    }
    case `${CREATE_APPOINTMENT}${SUCCESS}`: {
      const appointments = state.appointments ? [...state.appointments] : [];
      appointments.push(action.res.data.appointment);
      return {
        ...state,
        appointments,
        autocomplete: {},
        appointment: {},
        modal: false,
        newProperty: null,
        contact: null,
        property: null,
        peoples: [],
        properties: [],
        error: { callback: () => browserHistory.push(juvo.diary.index) }
      };
    }
    case `${CREATE_APPOINTMENT}${FAILURE}`: {
      const { errors } = action.error;
      const error = {
        message: Object.keys(errors).map(key => errors[key]).join('\r\n'),
      };
      return { ...state, error };
    }
    case UPDATE_APPOINTMENT: {
      return { ...state, appointment: action.payload };
    }
    case `${UPDATE_APPOINTMENT}${SUCCESS}`: {
      const appointment = action.res.data.appointment;
      const appointments = [...state.appointments].filter(event => event.id !== appointment.id);
      if (appointment.start && appointment.end) {
        appointments.push(appointment);
      }
      return {
        ...state,
        appointments,
        autocomplete: {},
        appointment: {},
        modal: false,
        newProperty: null,
        contact: null,
        property: null,
        peoples: [],
        properties: [],
        error: { callback: () => browserHistory.push(juvo.diary.index) }
      };
    }
    case `${MOVE_APPOINTMENT}${SUCCESS}`: {
      const appointment = action.res.data.appointment;
      const appointments = state.appointments ? [...state.appointments].map(event => (event.id !== appointment.id ? event : appointment)) : [appointment];
      return { ...state, appointments };
    }
    case SET_FILTER: {
      return { ...state, filter: action.payload };
    }
    case `${PEOPLE_AUTOCOMPLETE}${SUCCESS}`: {
      return { ...state, peoples: action.res.data };
    }
    case `${PROPERTY_AUTOCOMPLETE}${SUCCESS}`: {
      return { ...state, properties: action.res.data };
    }
    case PEOPLE_SELECT: {
      const appointment = { ...state.appointment } || {};
      appointment.people_id = action.payload.length > 0 ? action.payload[0].id : appointment.people_id;
      return { ...state, appointment, newContact: false, contact: action.payload[0] };
    }
    case PROPERTY_SELECT: {
      const appointment = { ...state.appointment } || {};
      appointment.property_id = action.payload.length > 0 ? action.payload[0].id : appointment.property_id;
      return { ...state, appointment, newProperty: null };
    }
    case PROPERTY_NEW: {
      const appointment = { ...state.appointment };
      delete appointment.property_id;
      // const newProperty = {
      //   address_1: action.payload,
      // };
      return { ...state, newProperty: action.payload, appointment };
    }
    case SET_NEW_PROPERTY: {
      return { ...state, newProperty: action.payload };
    }
    case SET_NEW_CONTACT: {
      return { ...state, newContact: !state.newContact };
    }
    case CLEAR_AUTOCOMPLETE: {
      return { ...state, autocomplete: {}, };
    }
    case `${SET_QUICK_PROPERTY}${FAILURE}`: {
      const error = Object.keys(action.error.errors).map(key => action.error.errors[key]).join('\n');
      return { ...state, error: { callback: () => toastr.error('Create Property Error', error) } };
    }
    case `${SET_QUICK_PROPERTY}${SUCCESS}`: {
      const property = action.res.data.property;
      property.address = property.address_1;
      return { ...state, property, newProperty: null };
    }
    case `${SET_QUICK_CONTACT}${FAILURE}`: {
      const error = Object.keys(action.error.errors).map(key => action.error.errors[key]).join('\n');
      return { ...state, error: { callback: () => toastr.error('Create Contact Error', error) } };
    }
    case `${SET_QUICK_CONTACT}${SUCCESS}`: {
      const contact = action.res.data.contact;
      return { ...state, contact, newContact: false };
    }
    case `${SET_APPOINTMENT}${SUCCESS}`: {
      const appointment = { ...action.res.data.appointment };
      const { contact, property } = action.res.data.appointment;
      delete appointment.contact;
      delete appointment.property;

      return { ...state, appointment, modal: true, autocomplete: {}, contact, property, defaultDate: appointment.start };
    }
    case SET_MODAL: {
      const modal = action.payload;
      const appointment = modal ? { ...state.appointment } : {};
      const start = moment().format('YYYY-MM-DD HH:mm');
      const end = moment((new Date()).setMinutes((new Date()).getMinutes() + 60)).format('YYYY-MM-DD HH:mm');
      appointment.start = modal ? appointment.start || start : start;
      appointment.end = modal ? appointment.end || end : end;
      const newProperty = null;
      const contact = (modal && state.contact ? { ...state.contact } : null) || null;
      const property = (modal && state.property ? { ...state.property } : null) || null;
      const peoples = [];
      const properties = [];

      return {
        ...state,
        modal,
        appointment,
        newProperty,
        contact,
        property,
        peoples,
        properties,
      };
    }
    case `${DEL_APPOINTMENT}${SUCCESS}`: {
      const appointments = [...state.appointments].filter(event => event.id !== state.appointment.id);
      const error = { callback: () => browserHistory.push(juvo.diary.index) };
      console.log(error);
      return { ...state, modal: false, appointments, appointment: {}, autcomplete: {}, error: { callback: () => browserHistory.push(juvo.diary.index) } };
    }
    case SET_ERROR: {
      return { ...state, error: action.payload };
    }
    case SET_NEW_APPOINTMENT: {
      return {
        ...state,
        autocomplete: {},
        appointment: {},
        modal: false,
        newProperty: null,
        contact: null,
        property: null,
        peoples: [],
        properties: [],
      };
    }
    default: return state;
  }
};


export const setCategories = () => {
  return {
    type: SET_CATEGORIES,
    promise: fetchCategories()
  };
};

export const setUsers = () => {
  return {
    type: SET_USERS,
    promise: fetchUsers()
  };
};

export const setAppointments = (data) => {
  return {
    type: SET_APPOINTMENTS,
    promise: fetchEvents(data),
  };
};

export const addAppointment = data => ({ type: CREATE_APPOINTMENT, promise: createEvent(data) });
export const setAppointmentEvent = event => ({ type: SET_APPOINTMENT_EVENT, payload: event });
export const updateAppointmentLocal = appointment => ({ type: UPDATE_APPOINTMENT, payload: appointment });
export const updateAppointment = data => ({ type: UPDATE_APPOINTMENT, promise: updateEvent(data) });
export const moveAppointment = data => ({ type: MOVE_APPOINTMENT, promise: moveEvent(data) });
export const setFilter = filter => ({ type: SET_FILTER, payload: filter });
export const autocompletePeople = data => ({ type: PEOPLE_AUTOCOMPLETE, promise: peopleAutocomplete(data) });
export const autocompleteProperty = data => ({ type: PROPERTY_AUTOCOMPLETE, promise: propertyAutocomplete(data) });
export const selectPeople = id => ({ type: PEOPLE_SELECT, payload: id });
export const selectProperty = property => (dispatch) => {
  // if (property[0] && property[0].customOption) {
  //   dispatch({ type: PROPERTY_NEW, payload: property[0].address });
  // } else {
  //   dispatch({ type: PROPERTY_SELECT, payload: property });
  // }
  dispatch({ type: PROPERTY_SELECT, payload: property });
};
export const clearAutocomplete = () => ({ type: CLEAR_AUTOCOMPLETE });
export const setAppointment = id => (dispatch) => {
  dispatch({ type: SET_APPOINTMENT, promise: getAppointmentInfo(id) });
};
export const showModal = () => ({ type: SET_MODAL, payload: true });
export const deleteAppointment = () => {
  return (dispatch, getState) => {
    const id = getState().app.diary.appointment.id;
    dispatch({ type: DEL_APPOINTMENT, promise: deleteEvent(id) });
  };
};
export const handleClose = () => ({ type: SET_MODAL, payload: false });
export const fetchAppointments = (event, type) => {
  return (dispatch, getState) => {
    if (type) {
      const calendarView = localStorage.getItem('calendarView');
      if (!calendarView || calendarView !== type) {
        localStorage.setItem('calendarView', type);
      }
    }
    const filter = { ...getState().app.diary.filter };
    const request = event.target ? { ...filter } : { ...event };
    if (event.target) {
      request.uid = event.target.value === 'all' ? 0 : parseInt(event.target.value, 10);
    } else {
      request.uid = filter.uid || 0;
    }
    dispatch({ type: SET_FILTER, payload: request });
    dispatch({ type: SET_APPOINTMENTS, promise: fetchEvents(request) });
  };
};
export const handleChange = (event) => {
  return (dispatch, getState) => {
    const state = { ...getState().app.diary };
    const appointment = { ...state.appointment } || {};
    if (event.target.type === 'checkbox') {
      const user = parseInt(event.target.name, 10);
      let users = (appointment.users && [...appointment.users].filter(item => item !== 0)) || [];
      if (users.indexOf(user) === -1) {
        users.push(user);
      } else {
        users = users.filter(item => item !== user);
      }
      appointment.users = users;
    } else {
      appointment[event.target.name] = event.target.value;
    }
    dispatch({ type: UPDATE_APPOINTMENT, payload: appointment });
  };
};
export const handleStartDateChange = (event) => {
  return (dispatch, getState) => {
    const appointment = { ...getState().app.diary.appointment };
    const date = moment(Date.parse(event));
    const hours = date.hours();
    if (hours < 8) {
      date.hours(8);
    } else if (hours > 20) {
      date.hours(20);
    }
    appointment.start = date.format('YYYY-MM-DD HH:mm');
    appointment.end = date.add(1, 'hours').format('YYYY-MM-DD HH:mm');
    dispatch({ type: UPDATE_APPOINTMENT, payload: appointment });
  };
};
export const handleEndDateChange = (event) => {
  return (dispatch, getState) => {
    const appointment = { ...getState().app.diary.appointment };
    const date = moment(Date.parse(event));
    const hours = date.hours();
    if (hours < 8) {
      date.hours(8);
    } else if (hours > 20) {
      date.hours(20);
    }
    appointment.end = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: UPDATE_APPOINTMENT, payload: appointment });
  };
};
export const handleSubmit = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const state = { ...getState().app.diary };
    const { contact, property } = state;
    // const dateFormat = `${user.dateFormat} HH:mm`;
    const dateFormat = 'YYYY-MM-DD HH:mm';
    // const categories = [...state.categories];
    const obj = { ...state.appointment };
    // obj.category_id = obj.category_id || categories[0].id;
    if (new Date(obj.start) < new Date(obj.end)) {
      obj.start_date = moment(obj.start).format(dateFormat);
      obj.end_date = moment(obj.end).format(dateFormat);
      obj.users = obj.users ? obj.users.join(',') : null;
      obj.property_id = obj.property_id || (property && property.id);
      obj.people_id = obj.people_id || (contact && contact.id);
      if (obj.id) {
        dispatch({ type: UPDATE_APPOINTMENT, promise: updateEvent(obj) });
      } else {
        dispatch({ type: CREATE_APPOINTMENT, promise: createEvent(obj) });
      }
    } else {
      toastr.error('Error', `Start date ${obj.start_date} is greater End date ${obj.end_date}`);
    }
  };
};
export const clearError = () => ({ type: SET_ERROR });
export const addNewProperty = event => (dispatch, getState) => {
  event.preventDefault();
  const newProperty = getState().app.diary.newProperty ? null : {};
  dispatch({ type: PROPERTY_NEW, payload: newProperty });
};
export const clearAppointment = () => ({ type: SET_NEW_APPOINTMENT });
export const addNewContact = event => (dispatch) => {
  if (event && event.preventDefault) {
    event.preventDefault();
  }
  dispatch({ type: SET_NEW_CONTACT });
};
export const handleNewPropertySubmit = property => ({ type: SET_QUICK_PROPERTY, promise: propertyQuickCreate(property) });
export const quickCreateContact = contact => ({ type: SET_QUICK_CONTACT, promise: createContact(contact) });
