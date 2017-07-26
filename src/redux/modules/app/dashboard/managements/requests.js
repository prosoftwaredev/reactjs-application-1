import { getRequest, endpoint, checkStatus } from 'common/utils';

const URL_APPOINTMENTS_LIST = '/management/dashboard';

export const getManagements = () => getRequest(request => request.get(`${endpoint(URL_APPOINTMENTS_LIST)}`)).then(checkStatus);

export const fake = 'fake';
