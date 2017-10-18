import { categoryActions } from 'actions';

const initialState = {
  loading: false,
  error: false,
  done: false,
  data: {},
  platforms: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case categoryActions.REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        done: false,
        data: {},
        platforms: [],
      };

    case categoryActions.OK:
      return {
        ...state,
        loading: false,
        error: false,
        done: true,
        data: action.payload.list.result,
        platforms: action.payload.platforms.result,
      };

    case categoryActions.ERROR:
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
