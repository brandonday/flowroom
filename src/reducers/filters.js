

const filtersReducerDefaultState = {
    text:'',
    sortBy:'date',
    startDate: undefined,
    endDate:undefined
}

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'ROOMS_FILTER_1':
            return {
    all:action.all,
    popular:action.popular,
    picked:action.picked, 
    random:action.random,
    recent:action.recent,
    myrooms:action.myrooms,
    favorited:action.favorited,
    followers:action.followers,
    following:action.following
            }
  
        default:
            return state;
    }
}; 