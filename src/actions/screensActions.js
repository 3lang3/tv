/* global API_HOST */

const OK = 'screens/OK';

export const screensActions = {
  OK,
};

const screensActive = payload => ({
  type: OK,
  payload,
});

export {
  screensActive,
};
