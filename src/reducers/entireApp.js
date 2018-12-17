
export default (state = {}, action) => {
    switch(action.type) {
        case 'OPEN_MODAL':
            return {
                isModalOpen:action.isModalOpen,
                modalType:action.modalType,
                customStyles:action.customStyles
            };
        default:
            return state;
    }
}; 