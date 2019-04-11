export const OPEN_MODAL = ({ isModalOpen = false, modalType, post = true, image = '', isRemix = '', remixRoomID = '', RemixUserName = '', customStyles = {} } = {}) => ({
    type:'OPEN_MODAL',
    isModalOpen,
    modalType,
    post,
    image,
    isRemix,
    remixRoomID,
    RemixUserName,
    customStyles
});
