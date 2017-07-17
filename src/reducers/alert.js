import { alertActions } from 'actions';

const initialState = {
  open: false,
  duration: 4000,
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case alertActions.OPEN:
      return {
        ...state,
        open: true,
        duration: typeof action.payload === 'object' ? action.payload.duration : 4000,
        message: typeof action.payload === 'object' ? action.payload.message : action.payload,
      };

    default:
      return state;
  }
};
