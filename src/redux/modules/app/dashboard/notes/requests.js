import { getRequest, endpoint, checkStatus } from 'common/utils';

const URL_FETCH_NOTES = '/note/fetch';

export const getNotes = () => getRequest(
    request => request
      .post(`${endpoint(URL_FETCH_NOTES)}`))
      .then(checkStatus);

export const fake = 'fake';
