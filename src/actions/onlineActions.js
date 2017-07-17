/* global API_HOST */
import fetch from 'isomorphic-fetch';
import config from '../../config';

const API_HOST = `${config.ENDHOST}`;
const url = '/api/online';

const REQUEST = 'online/REQUEST';
const OK = 'online/OK';
const ERROR = 'online/ERROR';

export const onlineActions = {
  REQUEST,
  OK,
  ERROR,
};

const getOnlineRequest = () => ({
  type: REQUEST,
});

const getOnlineOk = payload => ({
  type: OK,
  payload,
});

const getOnlineError = payload => ({
  type: ERROR,
  payload,
});


const getOnline = data => (dispatch) => {
  dispatch(getOnlineRequest());

  const form = new FormData();
  form.append('json', JSON.stringify(data));

  return fetch(`${API_HOST}${url}`, {
    method: 'POST',
    body: form,
  })
    .then(res => res.json())
    .then(json => dispatch(getOnlineOk(json)))
    .catch(err => dispatch(getOnlineError(err)));
};

export {
  getOnline,
};
