export const OPEN_MODAL = ({ isModalOpen = false, modalType, post = true, customStyles = {} } = {}) => ({
    type:'OPEN_MODAL',
    isModalOpen,
    modalType,
    post,
    customStyles
});
