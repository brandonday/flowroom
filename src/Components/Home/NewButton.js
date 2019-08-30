import React, { Component } from 'react';
import '../styles/stylesheet.css';
import { Link } from 'react-router-dom';
import AppModal from './AppModal';
import { OPEN_MODAL } from '../../actions/entireApp';
import { connect } from 'react-redux';
import {openMenu} from '../../actions/openMenu';
import createHistory from 'history/createBrowserHistory';



class NewButton extends Component {
    constructor() {
        super();
        this.state = {
            showMenu:false,
            isMobile:false
        }
    }
    componentWillReceiveProps() {
        
    }
    componentDidMount() {
        let that = this;
        function myFunction(x) {
            if (x.matches) { // If media query matches
              that.setState({isMobile:true})
            } else {
              that.setState({isMobile:false})

            }
          }
          
          var x = window.matchMedia("(max-width: 698px)")
          myFunction(x) // Call listener function at run time
          x.addListener(myFunction) 
    }
    newclicked(){
        
        // if(document.getElementById('newbtn').style.display !== 'block') {
        //     document.getElementById('newbtn').style.display = 'block';
        //     document.getElementById('new-button-dropdown').style.backgroundColor = '#0A7F29';
        // } else {
        //     document.getElementById('newbtn').style.display = 'none';
        //     document.getElementById('new-button-dropdown').style.backgroundColor = 'transparent';
        // }
        // this.props.openModal({isModalOpen:true, modalType:'create', customStyles:{
        //     overlay: {
        //       backgroundColor:'transparent'
        //     },
        //     content: {
        //       color: 'lightsteelblue',
        //       backgroundColor:'white',
        //       height:'100%',
        //       width:'100%',
        //       marginLeft:'auto',
        //       marginRight:'auto',
        //       borderRadius:0, 
        //       padding:0,
        //       top:0,
        //       left:0,
        //       bottom:0,
        //       opacity:0.5,
        //       border:0
        //     }
        //   }})
        // let modal = document.getElementById('default-modal');
        // modal.style.display = 'block';
        // modal.style.top = '80px';
       
        if(this.props.state.openMenu.openMenu !== true) {
            this.props.openMenu({openMenu:true});
            document.getElementById("default-modal").style.display = 'block'
            document.getElementById("default-modal").style.top = '80px'

        } else {
            this.props.openMenu({openMenu:false});
            document.getElementById("default-modal").style.display = 'none'
            document.getElementById("default-modal").style.top = '80px'

        }
        
     


        
    }

    openModal() {
       
      }
    
    render() {
    return  (
        <div style={{position:'relative'}}>
            <div onClick={this.newclicked.bind(this)} id="new-button-dropdown" className="new-button-dropdown">
                <div className="new-btn">
                {this.props.state.openMenu.openMenu ? (<i className="fa fa-minus" style={{
                                mozSsxFontSmoothing:'grayscale',

                                webkitFontSmoothing:'antialiased',
                                
                                display: 'inline-block',
                                
                                fontStyle: 'normal',
                                
                                fontVariant:'normal',
                                
                                textRendering:'auto',
                                
                                lineHeight:0,
                                
                                fontSize:this.state.isMobile? '10px':'18px',
                                position:'absolute',
                                color:'#40FFE8',
                                marginLeft:this.state.isMobile? 8: 10

                            }}></i>):(<i className="fa fa-plus" style={{
                                mozSsxFontSmoothing:'grayscale',

                                webkitFontSmoothing:'antialiased',
                                
                                display: 'inline-block',
                                
                                fontStyle: 'normal',
                                
                                fontVariant:'normal',
                                
                                textRendering:'auto',
                                
                                lineHeight:0,
                                
                                fontSize:this.state.isMobile ? '10px':'18px',
                                position:'absolute',
                                color:'#40FFE8',
                                marginLeft:this.state.isMobile? 8: 10
                            }}></i>)}
                            <p style={{fontSize:this.state.isMobile? '10px':'14px',
                                     fontWeight:'700',
                                     position:'relative', 
                                     marginLeft:6,
                                     position:'absolute',
                                     color:'#40FFE8',
                                     marginLeft:this.state.isMobile? 21 : 32
                                   }}>CREATE</p>
                    <button style={{
                            fontWeight:'bold',
                            color: 'rgb(64, 255, 232)',
                            fontSize:'13px',
                            backgroundColor:'transparent',
                            border: '1px solid rgb(64, 255, 232)',
                            borderRadius:'4px',
                            paddingRight:'3px',
                            position:'relative',
                            display:'flex',
                            padding:'5px 7px',
                            alignItems:'center',
                            justifyContent:'space-between',
                            outline:'none',
                            border:'2px solid #40FFE8',
                            borderRadius:'5px',
                            opacity:'0.7',
                            width:this.state.isMobile? '70px':'95px',
                            height:this.state.isMobile? '26px':'35px'
                        
                            }}>
    
                    </button>
                </div>
                <div id="newbtn" className="new-button-dropdown-content">
                    <a href="#" className="new-button-dropdown-sel-room">
                        <div  className="hoverdrop">
                           
                        </div>
                    </a>
                    <a href="#" className="new-button-dropdown-sel-room">
                        <div className="hoverdrop">
                      
                                <div className="drop-menu-wrap">
                                    <p className="drop-menu-newroom">New Community</p>
                                </div>
                           
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
    openMenu: (bool) => dispatch(openMenu(bool))
});

const mapStateToProps = (state) => {
    return {
        state:state
    }
}

const ConnectedNewButton = connect(mapStateToProps, mapDispatchToProps)(NewButton)

export default ConnectedNewButton;
