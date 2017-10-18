/* global API_HOST */
import fetch from 'isomorphic-fetch';
import config from '../../config';

const API_HOST = `${config.ENDHOST}`;
const url = '/api/search?type=all&word=';

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

const getCategorys = ( platform = 'all', name, page = 0) => (dispatch) => {
  dispatch(getCategorysRequest());

  return fetch(`${API_HOST}${url}${name}&platform=${platform}&page=${page}`)
    .then(res => res.json())
    .then(json => dispatch(getCategorysOk(json)))
    .catch(err => dispatch(getCategorysError(err)));
};


const getCategorysMore = ( platform = 'all', name, page = 0) => (dispatch) => {
  return fetch(`${API_HOST}${url}${name}&platform=${platform}&page=${page}`)
    .then(res => res.json())
    .then((json) => {
      dispatch(getCategorysOk(json));
    })
    .catch(err => dispatch(getCategorysError(err)));
}

export {
  getCategorys,
  getCategorysMore,
};
