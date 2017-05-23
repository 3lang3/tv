/* global API_HOST */
import fetch from 'isomorphic-fetch';
import {layoutsOpen} from 'actions';
import config from '../../config';
const API_HOST = `${config.HOST}:3000`
const url = '/api/categorys/';

const REQUEST = 'categorys/REQUEST';
const OK = 'categorys/OK';
const ERROR = 'categorys/ERROR';
const FILTER = 'categorys/FILTER';

export const categorysActions = {
  REQUEST,
  OK,
  ERROR,
  FILTER,
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

const filterCategorys = payload => ({
  type: FILTER,
  payload,
})

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
  filterCategorys
};
