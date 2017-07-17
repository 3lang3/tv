import { favoriteActions } from 'actions';

const initialState = {
  data: JSON.parse(localStorage.getItem('favoriteList')) || [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case favoriteActions.ADD:

      const addItem = action.payload;
      const newLocalStorage = Object.assign([], state.data);

      newLocalStorage.push(addItem);

      localStorage.setItem('favoriteList', JSON.stringify(newLocalStorage));

      return {
        ...state,
        data: newLocalStorage,
      };

    case favoriteActions.REMOVE:

      const removeItem = action.payload;
      const nowLocalStorage = state.data.filter(item => item.anchor !== removeItem.anchor || item.roomId !== removeItem.roomId);

      localStorage.setItem('favoriteList', JSON.stringify(nowLocalStorage));

      return {
        ...state,
        data: nowLocalStorage,
      };

    default:
      return state;
  }
};
