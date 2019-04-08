
export default (state = {}, action) => {
    switch(action.type) {
        case 'OPEN_MODAL':
            return {
                isModalOpen:action.isModalOpen,
                modalType:action.modalType,
                post:action.post,
                image:action.image,
                customStyles:action.customStyles
            };
        default:
            return state;
    }
}; 