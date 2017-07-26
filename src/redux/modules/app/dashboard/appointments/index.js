import { getAppointments } from './requests';

const SET_APPOINTMENTS = 'juvo/app/dashboard/appointments/SET_APPOINTMENTS';

const SUCCESS = '_SUCCESS';
const REQUEST = '_REQUEST';
const FAILURE = '_FAILURE';


export default (state = {}, action) => {
  switch (action.type) {
    case `${SET_APPOINTMENTS}${REQUEST}`: {
      return { ...state, loading: true };
    }
    case `${SET_APPOINTMENTS}${FAILURE}`: {
      return { ...state, loading: false };
    }
    case `${SET_APPOINTMENTS}${SUCCESS}`: {
      return { ...state, data: action.res.data, loading: false };
    }
    default: return state;
  }
};

export const fetchAppointments = () => ({ type: SET_APPOINTMENTS, promise: getAppointments() });

