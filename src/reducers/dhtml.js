
const roomsReducerDefaultState = [];


//REDUCER
export default (state = roomsReducerDefaultState, action) => {
    switch (action.type) {
        case 'SAVE_DHTML':
            return {
                ...state,
                dhtml:{html:action.html,
                css:action.css,
                js:action.js}
                }
        default:
            return state;
    }
}; 
