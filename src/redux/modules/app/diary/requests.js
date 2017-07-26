import { getRequest, endpoint, checkStatus } from 'common/utils';

const URL_APPOINTMENT_TYPES = '/appointment/category_array';
const URL_FETCH_USERS = '/user/fetch';
const URL_FETCH_APPOINTMENTS = '/appointment/fetch';
const URL_CREATE_APPOINTMENT = '/appointment/create';
const URL_APPOINTMENT_MOVE = '/appointment/update_date';
const URL_APPOINTMENT_UPDATE = '/appointment/update';
const URL_APPOINTMENT_DELETE = '/appointment/delete';
const URL_PEOPLE_AUTOCOMPLETE = '/autocomplete/contact';
const URL_PROPERTY_AUTOCOMPLETE = '/autocomplete/property';
const URL_APPOINTMENT_INFO = '/appointment/info';
const URL_PROPERTY_QUICK = 'property/quick';


export const fetchCategories = () => getRequest(
    request => request
      .post(`${endpoint(URL_APPOINTMENT_TYPES)}`)
  ).then(checkStatus);

export const fetchUsers = () => getRequest(
    request => request
      .post(`${endpoint(URL_FETCH_USERS)}`)
  ).then(checkStatus);

export const fetchEvents = data => getRequest(
    request => request
      .post(`${endpoint(URL_FETCH_APPOINTMENTS)}`)
      .send(data)
  ).then(checkStatus);

export const createEvent = data => getRequest(
    request => request
      .post(`${endpoint(URL_CREATE_APPOINTMENT)}`)
      .send(data)
  ).then(checkStatus);

export const updateEvent = data => getRequest(
    request => request
      .post(`${endpoint(URL_APPOINTMENT_UPDATE)}`)
      .send(data)
  ).then(checkStatus);

export const moveEvent = data => getRequest(
    request => request
      .post(`${endpoint(URL_APPOINTMENT_MOVE)}`)
      .send(data)
  ).then(checkStatus);

export const peopleAutocomplete = data => getRequest(
  request => request
    .post(`${endpoint(URL_PEOPLE_AUTOCOMPLETE)}`)
    .send({ s: data })
  ).then(checkStatus);

export const propertyAutocomplete = data => getRequest(
  request => request
    .post(`${endpoint(URL_PROPERTY_AUTOCOMPLETE)}`)
    .send({ s: data })
  ).then(checkStatus);

export const getAppointmentInfo = id => getRequest(
  request => request
    .post(`${endpoint(URL_APPOINTMENT_INFO)}`)
    .query({ id })
  ).then(checkStatus);

export const deleteEvent = id => getRequest(
  request => request
    .post(`${endpoint(URL_APPOINTMENT_DELETE)}`)
    .query({ id })
  ).then(checkStatus);

export const propertyQuickCreate = data => getRequest(
  request => request
    .post(`${endpoint(URL_PROPERTY_QUICK)}`)
    .send(data)
  ).then(checkStatus);
