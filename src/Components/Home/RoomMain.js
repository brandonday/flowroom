import React, { Component } from 'react';
import { Resizable, ResizableBox } from 'react-resizable';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import * as CodeMirror from 'codemirror';
import Comments from './RoomComponents/Comments.js';
import RoomPosts from './RoomPosts.js';
import Editor from './Editor.js';
import Responsive from 'react-responsive';
import EditorOptionsDesktop from './EditorOptionsDesktop.js';
import EditorOptionsTablet from './EditorOptionsTablet.js';
import { OPEN_MODAL } from '../../actions/entireApp';
import { connect } from 'react-redux';
import { firebase } from '../firebase/firebase';
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
           modalIsOpen:true
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
        return (<div id="room-main-page" className="page-wrap twilight room-main-page-wrap">
            <div style={{display:'flex', flexDirection:'column', background:'white'}}>
                <div style={{width:'100%'}}>
                    <Tabs onSelect={(i) => { this.setState({tabIndex:i})}}>
                        <Desktop>
                            <TabList>
                                <div className="tabs-wrap">
                                    <Tab onClick={this.tabDetailsClicked} className="tab-details-component">
                                        <div className="tab-details-wrap">
                                            <div id="details" className="details-sel-3x"></div>
                                            <p id="details-text" className="details-text-selected">Room</p>
                                        </div>
                                    </Tab>
                                    
                                    <Tab onClick={this.tabRoomsClicked} className="tab-rooms-component">
                                        <div>
                                            <div className="tab-rooms-wrap">
                                                <div id="rooms" className="rooms-3x"></div>
                                                <p id="rooms-text" className="rooms-text">Objects</p>
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab onClick={this.tabCommentsClicked} className="tab-comments-component">
                                        <div>
                                            <div className="tabs-comments-wrap">
                                                <div id="comments" className="comments-3x"></div>
                                                <p id="comments-text" className="comments-text">Comments</p>
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab onClick={this.tabCommentsClicked} className="tab-comments-component">
                                        <div>
                                            <div className="tabs-comments-wrap">
                                                <div id="comments" className="comments-3x"></div>
                                                <p id="comments-text" className="comments-text">Details</p>
                                            </div>
                                        </div>
                                    </Tab>
                            
                                  
                                </div>
                          

                            </TabList>
                        </Desktop>
                        <Tablet>
                            <TabList>
                                <div className="tabs-wrap">
                                    <Tab onClick={this.tabDetailsClicked} className="tab-details-component">
                                        <div className="tab-details-wrap">
                                            <div id="details" className="details-sel-3x"></div>
                                            <p id="details-text" className="details-text-selected">Details</p>
                                        </div>
                                    </Tab>
                                    <Tab onClick={this.tabRoomsClicked} className="tab-rooms-component">
                                        <div>
                                            <div className="tab-rooms-wrap">
                                                <div id="rooms" className="rooms-3x"></div>
                                                <p id="rooms-text" className="rooms-text">Rooms</p>
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab onClick={this.tabCommentsClicked} className="tab-comments-component">
                                        <div>
                                            <div className="tabs-comments-wrap">
                                                <div id="comments" className="comments-3x"></div>
                                                <p id="comments-text" className="comments-text">Comments</p>
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab onClick={this.tabCommentsClicked} className="tab-comments-component">
                                        <div>
                                            <div className="tabs-comments-wrap">
                                                <div id="comments" className="comments-3x"></div>
                                                <p id="comments-text" className="comments-text">Details</p>
                                            </div>
                                        </div>
                                    </Tab>
                                </div>
                            </TabList>
                        </Tablet>
                        <Mobile>
                            <TabList>
                                <div className="tabs-wrap-mobile">
                                    <Tab onClick={this.tabDetailsClicked} className="tab-details-component">
                                        <div className="tabs-details-wrap-mobile">
                                            <div id="details" className="details-sel-3x"></div>
                                            <p id="details-text" className="details-text-selected">Details</p>
                                        </div>
                                    </Tab>
                                    <Tab onClick={this.tabRoomsClicked} className="tab-rooms-component">
                                        <div>
                                            <div className="tab-rooms-wrap">
                                                <div id="rooms" className="rooms-3x"></div>
                                                <p id="rooms-text" className="rooms-text">Rooms</p>
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab onClick={this.tabCommentsClicked} className="tab-comments-component">
                                        <div>
                                            <div className="tabs-comments-wrap">
                                                <div id="comments" className="comments-3x"></div>
                                                <p id="comments-text" className="comments-text">Comments</p>
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab onClick={this.tabCommentsClicked} className="tab-comments-component">
                                        <div>
                                            <div className="tabs-comments-wrap">
                                                <div id="comments" className="comments-3x"></div>
                                                <p id="comments-text" className="comments-text">Details</p>
                                            </div>
                                        </div>
                                    </Tab>
                          
                                </div>
                            </TabList>
                        </Mobile>
                        <TabPanel>
                            <Editor 
                                descriptionText={this.state.descriptionText}
                                name={'Brandon'}
                                likes={24}
                                tags={['button', 'web', 'hover', 'animation', 'js', 'code', 'mobile', 'responsive', 'flat design', 'color', 'glow', 'hover effect']}
                                
                                />
                        </TabPanel>
                        
                        <TabPanel>
                            <RoomPosts/>
                        </TabPanel>
                        <TabPanel>
                            <Comments/>
                        </TabPanel>
                    </Tabs>
                    {/* <div style={{position:'absolute',
                                    zIndex:'9999',
                                    display:'flex',
                                    width:'250px',
                                    top:'8px',
                                    left:'349px'
                                    }}>
                                <div onClick={this.tabCommentsClicked} style={{display:'flex'}} className="tab-comments-component">
                                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                            <p style={{fontSize:'12px',
                                    color:'#80848C',
                                    fontFamily: 'Source Sans Pro', fontWeight:'bold'}}>Save (?)</p>
                                        </div>
                                    </div>
                                    <div onClick={this.tabCommentsClicked} style={{display:'flex'}} className="tab-comments-component">
                                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                            <p style={{fontSize:'12px',
                                    color:'#80848C',
                                    fontFamily: 'Source Sans Pro', fontWeight:'bold'}}>Share</p>
                                        </div>
                                    </div>
                                    <div onClick={this.openModal.bind(this)} style={{display:'flex'}} className="tab-comments-component">
                                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                            <p style={{fontSize:'12px',
                                    color:'#80848C',
                                    fontFamily: 'Source Sans Pro', fontWeight:'bold'}}>Code (?)</p>
                                        </div>
                                    </div>
                                    <div onClick={this.openModal.bind(this)} style={{display:'flex'}} className="tab-comments-component">
                                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                            <p style={{fontSize:'12px',
                                    color:'#80848C',
                                    fontFamily: 'Source Sans Pro', fontWeight:'bold'}}>like</p>
                                        </div>
                                    </div>
                                   
                                         <div onClick={this.openModal.bind(this)} style={{display:'flex'}} className="tab-comments-component">
                                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                            <p style={{fontSize:'12px',
                                    color:'#80848C',
                                    fontFamily: 'Source Sans Pro', fontWeight:'bold'}}>Post (?)</p>
                                        </div>
                                    </div>
                                        </div> */}
                </div>
                <EditorOptionsDesktop/>
                <EditorOptionsTablet/>
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