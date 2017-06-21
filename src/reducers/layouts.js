import { layoutsActions } from 'actions';

const initialState = {
    width: false,
    open: false,
    chat: true,
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
                chat: action.payload || !state.chat
            }

        default:
            return state;
    }
}