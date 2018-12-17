
const roomsReducerDefaultState = [];


//REDUCER
export default (state = roomsReducerDefaultState, action) => {
    switch (action.type) {
        case 'CREATE_ROOM':
            return [
                ...state,
                action.room
            ]
        case 'REMOVE_ROOM':
            return state.filter(({id}) => id !== action.id)
        case 'EDIT_ROOM':
            return state.map((room) => {
                if(room.id === action.id) {
                    return {
                        ...room,
                        ...action.updates
                    }
                }
            })
        default:
            return state;
    }
}; 
