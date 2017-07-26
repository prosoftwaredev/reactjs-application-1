import { getManagements } from './requests';

const SET_MANAGEMENTS = 'juvo/app/dashboard/managements/SET_MANAGEMENTS';

const SUCCESS = '_SUCCESS';
const REQUEST = '_REQUEST';
const FAILURE = '_FAILURE';

export default (state = {}, action) => {
  switch (action.type) {
    case `${SET_MANAGEMENTS}${REQUEST}`: {
      return { ...state, loading: true };
    }
    case `${SET_MANAGEMENTS}${FAILURE}`: {
      return { ...state, loading: false };
    }
    case `${SET_MANAGEMENTS}${SUCCESS}`: {
      return { ...state, managements: action.res.data[0] };
    }
    default: return state;
  }
};

export const fetchManagements = () => ({ type: SET_MANAGEMENTS, promise: getManagements() });
