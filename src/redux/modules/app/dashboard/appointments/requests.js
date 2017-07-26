import { getRequest, endpoint, checkStatus } from 'common/utils';

const URL_APPOINTMENTS_LIST = '/appointment/dashboard';

export const getAppointments = () => getRequest(request => request.get(`${endpoint(URL_APPOINTMENTS_LIST)}`)).then(checkStatus);

export const fake = 'fake';
