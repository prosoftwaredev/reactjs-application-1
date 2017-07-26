import { toastr } from 'react-redux-toastr';
import { createSupport } from './requests';

const SET_SUPPORT = 'juvo/app/support/SET_SUPPORT';
const SET_VALUES = 'juvo/app/support/SET_VALUES';
const SET_CLEAR_ERROR = 'juvo/app/support/SET_CLEAR_ERROR';
const SUCCESS = '_SUCCESS';
// const REQUEST = '_REQUEST';
const FAILURE = '_FAILURE';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_VALUES: {
      return { ...state, values: action.payload };
    }
    case `${SET_SUPPORT}${FAILURE}`: {
      const { errors } = action.error;
      const errorsArray = [];
      Object.keys(errors).forEach(key => errorsArray.push(errors[key]));
      return { ...state, error: { callback: () => toastr.error('Error', errorsArray.join(',')), message: errorsArray.join(', ') } };
    }
    case `${SET_SUPPORT}${SUCCESS}`: {
      return { ...state, error: { callback: () => toastr.success('Support requested', action.res.message) } };
    }
    case SET_CLEAR_ERROR: {
      const error = { ...state.error } || {};
      delete error.callback;
      return { ...state, error };
    }
    default: return state;
  }
};

export const changeValues = values => ({ type: SET_VALUES, payload: values });
export const sendSupport = ticket => ({ type: SET_SUPPORT, promise: createSupport(ticket) });
export const clearError = () => ({ type: SET_CLEAR_ERROR });
