import {
  normalize,
  Schema,
  arrayOf
} from 'normalizr';
import { toastr } from 'react-redux-toastr';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import { EditorState, RichUtils } from 'draft-js';

import { SET_CURRENT_SUBSCRIPTION } from '../billing';
import { SET_USER as SET_AUTH } from '../auth';
import { fetch, fetchUserInfo, deletePost, createPost, updatePost, updateProfile } from './requests';
import { SET_TIMEZONES } from '../common';

export const SET_USERS = 'juvo/user/SET_USERS';
const SET_USER = 'juvo/user/SET_USER';
const SET_DELETE_USER = 'juvo/user/SET_DELETE_USER';
const SET_CREATE_USER = 'juvo/user/SET_CREATE_USER';
const SET_UPDATE_USER = 'juvo/user/SET_UPDATE_USER';
const SET_USER_ERROR = 'juvo/user/SET_USER_ERROR';
const SET_SIGNATURE = 'juvo/user/SET_SIGNATURE';

const SUCCESS = '_SUCCESS';
const REQUEST = '_REQUEST';
const FAILURE = '_FAILURE';

const usersModel = new Schema('users');


export default (state = {}, action) => {
  switch (action.type) {
    case `${SET_CURRENT_SUBSCRIPTION}${SUCCESS}`: {
      return { ...state, subscription: action.res.data };
    }
    case SET_USER: {
      return { ...state, user: action.payload, signature: EditorState.createEmpty() };
    }
    case SET_SIGNATURE: {
      return { ...state, signature: action.payload };
    }
    case `${SET_USERS}${SUCCESS}`: {
      const res = {
        users: action.res.data,
      };
      const result = normalize(res, { users: arrayOf(usersModel) });
      return { ...state, users: result.entities.users, usersMap: result.result.users };
    }
    case `${SET_USER}${SUCCESS}`: {
      const user = action.res.data;
      const signature = user.email_signature ? EditorState.createWithContent(stateFromHTML(user.email_signature)) : EditorState.createEmpty();
      // const signature = EditorState.createEmpty();
      return { ...state, user, signature };
    }
    case SET_TIMEZONES: {
      return { ...state, timezones: action.payload };
    }
    case SET_UPDATE_USER: {
      return { ...state, user: action.payload };
    }
    case `${SET_UPDATE_USER}${REQUEST}`: {
      return { ...state, loading: true };
    }
    case `${SET_UPDATE_USER}${SUCCESS}`: {
      const users = { ...state.users };
      const user = { ...state.user };
      users[user.id] = user;
      return { ...state, loading: false, users, error: { callback: () => toastr.success('Success', 'Saved') } };
    }
    case `${SET_UPDATE_USER}${FAILURE}`: {
      const error = action.error;
      return { ...state, error: { callback: () => toastr.error('Error', error.message), errors: error.errors } };
    }
    case `${SET_CREATE_USER}${REQUEST}`: {
      return { ...state, loading: true };
    }
    case `${SET_CREATE_USER}${FAILURE}`: {
      const error = action.error;
      return { ...state, error: { callback: () => toastr.error('Error', error.message), errors: error.errors } };
    }
    case `${SET_CREATE_USER}${SUCCESS}`: {
      const users = { ...state.users };
      const user = { ...state.user };
      users[user.id] = user;
      return { ...state, loading: false, users, error: { callback: () => toastr.success('Success', 'Saved') } };
    }
    case `${SET_DELETE_USER}${FAILURE}`: {
      return { ...state, error: { callback: () => toastr.error('Error', action.error.message), errors: action.error.errors } };
    }
    case `${SET_DELETE_USER}${SUCCESS}`: {
      const id = parseInt(action.res.id, 10);
      const users = { ...state.users };
      const usersMap = [...state.usersMap].filter(item => item !== id);
      delete users[id];
      return { ...state, users, usersMap, error: { callback: () => toastr.info('User', 'User deleted!') } };
    }
    case SET_USER_ERROR: {
      const error = { ...state.error };
      delete error.callback;
      return { ...state, error };
    }
    default: return state;
  }
};

export const fetchUsers = () => ({ type: SET_USERS, promise: fetch() });
export const getUserInfo = id => ({ type: SET_USER, promise: fetchUserInfo(id) });
export const deleteUser = id => ({ type: SET_DELETE_USER, promise: deletePost({ id }) });
export const userChange = (event) => {
  return (dispatch, getState) => {
    const user = { ...getState().user.user };
    if (event.target.type === 'checkbox') {
      user[event.target.name] = user[event.target.name] && user[event.target.name] === 1 ? 0 : 1;
    } else {
      user[event.target.name] = event.target.value;
    }
    dispatch({ type: SET_UPDATE_USER, payload: user });
  };
};
export const userSave = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const state = { ...getState() };
    console.log(state);
    const user = { ...state.user.user };
    const signature = state.user.signature;
    const identity = { ...state.auth.identity };
    const raw = signature.getCurrentContent();
    user.email_signature = stateToHTML(raw);
    if (user.id) {
      if (user.id === identity.id) {
        updatePost(user)
          .then(({ data }) => {
            if (data) {
              dispatch({ type: SET_AUTH, payload: data });
              dispatch({ type: `${SET_UPDATE_USER}${SUCCESS}` });
            }
          })
          .catch(error => dispatch({ type: `${SET_UPDATE_USER}${FAILURE}`, error }));
      } else {
        dispatch({ type: SET_UPDATE_USER, promise: updatePost(user) });
      }
    } else {
      dispatch({ type: SET_CREATE_USER, promise: createPost(user) });
    }
  };
};
export const profileSave = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const state = { ...getState() };
    const user = { ...state.user.user };
    const signature = state.user.signature;
    const raw = signature.getCurrentContent();
    user.email_signature = stateToHTML(raw);
    if (user.id) {
      updateProfile(user)
        .then(({ data }) => {
          if (data) {
            dispatch({ type: SET_AUTH, payload: data });
            dispatch({ type: `${SET_UPDATE_USER}${SUCCESS}` });
          }
        })
        .catch(error => dispatch({ type: `${SET_UPDATE_USER}${FAILURE}`, error }));
    } else {
      dispatch({ type: SET_CREATE_USER, promise: createPost(user) });
    }
  };
};
export const signatureChange = editorState => ({ type: SET_SIGNATURE, payload: editorState });
export const clearError = () => ({ type: SET_USER_ERROR });
export const clearUser = () => ({ type: SET_USER, payload: {} });
export const toggleBlockType = (blockType) => {
  return (dispatch, getState) => {
    const signature = getState().user.signature;
    dispatch(signatureChange(RichUtils.toggleBlockType(signature, blockType)));
  };
};
export const toggleInlineStyle = (inlineStyle) => {
  return (dispatch, getState) => {
    const signature = getState().user.signature;
    dispatch(signatureChange(RichUtils.toggleInlineStyle(signature, inlineStyle)));
  };
};
