import { emojiActions } from 'actions';

const initialState = {
  active: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case emojiActions.TOGGLE:
      return {
        ...state,
        active: !state.active,
      };

    default:
      return state;
  }
};
