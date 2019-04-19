
const roomsReducerDefaultState = [];


//REDUCER
export default (state = roomsReducerDefaultState, action) => {
    switch (action.type) {
        case 'CREATE_ROOM':
            return [
                ...state,
                action.room
            ]
       
        default:
            return state;
    }
}; 
