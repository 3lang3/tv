
const ADD = 'screenItems/ADD';
const REMOVE = 'screenItems/REMOVE';

export const screenItemsActions = {
  ADD,
  REMOVE,
};


const screenItemsAdd = payload => ({
  type: ADD,
  payload,
});

const screenItemsRemove = payload => ({
  type: REMOVE,
  payload,
});

export {
  screenItemsAdd,
  screenItemsRemove,
};
