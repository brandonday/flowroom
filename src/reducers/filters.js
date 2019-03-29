



export default (state, action) => {
    switch (action.type) {
        case 'ROOMS_FILTER_1':
            return {
                filter:action.filter
            }
  
        default:
            return {
                filter:'weight'
        }
    }
}; 