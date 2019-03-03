import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Responsive from 'react-responsive';
import { connect } from 'react-redux';
import { OPEN_MODAL } from '../../actions/entireApp';
import AppModal from './AppModal';
const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

 class EditorOptionsDesktop extends Component {
         constructor(){
             super();
         }
    componentDidMount(){
         
    }
    openModal() {
        this.props.openModal({isModalOpen:true, modalType:'room', customStyles:{
          overlay: {
            backgroundColor: 'none',
          },
          content: {
            top                   : '44%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          height:'80%',
          width:'50%',
          }
        }})
      }
    render() {
        return(<Desktop>
            <div className="editor-options-desktop">
                <div className="display-wrap">
                    <div onClick={this.openModal.bind(this)} className="display-icon" style={{
                        height:'19px',
                        width:'15px',
                        marginRight:'6px',
                        backgroundImage:'url(/images/display.png)',
                        backgroundSize:'15px 19px',
                        backgroundRepeat:'no-repeat'}}></div>
                    <p className="display-text">Display</p>
                </div>
                <div className="draw-wrap">
                    <div className="draw-icon" style={{
                        height:'19px',
                        width:'15px',
                        marginRight:'6px',
                        backgroundImage:'url(/images/draw.png)',
                        backgroundSize:'15px 19px',
                        backgroundRepeat:'no-repeat'}} onClick={()=> {
                            //alert('adassd')
                            let getNodes = document.getElementsByClassName('CodeMirror-sizer')[0].innerText;
                        
                            function replaceAll(str, find, replace) {
                                return str.replace(new RegExp(find, 'g'), replace);
                            }

                            document.getElementsByClassName('CodeMirror-sizer')[0].innerHTML = replaceAll(getNodes, "hello", "yo");
                    // for(let i=0; i < getNodes.length; i++) {
                    //     alert(document.getElementsByClassName('CodeMirror-sizer')[i].getNodes)
                    // }
                        }}></div>
                            <p className="draw-text">Draw</p>
                </div>
                <div className="lock-editor-wrap">
                    <div className="editor-icon" style={{
                        height:'19px',
                        width:'15px',
                        marginRight:'6px',
                        backgroundImage:'url(/images/lock.png)',
                        backgroundSize:'15px 19px',
                        backgroundRepeat:'no-repeat'}}></div>
                <p className="lock-editor-text">Editor</p>
            </div>
        </div>
    </Desktop>)
     }
}

const mapDispatchToProps = (dispatch) => ({
    openModal: (modal) => dispatch(OPEN_MODAL(modal)),

  });
  const ConnectedEditorOptionsDesktop = connect((state) => {
    return {
      state:state
    }
  },mapDispatchToProps)(EditorOptionsDesktop)

export default ConnectedEditorOptionsDesktop;