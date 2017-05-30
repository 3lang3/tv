import { favoriteActions } from 'actions';

const initialState = {
    data: JSON.parse(localStorage.getItem('favoriteList')) || [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case favoriteActions.ADD:

            let addItem = action.payload;
            let newLocalStorage = Object.assign([], state.data);

            newLocalStorage.push(addItem);

            localStorage.setItem('favoriteList', JSON.stringify(newLocalStorage));

            return {
                ...state,
                data: newLocalStorage,
            }

        case favoriteActions.REMOVE:

            let removeItem = action.payload;
            let _newLocalStorage = state.data.filter( item => item.anchor != removeItem.anchor || item.roomId != removeItem.roomId );
            
            localStorage.setItem('favoriteList', JSON.stringify(_newLocalStorage));

            return {
                ...state,
                data: _newLocalStorage,
            }

        default:
            return state;
    }
}