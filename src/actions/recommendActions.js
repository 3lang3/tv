/* global API_HOST */
import fetch from 'isomorphic-fetch';
import config from '../../config';

const API_HOST = `${config.ENDHOST}`;
const url = '/api/search?type=all';

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

const getRecommend = (platform = 'all', word = 'all') => (dispatch) => {
  dispatch(getRecommendRequest());

  return fetch(`${API_HOST}${url}&platform=${platform}&word=${word}&page=0`)
    .then(res => res.json())
    .then((json) => {
      dispatch(getRecommendOk(json));
    })
    .catch(err => dispatch(getRecommendError(err)));
};

const getRecommendMore = (platform = 'all', word = 'all', page = 0) => (dispatch) => {
  
  return fetch(`${API_HOST}${url}&platform=${platform}&word=${word}&page=${page}`)
    .then(res => res.json())
    .then((json) => {
      dispatch(getRecommendOk(json));
    })
    .catch(err => dispatch(getRecommendError(err)));
}

export {
  getRecommend,
  getRecommendMore,
};
