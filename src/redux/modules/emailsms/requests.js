import { getRequest, endpoint, checkStatus } from 'common/utils';

const URL_FETCH_BUNDLESS = '/billing/credit_bundle';
const URL_SMS_CREDIT = '/billing/sms_credit';
const URL_EMAIL_CREDIT = '/billing/email_credit';

export const fetchBundles = () => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH_BUNDLESS)}`)
).then(checkStatus);

export const setSMSCredit = data => getRequest(
  request => request
    .post(`${endpoint(URL_SMS_CREDIT)}`)
    .send(data)
).then(checkStatus);

export const setEmailCredit = data => getRequest(
  request => request
    .post(`${endpoint(URL_EMAIL_CREDIT)}`)
    .send(data)
).then(checkStatus);

