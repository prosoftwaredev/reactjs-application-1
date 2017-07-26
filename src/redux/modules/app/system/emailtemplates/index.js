import { toastr } from 'react-redux-toastr';
import { momentFormats } from 'common/utils';

import {
  emailTemplatesFetch,
  emailTemplateCreate,
  emailTemplateUpdate,
  emailTemplateDelete,
  emailTemplateInfo,
} from './requests';

import { SET_USER_DATA, setCommonData } from '../../../common';


const SET_TEMPLATE = 'juvo/app/system/emailtemplates/SET_TEMPLATE';
const SET_TEMPLATES = 'juvo/app/system/emailtemplates/SET_TEMPLATES';
const SET_TEMPLATE_CREATE = 'juvo/app/system/emailtemplates/SET_TEMPLATE_CREATE';
const SET_TEMPLATE_UPDATE = 'juvo/app/system/emailtemplates/SET_TEMPLATE_UPDATE';
const SET_TEMPLATE_DELETE = 'juvo/app/system/emailtemplates/SET_TEMPLATE_DELETE';
const SET_CREATE_MODAL = 'juvo/app/system/emailtemplates/SET_CREATE_MODAL';
const SET_CHANGE_TEMPLATE = 'juvo/app/system/emailtemplates/SET_CHANGE_TEMPLATE';
const SET_ERROR = 'juvo/app/system/emailtemplates/SET_ERROR';
const SET_EDIT_TEMPLATE = 'juvo/app/system/emailtemplates/SET_EDIT_TEMPLATE';

const SUCCESS = '_SUCCESS';
// const REQUEST = '_REQUEST';
// const FAILURE = '_FAILURE';

export default (state = {}, action) => {
  switch (action.type) {
    case `${SET_USER_DATA}${SUCCESS}`: {
      const { date_display_format } = action.res.data;
      const dateDisplayFormat = momentFormats[date_display_format];
      return {
        ...state,
        user: {
          dateDisplayFormat,
        }
      };
    }
    case `${SET_TEMPLATES}${SUCCESS}`: {
      const { data, ...pagination } = action.res;
      return { ...state, templates: data, pagination };
    }
    case SET_CREATE_MODAL: {
      return { ...state, modal: action.payload, template: {}, fileinput: false };
    }
    case SET_TEMPLATE_CREATE: {
      return { ...state, templates: [action.payload].concat([...state.templates]), modal: '' };
    }
    case SET_CHANGE_TEMPLATE: {
      return { ...state, template: action.payload };
    }
    case `${SET_TEMPLATE_DELETE}${SUCCESS}`: {
      const templates = [...state.templates].filter(template => template.id !== parseInt(action.res.id, 10));
      return { ...state, templates, error: { callback: () => toastr.info('Deleted', 'Template deleted!') } };
    }
    case SET_ERROR: {
      return { ...state, error: action.payload };
    }
    case SET_EDIT_TEMPLATE: {
      return { ...state, template: [...state.templates].find(template => template.id === action.payload), modal: true };
    }
    case SET_TEMPLATE_UPDATE: {
      const templates = [...state.templates].map(template => (template.id === action.payload.id ? action.payload : template));
      return { ...state, templates, modal: '' };
    }
    default: return state;
  }
};


export const getTemplateInfo = id => ({ type: SET_TEMPLATE, promise: emailTemplateInfo(id) });
export const setError = error => ({ type: SET_ERROR, payload: error });
export const getTemplates = () => ({ type: SET_TEMPLATES, promise: emailTemplatesFetch() });
export const createTemplate = () => ({ type: SET_CREATE_MODAL, payload: true });
export const changeTemplate = event => (dispatch, getState) => {
  const template = { ...getState().app.system.emailtemplates.template } || {};
  template[event.target.name] = event.target.value;
  dispatch({ type: SET_CHANGE_TEMPLATE, payload: template });
};
export const closeModal = () => ({ type: SET_CREATE_MODAL, payload: false });
export const submitTemplate = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const state = { ...getState().app.system.emailtemplates };
    const template = { ...state.template } || {};
    if (template.id) {
      console.log(template);
      emailTemplateUpdate(template)
        .then(() => {
          dispatch({ type: SET_TEMPLATE_UPDATE, payload: template });
          dispatch(closeModal());
          dispatch(setCommonData());
          dispatch({ type: SET_ERROR, payload: { callback: () => toastr.success('Success', 'Template updated!') } });
        })
        .catch((err) => {
          console.log(err);
          const error = {
            message: Object.keys(err.errors).map(key => err.errors[key]).join('\r\n'),
          };
          console.log(error);
          dispatch(setError(error));
        });
    } else if (!template.id) {
      emailTemplateCreate(template)
        .then(({ data }) => {
          dispatch({ type: SET_TEMPLATE_CREATE, payload: data });
          dispatch(closeModal());
          dispatch(setCommonData());
          dispatch({ type: SET_ERROR, payload: { callback: () => toastr.success('Success', 'Template updated!') } });
        })
        .catch((err) => {
          console.log(err);
          const error = {
            message: Object.keys(err.errors).map(key => err.errors[key]).join('\r\n'),
          };
          console.log(error);
          dispatch(setError(error));
        });
    }
  };
};
export const deleteTemplate = id => ({ type: SET_TEMPLATE_DELETE, promise: emailTemplateDelete(id) });
export const editTemplate = id => ({ type: SET_EDIT_TEMPLATE, payload: id });
export const clearError = () => ({ type: SET_ERROR });

