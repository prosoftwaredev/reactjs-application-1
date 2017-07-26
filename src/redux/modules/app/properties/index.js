// import { normalize, Schema, arrayOf } from 'normalizr';
import { toastr } from 'react-redux-toastr';
import { browserHistory } from 'react-router';
import superagent from 'superagent-defaults';
import { EditorState, RichUtils } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import moment from 'moment';
import { downloadFile, objectToArray, momentFormats } from 'common/utils';
import {
  URL_AWS_ASSETS,
  URL_AWS_DOCUMENTS,
  fetch,
  fetchById,
  saveLocations,
  createPost,
  deletePost,
  updatePost,
  fetchPropertyAppointments,
  fetchPropertyActivity,
  getPropertyContacts,
  getPropertyNotes,
  createNote,
  deleteNote,
  getNotesCategory,
  fetchPrintTemplates,
  fetchEmails,
  recorderAssets,
  deleteAsset,
  getAssetSign,
  getDocumentSign,
  createAssets,
  createDocuments,
  downloadDocument,
  deleteDocument,
  autocomplete,
  sendEmail,
  sendEmailDirect,
  printTemplate,
} from './requests';

import { createContact, createEmail } from '../contacts/requests';

import { peopleAutocomplete } from '../diary/requests';

import { SET_STATIC_DATA, SET_USER_DATA } from '../../common';

const SET_PROPERTY_EVENT = 'juvo/app/properties/SET_PROPERTY_EVENT';
const SET_PROPERTIES = 'juvo/app/properties/SET_PROPERTIES';
const SET_PROPERTY_CATEGORIES = 'juvo/app/properties/SET_PROPERTY_CATEGORIES';
const SET_PROPERTY_TYPES = 'juvo/app/properties/SET_PROPERTY_TYPES';
const SET_PROPERTY_STATUSES = 'juvo/app/properties/SET_PROPERTY_STATUSES';
const SET_PROPERTY_PRICES = 'juvo/app/properties/SET_PROPERTY_PRICES';
const SET_PROPERTIES_SEARCH = 'juvo/app/properties/SET_PROPERTIES_SEARCH';
const SET_PROPERTY_PAGINATION = 'juvo/app/properties/SET_PROPERTY_PAGINATION';
const SET_PROPERTY_CREATE = 'juvo/app/properties/SET_PROPERTY_CREATE';
const SET_PROPERTY_UPDATE = 'juvo/app/properties/SET_PROPERTY_UPDATE';
const SET_PROPERTY_DETAILED = 'juvo/app/properties/SET_PROPERTY_DETAILED';
const SET_PROPERTY_DELETED = 'juvo/app/properties/SET_PROPERTY_DELETED';
const SET_PROPERTY_ASSETS = 'juvo/app/properties/SET_PROPERTY_ASSETS';
const SET_DELETE_ASSET = 'juvo/app/properties/SET_DELETE_ASSET';
const SET_CREATE_ASSET = 'juvo/app/properties/SET_CREATE_ASSET';
const SET_ASSET_TYPE = 'juvo/app/properties/SET_ASSET_TYPE';
const SET_PROPERTY_ORDER_ASSETS = 'juvo/app/properties/SET_PROPERTY_ORDER_ASSETS';
const SET_ERROR = 'juvo/app/properties/SET_ERROR';
const SET_IMAGE_PROGRESS = 'juvo/app/properties/SET_IMAGE_PROGRESS';
const SET_DOCUMENT_PROGRESS = 'juvo/app/properties/SET_DOCUMENT_PROGRESS';
const SET_LOCATIONS = 'juvo/app/properties/SET_LOCATIONS';
const SET_PROPERTY_LOCATIONS = 'juvo/app/properties/SET_PROPERTY_LOCATIONS';
const SET_PROPERTY_DOCUMENTS = 'juvo/app/properties/SET_PROPERTY_DOCUMENTS';
const SET_CREATE_DOCUMENT = 'juvo/app/properties/SET_CREATE_DOCUMENT';
const SET_DELETE_DOCUMENT = 'juvo/app/properties/SET_DELETE_DOCUMENT';
const SET_TEMPLATE_TYPES = 'juvo/app/properties/SET_TEMPLATE_TYPES';
const SET_PRINT_TEMPLATES = 'juvo/app/properties/SET_PRINT_TEMPLATES';
const SET_HIDE_MODAL = 'juvo/app/properties/SET_HIDE_MODAL';
const SET_PROPERTY_CONTACTS = 'juvo/app/properties/SET_PROPERTY_CONTACTS';
const SET_NOTES = 'juvo/app/properties/SET_NOTES';
const SET_NOTES_CATEGORY = 'juvo/app/properties/SET_NOTES_CATEGORY';
const SET_NOTE_CREATE = 'juvo/app/properties/SET_NOTE_CREATE';
const SET_NOTE_DELETE = 'juvo/app/properties/SET_NOTE_DELETE';
const SET_EMAILS = 'juvo/app/properties/SET_EMAILS';
const SET_AUTOCOMPLETE = 'juvo/app/properties/SET_AUTOCOMPLETE';
const SET_APPOINTMENTS = 'juvo/app/properties/SET_APPOINTMENTS';
const SET_EMAIL_VALUES = 'juvo/app/properties/SET_EMAIL_VALUES';
const SET_EMAIL_SEND = 'juvo/app/properties/SET_EMAIL_SEND';
const SET_EMAILDIRECT_SEND = 'juvo/app/properties/SET_EMAILDIRECT_SEND';
const SET_ACTIVITY = 'juvo/app/properties/SET_ACTIVITY';
const SET_LOADING = 'juvo/app/properties/SET_LOADING';
const SET_PROPERTY_ERROR = 'juvo/app/properties/SET_PROPERTY_ERROR';
const SET_CLEAR_ERROR = 'juvo/app/properties/SET_CLEAR_ERROR';
const SET_CLEAR_PROPERTY = 'juvo/app/properties/SET_CLEAR_PROPERTY';
const OWNER_AUTOCOMPLETE = 'juvo/app/properties/OWNER_AUTOCOMPLETE';
const SET_OWNER = 'juvo/app/properties/SET_OWNER';
const SET_PROPERTY_SEARCH_PANEL = 'juvo/app/properties/SET_PROPERTY_SEARCH_PANEL';
const SET_NEW_CONTACT = 'juvo/app/properties/SET_NEW_CONTACT';
const SET_PROPERTY_ADDRESS = 'juvo/app/properties/SET_PROPERTY_ADDRESS';
const SET_PROPERTY_DESCRIPTION = 'juvo/app/offers/SET_PROPERTY_DESCRIPTION';
const SET_EMAIL = 'juvo/app/properties/SET_EMAIL';
const SET_EMAIL_CREATE = 'juvo/app/properties/SET_EMAIL_CREATE';
const SET_PRINTED_DOCUMENT = 'juvo/app/properties/SET_PRINTED_DOCUMENT';

