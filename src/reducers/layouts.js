import { layoutsActions } from 'actions';

const initialState = {
    width: false,
    open: false,
    chat: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case layoutsActions.WIDTH:
            return {
                ...state,
                width: !state.width
            }
        
        case layoutsActions.OPEN:
            return {
                ...state,
                open: action.payload
            }
        
        case layoutsActions.CHAT:
            return {
                ...state,
                chat: action.payload
            }

        default:
            return state;
    }
}