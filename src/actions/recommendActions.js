/* global API_HOST */
import fetch from 'isomorphic-fetch';
import config from '../../config';

import { initBanner } from 'actions'

const API_HOST = `${config.HOST}:3000`
const url = '/api/recommend';

const REQUEST = 'recommend/REQUEST';
const OK = 'recommend/OK';
const ERROR = 'recommend/ERROR';

const bannerItemsHander = (data) => {
    let results = [];

    for(let key in data) {
            
        let items = data[key];

        if(results.length < 5) results.push(items[0])

    }

    return results;
}

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
      dispatch(initBanner(bannerItemsHander(json)))
      dispatch(getRecommendOk(json))
    })
    .catch(err => dispatch(getRecommendError(err)));
};

export {
  getRecommend,
};
