import { momentFormats } from 'common/utils';
import {
  fetchInvoices,
  fetchCurrentPlan,
  cancel,
  getPartial,
  getInvoice,
  fetchCard,
  updateCard,
} from './requests';
import { logout } from '../auth';

import { SET_USER_DATA } from '../common';

export const SET_CURRENT_SUBSCRIPTION = 'juvo/app/SET_CURRENT_SUBSCRIPTION';
const SET_INVOICES = 'juvo/app/billing/SET_INVOICES';
const SET_MODAL = 'juvo/app/billing/SET_MODAL';
const SET_TOGGLE_APPROVE = 'juvo/app/billing/SET_TOGGLE_APPROVE';
const SET_CARD = 'juvo/app/billing/SET_CARD';
const SET_UPDATE_CARD = 'juvo/app/billing/SET_UPDATE_CARD';
const SET_CARD_SAVE = 'juvo/app/billing/SET_CARD_SAVE';

const SUCCESS = '_SUCCESS';
// const REQUEST = '_REQUEST';
const FAILURE = '_FAILURE';


export default (state = {}, action) => {
  switch (action.type) {
    case `${SET_USER_DATA}${SUCCESS}`: {
      const { currency_symbol, date_display_format } = action.res.data;
      const currency = String.fromCharCode(currency_symbol.replace('#', '').replace(';', ''));
      const dateDisplayFormat = momentFormats[date_display_format];
      return {
        ...state,
        user: {
          currency,
          dateDisplayFormat,
        }
      };
    }
    case `${SET_CURRENT_SUBSCRIPTION}${SUCCESS}`: {
      return { ...state, subscription: action.res.data };
    }
    case SET_MODAL: {
      const modal = action.payload || {};
      const card = action.payload ? {} : ({ ...state.card } || {});
      return { ...state, modal, card, cardError: null };
    }
    case SET_TOGGLE_APPROVE: {
      return { ...state, approve: !state.approve };
    }
    case `${SET_CARD}${SUCCESS}`: {
      const res = action.res.data || action.res;
      const error = res.status === 'error' ? res : {};
      const card = res.card;
      card.quantity = state.subscription && state.subscription.quantity;
      return { ...state, card, error, modal: { card: true } };
    }
    case SET_UPDATE_CARD: {
      return { ...state, card: action.payload };
    }
    case `${SET_UPDATE_CARD}${SUCCESS}`: {
      const quantity = ((state.card && state.card.quantity) || (state.subscription && state.subscription.quantity)) || 1;
      const partial = {
        partial: parseInt(action.res.data, 10),
        subscription: quantity * parseInt((state.subscription && state.subscription.per_user_cost) || 9, 10),
      };
      return { ...state, partial };
    }
    case `${SET_CARD_SAVE}${FAILURE}`: {
      return { ...state, cardError: action.error };
    }
    case `${SET_CARD_SAVE}${SUCCESS}`: {
      return { ...state, modal: {} };
    }
    case `${SET_INVOICES}${SUCCESS}`: {
      return { ...state, invoices: action.res };
    }
    default: return state;
  }
};

export const getCurrentSubscription = () => ({ type: SET_CURRENT_SUBSCRIPTION, promise: fetchCurrentPlan() });
export const getInvoices = () => ({ type: SET_INVOICES, promise: fetchInvoices() });
export const cancelSubscription = () => {
  return (dispatch) => {
    cancel().then(() => {
      dispatch(logout());
      dispatch({ type: SET_MODAL, payload: {} });
    });
  };
};
export const showCancelModal = () => ({ type: SET_MODAL, payload: { cancel: true } });
export const showCardModal = () => {
  return (dispatch, getState) => {
    const subscription = { ...getState().billing.subscription } || {};
    dispatch({ type: SET_CARD, promise: fetchCard() });
    dispatch({ type: SET_UPDATE_CARD, promise: getPartial({ quantity: subscription.quantity }) });
  };
};
export const closeModal = () => ({ type: SET_MODAL, payload: false });
export const togleCheckbox = () => ({ type: SET_TOGGLE_APPROVE });
export const changeCardForm = (event) => {
  return (dispatch, getState) => {
    const card = { ...getState().billing.card } || {};
    card[event.target.name] = event.target.value;
    dispatch({ type: SET_UPDATE_CARD, payload: card });
    if (event.target.name === 'quantity') {
      dispatch({ type: SET_UPDATE_CARD, promise: getPartial({ quantity: event.target.value }) });
    }
  };
};
export const submitCardForm = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const card = { ...getState().billing.card } || {};
    dispatch({ type: SET_CARD_SAVE, promise: updateCard(card) });
  };
};
export const handleInvoiceClick = id => () => {
  getInvoice(id)
    .then((res) => {
      const popoutWindow = window.open('', 'Invoice', 'width=1130,height=800');
      popoutWindow.document.write(res.html);
    })
    .catch(err => console.log(err));
};
