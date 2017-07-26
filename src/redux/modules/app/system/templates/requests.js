import { getRequest, endpoint, checkStatus } from 'common/utils';

export const URL_AWS_DOCUMENTS = 'https://template-juvo-io.s3-eu-west-1.amazonaws.com/';

const URL_FETCH_TEMPLATE = '/template/fetch';
const URL_CREATE_TEMPLATE = '/template/create';
const URL_UPDATE_TEMPLATE = '/template/update';
const URL_DELETE_TEMPLATE = '/template/delete';
const URL_SIGN_TEMPLATE = '/template/sign';
const URL_GET_TEMPLATE = '/template/get_file';

export const templatesFetch = () =>
  getRequest(request =>
    request
      .post(`${endpoint(URL_FETCH_TEMPLATE)}`)
  ).then(checkStatus);

export const templateCreate = data =>
  getRequest(request =>
    request
      .post(`${endpoint(URL_CREATE_TEMPLATE)}`)
      .send(data)
  ).then(checkStatus);

export const templateUpdate = data =>
  getRequest(request =>
    request
      .post(`${endpoint(URL_UPDATE_TEMPLATE)}`)
      .send(data)
  ).then(checkStatus);

export const templateDelete = id =>
  getRequest(request =>
    request
      .post(`${endpoint(URL_DELETE_TEMPLATE)}`)
      .query({ id })
  ).then(checkStatus);

export const signTemplate = () => getRequest(
  request => request
    .post(`${endpoint(URL_SIGN_TEMPLATE)}`)
    .query())
  .then(checkStatus);

export const downloadTemplate = id => getRequest(
  request => request
    .post(`${endpoint(URL_GET_TEMPLATE)}`)
    .query({ id }))
  .then(checkStatus);
