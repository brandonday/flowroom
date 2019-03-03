
export default (state = {}, action) => {
    switch(action.type) {
        case 'UPDATE_EDITOR':
            return {
                before:action.before,
                updateHTML:action.updateHTML,
                updateCSS:action.updateCSS,
                updateJS:action.updateJS
            };
        default:
            return state;
    }
}; 