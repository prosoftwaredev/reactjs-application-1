import url from 'url';
import { API_ENDPOINT } from 'common/utils';
import { fetchPlugins, toggle, updatePlugin, removePlugin, mailchimpAPIKey } from './requests';

const SET_PLUGINS = 'juvo/app/plugins/SET_PLUGINS';
const SET_PLUGIN_TOGGLE = 'juvo/app/plugins/SET_PLUGIN_TOGGLE';
const SET_CLEAR_PLUGINS = 'juvo/app/plugins/SET_CLEAR_PLUGINS';

const SUCCESS = '_SUCCESS';
// const REQUEST = '_REQUEST';
// const FAILURE = '_FAILURE';

export default (state = {}, action) => {
  switch (action.type) {
    case `${SET_PLUGINS}${SUCCESS}`: {
      return { ...state, plugins: action.res.data };
    }
    case `${SET_PLUGIN_TOGGLE}${SUCCESS}`: {
      const plugin = action.res.data;
      const plugins = [...state.plugins].map(item => (item.id === plugin.id ? plugin : item));
      return { ...state, plugins };
    }
    case SET_CLEAR_PLUGINS: {
      return { ...state, plugins: [] };
    }
    default: return state;
  }
};

export const getPlugins = () => ({ type: SET_PLUGINS, promise: fetchPlugins() });
export const togglePlugin = (plugin) => {
  const api = url.resolve(API_ENDPOINT, `${plugin.url}/${plugin.status === 0 ? 'activate' : 'deactivate'}`);
  return {
    type: SET_PLUGIN_TOGGLE,
    promise: toggle(api),
  };
};
export const pluginUpdate = plugin => () => updatePlugin(plugin);
export const pluginRemove = plugin => () => removePlugin(plugin);
export const setAPIKey = plugin => (dispatch) => {
  const api = url.resolve(API_ENDPOINT, `${plugin.url}/${plugin.status === 0 ? 'activate' : 'deactivate'}`);
  toggle(api)
    .then((res) => {
      dispatch({ type: `${SET_PLUGIN_TOGGLE}${SUCCESS}`, res });
      if (!plugin.status) {
        mailchimpAPIKey(plugin);
      }
    });
};
export const clearPlugins = () => ({ type: SET_CLEAR_PLUGINS });
