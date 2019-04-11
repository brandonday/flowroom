
export default (state = {}, action) => {
    switch(action.type) {
        case 'OPEN_MODAL':
            return {
                isModalOpen:action.isModalOpen,
                modalType:action.modalType,
                post:action.post,
                image:action.image,
                isRemix:action.isRemix,
                remixRoomID:action.remixRoomID, 
                RemixUserName:action.RemixUserName,
                customStyles:action.customStyles
            };
        default:
            return state;
    }
}; 