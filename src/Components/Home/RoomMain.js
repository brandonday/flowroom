import React, { Component } from 'react';
import { Resizable, ResizableBox } from 'react-resizable';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import * as CodeMirror from 'codemirror';
import Comments from './RoomComponents/Comments.js';
import RoomPosts from './RoomPosts.js';
import RelatedRooms from './RoomPosts.js';
import Editor from './Editor.js';
import Responsive from 'react-responsive';
import EditorOptionsDesktop from './EditorOptionsDesktop.js';
import EditorOptionsTablet from './EditorOptionsTablet.js';
import { OPEN_MODAL } from '../../actions/entireApp';
import { connect } from 'react-redux';
import { firebase } from '../firebase/firebase';
// import ImageEdit from './ImageEdit.js';

import ImageEdit from './ImageEdit.js';


const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;


const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;
 

class RoomMain extends Component {
    constructor() {
        super();
        this.state = {
           descriptionText:'',
           modalIsOpen:true,
           details:false,
           objects:false,
           comments:false,
           draw:false,
           remix:false,
           preferences:false,
           record:false
        };
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    componentDidMount() {
     
    
        const targetElement = document.querySelector("#room-main-page");
        disableBodyScroll(targetElement);

        if(window.location.pathname === '/room/spacegame') {
            this.setState({descriptionText:'A simple remixable space game I made'});
        } else if (window.location.pathname === '/room/slider') {
            this.setState({descriptionText:'A slider showing before and after'});
        }

        let that = this;
        var parts = window.location.pathname.split('/');
        var lastSegment = parts.pop() || parts.pop();  // handle potential trailing slash


        firebase.database().ref(`/rooms/${lastSegment}`).once('value').then(function(snapshot) {
            if(snapshot.val() !== null) {
              
              //console.log(snapshot.val())
              let uid = snapshot.val().uid;
             
              //console.log(firebase.auth())
              if(firebase.auth().currentUser !== null) {
                let currentUser = firebase.auth().currentUser.uid;
                //alert(currentUser)
                
                if(currentUser === uid) {
                  //alert('the same');
                  console.log(that.state.saveVisible)
                  that.setState({display:'flex'})
                  
                } else {
                  //alert('not');
                  that.setState({saveVisible:'block'});
                  that.setState({postVisible:'block'});
                  that.setState({remixVisible:'block'});
                }
              } else {
                  that.setState({saveVisible:'block'});
                  that.setState({postVisible:'block'});
                  that.setState({remixVisible:'block'});
              }
            } else {
              //alert('not');
                that.setState({saveVisible:'block'});
                that.setState({postVisible:'block'});
                that.setState({remixVisible:'block'});
              
      
            } 
        
        }).catch((error) => {
          console.log(error)
        });
        
        
        
    }

    
      afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
      }
    
      closeModal() {
        this.setState({modalIsOpen: false});
      }
    tabDetailsClicked() {
        document.getElementById('details').className = 'details-sel-3x'; 
        document.getElementById('details-text').className = 'details-text-selected';   
        
        document.getElementById('rooms').className = 'rooms-3x'; 
        document.getElementById('rooms-text').className = 'rooms-text';  

        document.getElementById('comments').className = 'comments-3x'; 
        document.getElementById('comments-text').className = 'comments-text'; 
    }
    tabRoomsClicked() {
        document.getElementById('rooms').className = 'rooms-sel-3x'; 
        document.getElementById('rooms-text').className = 'rooms-text-selected';    

        document.getElementById('details').className = 'details-3x'; 
        document.getElementById('details-text').className = 'details-text'; 

        document.getElementById('comments').className = 'comments-3x'; 
        document.getElementById('comments-text').className = 'comments-text'; 
    }
    tabCommentsClicked() {
        document.getElementById('comments').className = 'comments-sel-3x'; 
        document.getElementById('comments-text').className = 'comments-text-selected';    

        document.getElementById('rooms').className = 'rooms-3x'; 
        document.getElementById('rooms-text').className = 'rooms-text';    

        document.getElementById('details').className = 'details-3x'; 
        document.getElementById('details-text').className = 'details-text'; 
    }
    openModal() {
        this.props.openModal({isModalOpen:true, modalType:'room', customStyles:{
          overlay: {
            backgroundColor: 'none',
          },
          content: {
          top                   : '0%',
          left                  : '0%',
          right                 : '0',
          bottom                : 'auto',
          marginRight           : '0%',
          transform             : 'translate(-50%, -50%)',
          height:'100%',
          width:'100%',
          }
        }})
      }

