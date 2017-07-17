import { categorysActions } from 'actions';

const initialState = {
  loading: false,
  error: false,
  done: false,
  data: {},
  filter: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case categorysActions.REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        done: false,
        data: {},
      };
    case categorysActions.OK:
      return {
        ...state,
        loading: false,
        error: false,
        done: true,
        data: action.payload,
      };
    case categorysActions.ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        done: false,
      };
    case categorysActions.FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};
