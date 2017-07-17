import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import store from '../store';
import config from '../../config';


const API_HOST = `${config.ENDHOST}`;
const url = '/api/screen/';

const ADD = 'screenItems/ADD';
const REMOVE = 'screenItems/REMOVE';
const REQUEST = 'screenItems/REQUEST';
const OK = 'screenItems/OK';
const ERROR = 'screenItems/ERROR';
const URL = 'screenItems/URL';

export const screenItemsActions = {
  ADD,
  REMOVE,
  REQUEST,
  OK,
  ERROR,
  URL,
};

const preUrlHandler = (items) => {
  let preUrl = '?rooms=';

  if (!items.length) return '';

  items.forEach((el) => {
    let id = el.roomId;

    if (typeof id === 'object') id = JSON.stringify(id);
    preUrl += `${el.platform}_${id}--`;
  });

  return preUrl;
};

const getPreUrl = () => {
  const items = store.getState().screenItems.data;
  return preUrlHandler(items);
};

const replaceLocationHandler = () => {
  const preUrl = getPreUrl();

  browserHistory.push(`/live${preUrl}`);
};

const screenItemsUrl = () => {
  const payload = getPreUrl();

  return {
    type: URL,
    payload,
  };
};

const screenItemsAddHander = payload => ({
  type: ADD,
  payload,
});

const screenItemsRemoveHander = payload => ({
  type: REMOVE,
  payload,
});

const getScreenItemsRequest = () => ({
  type: REQUEST,
});

const getScreenItemsOk = payload => ({
  type: OK,
  payload,
});

const getScreenItemsError = payload => ({
  type: ERROR,
  payload,
});

const getScreenItems = par => (dispatch) => {
  dispatch(getScreenItemsRequest());
  return fetch(`${API_HOST}${url}${par}`)
    .then(res => res.json())
    .then((json) => {
      dispatch(getScreenItemsOk(json));
      dispatch(screenItemsUrl());
    })
    .catch(err => dispatch(getScreenItemsError(err)));
};

const screenItemsAdd = payload => (dispatch) => {
  dispatch(screenItemsAddHander(payload));
  dispatch(screenItemsUrl());
  replaceLocationHandler();
};

const screenItemsRemove = payload => (dispatch) => {
  dispatch(screenItemsRemoveHander(payload));
  dispatch(screenItemsUrl());
  replaceLocationHandler();
};

export {
  screenItemsAdd,
  screenItemsRemove,
  getScreenItems,
};
