import { getRequest, endpoint, checkStatus } from 'common/utils';

const URL_FETCH = '/property/fetch';
const URL_FETCH_INFO = '/property/info';
const URL_FETCH_CATEGORIES = '/property/property_category';
const URL_FETCH_STATUSES = '/property/property_status_array';
const URL_FETCH_TYPE = '/property/property_type';
const URL_FETCH_PRICE = '/property/price_array';
const URL_CREATEPOST = '/property/create';
const URL_DELETEPOST = '/property/delete';
const URL_UPDATEPOST = '/property/update';
const URL_FETCH_ASSETS = '/property_asset/fetch';
const URL_RECORDER_ASSETS = '/property_asset/reorder';
const URL_DELETE_ASSET = '/property_asset/delete';
const URL_CREATEASSET = '/property_asset/create';
const URL_CREATEDOCUMENT = '/document/create';
const URL_ASSETSIGN = '/property_asset/sign';
export const URL_AWS_ASSETS = 'https://image-juvo.s3-eu-west-1.amazonaws.com/';
export const URL_AWS_DOCUMENTS = 'https://doc-juvo.s3-eu-west-1.amazonaws.com/';
const URL_FETCHALL_LOCATIONS = '/location/fetch';
const URL_FETCH_LOCATIONS = '/location/property/fetch';
const URL_SAVE_LOCATIONS = '/location/property/save';
const URL_DOCUMENTSIGN = '/document/sign';
const URL_FETCH_DOCUMENTS = '/document/fetch';
const URL_DELETE_DOCUMENT = '/document/delete';
const URL_GET_DOCUMENT = '/document/get_file';
const URL_FETCH_EMAILS = '/email/fetch';
const URL_FETCH_APPOINTMENT = '/appointment/fetch';
const URL_PROPERTYCONTACTS = '/property_marketing/matched';
const URL_EMAILTEMPLATES = '/property_marketing/template';
const URL_AUTOCOMPLETE_CONTACT = '/autocomplete/contact';
const URL_SEND_EMAIL = '/property_marketing/send';
const URL_SEND_EMAILDIRECT = '/property_marketing/send_direct';
const URL_FETCH_NOTES = '/note/fetch';
const URL_FETCH_NOTECATEGORIES = '/note/category_array';
const URL_CREATE_NOTE = '/note/create';
const URL_DELETE_NOTE = '/note/delete';
const URL_FETCH_TEMPLATES = '/template/property';
const URL_PRINT_TEMPLATE = '/print/property';
const URL_FETCH_APPOINTMENTS = '/appointment/property';
const URL_FETCH_ACTIVITY = '/activity/property';
const URL_PROPERTY_QUICK = 'property/quick';

export const fetch = data => getRequest(
    request => request
      .post(`${endpoint(URL_FETCH)}`)
      .send(data)
  ).then(checkStatus);

export const fetchById = id => getRequest(
    request => request
      .post(`${endpoint(URL_FETCH_INFO)}`)
      .query({ id }))
      .then(checkStatus);

export const getAssetSign = () => getRequest(
    request => request
      .post(`${endpoint(URL_ASSETSIGN)}`)
      .query())
      .then(checkStatus);


export const fetchAssets = data => getRequest(
    request => request
      .post(`${endpoint(URL_FETCH_ASSETS)}`)
      .send(data))
      .then(checkStatus);

export const recorderAssets = data => getRequest(
    request => request
      .post(`${endpoint(URL_RECORDER_ASSETS)}`)
      .send(data))
      .then(checkStatus);

export const createAssets = data => getRequest(
    request => request
      .post(`${endpoint(URL_CREATEASSET)}`)
      .send(data))
      .then(checkStatus);

export const deleteAsset = id => getRequest(
    request => request
      .post(`${endpoint(URL_DELETE_ASSET)}`)
      .query({ id }))
      .then(checkStatus);

export const fetchEmailTemplates = () => getRequest(
    request => request
      .post(`${endpoint(URL_EMAILTEMPLATES)}`))
      .then(checkStatus);

export const sendEmailDirect = data => getRequest(
    request => request
      .post(`${endpoint(URL_SEND_EMAILDIRECT)}`)
      .send(data))
      .then(checkStatus);

export const sendEmail = data => getRequest(
    request => request
      .post(`${endpoint(URL_SEND_EMAIL)}`)
      .send(data))
      .then(checkStatus);

export const fetchPropertyLocations = id => getRequest(
    request => request
      .post(`${endpoint(URL_FETCH_LOCATIONS)}`)
      .query({ id }))
      .then(checkStatus);

