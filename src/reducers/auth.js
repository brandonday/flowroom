
export default (state = {}, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                uid: action.uid
            };
        case 'LOGOUT':
            return {}
        case 'USERSTORE':
            return {
                username:action.username,
                pic:action.pic
            }
        case 'USERPATHNAME':
            return {
                usernamePath:action.usernamePath,
                usernameAuth:action.usernameAuth
            }
        default:
            return state;
    }
}; 