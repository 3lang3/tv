/* global API_HOST */
import fetch from 'isomorphic-fetch';
import {layoutsOpen} from 'actions';

const API_HOST = 'http://localhost:3000'
const url = '/api/categorys/';

const REQUEST = 'categorys/REQUEST';
const OK = 'categorys/OK';
const ERROR = 'categorys/ERROR';

export const categorysActions = {
  REQUEST,
  OK,
  ERROR,
};

const getCategorysRequest = () => ({
  type: REQUEST,
});

const getCategorysOk = payload => ({
  type: OK,
  payload,
});

const getCategorysError = payload => ({
  type: ERROR,
  payload,
});

const getCategorys = (name) => (dispatch) => {
  dispatch(getCategorysRequest());
  dispatch(layoutsOpen(true))
  return fetch(`${API_HOST}${url}${name}`)
    .then(res => res.json())
    .then(json => dispatch(getCategorysOk(json)))
    .catch(err => dispatch(getCategorysError(err)));
};

export {
  getCategorys,
};
