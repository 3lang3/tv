import { searchActions } from 'actions';

const initialState = {
  loading: false,
  error: false,
  done: false,
  data: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case searchActions.REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        done: false,
        data: {},
      };
    case searchActions.OK:
      return {
        ...state,
        loading: false,
        error: false,
        done: true,
        data: action.payload,
      };
    case searchActions.ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        done: false,
      };
    default:
      return state;
  }
};
