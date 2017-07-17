import { screensActions } from 'actions';

const initialState = {
  roomId: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case screensActions.OK:
      return {
        ...state,
        roomId: action.payload,
      };
    default:
      return state;
  }
};
