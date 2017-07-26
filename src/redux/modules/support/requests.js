import { getRequest, endpoint, checkStatus } from 'common/utils';

const URL_CREATE = '/support/create';

export const createSupport = data => getRequest(
    request => request
      .post(`${endpoint(URL_CREATE)}`)
      .send(data)
  ).then(checkStatus);

export const fake = 'fake';

