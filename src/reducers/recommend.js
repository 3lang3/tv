import { recommendActions } from 'actions';

const initialState = {
  pageLoading: false,
  loading: false,
  error: false,
  done: false,
  data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case recommendActions.REQUEST:
      return {
        ...state,
        pageLoading: false,
        loading: true,
        error: false,
        done: false,
        data: [],
      };

    case recommendActions.OK:
      let newList = state.data.concat(action.payload)

      return {
        ...state,
        pageLoading: action.payload.length > 0,
        loading: false,
        error: false,
        done: true,
        data: newList,
      };

    case recommendActions.ERROR:
      return {
        ...state,
        pageLoading: false,
        loading: false,
        error: true,
        done: false,
      };

    default:
      return state;
  }
};
