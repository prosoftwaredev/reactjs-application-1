import { getRequest, endpoint, checkStatus } from 'common/utils';

const URL_FETCH_PLUGINS = '/plugin/fetch';
const URL_PLUGIN_UPDATE = '/plugin_%name%/send';
const URL_PLUGIN_REMOVE = '/plugin_%name%/remove';
const URL_MAILCHIMP_API_KEY = '/plugin_%name%/api_key';


export const fetchPlugins = () => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH_PLUGINS)}`)
).then(checkStatus);

export const toggle = api => getRequest(
  request => request
    .get(`${api}`)
).then(checkStatus);

export const updatePlugin = plugin => getRequest(
  request => request
    .get(`${endpoint(URL_PLUGIN_UPDATE.replace('%name%', plugin))}`)
).then(checkStatus);

export const removePlugin = plugin => getRequest(
  request => request
    .get(`${endpoint(URL_PLUGIN_REMOVE.replace('%name%', plugin))}`)
).then(checkStatus);

export const mailchimpAPIKey = plugin => getRequest(
  request => request
    .post(`${endpoint(URL_MAILCHIMP_API_KEY.replace('%name%', plugin.name.toLowerCase()))}`)
    .send({api_key: plugin.api_key}))
  .then(checkStatus);
