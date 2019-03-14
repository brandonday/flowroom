import React, { Component } from 'react';
import '../styles/stylesheet.css';
import { connect } from 'react-redux';
import { OPEN_MODAL } from '../../actions/entireApp';

 class MessageIcon extends Component {
    constructor() {
      super();
      this.openModal = this.openModal.bind(this)
    }
    openModal() {
      
      this.props.openModal({isModalOpen:true, modalType:'message', customStyles:{
        overlay: {
          backgroundColor:'transparent',
        },
        content: {
          color: 'lightsteelblue',
          backgroundColor:'white',
          height:'50%',
          width:'79%',
          right:'0px',
          top:'30px',
          left:'0px',
          bottom:'0px',
          marginLeft:'auto',
          marginRight:'auto',
          borderRadius:10, 
          padding:0
        }
      }})
    }
    render() {
      return (
        <div onClick={this.openModal} className="message-icon">
          <div className="mail-3x"></div>
        </div>
      )
    }
 }

const mapDispatchToProps = (dispatch) => ({
    openModal: (modal) => dispatch(OPEN_MODAL(modal))
});
const ConnectedMessageIcon = connect(undefined, mapDispatchToProps)(MessageIcon);
export default ConnectedMessageIcon;