import superagent from 'superagent-defaults';
import { toastr } from 'react-redux-toastr';

import { downloadFile, momentFormats } from 'common/utils';

import {
  URL_AWS_DOCUMENTS,
  fetch,
  createDocuments,
  signDocument,
  downloadDocument,
  deleteDocument,
} from './requests';
import { createEmail } from '../contacts/requests';
import { SET_USER_DATA } from '../../common';


const SET_DOCUMENTS = 'juvo/app/documents/SET_DOCUMENTS';
const SET_DOCUMENT_PROGRESS = 'juvo/app/documents/SET_DOCUMENT_PROGRESS';
const SET_CREATE_DOCUMENT = 'juvo/app/documents/SET_CREATE_DOCUMENT';
const SET_DELETE_DOCUMENT = 'juvo/app/documents/SET_DELETE_DOCUMENT';
const SET_DOCUMENT_PAGINATION = 'juvo/app/documents/SET_DOCUMENT_PAGINATION';
const SET_SEARCH_VALUES = 'juvo/app/documents/SET_SEARCH_VALUES';
const SET_DOCUMENT_SEARCH_PANEL = 'juvo/app/documents/SET_DOCUMENT_SEARCH_PANEL';
const SET_ERROR = 'juvo/app/documents/SET_ERROR';
const SET_EMAIL = 'juvo/app/documents/SET_EMAIL';
const SET_EMAIL_CREATE = 'juvo/app/documents/SET_EMAIL_CREATE';
const SET_PRINTED_DOCUMENT = 'juvo/app/documents/SET_PRINTED_DOCUMENT';
const SET_MODAL = 'juvo/app/documents/SET_MODAL';

const SUCCESS = '_SUCCESS';
// const REQUEST = '_REQUEST';
const FAILURE = '_FAILURE';


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
    case `${SET_DOCUMENTS}${SUCCESS}`: {
      const { data, ...pagination } = action.res;
      return { ...state, documents: data, pagination };
    }
    case SET_DOCUMENT_PAGINATION: {
      return { ...state, pagination: action.payload };
    }
    case SET_DOCUMENT_PROGRESS: {
      return { ...state, uploadDocumentProgress: action.payload };
    }
    case SET_CREATE_DOCUMENT: {
      const documents = [action.payload].concat([...state.documents] || []);
      const pagination = { ...state.pagination };
      pagination.total += 1;
      documents.push(document);
      return { ...state, documents, pagination };
    }
    case `${SET_DELETE_DOCUMENT}${SUCCESS}`: {
      const id = parseInt(action.res.id, 10);
      const documents = [...state.documents].filter(doc => doc.id !== id);
      const pagination = { ...state.pagination };
      pagination.total -= 1;
      return { ...state, documents, pagination, error: { callback: () => toastr.info('Deleted', 'Document deleted!') } };
    }
    case SET_SEARCH_VALUES: {
      return { ...state, searchValue: action.payload };
    }
    case SET_DOCUMENT_SEARCH_PANEL: {
      return { ...state, searchPanel: !state.searchPanel };
    }
    case SET_ERROR: {
      return { ...state, error: null };
    }
    case SET_EMAIL: {
      return { ...state, email: action.payload };
    }
    case `${SET_EMAIL_CREATE}${SUCCESS}`: {
      const email = { ...state.email };
      delete email.message;
      delete email.subject;
      return { ...state, email, printedDoc: null, error: { callback: () => toastr.success('Sent', 'Mesasge sent!') }, modal: null };
    }
    case `${SET_EMAIL_CREATE}${FAILURE}`: {
      return { ...state, error: { callback: () => toastr.error('Error', action.error.message), errors: action.error.errors } };
    }
    case SET_PRINTED_DOCUMENT: {
      return { ...state, loading: {}, printedDoc: action.payload, modal: 'emails' };
    }
    case SET_MODAL: {
      return { ...state, modal: action.payload };
    }
    default: return state;
  }
};

// export const getDocuments = () => ({ type: SET_DOCUMENTS, promise: fetch() });

export const handleDocumentUpload = (event) => {
  return (dispatch) => {
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
    signDocument()
      .then(({ data }) => {
        aws.accessKey = (data && data.access_key) || null;
        aws.policy = (data && data.policy) || null;
        aws.signature = (data && data.signature) || null;
        if (aws.accessKey && aws.policy && aws.signature) {
          files.forEach((file, index) => {
            const fileToUpload = {
              filename: file.name,
              filesize: file.size,
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
                        window.clearInterval(timer);
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
                .catch((error) => {
                  window.clearInterval(timer);
                  reject(error);
                });
            });

            uploadDocuments
              .then((response) => {
                console.log(response);
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

export const handleDocumentDownload = (id, filename) => {
  return () => {
    downloadDocument(id).then((response) => {
      const { url } = response.data;
      downloadFile(url, filename);
    }).catch(error => toastr.error('Download', error.message));
  };
};

export const setDeleteDocument = id => ({ type: SET_DELETE_DOCUMENT, promise: deleteDocument(id) });

export const setDocumentPagination = pagination => ({ type: SET_DOCUMENT_PAGINATION, payload: pagination });

export const setSearchValues = event => ({ type: SET_SEARCH_VALUES, payload: event.target.value });

export const fetchDocuments = (page = 1) => {
  return (dispatch, getState) => {
    const searchValue = getState().app.documents.searchValue || '';
    const data = {
      page,
      search_string: searchValue
    };
    dispatch({ type: SET_DOCUMENTS, promise: fetch(data) });
  };
};

export const searchDocuments = event => (dispatch, getState) => {
  event.preventDefault();
  const state = { ...getState().app.documents };
  const data = {
    page: state.pagination.current_page || 1,
    search_string: state.searchValue || '',
  };
  dispatch({ type: SET_DOCUMENTS, promise: fetch(data) });
};
export const toggleSearch = () => ({ type: SET_DOCUMENT_SEARCH_PANEL });
export const clearError = () => ({ type: SET_ERROR });
export const setDocument = doc => ({ type: SET_PRINTED_DOCUMENT, payload: doc });
export const handleModalClose = () => ({ type: SET_MODAL });
export const handleEmailChange = event => (dispatch, getState) => {
  const email = { ...getState().app.documents.email };
  email[event.target.name] = event.target.value;
  dispatch({ type: SET_EMAIL, payload: email });
};
export const handleEmailCreate = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const state = getState().app.documents;
    const email = state.email ? { ...state.email } : {};
    email.document_id = state.printedDoc && state.printedDoc.id;
    dispatch({ type: SET_EMAIL_CREATE, promise: createEmail(email) });
  };
};
export const handleAttachmentRemove = () => ({ type: SET_PRINTED_DOCUMENT });
export const handleTemplateChange = template => (dispatch, getState) => {
  const state = { ...getState().app.documents };
  const email = state.email ? { ...state.email } : {};
  email.subject = template.subject;
  email.message = template.message;
  dispatch({ type: SET_EMAIL, payload: email });
};
export const handleSearchReset = () => (dispatch) => {
  dispatch({ type: SET_SEARCH_VALUES });
  dispatch(fetchDocuments());
};
