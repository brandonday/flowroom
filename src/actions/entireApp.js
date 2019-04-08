export const OPEN_MODAL = ({ isModalOpen = false, modalType, post = true, image = '', customStyles = {} } = {}) => ({
    type:'OPEN_MODAL',
    isModalOpen,
    modalType,
    post,
    image,
    customStyles
});
