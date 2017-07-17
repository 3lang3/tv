import { cheeseActions } from 'actions';

const initialState = {
  loading: false,
  error: false,
  done: false,
  data: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case cheeseActions.REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        done: false,
        data: {},
      };
    case cheeseActions.OK:
      return {
        ...state,
        loading: false,
        error: false,
        done: true,
        data: action.payload,
      };
    case cheeseActions.ERROR:
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
