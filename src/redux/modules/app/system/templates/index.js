import superagent from 'superagent-defaults';
import { toastr } from 'react-redux-toastr';

import { downloadFile, momentFormats } from 'common/utils';
import { SET_USER_DATA, setCommonData } from '../../../common';
import {
  URL_AWS_DOCUMENTS,
  templatesFetch,
  templateCreate,
  templateUpdate,
  templateDelete,
  signTemplate,
  downloadTemplate,
} from './requests';

const SET_TEMPLATES = 'juvo/app/system/templates/SET_TEMPLATES';
const SET_TEMPLATE_CREATE = 'juvo/app/system/templates/SET_TEMPLATE_CREATE';
const SET_TEMPLATE_UPDATE = 'juvo/app/system/templates/SET_TEMPLATE_UPDATE';
const SET_TEMPLATE_DELETE = 'juvo/app/system/templates/SET_TEMPLATE_DELETE';
const SET_CREATE_MODAL = 'juvo/app/system/templates/SET_CREATE_MODAL';
const SET_CHANGE_TEMPLATE = 'juvo/app/system/templates/SET_CHANGE_TEMPLATE';
const SET_TEMPLATE_FILE = 'juvo/app/system/templates/SET_TEMPLATE_FILE';
const SET_ERROR = 'juvo/app/system/templates/SET_ERROR';
const SET_EDIT_TEMPLATE = 'juvo/app/system/templates/SET_EDIT_TEMPLATE';

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
      return { ...state, templates: [action.payload].concat([...state.templates]) };
    }
    case SET_CHANGE_TEMPLATE: {
      return { ...state, template: action.payload };
    }
    case SET_TEMPLATE_FILE: {
      const template = { ...state.template } || {};
      template.file = action.payload;
      return { ...state, template, fileinput: true };
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
      return { ...state, templates };
    }
    default: return state;
  }
};
export const setError = error => ({ type: SET_ERROR, payload: error });
export const getTemplates = () => ({ type: SET_TEMPLATES, promise: templatesFetch() });
export const createTemplate = () => ({ type: SET_CREATE_MODAL, payload: true });
export const changeTemplate = event => (dispatch, getState) => {
  const template = { ...getState().app.system.templates.template } || {};
  template[event.target.name] = event.target.value;
  dispatch({ type: SET_CHANGE_TEMPLATE, payload: template });
};
export const closeModal = () => ({ type: SET_CREATE_MODAL, payload: false });
export const uploadTemplate = (file, id) => {
  return (dispatch) => {
    const aws = {};
    signTemplate()
      .then(({ data }) => {
        aws.accessKey = (data && data.access_key) || null;
        aws.policy = (data && data.policy) || null;
        aws.signature = (data && data.signature) || null;
        if (aws.accessKey && aws.policy && aws.signature) {
          const uploadAmazon = () => {
            return new Promise((resolve, reject) => {
              const doc = new FormData();
              // const filename = `${id}.${file.name.split('.').pop()}`;
              // console.log(filename);
              doc.append('key', id);
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
                  .end((err, res) => {
                    if (err) {
                      reject(err);
                    }
                    if (res) {
                      resolve(res);
                    }
                  });
              } catch (ex) {
                reject(ex);
              }
            });
          };

          uploadAmazon().then((res) => {
            console.log(res);
            dispatch(closeModal());
            dispatch(setCommonData());
            dispatch({ type: SET_ERROR, payload: { callback: () => toastr.success('Success', 'Template created/updated!') } });
          }).catch(error => console.log(error));
        }
      })
      .catch(error => console.log(error));
  };
};
export const submitTemplate = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const state = { ...getState().app.system.templates };
    const template = { ...state.template } || {};
    const fileinput = state.fileinput;
    const file = template.file;
    if (template.id) {
      console.log(template);
      templateUpdate(template)
        .then(({ data }) => {
          dispatch({ type: SET_TEMPLATE_UPDATE, payload: template });
          if (fileinput) {
            console.log('fileinput');
            console.log(fileinput);
            console.log(file);
            template.filename = file.name;
            dispatch(uploadTemplate(file, data.filename));
          } else {
            dispatch(closeModal());
            dispatch(setCommonData());
            dispatch({ type: SET_ERROR, payload: { callback: () => toastr.success('Success', 'Template updated!') } });
          }
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
      if (!file) {
        dispatch(setError({ message: 'Please select file' }));
      } else {
        template.filename = file.name;
        templateCreate(template)
          .then(({ data }) => {
            dispatch({ type: SET_TEMPLATE_CREATE, payload: data });
            dispatch(uploadTemplate(file, data.filename));
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
    }
  };
};
export const deleteTemplate = id => ({ type: SET_TEMPLATE_DELETE, promise: templateDelete(id) });
export const handleTemplateUpload = event => ({ type: SET_TEMPLATE_FILE, payload: event.target.files[0] });
export const handleTemplateDownload = (id, filename) => {
  return () => {
    downloadTemplate(id).then((response) => {
      const { url } = response.data;
      downloadFile(url, filename);
    }).catch(error => toastr.error('Download', error.message));
  };
};
export const editTemplate = id => ({ type: SET_EDIT_TEMPLATE, payload: id });
export const clearError = () => ({ type: SET_ERROR });
