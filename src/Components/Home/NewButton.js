import React, { Component } from 'react';
import '../styles/stylesheet.css';
import { Link } from 'react-router-dom';
import AppModal from './AppModal';
import { OPEN_MODAL } from '../../actions/entireApp';
import { connect } from 'react-redux';




class NewButton extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    newclicked(){

        // if(document.getElementById('newbtn').style.display !== 'block') {
        //     document.getElementById('newbtn').style.display = 'block';
        //     document.getElementById('new-button-dropdown').style.backgroundColor = '#0A7F29';
        // } else {
        //     document.getElementById('newbtn').style.display = 'none';
        //     document.getElementById('new-button-dropdown').style.backgroundColor = 'transparent';
        // }
        this.props.openModal({isModalOpen:true, modalType:'create', customStyles:{
            overlay: {
              backgroundColor:'transparent'
            },
            content: {
              color: 'lightsteelblue',
              backgroundColor:'white',
              height:'100%',
              width:'100%',
              marginLeft:'auto',
              marginRight:'auto',
              borderRadius:0, 
              padding:0,
              top:0,
              left:0,
              bottom:0,
              opacity:0.5,
              border:0
            }
          }})
    
    }
    
    openModal() {
       
      }
    render() {
    return  (
        <div style={{position:'relative'}}>
            <div onClick={this.newclicked.bind(this)} id="new-button-dropdown" className="new-button-dropdown">
                <div className="new-btn">
                    <button className="new-button">
                        <span className="plus-3x"></span>
                            Create
                    </button>
                </div>
                <div id="newbtn" className="new-button-dropdown-content">
                    <a href="#" className="new-button-dropdown-sel-room">
                        <div  className="hoverdrop">
                           
                        </div>
                    </a>
                    <a href="#" className="new-button-dropdown-sel-room">
                        <div className="hoverdrop">
                            <Link to="/community">
                                <div className="drop-menu-wrap">
                                    <p className="drop-menu-newroom">New Community</p>
                                </div>
                            </Link>
                        </div>
                    </a>
                </div>
            </div>
            <AppModal/>
        </div>
    )
}
}

const mapDispatchToProps = (dispatch) => ({
    openModal: (modal) => dispatch(OPEN_MODAL(modal))
});


const ConnectedNewButton = connect(undefined, mapDispatchToProps)(NewButton)

export default ConnectedNewButton;
