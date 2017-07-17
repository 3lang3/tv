/* global API_HOST */
import fetch from 'isomorphic-fetch';
import config from '../../config';

const API_HOST = `${config.ENDHOST}`;
const url = '/api/invite/';

const REQUEST = 'invite/REQUEST';
const OK = 'invite/OK';
const ERROR = 'invite/ERROR';

export const inviteActions = {
  REQUEST,
  OK,
  ERROR,
};

const getInviteRequest = () => ({
  type: REQUEST,
});

const getInviteyOk = payload => ({
  type: OK,
  payload,
});

const getInviteError = payload => ({
  type: ERROR,
  payload,
});

const getInvite = code => (dispatch) => {
  dispatch(getInviteRequest());
  return fetch(`${API_HOST}${url}${code}`)
    .then(res => res.json())
    .then(json => dispatch(getInviteyOk(json)))
    .catch(err => dispatch(getInviteError(err)));
};

export {
  getInvite,
};
