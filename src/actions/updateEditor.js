export const updateEditor = (before, updateHTML, updateCSS, updateJS) => ({
    type:'UPDATE_EDITOR',
    before:before,
    updateHTML:updateHTML,
    updateCSS:updateCSS,
    updateJS:updateJS
});

export const calledAlready = (bool) => ({
    type:'CALLED_ALREADY',
    calledAlready:bool
});