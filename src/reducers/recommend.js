import { recommendActions } from 'actions';

const initialState = {
  loading: false,
  error: false,
  done: false,
  data: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case recommendActions.REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        done: false,
        data: {},
      };

    case recommendActions.OK:
      return {
        ...state,
        loading: false,
        error: false,
        done: true,
        data: action.payload,
      };

    case recommendActions.ERROR:
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
