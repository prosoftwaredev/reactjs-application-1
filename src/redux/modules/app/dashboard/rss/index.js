import { fetchRSS } from './requests';
import { SET_DASHBOARD } from '../../../common';

// const SET_NEWS = 'juvo/app/dashboard/rss/SET_NEWS';

const SUCCESS = '_SUCCESS';
const REQUEST = '_REQUEST';
const FAILURE = '_FAILURE';

export default (state = {}, action) => {
  switch (action.type) {
    case `${SET_DASHBOARD}${REQUEST}`: {
      return { ...state, loading: true };
    }
    case `${SET_DASHBOARD}${FAILURE}`: {
      return { ...state, loading: false };
    }
    case `${SET_DASHBOARD}${SUCCESS}`: {
      return { ...state, news: action.res.news, loading: false };
    }
    default: return state;
  }
};

export const fetchNews = () => ({ type: SET_DASHBOARD, promise: fetchRSS() });
