const filtersReducerDefaultState = {
   flowAdd:''
}

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'FLOW_ADD':
        return {    
            flowAdd:action.flowAdd
        }
  
        default:
            return {...state}
    }
}; 