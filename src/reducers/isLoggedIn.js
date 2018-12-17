
const signupReducerDefaultState = [];


//REDUCER
export default (state = signupReducerDefaultState, action) => {
    switch (action.type) {
        case 'IS_LOGGED_IN':
            return {
                isLoggedIn:action.isLoggedIn
            }
        default:
            return state;
    }
}; 
