/* global API_HOST */
import fetch from 'isomorphic-fetch';
import config from '../../config';

const API_HOST = `${config.ENDHOST}`;
const url = '/api/search?type=keyword&word=';

const REQUEST = 'search/REQUEST';
const OK = 'search/OK';
const ERROR = 'search/ERROR';

export const searchActions = {
  REQUEST,
  OK,
  ERROR,
};

const getSearchRequest = () => ({
  type: REQUEST,
});

const getSearchOk = payload => ({
  type: OK,
  payload,
});

const getSearchError = payload => ({
  type: ERROR,
  payload,
});


const getSearch = keyword => (dispatch) => {
  dispatch(getSearchRequest());
  return fetch(`${API_HOST}${url}${keyword}`)
    .then(res => res.json())
    .then(json => dispatch(getSearchOk(json)))
    .catch(err => dispatch(getSearchError(err)));
};

export {
  getSearch,
};
