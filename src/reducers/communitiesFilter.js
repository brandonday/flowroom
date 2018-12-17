const filtersReducerDefaultState = {
    text:'',
    sortBy:'date',
    startDate: undefined,
    endDate:undefined
}

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'ROOMS_FILTER_3':
        return {    
            communitySelected:action.communitySelected
        }
  
        default:
            return state;
    }
}; 