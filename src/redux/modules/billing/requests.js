import { getRequest, endpoint } from 'common/utils';

const URL_FETCH_INVOICES = '/billing/fetch';
const URL_FETCH_PLANS = '/billing/subscription_prices';
const URL_FETCH_CURRENT_PLAN = '/billing/subscription_current';
const URL_FETCH_CARD = '/billing/fetch_card';
const URL_UPDATE_CARD = '/billing/update_card';
const URL_CANCEL = '/billing/cancel';
const URL_INVOICE = '/billing/invoice';
const URL_PARTIAL_PAYMENT = '/billing/partial_payment';

export const fetchInvoices = () => getRequest(
    request => request
      .post(`${endpoint(URL_FETCH_INVOICES)}`)
  );

export const fetchPlans = () => getRequest(
    request => request
      .post(`${endpoint(URL_FETCH_PLANS)}`)
  );

export const fetchCurrentPlan = () => getRequest(
    request => request
      .post(`${endpoint(URL_FETCH_CURRENT_PLAN)}`)
  );

export const fetchCard = () => getRequest(
    request => request
      .post(`${endpoint(URL_FETCH_CARD)}`)
  );

export const updateCard = data => getRequest(
    request => request
      .post(`${endpoint(URL_UPDATE_CARD)}`)
      .send(data)
  );

export const cancel = () => getRequest(
    request => request
      .post(`${endpoint(URL_CANCEL)}`)
      .send({ confirm: 1 })
  );

export const getInvoice = id => getRequest(
    request => request
      .post(`${endpoint(URL_INVOICE)}`)
      .query({ id })
  );

export const getPartial = data => getRequest(
    request => request
      .post(`${endpoint(URL_PARTIAL_PAYMENT)}`)
      .send(data)
  );
