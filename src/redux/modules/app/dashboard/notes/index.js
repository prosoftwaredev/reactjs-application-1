import { getNotes } from './requests';

const SET_NOTES = 'juvo/app/dashboard/notes/SET_NOTES';

const SUCCESS = '_SUCCESS';
const REQUEST = '_REQUEST';
const FAILURE = '_FAILURE';

export default (state = {}, action) => {
  switch (action.type) {
    case `${SET_NOTES}${REQUEST}`: {
      return { ...state, loading: true };
    }
    case `${SET_NOTES}${FAILURE}`: {
      return { ...state, loading: false };
    }
    case `${SET_NOTES}${SUCCESS}`: {
      return { ...state, data: action.res.data, loading: false };
    }
    default: return state;
  }
};

export const fetchNotes = () => ({ type: SET_NOTES, promise: getNotes() });

