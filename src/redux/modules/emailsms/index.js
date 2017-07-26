import { toastr } from 'react-redux-toastr';
import { fetchBundles, setSMSCredit, setEmailCredit } from './requests';

const SET_BUNDLES = 'juvo/emailsms/SET_BUNDLES';
const SET_BUNDLE = 'juvo/emailsms/SET_BUNDLE';
const SET_BUNDLE_SMS = 'juvo/emailsms/SET_BUNDLE_SMS';
const SET_BUNDLE_EMAIL = 'juvo/emailsms/SET_BUNDLE_EMAIL';
const SET_ERROR = 'juvo/emailsms/SET_ERROR';

const SUCCESS = '_SUCCESS';
// const REQUEST = '_REQUEST';
const FAILURE = '_FAILURE';

export default (state = {}, action) => {
  switch (action.type) {
    case `${SET_BUNDLES}${SUCCESS}`: {
      const bundles = { ...action.res };
      const bundleSMS = Object.keys(bundles).map(key => bundles[key]).filter(bundle => bundle.category === 2);
      const bundleEmail = Object.keys(bundles).map(key => bundles[key]).filter(bundle => bundle.category === 1);
      return { ...state, bundleSMS, bundleEmail };
    }
    case SET_BUNDLE: {
      return { ...state, bundle: action.payload };
    }
    case SET_ERROR: {
      return { ...state, error: action.payload };
    }
    case `${SET_BUNDLE_SMS}${FAILURE}`: {
      return { ...state, error: { callback: () => toastr.error('Error', action.error.message) } };
    }
    case `${SET_BUNDLE_EMAIL}${FAILURE}`: {
      return { ...state, error: { callback: () => toastr.error('Error', action.error.message) } };
    }
    default: return state;
  }
};

export const getBundles = () => ({ type: SET_BUNDLES, promise: fetchBundles() });
export const handleBundleChange = event => (dispatch, getState) => {
  const bundle = getState().emailsms.bundle ? { ...getState().emailsms.bundle } : {};
  bundle[event.target.name] = event.target.value;
  dispatch({ type: SET_BUNDLE, payload: bundle });
};
export const handleSMSSubmit = event => (dispatch, getState) => {
  event.preventDefault();
  const bundle = getState().emailsms.bundle ? { ...getState().emailsms.bundle } : {};
  dispatch({ type: SET_BUNDLE_SMS, promise: setSMSCredit({ bundle_id: bundle.sms }) });
};
export const handleEmailSubmit = event => (dispatch, getState) => {
  event.preventDefault();
  const bundle = getState().emailsms.bundle ? { ...getState().emailsms.bundle } : {};
  dispatch({ type: SET_BUNDLE_EMAIL, promise: setEmailCredit({ bundle_id: bundle.email }) });
};
export const clearError = () => ({ type: SET_ERROR, payload: {} });
