const filtersReducerDefaultState = {
   loadRemix:''
}

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'LOAD_REMIX':
        return {    
            loadRemix:action.loadRemix
        }
  
        default:
            return {...state}
    }
}; 