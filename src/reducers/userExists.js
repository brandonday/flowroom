
export default (state = {}, action) => {
    switch(action.type) {
        case 'USEREXISTS':
        return {
            userExists:action.userExists
        }
        default:
            return state;
    }
}; 


