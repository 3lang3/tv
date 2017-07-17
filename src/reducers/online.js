import { onlineActions } from 'actions';

const initialState = {
  loading: false,
  error: false,
  done: false,
  data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case onlineActions.REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        done: false,
      };
    case onlineActions.OK:
      return {
        ...state,
        loading: false,
        error: false,
        done: true,
        data: action.payload,
      };
    case onlineActions.ERROR:
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