const SUCCESS = '_SUCCESS';
const REQUEST = '_REQUEST';
const FAILURE = '_FAILURE';

// const propertySchema = new Schema('property');
// const activitySchema = new Schema('activity');
// const appointmentSchema = new Schema('appointments');
// const assetSchema = new Schema('assets');
// const documentSchema = new Schema('documents');
// const locationSchema = new Schema('locations');


// propertySchema.define({
//   activity: arrayOf(activitySchema),
//   appointments: arrayOf(appointmentSchema),
//   assets: arrayOf(assetSchema),
//   documents: arrayOf(documentSchema),
//   locations: arrayOf(locationSchema),
// });

export default (state = {}, action) => {
  switch (action.type) {
    case SET_PROPERTY_EVENT: {
      const property = (action.payload.data && { ...action.payload.data.property }) || { ...state.property };
      const { activity, appointments, assets, documents, locations: propertyLocations } = action.payload.data.property;
      delete property.activity;
      delete property.appointments;
      delete property.assets;
      delete property.documents;
      delete property.locations;
      const list = state.list ? [...state.list] : [property];
      for (let i = 0, l = list.length; i < l; i++) {
        if (list[i].id === property.id) {
          list[i] = property;
        }
      }
      return {
        ...state,
        list,
        property,
        activity,
        appointments,
        assets,
        documents,
        propertyLocations,
        // property: result.property[property.id],
        // activity: result.activity,
        // assets: result.assets,
        // appointments: result.appointments,
        // documents: result.documents,
        // propertyLocations: result.locations,
      };
      // return { ...state, property, list };
    }
    case `${SET_STATIC_DATA}${SUCCESS}`: {
      const { p_category, p_price, p_status, p_type, t_property, m_template, a_location } = action.res;
      const propertyTypes = {};
      p_type.filter(type => type.id !== null).forEach(type => (propertyTypes[type.id] = type));
      return {
        ...state,
        locations: a_location,
        categories: p_category,
        prices: p_price,
        statuses: p_status,
        types: p_type.filter(type => type.id !== null),
        propertyTypes,
        marketingTemplates: m_template,
        printTemplates: t_property,
        priceMin: action.res.p_min || 0,
        priceMax: action.res.p_max || 1000000,
      };
    }
    case `${SET_USER_DATA}${SUCCESS}`: {
      const { currency_symbol, date_format, date_display_format } = action.res.data;
      const currency = String.fromCharCode(currency_symbol.replace('#', '').replace(';', ''));
      const dateFormat = momentFormats[date_format];
      const dateDisplayFormat = momentFormats[date_display_format];
      return {
        ...state,
        user: {
          currency,
          dateFormat,
          dateDisplayFormat,
        }
      };
    }
    case `${SET_PROPERTIES}${REQUEST}`: {
      return { ...state, loading: true, error: false };
    }
    case `${SET_PROPERTIES}${SUCCESS}`: {
      const { data: list, ...pagination } = action.res;
      return {
        ...state,
        list,
        pagination,
        property: undefined,
        propertyLocations: undefined,
        documents: undefined,
        appointments: undefined,
        loading: false,
        error: false,
      };
    }
    case `${SET_PROPERTIES}${FAILURE}`: {
      return { ...state, loading: false, error: true };
    }
    case SET_PROPERTIES: {
      // const result = normalize({ properties: action.payload }, {
      //   properties: arrayOf(propertySchema)
      // });
      // console.log(result);
      return {
        ...state,
        list: action.payload,
        property: undefined,
        propertyLocations: undefined,
        documents: undefined,
        appointments: undefined,
      };
    }
    case SET_PROPERTY_CATEGORIES: {
      return { ...state, categories: objectToArray(action.payload) };
    }
    case SET_PROPERTY_PRICES: {
      return { ...state, prices: objectToArray(action.payload) };
    }
    case SET_PROPERTY_TYPES: {
      const propertyTypes = { ...action.res };
      return { ...state, types: objectToArray(action.payload), propertyTypes };
    }
    case SET_PROPERTY_STATUSES: {
      return { ...state, statuses: objectToArray(action.payload) };
    }
    case SET_PROPERTIES_SEARCH: {
      return { ...state, searchValues: action.payload };
    }
    case SET_PROPERTY_PAGINATION: {
      return { ...state, pagination: action.payload };
    }
    case `${SET_PROPERTY_CREATE}${FAILURE}`: {
      const { errors } = action.error;
      return { ...state, propertyError: { callback: () => toastr.error('Error', action.error.message), errors } };
    }
    case `${SET_PROPERTY_CREATE}${SUCCESS}`: {
      const property = { ...action.res.data.property };
      return {
        ...state,
        property,
        propertyError: { callback: () => browserHistory.push(`/properties/${property.id}`) },
      };
    }
    case `${SET_PROPERTY_DETAILED}${SUCCESS}`: {
      const property = { ...action.res.data.property };
      const { activity, appointments, assets, documents, locations: propertyLocations } = action.res.data.property;
      delete property.activity;
      delete property.appointments;
      delete property.assets;
      delete property.documents;
      delete property.locations;
      const description = property.description ? EditorState.createWithContent(stateFromHTML(property.description)) : EditorState.createEmpty();
      // const tmp = { ...action.res.data.property };
      // tmp.activity = tmp.activity.array;
      // const result = normalize(tmp, propertySchema);
      // console.log(result);
      return {
        ...state,
        property,
        activity,
        appointments,
        assets,
        documents,
        propertyLocations,
        // property: result.property[property.id],
        // activity: result.activity,
        // assets: result.assets,
        // appointments: result.appointments,
        // documents: result.documents,
        // propertyLocations: result.locations,
        propertyLoading: {},
        description,
      };
    }
    case SET_PROPERTY_UPDATE: {
      const property = action.payload;
      const properties = state.properties ? [...state.properties].map(item => (item.id !== property.id ? item : property)) : [property];
      return { ...state, property, properties, description: state.description || EditorState.createEmpty() };
    }
    case `${SET_PROPERTY_UPDATE}${REQUEST}`: {
      return { ...state, propertyLoading: { general: true } };
    }
    case `${SET_PROPERTY_UPDATE}${FAILURE}`: {
      const { errors } = action.error;
      return { ...state, propertyError: { callback: () => toastr.error('Error', action.error.message), errors }, propertyLoading: {} };
    }
    case `${SET_PROPERTY_UPDATE}${SUCCESS}`: {
      const property = { ...action.res.data.property };
      const { activity, appointments, assets, documents, locations: propertyLocations } = action.res.data.property;
      delete property.activity;
      delete property.appointments;
      delete property.assets;
      delete property.documents;
      delete property.locations;
      const description = property.description ? EditorState.createWithContent(stateFromHTML(property.description)) : EditorState.createEmpty();
      // const tmp = { ...action.res.data.property };
      // tmp.activity = tmp.activity.array;
      // const result = normalize(tmp, propertySchema);
      // console.log(result);
      return {
        ...state,
        property,
        activity,
        appointments,
        assets,
        documents,
        propertyLocations,
        // property: result.property[property.id],
        // activity: result.activity,
        // assets: result.assets,
        // appointments: result.appointments,
        // documents: result.documents,
        // propertyLocations: result.locations,
        propertyLoading: {},
        propertyError: { callback: () => toastr.success('Property', 'Saved') },
        description,
      };
    }
    case `${SET_PROPERTY_DELETED}${SUCCESS}`: {
      const id = parseInt(action.res.id, 10);
      const list = [...state.list].filter(property => property.id !== id);
      return { ...state, list, propertyError: { callback: () => toastr.info('Deleted', 'Property deleted!') } };
    }
    case `${SET_PROPERTY_DELETED}${FAILURE}`: {
      return { ...state, error: true };
    }
    case SET_PROPERTY_ASSETS: {
      return { ...state, assets: action.payload };
    }
    case SET_PROPERTY_ORDER_ASSETS: {
      const typeId = action.payload[0].type_id;
      const assets = [...state.assets];
      return { ...state, assets: assets.filter(asset => asset.type_id !== typeId).concat(action.payload) };
    }
    case SET_ASSET_TYPE: {
      return { ...state, assetsType: action.payload };
    }
    case SET_ERROR: {
      return { ...state, propertyError: { callback: action.payload } };
    }
    case SET_DELETE_ASSET: {
      const assets = [...state.assets];
      return { ...state, assets: assets.filter(asset => asset.id !== action.payload) };
    }
    case SET_CREATE_ASSET: {
      const assets = [...state.assets].filter(asset => asset.id !== action.payload.id);
      assets.push(action.payload);
      return { ...state, assets };
    }
    case SET_IMAGE_PROGRESS: {
      return { ...state, uploadImageProgress: action.payload };
    }
    case SET_DOCUMENT_PROGRESS: {
      return { ...state, uploadDocumentProgress: action.payload };
    }
    case SET_LOCATIONS: {
      return { ...state, locations: action.payload };
    }
    case SET_PROPERTY_LOCATIONS: {
      return { ...state, propertyLocations: action.payload };
    }
    case SET_PROPERTY_DOCUMENTS: {
      return { ...state, documents: objectToArray(action.payload) };
    }
    case SET_CREATE_DOCUMENT: {
      return {
        ...state,
        documents: [action.payload].concat([...state.documents].filter(doc => doc.id !== action.payload.id)),
        propertyLoading: {}
      };
    }
    case `${SET_DELETE_DOCUMENT}${SUCCESS}`: {
      const id = parseInt(action.res.id, 10);
      const documents = [...state.documents].filter(doc => doc.id !== id);
      return { ...state, documents };
    }
    case SET_HIDE_MODAL: {
      return { ...state, modal: '' };
    }
    case `${SET_PROPERTY_CONTACTS}${REQUEST}`: {
      return { ...state, modal: 'contacts' };
    }
    case `${SET_PROPERTY_CONTACTS}${SUCCESS}`: {
      return { ...state, contacts: action.res.data };
    }
    case `${SET_NOTES_CATEGORY}${SUCCESS}`: {
      const noteCategories = action.res.data;
      return { ...state, noteCategories };
    }
    case `${SET_NOTES}${REQUEST}`: {
      return { ...state, modal: 'notes' };
    }
    case `${SET_NOTES}${SUCCESS}`: {
      const notes = action.res.data;
      return { ...state, notes };
    }
    case SET_NOTE_CREATE: {
      return { ...state, note: action.payload };
    }
    case `${SET_NOTE_CREATE}${SUCCESS}`: {
      const notes = [...state.notes];
      notes.push(action.res.data);
      return { ...state, notes, note: {}, propertyError: { callback: () => toastr.success('Note', 'Note created!') } };
    }
    case `${SET_NOTE_CREATE}${FAILURE}`: {
      return { ...state, propertyError: { callback: () => toastr.error('Error', action.error.message), errors: action.error.errors } };
    }
    case `${SET_NOTE_DELETE}${FAILURE}`: {
      return { ...state, propertyError: { callback: () => toastr.error('Error', action.error.message), errors: action.error.errors } };
    }
    case `${SET_NOTE_DELETE}${SUCCESS}`: {
      const id = parseInt(action.res.id, 10);
      const notes = [...state.notes].filter(note => note.id !== id);
      return { ...state, notes, propertyError: { callback: () => toastr.info('Note', 'Note deleted!') } };
    }
    case SET_PRINT_TEMPLATES: {
      return { ...state, printValues: action.payload };
    }
    case `${SET_EMAILS}${REQUEST}`: {
      return { ...state, modal: 'emails' };
    }
    case `${SET_EMAILS}${SUCCESS}`: {
      const emails = action.res.data;
      return { ...state, emails };
    }
    case SET_AUTOCOMPLETE: {
      return { ...state, directValues: action.payload };
    }
    case `${SET_AUTOCOMPLETE}${SUCCESS}`: {
      return { ...state, autocomplete: action.res.data };
    }
    case SET_EMAIL_VALUES: {
      return { ...state, sendValues: action.payload };
    }
    case `${SET_EMAIL_SEND}${SUCCESS}`: {
      return { ...state, propertyError: { callback: () => toastr.success('Email', `Sent to ${action.res.total} contacts`) } };
    }
    case `${SET_EMAILDIRECT_SEND}${SUCCESS}`: {
      return { ...state, propertyError: { callback: () => toastr.success('Email', `Sent to ${action.res.total} contacts`) } };
    }
    case `${SET_APPOINTMENTS}${SUCCESS}`: {
      return { ...state, appointments: action.res.data };
    }
    case `${SET_ACTIVITY}${SUCCESS}`: {
      return { ...state, activity: action.res.data.array };
    }
    case SET_LOADING: {
      const propertyLoading = action.payload;
      return { ...state, propertyLoading };
    }
    case SET_PROPERTY_ERROR: {
      return { ...state, propertyError: action.payload };
    }
    case SET_CLEAR_ERROR: {
      const propertyError = state.propertyError ? { ...state.propertyError } : {};
      delete propertyError.callback;
      return { ...state, propertyError };
    }
    case SET_CLEAR_PROPERTY: {
      return {
        ...state,
        property: {},
        activity: {},
        appointments: [],
        assets: [],
        documents: [],
        propertyLoading: {},
        propertyLocation: {},
        propertyError: {},
        description: EditorState.createEmpty()
      };
    }
    case `${OWNER_AUTOCOMPLETE}${SUCCESS}`: {
      return { ...state, owners: action.res.data };
    }
    case SET_OWNER: {
      return { ...state, property: action.payload, newContact: false };
    }
    case SET_PROPERTY_SEARCH_PANEL: {
      return { ...state, searchPanel: !state.searchPanel };
    }
    case SET_NEW_CONTACT: {
      return { ...state, newContact: !state.newContact };
    }
    case SET_PROPERTY_ADDRESS: {
      const property = state.property ? { ...state.property } : {};
      const [line1, line2, line3, , , town, county] = action.payload.address.split(',');
      property.address_1 = line1;
      property.address_2 = line2;
      property.address_3 = line3;
      property.town = town;
      property.county = county;
      property.postcode = action.payload.zipCode;
      return { ...state, property };
    }
    case SET_PROPERTY_DESCRIPTION: {
      return { ...state, description: action.payload };
    }
    case SET_EMAIL: {
      return { ...state, email: action.payload };
    }
    case `${SET_EMAIL_CREATE}${SUCCESS}`: {
      const emails = [action.res.data].concat([...state.emails]);
      const email = { ...state.email };
      delete email.message;
      delete email.subject;
      return { ...state, emails, email, printedDoc: null, error: { callback: () => toastr.success('Sent', 'Mesasge sent!') } };
    }
    case `${SET_EMAIL_CREATE}${FAILURE}`: {
      return { ...state, error: { callback: () => toastr.error('Error', action.error.message), errors: action.error.errors } };
    }
    case SET_PRINTED_DOCUMENT: {
      return { ...state, propertyLoading: {}, printedDoc: action.payload };
    }
    default: return state;
  }
};

