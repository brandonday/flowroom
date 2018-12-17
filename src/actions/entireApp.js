export const OPEN_MODAL = ({ isModalOpen = false, modalType, customStyles = {} } = {}) => ({
    type:'OPEN_MODAL',
    isModalOpen,
    modalType,
    customStyles
});
