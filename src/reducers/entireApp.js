
export default (state = {}, action) => {
    switch(action.type) {
        case 'OPEN_MODAL':
            return {
                isModalOpen:action.isModalOpen,
                modalType:action.modalType,
                post:action.post,
                customStyles:action.customStyles
            };
        default:
            return state;
    }
}; 