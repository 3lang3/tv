/* global API_HOST */
import fetch from 'isomorphic-fetch';
import config from '../../config';

const API_HOST = `${config.ENDHOST}`;
const url = '/api/search?type=getCategory';

const REQUEST = 'category/REQUEST';
const OK = 'category/OK';
const ERROR = 'category/ERROR';

export const categoryActions = {
  REQUEST,
  OK,
  ERROR,
};

const getCategoryRequest = () => ({
  type: REQUEST,
});

const getCategoryOk = payload => ({
  type: OK,
  payload,
});

const getCategoryError = payload => ({
  type: ERROR,
  payload,
});

const getCategory = () => (dispatch) => {
  dispatch(getCategoryRequest());

  return fetch(`${API_HOST}${url}`)
    .then(res => res.json())
    .then(json => dispatch(getCategoryOk(json)))
    .catch(err => dispatch(getCategoryError(err)));
};

export {
  getCategory,
};