    menuSelect() {
        if(this.state.details === true) {
            return (<p>jkjkkj</p>)
        } else if(this.state.objects === true) {
            return (<p>object</p>)
        } else if(this.state.comments === true) {
            return (<Comments />)
        } else if(this.state.draw === true) {
            return (<p>draw</p>)
        } else if(this.state.remix === true) {
            
            return (
                <ImageEdit/>
)
        } else if(this.state.preferences === true) {
            return (<p>preferences</p>)
        } else if(this.state.record === true) {
            return (<p>record</p>)
        }
     }
    render() {
        return (<div id="room-main-page" className="page-wrap twilight room-main-page-wrap">
            <div style={{display:'flex',flexDirection:'column', height:'100%',width:'100%'}}>
                <div style={{display:'flex',flex:1}}>
                    <div style={{
                        width:'60px', 
                        background:'#202020'
                    }}>
                         <div id="details" onClick={()=> {
                            let detailsid = document.getElementById('details');
                            detailsid.className = 'menubg';
                            detailsid.style.borderRight = '0px solid #181818';
                            let getclasses = document.getElementsByClassName('menubg');
                            this.setState({details:true, objects:false, comments:false, draw:false, 
                            remix:false, 
                            preferences:false,
                            record:false});
                            document.getElementById('main-menu').style.display = 'flex';
       
                            for(let i=0; i < getclasses.length; i++) {
                                if(getclasses[i].id !== 'details') {
                                    getclasses[i].style.borderRight = '1px solid #181818';
                                    getclasses[i].className = '';
                        
                                }
                            }

                        }} style={{
                            height:'55px',
                            width:'59px',
                            display:'flex',
                            flexDirection:'column',
                            justifyContent:'center',
                            alignItems:'center',
                            borderRight:'1px solid #181818',
                            borderBottom:'1px solid #181818'}} className="menu-bg-border">
                                <div id="details-icon" className="details-3x"></div>
                                    <p id="details-text" className="details-text">Details</p>
                                </div>
                                <div id="objects" onClick={()=> {
                                    let objectsid = document.getElementById('objects');
                                    objectsid.className = 'menubg';
                                    objectsid.style.borderRight = '0px solid #181818';
                                    document.getElementById('objects').className = 'menubg'
                                    let getclasses = document.getElementsByClassName('menubg');
                                    this.setState({details:false,
                                        objects:true,
                                        comments:false,
                                        draw:false,
                                        remix:false,
                                        preferences:false,
                                        record:false
                                    });
                                    document.getElementById('main-menu').style.display = 'flex';
                                    for(let i=0; i < getclasses.length; i++) {
                                        if(getclasses[i].id !== 'objects') {
                                            getclasses[i].style.borderRight = '1px solid #181818';
                                            getclasses[i].className = '';
                        

                                        }
                                    }
                             }} style={{height:'55px',width:'59px',display:'flex',
                                    flexDirection:'column',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    borderRight:'1px solid #181818',
                                    borderBottom:'1px solid #181818'}} className="menu-bg-border">
                                        <div id="objects-icon" className="rooms-3x"></div>
                                            <p id="details-text" className="details-text">Objects</p>
                                        </div>
                                        <div id="comments" onClick={()=> {
           
                                            let commentsid = document.getElementById('comments');
                                            commentsid.className = 'menubg';
                                            commentsid.style.borderRight = '0px solid #181818';
                                            let getclasses = document.getElementsByClassName('menubg');
                                            this.setState({
                                                details:false,
                                                objects:false,
                                                comments:true,
                                                draw:false,
                                                remix:false,
                                                preferences:false,
                                                record:false
                                            });
                                            document.getElementById('main-menu').style.display = 'flex';
                                            for(let i=0; i < getclasses.length; i++) {
                                                if(getclasses[i].id !== 'comments') {
                                                    getclasses[i].style.borderRight = '1px solid #181818';
                                                    getclasses[i].className = '';
                        
                                                }
                                            }
                                        }} style={{
                                            height:'55px',
                                            width:'59px',
                                            display:'flex',
                                            flexDirection:'column',
                                            justifyContent:'center',
                                            alignItems:'center',
                                            borderRight:'1px solid #181818',
                                            borderBottom:'1px solid #181818'}} className="menu-bg-border">
                                                <div id="comments-icon" className="comments-3x"></div>
                                                    <p id="details-text" className="details-text">Comments</p>
                                    </div>
             <div id="draw" onClick={()=> {
                let drawid = document.getElementById('draw');
                drawid.className = 'menubg';
                drawid.style.borderRight = '0px solid #181818';
                let getclasses = document.getElementsByClassName('menubg');
                this.setState({details:false,
                    objects:false,
                    comments:false,
                    draw:true,
                    remix:false,
                    preferences:false,
                    record:false});
                    document.getElementById('main-menu').style.display = 'flex';

                for(let i=0; i < getclasses.length; i++) {
                    if(getclasses[i].id !== 'draw') {
                        getclasses[i].style.borderRight = '1px solid #181818';
                        getclasses[i].className = '';
                        


                    }
                }
            }} style={{height:'55px',width:'59px',display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            borderRight:'1px solid #181818',
            borderBottom:'1px solid #181818'}} className="menu-bg-border">
            <div id="draw-icon" className="draw-3x"></div>
                <p id="details-text" className="details-text">Draw</p>
            </div>
            <div id="remix" onClick={()=> {
                let remixid = document.getElementById('remix');
                remixid.className = 'menubg';
                remixid.style.borderRight = '0px solid #181818';
                let getclasses = document.getElementsByClassName('menubg');
                this.setState({details:false,
                    objects:false,
                    comments:false,
                    draw:false,
                    remix:true,
                    preferences:false,
                    record:false});
                    document.getElementById('main-menu').style.display = 'flex';

                for(let i=0; i < getclasses.length; i++) {
                    if(getclasses[i].id !== 'remix') {
                        getclasses[i].style.borderRight = '1px solid #181818';
                        getclasses[i].className = '';
                    }
                }
            }} style={{height:'55px',width:'59px',display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            borderRight:'1px solid #181818',
            borderBottom:'1px solid #181818'}} className="menu-bg-border">
            <div id="remix-icon" className="details-3x"></div>
                <p id="details-text" className="details-text">Remix</p>
            </div>
            <div id="preferences" onClick={()=> {
                let preferencesid = document.getElementById('preferences');
                preferencesid.className = 'menubg';
                preferencesid.style.borderRight = '0px solid #181818';
                document.getElementById('preferences').className = 'menubg'
                let getclasses = document.getElementsByClassName('menubg');
                this.setState({details:true,
                    objects:false,
                    comments:false,
                    draw:false,
                    remix:false,
                    preferences:true,
                    record:false});
                    document.getElementById('main-menu').style.display = 'flex';

                for(let i=0; i < getclasses.length; i++) {
                    if(getclasses[i].id !== 'preferences') {
                        getclasses[i].style.borderRight = '1px solid #181818';
                        getclasses[i].className = '';
                    }
                }
            }} style={{height:'55px',width:'59px',display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            borderRight:'1px solid #181818',
            borderBottom:'1px solid #181818'}} className="menu-bg-border">
            <div id="preferences-icon" className="details-3x"></div>
                <p id="details-text" className="details-text">Preferences</p>
            </div>
            <div id="record" onClick={()=> {
                let recordid = document.getElementById('record');
                recordid.className = 'menubg';
                recordid.style.borderRight = '0px solid #181818';
             
                let getclasses = document.getElementsByClassName('menubg');
                this.setState({details:true,
                    objects:false,
                    comments:false,
                    draw:false,
                    remix:false,
                    preferences:false,
                    record:true});
                    document.getElementById('main-menu').style.display = 'flex';

                for(let i=0; i < getclasses.length; i++) {
                    if(getclasses[i].id !== 'record') {
                        getclasses[i].style.borderRight = '1px solid #181818';
                        getclasses[i].className = '';
                    }
                }
            }} style={{height:'55px',width:'59px',display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            borderRight:'1px solid #181818',
            borderBottom:'1px solid #181818'}} className="menu-bg-border">
            <div id="record-icon" className="details-3x"></div>
                <p id="details-text" className="details-text">Record</p>
            </div>
            </div>
            
            <div id="main-menu" style={{width:'600px', borderRight:'1px solid #181818',background:'#FCFDFF',overflow:'hidden',overflowY:'scroll'}}>
                {
                  this.menuSelect()  
                }
                
                <div onClick={()=>{
                    document.getElementById('main-menu').style.display = 'none';
                    let getclasses = document.getElementsByClassName('menubg');
                    
                    for(let i=0; i < getclasses.length; i++) {
               
                        getclasses[i].style.borderRight = '1px solid #181818';
                        getclasses[i].className = '';
                        
                    }
                }}
                style={{background:'rgb(252, 253, 255)', zIndex:'999999',left:'453px', top:'295px', height:'44px',width:'12px',border:'1px solid rgb(221, 224, 235)',float:'right',position:'absolute'}}>
                <p style={{color:'black',transform:'rotate(89deg)',
                position:'relative',
                fontSize:'12px',top:'6px',}}>hide</p></div>
            </div>
            <div style={{display:'flex', flexDirection:'column', background:'white', width:'100%', position:'relative', border:'1px solid red'}}>
                <div style={{width:'100%', borderBottom:'1px solid black',background:'rgb(24, 24, 24)'}}>
                <div className="tabs-wrap">
                </div>        
         
                
                </div>
        
            </div>
            </div>
            <div style={{display:'flex',flex:1, border:'1px solid red'}}>
                <Comments/>
                <div style={{height:'100%',width:'400px',background:'white'}}>
                    <div style={{height:'42px',
                        width:'400px',
                        background:'#202020',
                        border:'1px solid red',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'space-between',
                        padding:'0px 70px'}}>
                            <button style={{fontWeight:'bold',
                                color:'white',
                                fontSize:'15px',
                                width:'93px',
                                height:'27px',
                                backgroundColor:'rgb(179, 0, 254)',
                                border:'none',
                                borderRadius:'5px',
                                justifyContent:'space-between',
                                display:'flex',
                                padding:'0px 9px'}}>
                                <i className="fa fa-infinity"></i>Remix</button>
                                <i className="fas fa-expand" style={{fontSize:30, color:'rgb(179, 0, 254)'}}></i>
                    </div>
                    <RelatedRooms/>
                </div>
            </div>
            </div>
        </div>)
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn:state.isLoggedIn,
        props:ownProps
    }
}

const mapDispatchToProps = (dispatch) => ({
    openModal: (modal) => dispatch(OPEN_MODAL(modal))
  });

const ConnectedRoomMain = connect(mapStateToProps,mapDispatchToProps)(RoomMain)

export default ConnectedRoomMain;