export const setPropertyEvent = event => ({ type: SET_PROPERTY_EVENT, payload: event });
export const fetchProperties = (page = 1) => {
  return (dispatch, getState) => {
    const searchValues = { ...getState().app.properties.searchValues } || {};
    searchValues.page = page;
    dispatch({ type: SET_PROPERTIES, promise: fetch(searchValues) });
  };
};
export const setProperties = properties => ({ type: SET_PROPERTIES, payload: properties });
export const setCategories = categories => ({ type: SET_PROPERTY_CATEGORIES, payload: categories });
export const setPrices = prices => ({ type: SET_PROPERTY_PRICES, payload: prices });
export const setTypes = types => ({ type: SET_PROPERTY_TYPES, payload: types });
export const setStatuses = statuses => ({ type: SET_PROPERTY_STATUSES, payload: statuses });
export const setPropertiesSearch = (event) => {
  return (dispatch, getState) => {
    const searchValues = { ...getState().app.properties.searchValues } || {};
    if (Array.isArray(event)) {
      searchValues.search_price_min = event[0];
      searchValues.search_price_max = event[1];
    } else {
      searchValues[event.target.name] = event.target.value;
    }
    dispatch({ type: SET_PROPERTIES_SEARCH, payload: searchValues });
  };
};
export const handleSearchSubmit = (event) => {
  event.preventDefault();
  return dispatch => dispatch(fetchProperties());
};
export const setPropertyPagination = pagination => ({ type: SET_PROPERTY_PAGINATION, payload: pagination });
export const setPropertyDateUpdate = (event) => {
  return (dispatch, getState) => {
    const state = { ...getState().app.properties };
    const property = { ...state.property };
    const user = state.user;
    // property.available_date = moment(Date.parse(event)).format('YYYY-MM-DD');
    property.available_date = moment(Date.parse(event)).format(momentFormats[user.dateFormat]);
    dispatch({ type: SET_PROPERTY_UPDATE, payload: property });
  };
};
export const setPropertyUpdateLocal = (event) => {
  return (dispatch, getState) => {
    const property = { ...getState().app.properties.property };
    if (event.target.type === 'checkbox') {
      property[event.target.name] = parseInt(property[event.target.name], 10) === 1 ? 0 : 1;
    } else {
      property[event.target.name] = event.target.value;
    }
    dispatch({ type: SET_PROPERTY_UPDATE, payload: property });
  };
};
export const handleMainFormSubmit = event => (dispatch, getState) => {
  event.preventDefault();
  // dispatch({type: SET_LOADING, payload: { general: true } });
  const state = { ...getState().app.properties };
  const { categories, statuses, types, prices } = state;
  const property = { ...state.property };
  const user = state.user;
  property.category_id = property.category_id || (categories[0] && categories[0].id);
  property.status_id = property.status_id || (statuses[0] && statuses[0].id);
  property.type_id = property.type_id || (types[0] && types[0].id);
  property.price_label_id = property.price_label_id || (prices[0] && prices[0].id);
  // property.available_date = property.available_date ? moment(property.available_date).format('YYYY-MM-DD') : '';
  property.available_date = property.available_date ? moment(property.available_date).format(momentFormats[user.dateFormat]) : '';
  const description = state.description;
  const raw = description && description.getCurrentContent();
  if (raw) {
    property.description = stateToHTML(raw);
  }
  if (property.id) {
    dispatch({ type: SET_PROPERTY_UPDATE, promise: updatePost(property) });
  } else {
    dispatch({ type: SET_PROPERTY_CREATE, promise: createPost(property) });
  }
};
export const setDetailedProperty = id => ({ type: SET_PROPERTY_DETAILED, promise: fetchById(id) });
export const setDeletedPropery = id => ({ type: SET_PROPERTY_DELETED, promise: deletePost(id) });

