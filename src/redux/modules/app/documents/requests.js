import { getRequest, endpoint, checkStatus } from 'common/utils';

export const URL_AWS_DOCUMENTS = 'https://doc-juvo-io.s3-us-west-2.amazonaws.com/';
const URL_FETCH_DOCUMENTS = '/document/fetch';
const URL_CREATE_DOCUMENT = '/document/create';
const URL_SIGN_DOCUMENT = '/document/sign';
// const URL_INFO_DOCUMENT = '/document/info';
const URL_DOWNLOAD_DOCUMENT = '/document/get_file';
const URL_DELETE_DOCUMENT = '/document/delete';

export const fetch = data => getRequest(
    request => request
      .post(`${endpoint(URL_FETCH_DOCUMENTS)}`)
      .send(data)
  ).then(checkStatus);

export const createDocuments = data => getRequest(
    request => request
      .post(`${endpoint(URL_CREATE_DOCUMENT)}`)
      .send(data))
      .then(checkStatus);

export const signDocument = () => getRequest(
    request => request
      .post(`${endpoint(URL_SIGN_DOCUMENT)}`)
      .query())
      .then(checkStatus);

export const downloadDocument = id => getRequest(
    request => request
      .post(`${endpoint(URL_DOWNLOAD_DOCUMENT)}`)
      .query({ id }))
      .then(checkStatus);

export const deleteDocument = id => getRequest(
    request => request
      .post(`${endpoint(URL_DELETE_DOCUMENT)}`)
      .query({ id }))
      .then(checkStatus);
