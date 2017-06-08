import { bannerActions } from 'actions';

const initialState = {
    index: {},
    items: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case bannerActions.INIT:
            return {
                ...state,
                index: action.payload[0],  
                items: action.payload
            }

        case bannerActions.CHANGE:
            return {
                ...state,
                index: action.payload, 
            }

        default:
            return state;
    }
}