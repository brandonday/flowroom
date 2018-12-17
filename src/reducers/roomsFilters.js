const filtersReducerDefaultState = {
    text:'',
    sortBy:'date',
    startDate: undefined,
    endDate:undefined
}

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'ROOMS_FILTER_2':
        return {    
            all:action.all,
            remixable:action.remixable,
            vr:action.vr,
            ar:action.ar,
            three60:action.three60,
            ai:action.ai,
            desktop:action.desktop,
            tablet:action.tablet,
            mobile:action.mobile,
            developmental:action.developmental,
            production:action.production,
            live:action.live
        }
  
        default:
            return state;
    }
}; 
