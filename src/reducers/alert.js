import { alertActions } from 'actions';

const initialState = {
    open: false,
    message: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case alertActions.OPEN:
            return {
                ...state,
                open: true,
                message: action.payload,
            }

        default:
            return state;
    }
}