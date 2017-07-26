import { getRequest, endpoint, checkStatus } from 'common/utils';

const URL_DASHBOARD_NEWS = '/dashboard/fetch';

export const fetchRSS = () => getRequest(
    request => request
      .get(`${endpoint(URL_DASHBOARD_NEWS)}`)
  ).then(checkStatus);

export const fake = 'fake';
