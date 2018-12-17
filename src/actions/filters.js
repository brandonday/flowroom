
export const roomsFiltersOne = ({ 
    all = false, 
    popular = false, 
    picked = false, 
    random = false,
    recent = false,
    myrooms = false,
    favorited = false,
    followers = false,
    following = false
}) => ({
    type:'ROOMS_FILTER_1',
    all,
    popular, 
    picked, 
    random,
    recent,
    myrooms,
    favorited,
    followers,
    following
});




