import { screenItemsActions } from 'actions';

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case screenItemsActions.ADD:
            if(state.length == 4) {
                return [
                    ...state,
                ]
            }else {
                let newState = Object.assign([], state);
                let isSame = false;
                
                newState.map(item => {
                    if((item.title == action.payload.title && item.roomId == action.payload.roomId)) return isSame = true;
                })

                if(isSame) {
                    return [
                        ...state,
                    ]
                }else {
                    return [
                        ...state,
                        action.payload
                    ]
                }
                
            }
            
            
        case screenItemsActions.REMOVE:
            return state.filter(item =>(
                    (item != action.payload)
                ))
            
        default:
            return state;
    }
}