// export const setProperyAssets = () => {
//   return (dispatch, getState) => {
//     const state = { ...getState().app.properties };
//     const types = [];
//     const id = state.property.id;
//     const assets = [...state.assets];
//     assets.forEach((asset) => {
//       if (types.indexOf(asset.type_id) === -1) {
//         types.push(asset.type_id);
//       }
//     });
//     types.forEach((type) => {
//       const data = {
//         property_id: id,
//         type_id: type,
//         order: assets.filter(asset => asset.type_id === type).map(asset => asset.id).join(','),
//       };
//       recorderAssets(data);
//       // dispatch({ type: SET_PROPERTY_ASSETS, promise: recorderAssets(data) });
//     });
//   };
// };
export const setAssetsOrder = (orderedAssets) => {
  return (dispatch, getState) => {
    const id = getState().app.properties.property.id;
    const type = orderedAssets[0].type_id;
    const data = {
      property_id: id,
      type_id: type,
      order: orderedAssets.map(asset => asset.id).join(','),
    };
    recorderAssets(data);
  };
};
export const handleAssetTypeChange = event => ({ type: SET_ASSET_TYPE, payload: parseInt(event.target.value, 10) });
export const handleAssetsUpload = (event) => {
  return (dispatch, getState) => {
    dispatch({ type: SET_IMAGE_PROGRESS, payload: 0 });
    const files = Object.keys(event.target.files).map(file => event.target.files[file]);
    const uploadProggress = [];
    let total = 0;
    const timer = window.setInterval(() => {
      total = uploadProggress.reduce((sum, current) => (sum + current), 0) / uploadProggress.length;
      if (total === 100) {
        window.clearInterval(timer);
        dispatch({ type: SET_IMAGE_PROGRESS, payload: -1 });
      } else {
        dispatch({ type: SET_IMAGE_PROGRESS, payload: total });
      }
    }, 500);
    const aws = {};
    // eslint-disable-next-line
    event.target.value = '';
    const state = { ...getState().app.properties };
    getAssetSign()
      .then(({ data }) => {
        aws.accessKey = (data && data.access_key) || null;
        aws.policy = (data && data.policy) || null;
        aws.signature = (data && data.signature) || null;
        if (aws.accessKey && aws.policy && aws.signature) {
          files.forEach((file, index) => {
            const fileToUpload = {
              filename: file.name,
              filesize: file.size,
              property_id: state.property.id,
              type_id: state.assetsType,
            };
            const uploadAmazon = (fileData) => {
              return new Promise((resolve, reject) => {
                const image = new FormData();
                image.append('key', fileData.filename);
                image.append('acl', 'public-read');
                image.append('Content-Type', 'image/jpeg');
                image.append('AWSAccessKeyId', aws.accessKey);
                image.append('Policy', aws.policy);
                image.append('Signature', aws.signature);
                image.append('file', file);
                image.append('filesize', file.size);

                const request = superagent();
                try {
                  request
                    .post(URL_AWS_ASSETS)
                    .send(image)
                    .on('progress', (e) => {
                      uploadProggress[fileData.index] = e.percent;
                      // const total = uploadProggress.reduce((sum, current) => (sum + current), 0) / uploadProggress.length;
                      // dispatch({ type: SET_IMAGE_PROGRESS, payload: total });
                    })
                    .end((err, res) => {
                      uploadProggress[fileData.index] = 100;
                      // const total = uploadProggress.reduce((sum, current) => (sum + current), 0) / uploadProggress.length;
                      // dispatch({ type: SET_IMAGE_PROGRESS, payload: total });
                      if (err) {
                        reject(err);
                      }
                      if (res) {
                        const result = { ...res };
                        result.data = fileData.data;
                        resolve(result);
                      }
                    });
                } catch (ex) {
                  window.clearInterval(timer);
                  reject(ex);
                }
              });
            };

            const uploadAssets = new Promise((resolve, reject) => {
              const currentFile = index;
              createAssets(fileToUpload)
                .then((response) => {
                  const result = response;
                  result.index = currentFile;
                  resolve(result);
                })
                .catch(error => reject(error));
            });
            if (file.size > 10485760) {
              dispatch({ type: SET_ERROR, payload: () => toastr.warning('file to big', 'file to big') });
            } else {
              uploadAssets
                .then((response) => {
                  uploadAmazon(response)
                    .then((resFile) => {
                      dispatch({ type: SET_CREATE_ASSET, payload: resFile.data });
                    });
                }, error => console.log(error))
                .then(() => { }, error => console.log(error));
            }
          });
        }
      })
      .catch(error => console.log(error));
  };
};
export const setOrderAssets = assets => ({ type: SET_PROPERTY_ORDER_ASSETS, payload: assets });
export const setDeletedAsset = (id) => {
  return (dispatch) => {
    deleteAsset(id)
      .then(() => dispatch({ type: SET_DELETE_ASSET, payload: id }))
      .catch(error => console.log(error));
  };
};
export const setCreateAsset = asset => ({ type: SET_CREATE_ASSET, payload: asset });
export const setCreateDocument = document => ({ type: SET_CREATE_DOCUMENT, payload: document });
export const hideModal = () => ({ type: SET_HIDE_MODAL });
export const getContacts = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    dispatch({ type: SET_PROPERTY_CONTACTS, promise: getPropertyContacts(getState().app.properties.property.id) });
  };
};
export const getNotes = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    dispatch({ type: SET_NOTES, promise: getPropertyNotes({ property_id: getState().app.properties.property.id }) });
    dispatch({ type: SET_NOTES_CATEGORY, promise: getNotesCategory() });
  };
};
export const setNote = (event) => {
  return (dispatch, getState) => {
    const note = { ...getState().app.properties.note };
    note[event.target.name] = event.target.value;
    dispatch({ type: SET_NOTE_CREATE, payload: note });
  };
};
export const setCreateNote = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const state = { ...getState().app.properties };
    const { property, noteCategories } = state;
    const note = state.note ? { ...state.note } : {};
    note.property_id = property.id;
    note.category_id = note.category_id || noteCategories[0].id;
    dispatch({ type: SET_NOTE_CREATE, promise: createNote(note) });
  };
};
export const setDeleteNote = id => ({ type: SET_NOTE_DELETE, promise: deleteNote({ id }) });
export const getPropertyEmails = () => {
  return (dispatch, getState) => {
    dispatch({ type: SET_EMAILS, promise: fetchEmails({ property_id: getState().app.properties.property.id }) });
  };
};
export const autocompleteContact = data => ({ type: SET_AUTOCOMPLETE, promise: autocomplete(data) });
export const setAutocompleteContact = (data) => {
  return (dispatch, getState) => {
    const directValues = { ...getState().app.properties.directValues };
    directValues.contact = data;
    dispatch({ type: SET_AUTOCOMPLETE, payload: directValues });
  };
};
export const handleSendDirectChange = (event) => {
  return (dispatch, getState) => {
    const directValues = { ...getState().app.properties.directValues };
    directValues[event.target.name] = event.target.value;
    dispatch({ type: SET_AUTOCOMPLETE, payload: directValues });
  };
};
export const handleSendDirectSubmit = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const state = { ...getState().app.properties };
    const directValues = { ...state.directValues };
    if (directValues && directValues.contact && directValues.template_id) {
      directValues.property_id = state.property.id;
      directValues.contact_id = directValues.contact[0].id;
      dispatch({ type: SET_EMAILDIRECT_SEND, promise: sendEmailDirect(directValues) });
    } else {
      dispatch({ type: SET_ERROR, payload: () => toastr.warning('Warning', 'Please select template!') });
    }
  };
};
export const handleSendChange = (event) => {
  return (dispatch, getState) => {
    const sendValues = { ...getState().app.properties.sendValues } || {};
    sendValues[event.target.name] = event.target.value;
    dispatch({ type: SET_EMAIL_VALUES, payload: sendValues });
  };
};
export const handleSendSubmit = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const state = { ...getState().app.properties };
    const sendValues = { ...state.sendValues };
    if (sendValues) {
      sendValues.property_id = state.property.id;
      dispatch({ type: SET_EMAIL_SEND, promise: sendEmail(sendValues) });
    }
  };
};
export const setLocations = locations => ({ type: SET_LOCATIONS, payload: locations });
export const setProperyLocations = locations => ({ type: SET_PROPERTY_LOCATIONS, promise: saveLocations(locations) });
export const setProperyLocationsLocal = (event) => {
  return (dispatch, getState) => {
    const id = parseInt(event.target.name, 10);
    const state = { ...getState().app.properties };
    const location = [...state.propertyLocations].filter(item => item.id === id)[0];
    const propertyLocations = [...state.propertyLocations].filter(item => item.id !== id);
    if (!location) {
      propertyLocations.push({ id });
    }
    dispatch({ type: SET_PROPERTY_LOCATIONS, payload: propertyLocations });
  };
};
export const handleSubmitLocations = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const state = { ...getState().app.properties };
    const locations = [...state.propertyLocations].map(item => item.id).join(',');
    const data = {
      locations,
      id: state.property.id,
    };
    dispatch(setProperyLocations(data));
  };
};
export const handleDocumentUpload = (event) => {
  return (dispatch, getState) => {
    dispatch({ type: SET_DOCUMENT_PROGRESS, payload: 0 });
    const files = Object.keys(event.target.files).map(file => event.target.files[file]);
    const uploadProggress = [];
    let total = 0;
    const timer = window.setInterval(() => {
      total = uploadProggress.reduce((sum, current) => (sum + current), 0) / uploadProggress.length;
      if (total === 100) {
        window.clearInterval(timer);
      }
      dispatch({ type: SET_DOCUMENT_PROGRESS, payload: total });
    }, 500);
    const aws = {};
    // eslint-disable-next-line
    event.target.value = '';
    const state = { ...getState().app.properties };
    getDocumentSign()
      .then(({ data }) => {
        aws.accessKey = (data && data.access_key) || null;
        aws.policy = (data && data.policy) || null;
        aws.signature = (data && data.signature) || null;
        if (aws.accessKey && aws.policy && aws.signature) {
          files.forEach((file, index) => {
            const fileToUpload = {
              filename: file.name,
              filesize: file.size,
              property_id: state.property.id,
            };
            const uploadAmazon = (fileInfo) => {
              return new Promise((resolve, reject) => {
                const doc = new FormData();
                doc.append('key', fileInfo.filename);
                doc.append('acl', 'private');
                doc.append('Content-Type', 'binary/octet-stream');
                doc.append('AWSAccessKeyId', aws.accessKey);
                doc.append('Policy', aws.policy);
                doc.append('Signature', aws.signature);
                doc.append('file', file);
                doc.append('filesize', file.size);

                const request = superagent();
                try {
                  request
                    .post(URL_AWS_DOCUMENTS)
                    .send(doc)
                    .on('progress', (e) => {
                      uploadProggress[fileInfo.index] = e.percent;
                      // const total = uploadProggress.reduce((sum, current) => (sum + current), 0) / uploadProggress.length;
                      // dispatch({ type: SET_DOCUMENT_PROGRESS, payload: total });
                    })
                    .end((err, res) => {
                      uploadProggress[fileInfo.index] = 100;
                      // const total = uploadProggress.reduce((sum, current) => (sum + current), 0) / uploadProggress.length;
                      // dispatch({ type: SET_IMAGE_PROGRESS, payload: total });
                      if (err) {
                        reject(err);
                      }
                      if (res) {
                        const result = { ...res };
                        result.data = fileInfo.data;
                        resolve(result);
                      }
                    });
                } catch (ex) {
                  window.clearInterval(timer);
                  reject(ex);
                }
              });
            };

            const uploadDocuments = new Promise((resolve, reject) => {
              const currentFile = index;
              createDocuments(fileToUpload)
                .then((response) => {
                  const result = response;
                  result.index = currentFile;
                  resolve(result);
                })
                .catch(error => reject(error));
            });

            uploadDocuments
              .then((response) => {
                uploadAmazon(response)
                  .then((resFile) => {
                    dispatch({ type: SET_CREATE_DOCUMENT, payload: resFile.data });
                  });
              }, error => console.log(error))
              .then(() => { }, error => console.log(error));
          });
        }
      })
      .catch(error => console.log(error));
  };
};
export const setProperyDocuments = documents => ({ type: SET_PROPERTY_DOCUMENTS, payload: documents });
export const setDeletedDocument = id => ({ type: SET_DELETE_DOCUMENT, promise: deleteDocument(id) });
export const handleDocumentDownload = (id, filename) => {
  return () => {
    downloadDocument(id).then((response) => {
      const { url } = response.data;
      downloadFile(url, filename);
    }).catch(error => toastr.error('Download', error.message));
  };
};
export const setTemplateTypes = types => ({ type: SET_TEMPLATE_TYPES, payload: types });
export const setPrintTemplates = () => ({ type: SET_PRINT_TEMPLATES, promise: fetchPrintTemplates() });
export const setPrintValues = (event) => {
  return (dispatch, getState) => {
    const printValues = { ...getState().app.properties.printValues } || {};
    if (event.target.type === 'checkbox') {
      printValues[event.target.name] = event.target.checked;
    } else {
      printValues[event.target.name] = event.target.value;
    }
    dispatch({ type: SET_PRINT_TEMPLATES, payload: printValues });
  };
};
export const handlePrintSubmit = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const state = { ...getState().app.properties };
    const printValues = { ...state.printValues } || {};
    dispatch({ type: SET_LOADING, payload: { print: true } });
    printValues.template_id = printValues.template_id || state.printTemplates[0].id;
    printValues.format = printValues.format || 'pdf';
    printValues.id = state.property.id;
    dispatch({ type: SET_ERROR, payload: () => toastr.info('Printing', 'Generating Print Template') });
    printTemplate(printValues)
      .then((response) => {
        dispatch({ type: SET_PRINTED_DOCUMENT, payload: response.doc });
        const url = response.url;
        if (printValues.sendEmail) {
          dispatch({ type: SET_EMAILS, promise: fetchEmails({ property_id: state.property.id }) });
        } else {
          console.log(downloadFile);
          dispatch({ type: SET_CREATE_DOCUMENT, payload: response.doc });
          downloadFile(url, response.doc.filename);
        }
      }).catch((error) => {
        const { errors } = error;
        dispatch({ type: SET_PROPERTY_ERROR, payload: { callback: () => toastr.error('Error', error.message, errors) } });
        dispatch({ type: SET_LOADING, payload: {} });
      });
  };
};
export const setAppointments = id => ({ type: SET_APPOINTMENTS, promise: fetchPropertyAppointments(id) });
export const setActivity = id => ({ type: SET_ACTIVITY, promise: fetchPropertyActivity(id) });
export const setLoading = loading => ({ type: SET_LOADING, payload: loading });
export const clearError = () => ({ type: SET_CLEAR_ERROR });
export const clearProperty = () => ({ type: SET_CLEAR_PROPERTY });
export const handleOwnerChange = data => ({ type: OWNER_AUTOCOMPLETE, promise: peopleAutocomplete(data) });
export const handleOwnerSelect = data => (dispatch, getState) => {
  const property = { ...getState().app.properties.property };
  console.log(data);
  property.owner_id = data[0] && data[0].id;
  property.owner = data[0] && data[0].name;
  console.log(property);
  dispatch({ type: SET_OWNER, payload: property });
};
export const toggleSearch = () => ({ type: SET_PROPERTY_SEARCH_PANEL });
export const addNewContact = event => (dispatch) => {
  if (event && event.preventDefault) {
    event.preventDefault();
  }
  dispatch({ type: SET_NEW_CONTACT });
};
export const quickCreateContact = contact => (dispatch, getState) => {
  const state = { ...getState().app.properties };
  const property = { ...state.property };
  console.log(property);
  createContact(contact)
    .then((res) => {
      property.owner = res.data.contact;
      property.owner_id = res.data.contact.id;
      dispatch({ type: SET_OWNER, payload: property });
    });
};
export const fillAddress = data => ({ type: SET_PROPERTY_ADDRESS, payload: data });
export const changeDescription = editorState => ({ type: SET_PROPERTY_DESCRIPTION, payload: editorState });
export const toggleBlockType = (blockType) => {
  return (dispatch, getState) => {
    const description = getState().app.properties.description;
    dispatch(changeDescription(RichUtils.toggleBlockType(description, blockType)));
  };
};
export const toggleInlineStyle = (inlineStyle) => {
  return (dispatch, getState) => {
    const description = getState().app.properties.description;
    dispatch(changeDescription(RichUtils.toggleInlineStyle(description, inlineStyle)));
  };
};
export const handleEmailChange = event => (dispatch, getState) => {
  const email = { ...getState().app.properties.email };
  email[event.target.name] = event.target.value;
  dispatch({ type: SET_EMAIL, payload: email });
};
export const handleEmailCreate = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const state = getState().app.properties;
    const { property } = { ...state };
    const email = state.email ? { ...state.email } : {};
    email.document_id = state.printedDoc && state.printedDoc.id;
    email.property_id = property.id;
    dispatch({ type: SET_EMAIL_CREATE, promise: createEmail(email) });
  };
};

export const handleAttachmentRemove = () => ({ type: SET_PRINTED_DOCUMENT });
export const handleTemplateChange = template => (dispatch, getState) => {
  const state = { ...getState().app.properties };
  const email = state.email ? { ...state.email } : {};
  email.subject = template.subject;
  email.message = template.message;
  dispatch({ type: SET_EMAIL, payload: email });
};
export const handleSearchReset = () => (dispatch) => {
  dispatch({ type: SET_PROPERTIES_SEARCH });
  dispatch(fetchProperties());
};
export const setDocument = doc => (dispatch, getState) => {
  const state = { ...getState().app.properties };
  dispatch({ type: SET_PRINTED_DOCUMENT, payload: doc });
  dispatch({ type: SET_EMAILS, promise: fetchEmails({ property_id: state.property.id }) });
};
