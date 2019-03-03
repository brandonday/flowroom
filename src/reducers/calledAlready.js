
export default (state = {}, action) => {
    switch(action.type) {
        case 'CALLED_ALREADY':
            return {
                calledAlready:action.calledAlready
            };
        default:
            return state;
    }
}; 