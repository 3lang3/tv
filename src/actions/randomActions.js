/* global API_HOST */
import fetch from 'isomorphic-fetch';
import config from '../../config';

const API_HOST = `${config.ENDHOST}`;
const url = '/api/random';

const REQUEST = 'random/REQUEST';
const OK = 'random/OK';
const ERROR = 'random/ERROR';


export const randomActions = {
  REQUEST,
  OK,
  ERROR,
};

const getRandomRequest = () => ({
  type: REQUEST,
});

const getRandomOk = payload => ({
  type: OK,
  payload,
});

const getRandomError = payload => ({
  type: ERROR,
  payload,
});


const getRandom = () => (dispatch) => {
  dispatch(getRandomRequest());

  return fetch(`${API_HOST}${url}`)
    .then(res => res.json())
    .then((json) => {
      dispatch(getRandomOk(json));
    })
    .catch(err => dispatch(getRandomError(err)));
};

export {
  getRandom,
};
