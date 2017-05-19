import { layoutsActions } from 'actions';

const initialState = {
    width: false,
    open: true,
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
                chat: !state.chat
            }

        default:
            return state;
    }
}