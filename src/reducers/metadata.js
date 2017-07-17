import { metadataActions } from 'actions';

const initialState = {
  loading: false,
  error: false,
  done: false,
  data: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case metadataActions.REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        done: false,
        data: {},
      };

    case metadataActions.OK:
      return {
        ...state,
        loading: false,
        error: false,
        done: true,
        data: action.payload,
      };

    case metadataActions.ERROR:
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
