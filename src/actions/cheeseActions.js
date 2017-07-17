/* global API_HOST */
import fetch from 'isomorphic-fetch';
import config from '../../config';

const API_HOST = `${config.ENDHOST}`;
const url = '/api/cheese';

const REQUEST = 'cheese/REQUEST';
const OK = 'cheese/OK';
const ERROR = 'cheese/ERROR';

export const cheeseActions = {
  REQUEST,
  OK,
  ERROR,
};

const getCheeseRequest = () => ({
  type: REQUEST,
});

const getCheeseOk = payload => ({
  type: OK,
  payload,
});

const getCheeseError = payload => ({
  type: ERROR,
  payload,
});


const getCheese = () => (dispatch) => {
  dispatch(getCheeseRequest());
  return fetch(`${API_HOST}${url}`)
    .then(res => res.json())
    .then(json => dispatch(getCheeseOk(json)))
    .catch(err => dispatch(getCheeseError(err)));
};

export {
  getCheese,
};
