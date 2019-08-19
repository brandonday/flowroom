const filtersReducerDefaultState = {
   openMenu:false
}

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'OPEN_MENU':
        return {    
            openMenu:action.openMenu
        }
  
        default:
            return {...state}
    }
}; 