export const fetchLocations = () => getRequest(
    request => request
      .post(`${endpoint(URL_FETCHALL_LOCATIONS)}`))
      .then(checkStatus);

export const saveLocations = data => getRequest(
    request => request
      .post(`${endpoint(URL_SAVE_LOCATIONS)}`)
      .send(data))
      .then(checkStatus);

export const fetchEmails = data => getRequest(
    request => request
      .post(`${endpoint(URL_FETCH_EMAILS)}`)
      .send(data))
      .then(checkStatus);

export const getDocumentSign = () => getRequest(
    request => request
      .post(`${endpoint(URL_DOCUMENTSIGN)}`)
      .query())
      .then(checkStatus);

export const createDocuments = data => getRequest(
    request => request
      .post(`${endpoint(URL_CREATEDOCUMENT)}`)
      .send(data))
      .then(checkStatus);

export const fetchDocuments = data => getRequest(
    request => request
      .post(`${endpoint(URL_FETCH_DOCUMENTS)}`)
      .send(data))
      .then(checkStatus);

export const deleteDocument = id => getRequest(
    request => request
      .post(`${endpoint(URL_DELETE_DOCUMENT)}`)
      .query({ id }))
      .then(checkStatus);

export const downloadDocument = id => getRequest(
    request => request
      .post(`${endpoint(URL_GET_DOCUMENT)}`)
      .query({ id }))
      .then(checkStatus);

export const getPropertyContacts = id => getRequest(
    request => request
      .post(`${endpoint(URL_PROPERTYCONTACTS)}`)
      .query({ id }))
      .then(checkStatus);

export const getPropertyNotes = data => getRequest(
    request => request
      .post(`${endpoint(URL_FETCH_NOTES)}`)
      .send(data))
      .then(checkStatus);

export const getNotesCategory = () => getRequest(
    request => request
      .post(`${endpoint(URL_FETCH_NOTECATEGORIES)}`))
      .then(checkStatus);

export const createNote = data => getRequest(
    request => request
      .post(`${endpoint(URL_CREATE_NOTE)}`)
      .send(data))
      .then(checkStatus);

export const deleteNote = data => getRequest(
    request => request
      .post(`${endpoint(URL_DELETE_NOTE)}`)
      .query(data))
      .then(checkStatus);

export const fetchPrintTemplates = () => getRequest(
    request => request
      .post(`${endpoint(URL_FETCH_TEMPLATES)}`))
      .then(checkStatus);

export const printTemplate = data => getRequest(
    request => request
      .post(`${endpoint(URL_PRINT_TEMPLATE)}`)
      .send(data))
      .then(checkStatus);

export const autocomplete = data => getRequest(
    request => request
      .post(`${endpoint(URL_AUTOCOMPLETE_CONTACT)}`)
      .send({ s: data }))
      .then(checkStatus);

export const fetchAppointment = data => getRequest(
    request => request
      .post(`${endpoint(URL_FETCH_APPOINTMENT)}`)
      .send(data))
      .then(checkStatus);

export const deletePost = id => getRequest(
    request => request
      .post(`${endpoint(URL_DELETEPOST)}`)
      .query({ id }))
      .then(checkStatus);

export const createPost = data => getRequest(
    request => request
      .post(`${endpoint(URL_CREATEPOST)}`)
      .send(data)
  ).then(checkStatus);

export const updatePost = data => getRequest(
    request => request
      .post(`${endpoint(URL_UPDATEPOST)}`)
      .send(data)
  ).then(checkStatus);

export const fetchCategories = data => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH_CATEGORIES)}`)
    .send(data))
    .then(checkStatus);

export const fetchStatuses = data => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH_STATUSES)}`)
    .send(data))
    .then(checkStatus);

export const fetchType = data => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH_TYPE)}`)
    .send(data))
    .then(checkStatus);

export const fetchPrice = data => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH_PRICE)}`)
    .send(data))
    .then(checkStatus);

export const fetchPropertyAppointments = id => getRequest(
    request => request
      .post(`${endpoint(URL_FETCH_APPOINTMENTS)}`)
      .query({ id }))
      .then(checkStatus);

export const fetchPropertyActivity = id => getRequest(
    request => request
      .post(`${endpoint(URL_FETCH_ACTIVITY)}`)
      .query({ id }))
      .then(checkStatus);

export const propertyQuickCreate = data => getRequest(
  request => request
    .post(`${endpoint(URL_PROPERTY_QUICK)}`)
    .send(data)
  ).then(checkStatus);
