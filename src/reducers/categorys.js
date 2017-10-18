import { categorysActions } from 'actions';

const initialState = {
  loading: false,
  pageLoading: false,
  error: false,
  done: false,
  data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case categorysActions.REQUEST:
      return {
        ...state,
        loading: true,
        pageLoading: false,
        error: false,
        done: false,
        data: [],
      };
    case categorysActions.OK:
      let newList = state.data.concat(action.payload);

      return {
        ...state,
        loading: false,
        pageLoading: action.payload.length > 0,
        error: false,
        done: true,
        data: newList,
      };
    case categorysActions.ERROR:
      return {
        ...state,
        loading: false,
        pageLoading: false,
        error: true,
        done: false,
      };

    default:
      return state;
  }
};
