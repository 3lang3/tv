import { screenItemsActions } from 'actions';

const initialState = {
    loading: false,
    error: false,
    done: false,
    url: '',
    data: [],
};

export default (state = initialState, action) => {
    
    switch (action.type) {
        case screenItemsActions.ADD:
            if(state.data.length == 4) {
                return {
                    ...state
                }
            }else {
                let newState = Object.assign([], state.data);
                let isSame = false;
                
                newState.map(item => {
                    if((item.title == action.payload.title && item.roomId == action.payload.roomId)) return isSame = true;
                })

                if(isSame) {
                    return {
                        ...state
                    }
                }else {
                    return {
                        ...state,
                        data: [
                            ...state.data,
                            action.payload
                        ]
                    }
                }

            }
            
            
        case screenItemsActions.REMOVE:
            return {
                ...state,
                data: state.data.filter(item =>(
                    (item != action.payload)
                ))
            }
        
        case screenItemsActions.REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
                done: false,
                data: {}
            }
            
        case screenItemsActions.OK:
            return {
                ...state,
                loading: false,
                error: false,
                done: true,
                data: action.payload,
            }

        case screenItemsActions.ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                done: false,
            }
        
        case screenItemsActions.URL:
            return {
                ...state,
                url: action.payload,
            }

        default:
            return state;
    }
}