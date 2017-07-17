const ADD = 'favorite/ADD';
const REMOVE = 'favorite/REMOVE';

export const favoriteActions = {
  ADD,
  REMOVE,
};

const addFavorite = payload => ({
  type: ADD,
  payload,
});

const removeFavorite = payload => ({
  type: REMOVE,
  payload,
});


export {
  addFavorite,
  removeFavorite,
};
