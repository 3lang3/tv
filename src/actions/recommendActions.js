/* global API_HOST */
import fetch from 'isomorphic-fetch';
import config from '../../config';

const API_HOST = `${config.ENDHOST}`
const url = '/api/recommend';

const REQUEST = 'recommend/REQUEST';
const OK = 'recommend/OK';
const ERROR = 'recommend/ERROR';

export const recommendActions = {
  REQUEST,
  OK,
  ERROR,
};

const getRecommendRequest = () => ({
  type: REQUEST,
});

const getRecommendOk = payload => ({
  type: OK,
  payload,
});

const getRecommendError = payload => ({
  type: ERROR,
  payload,
});


const getRecommend = () => (dispatch) => {
  dispatch(getRecommendRequest());
  
  return fetch(`${API_HOST}${url}`)
    .then(res => res.json())
    .then(json => {
      dispatch(getRecommendOk(json))
    })
    .catch(err => dispatch(getRecommendError(err)));
};

export {
  getRecommend,
};
