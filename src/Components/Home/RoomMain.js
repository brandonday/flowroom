import React, { Component } from 'react';
import { Resizable, ResizableBox } from 'react-resizable';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import * as CodeMirror from 'codemirror';
import Comments from './RoomComponents/Comments.js';
import Editor from './Editor.js';
import Responsive from 'react-responsive';
import uuid from 'uuid';
import Hashids from 'hashids';
import { OPEN_MODAL } from '../../actions/entireApp';
import { connect } from 'react-redux';
import { firebase } from '../firebase/firebase';
import { tween, styler } from 'popmotion';
import { startCreateRoom } from '../../actions/rooms';
import axios from 'axios';
import * as dat from 'dat.gui';
import html2canvas from 'html2canvas';
import AWS from 'aws-sdk';
import ImageEdit from './ImageEdit.js';
import * as S3 from 'aws-sdk/clients/s3';
import RelatedRoomPost from './RelatedRoomPost.js';

let database = firebase.database();

AWS.config.update({
  region: 'us-west-2',
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-west-2:5df2511a-5595-416c-b148-aba28893c3f3'
  })
});

const s3 = new S3();


const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;



let Loaded = false;
let isMenuOpen = false;
let gui = new dat.GUI();
document.getElementsByClassName('close-button close-bottom')[0].style.display = 'none';
let addedBefore = false;
let roomsPerPage = 4;
let roomFilter = 'weight';
let relatedRooms = [];
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
           record:false,
           openBtnVisible:true,
           postBtnVisible:true,
           isLoaded:false,
           userNameSelf:'',
           relatedRooms:[],
           isRemix:false,
           remixRoomID:'',
           remixUserName:'',
           userName:'',
           shortID:''
        };
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    componentDidMount() {
        let that = this;
        document.getElementById('main-menu').style.display = 'none';
        document.getElementById('tab-menu').style.height = 'none';
        if(firebase.auth().currentUser !== null) {
            that.setState (
                {
                 userNameSelf:firebase.auth().currentUser.displayName
                }
            );
        }
        window.datGUI = function(obj) {
            let output = document.getElementById('output_frame').contentWindow;
            let text;
            let createDatGUI = function() {
                for(let i = 0; i < obj.length; i++) {
                    this[Object.keys(obj[i])[0]] = obj[i][Object.keys(obj[i])[0]];
                }
            }
            text = new createDatGUI();
            let customContainer = document.getElementById('main-menu');
            customContainer.appendChild(gui.domElement);
            document.getElementsByClassName('close-button')[0].style.display = 'none';
            for(let i = 0; i < obj.length; i++) {
                gui.add(text, Object.keys(obj[i])[0]).onChange(setValue);
            }
            setValue();
            function setValue() {
                for(let i = 0; i < obj.length; i++) {
                    output[Object.keys(obj[i])[0]].innerHTML = text[Object.keys(obj[i])[0]];
                    console.log(obj[i].remix)
                }
            }
        }
        function myFunction(x) {
            if (x.matches) { // If media query matches
                if(isMenuOpen === false) {
                    document.getElementById('tab-menu').style.display = 'none';
                } else {
                    document.getElementById('tab-menu').style.display = 'block';
                }
                if(isMenuOpen === true) {
                    document.getElementById('main-menu').style.display = 'block';
                }
          
                document.getElementById('main-menu').style.position = 'absolute';
                document.getElementById('main-menu').style.height = '380px';
                document.getElementById('main-menu').style.width = '67%';
                document.getElementById('main-menu').style.zIndex = '999994';
                document.getElementById('main-menu').style.top = '0px';
                document.getElementById('main-menu').style.zIndex = '999999';
                document.getElementById('main-menu').style.left = '60px';
                document.getElementById('main-menu').style.display = 'none';

                document.getElementById('tab-menu').style.position = 'absolute';
                document.getElementById('tab-menu').style.zIndex = '999999';
                document.getElementById('tab-menu').style.height = '380px';
            } else {
                let main = document.getElementById('main-menu');
                let tabMenu = document.getElementById('tab-menu');
                tabMenu.style.position = 'relative';
                tabMenu.style.display = 'block';
                document.getElementById('tab-menu').style.transform = 0;
              
                main.style.width = '380px';
                main.style.borderRight = '1px solid rgb(24, 24, 24)';
                main.style.background = 'rgb(24, 24, 24)';
                main.style.overflow = 'hidden scroll';
                main.style.flexDirection = 'column';
                if(isMenuOpen === true) {
                    document.getElementById('main-menu').style.display = 'flex';
                }
                main.style.position = 'relative';
                main.style.left = '0px';
            }
        }
        let x = window.matchMedia("(max-width: 768px)");
        myFunction(x) // Call listener function at run time
        x.addListener(myFunction) // Attach listener function on state changes
        let parts = window.location.pathname.split('/');
        let lastSegment = parts.pop() || parts.pop();  // handle potential trailing slash
        firebase.database().ref(`/rooms/${lastSegment}`).once('value').then((snapshot)=> {
            if(snapshot.val() !== null) {
              let uid = snapshot.val().uid;
              that.setState({
                isRemix:snapshot.val().isRemix,
                remixRoomID:snapshot.val().remixRoomID,
                remixUserName:snapshot.val().remixUserName,
                userName:snapshot.val().userName,
                shortID:snapshot.val().shortID,
              });
              if(firebase.auth().currentUser !== null) {
                let currentUser = firebase.auth().currentUser.uid;
                if(currentUser === uid) {
                  that.setState({display:'flex', postBtnVisible:false});
                } else {
                  that.setState({saveVisible:'block',postVisible:'block',remixVisible:'block'});
                }
              } else {
                  that.setState({saveVisible:'block',postVisible:'block',remixVisible:'block'});
              }
            } else {
                that.setState({
                    saveVisible:'block',
                    postVisible:'block',
                    remixVisible:'block',
                    isRemix:false,
                    openModalomID:'',
                    remixUserName:'',
                    userName:'',
                    shortID:''
                });
            } 
        }).catch((error) => {
          console.log(error)
        });
        let counter = 0;
        database.ref('rooms').orderByChild(roomFilter).limitToLast(roomsPerPage + 1).once('value').then((snapshot) => {
            snapshot.forEach((childSnapShot) => {
                counter++;
                if(!this.isShortIDExists(childSnapShot.val().shortID)) {
                    if(!(childSnapShot.key === 'Mobile' || childSnapShot.key === 'Remixable')) {
                        if(counter !== 1) {
                            relatedRooms.unshift({
                                id:childSnapShot.key,
                                date:childSnapShot.val().date,
                                views:childSnapShot.val().views,
                                isRemix:childSnapShot.val().isRemix,
                                roomType:childSnapShot.val().roomType,
                                userName:childSnapShot.val().userName,
                                shortID:childSnapShot.val().shortID,
                                title:childSnapShot.val().room_title,
                                tags:childSnapShot.val().tags,
                                thumbnail:childSnapShot.val().thumbnail,
                                ...childSnapShot
                            });
        
                        }
                      
                    }
                }
            });
            that.setState({relatedRooms:relatedRooms});
        });
                
    }
    isShortIDExists(shortID) {
        for(let i = 0; i < relatedRooms.length; i++) {
            if(relatedRooms[i].shortID == shortID) {
                return true;
            }
        }
        return false;
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
    async putObject(imageData, callback) {
            if(imageData == null) {
                return; 
            }
            let hashids = new Hashids(uuid(), 6);
            let fileName = hashids.encode(1, 2, 3) + '.jpg';
            let buffer = new Buffer(imageData.replace(/^data:image\/\w+;base64,/, ""),'base64')
            let params = { 
                Bucket: 'test.flowroom.com',
                Key:'uploads/' + fileName,
                ContentEncoding: 'base64',
                ContentType: 'image/jpeg',
                Body: buffer,
            }
            s3.putObject(params, function(err, data) {
                if (err) {
                    console.log('error :',err);
                } else {
                    let url = `http://test.flowroom.com/uploads/${fileName}`;
                    console.log(' s3 url :', url);
                    callback(url);
                }
            }
        );
    }
    openModal(isPostAsNew = true) {
        let that = this;
        let iframe = document.getElementById('output_frame');
        try {
            iframe.contentWindow.flowroom.SaveScreenShot(
                function() {
                    let imageData = localStorage.getItem("thumbnail");
                    let isRemix = isPostAsNew;
                    let remixRoomID = isPostAsNew ? that.state.shortID : that.state.remixRoomID;
                    let remixUserName = isPostAsNew ? that.state.userName : that.state.remixUserName;
                    localStorage.setItem("thumbnailUrl", "");
                    that.props.openModal (
                        { 
                            isModalOpen:true, 
                            modalType:'room', 
                            post:isPostAsNew, 
                            image:imageData, 
                            isRemix:isRemix, 
                            remixRoomID:remixRoomID, 
                            remixUserName:remixUserName, 
                            customStyles: {
                                overlay: {
                                    backgroundColor: 'none',
                                },
                                content: {
                                    top                   : '50%',
                                    left                  : '50%',
                                    right                 : '0',
                                    bottom                : 'auto',
                                    marginRight           : '0%',
                                    transform             : 'translate(-50%, -50%)',
                                    height:'70%',
                                    width:'50%',
                                }
                            }
                        }
                    );
                    let thumbnail = document.getElementById('thumbnail-pic-display');
                    thumbnail.src = imageData;
                    thumbnail.setAttribute("height", "100%");
                    thumbnail.setAttribute("width", "100%");
                    that.putObject (
                        imageData, 
                        (url) => { 
                            localStorage.setItem("thumbnailUrl", url);
                        }
                    );
                }
            );
        } catch(error) {
            that.props.openModal (
                { 
                    isModalOpen:true, 
                    modalType:'room', 
                    post:isPostAsNew, 
                    customStyles: {
                        overlay: {
                            backgroundColor: 'none',
                        },
                        content: {
                            top                   : '50%',
                            left                  : '50%',
                            right                 : '0',
                            bottom                : 'auto',
                            marginRight           : '0%',
                            transform             : 'translate(-50%, -50%)',
                            height:'70%',
                            width:'50%',
                        }
                    }
                }
            );
        }
    }
    dropDownAnimate() {
        let elem = document.getElementById("resizable-box"); 
        let pos = 0;
        let id = setInterval(frame, 0);
        function frame() {
            if (pos == 300) {
                clearInterval(id);
            } else {
                pos++; 
                elem.style.height = pos + 'px'; 
            }
        }                                                                                           
    }
    menuSelect() {
        if(this.state.details === true) {
            return (
                <p></p>
            )
        } else if(this.state.objects === true) {
            return (
                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <input type="text" style={{
                        height:'30px',
                        width:'223px',
                        marginTop:'20px',
                        borderRadius:'5px',
                        border:'1px solid black',
                        paddingLeft:'14px'}} placeholder="search..."/>
            
                    <div id="main-add-section" style={{display:'flex',flexWrap:'wrap', width:'300px', overflow:'hidden',height:'500px',backgroundColor:'#181818'}}>
                        <div id="menu-sel-wrap" style={{ width:'100%',height:'100%',margin:'auto'}}>
                            <div style={{width:'299px',
                                height:'100%',
                                float:'left',
                                display:'flex',
                                flexWrap:'wrap',
                                justifyContent:'center',
                                alignItems:'center',
                                backgroundColor:'#18181'
                            }}>

                                <div style={{
                                    height:'100px',
                                    width:'100px', 
                                    margin:'10px',
                                    display:'flex',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    flexDirection:'column',
                                    color:'white',
                                    background:'#01AADC',
                                    borderRadius:'5px',
                                    fontSize:'20px'
                                }} onClick={()=> {
                                    const element = document.querySelector('#main-add-section #menu-sel-wrap');
                                    const ball = styler(element); 

                                    tween({ from:600, to: -1081, duration: 200 })
                                    .start(v => ball.set('x', v));

                                

                                    fetch('https://pixabay.com/api/?username=mjweaver01&key=11834841-58b8712ec406d0b987a8d8509')
                                    .then(function(response) {
                                        return response.json();
                                    })
                                    .then(function(myJson) {
                                        console.log('images',myJson);
                                        for(let i =0; i < myJson.hits.length; i++) {
                                            // alert(myJson.hits[i].previewURL)
                                            var node = document.createElement("div");                 
                                            var img = document.createElement('img');    
                                            //img.src = myJson.hits[i].previewURL;   
                                            img.setAttribute("height", "100px");
                                            img.setAttribute("width", "100px");
                                            img.style.margin = '10px';
                                            img.addEventListener('click', ()=> {
                                                let canvas = document.createElement('canvas');
                                                let ctx = canvas.getContext("2d");
                                                canvas.width = img.width;
                                                canvas.height = img.height;
                                                ctx.drawImage( img, 0, 0 );
                                                localStorage.setItem( `savedImageData${i}`, canvas.toDataURL("image/png") );
                                                let getImageSaved = canvas.toDataURL("image/png"); //localStorage.getItem(`savedImageData${j}`);
                                                alert(getImageSaved);
                                                document.getElementById('menu-wrap').style.display = 'block';
                                                document.getElementById('menu').style.display = 'block';
                                            });
                                            img.src = myJson.hits[i].previewURL; 
                                            node.appendChild(img);   
                                            document.getElementById("innerSel").appendChild(node); 

                                        }
                                    });
                                }} className="ball">
                            <i className="fas fa-images"></i>
                            <p>Images</p>
                        </div>
                        <div style={{
                            height:'100px',
                            width:'100px', 
                            margin:'10px',
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center',
                            flexDirection:'column',
                            color:'white',
                            background:'#01AADC',
                            borderRadius:'5px',
                            fontSize:'20px'
                        }}>
                         <i class="fas fa-font"></i>
                            <p>Text</p>
                        </div>
                        <div style={{
                            height:'100px',
                            width:'100px', 
                            margin:'10px',
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center',
                            flexDirection:'column',
                            color:'white',
                            background:'#01AADC',
                            borderRadius:'5px',
                            fontSize:'20px'
                        }}>
                         <i className="fas fa-images"></i>
                            <p>GIFS</p>
                        </div>
                        <div style={{
                            height:'100px',
                            width:'100px', 
                            margin:'10px',
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center',
                            flexDirection:'column',
                            color:'white',
                            background:'#01AADC',
                            borderRadius:'5px',
                            fontSize:'20px'
                        }}>
                         <i className="fas fa-images"></i>
                            <p>Stickers</p>
                        </div>
                        <div style={{
                            height:'100px',
                            width:'100px', 
                            margin:'10px',
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center',
                            flexDirection:'column',
                            color:'white',
                            background:'#01AADC',
                            borderRadius:'5px',
                            fontSize:'20px'
                        }}>
                         <i class="fas fa-shapes" onClick={()=>{
                             const element = document.querySelector('#main-add-section #menu-sel-wrap');
                             const ball = styler(element); 

                             tween({ from:600, to: -1081, duration: 200 })
                             .start(v => ball.set('x', v));
                            let myJson = ['square']
                             for(let i =0; i < myJson.length; i++) {
                                // alert(myJson.hits[i].previewURL)
                                var node = document.createElement("div");                 
                                //var img = document.createElement('img');    
                                //img.src = myJson.hits[i].previewURL;   
                                node.style.height = "100px";
                                node.style.width = "100px";
                                node.style.border = '1px solid black';
                                node.style.margin = '10px';
                                node.style.position = 'absolute';
                                node.addEventListener('click', ()=> {
                                    
                                    document.getElementById('menu-wrap').style.display = 'block';
                                    document.getElementById('menu').style.display = 'block';
                                });
                               
                                document.getElementById("main-add-section").appendChild(node); 

                            }

                         }}></i>
                            <p>Shapes</p>
                        </div>
                        <div style={{
                            height:'100px',
                            width:'100px', 
                            margin:'10px',
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center',
                            flexDirection:'column',
                            color:'white',
                            background:'#01AADC',
                            borderRadius:'5px',
                            fontSize:'20px'
                        }}>
                         <i className="fas fa-images"></i>
                            <p>Icons</p>
                        </div>
                        <div style={{
                            height:'100px',
                            width:'100px', 
                            margin:'10px',
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center',
                            flexDirection:'column',
                            color:'white',
                            background:'#01AADC',
                            borderRadius:'5px',
                            fontSize:'20px'
                        }}>
                         <i className="fas fa-images"></i>
                            <p>Video</p>
                        </div>
                        <div style={{
                            height:'100px',
                            width:'100px', 
                            margin:'10px',
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center',
                            flexDirection:'column',
                            color:'white',
                            background:'#01AADC',
                            borderRadius:'5px',
                            fontSize:'20px'
                            
                        }}>
                         <i className="fas fa-images"></i>
                            <p>Audio</p>
                        </div>
                            </div>

                            <div id="selection" style={{ width:'299px',marginLeft:'100%',height:'100%',background:'black'}}>
                                <div id="innerSel" style={{justifyContent:'center',display:'flex', flexWrap:'wrap', height:'100%',width:'100%', alignItems:'center', background:'rgb(24, 24, 24)'}}>

                                </div>
    
                            </div>
                        </div>
                    </div>
                </div>
            )
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
        let that = this;
        const {isLoaded} = this.state;
        
        return (<div id="room-main-page" className="page-wrap twilight room-main-page-wrap">
            <div style={{display:'flex',flexDirection:'column', height:'100%',width:'100%'}}>
                <div style={{display:'flex',flex:'0 583px'}}>
                    <div id="tab-menu" style={{
                        width:'48px', 
                        background:'rgb(14, 14, 14)',
                        height:'100%'
                    }}>
                        <div id="remix-tab" onClick={()=> {
                         
                                let remixid = document.getElementById('remix-tab');
                                remixid.className = 'menubg';
                                remixid.style.borderRight = '0px solid #181818';

                              
                                this.setState({
                                    details:false,
                                    objects:false,
                                    comments:false,
                                    draw:false,
                                    remix:true,
                                    preferences:false,
                                    record:false
                          
                                });
                                document.getElementById('main-menu').style.display = 'flex';
                                isMenuOpen = true;
                              

                            }} style={{
                            display:'flex',
                            color:'rgb(64, 255, 232)',
                            height:'52px',
                            width:'48px',
                            flexDirection:'column',
                            alignItems:'center',
                            borderRight:'1px solid #181818',
                            borderBottom:'1px solid #181818',
                            justifyContent:'center'
                            }} className="menu-bg-border">
                                <div style={{
                                    fontSize:15, 
                                    color:'white',
                                    backgroundImage:'url(../infinity.png)',
                                    backgroundSize:'100% 92%',
                                    backgroundRepeat:'no-repeat',
                                    height:9,
                                    width:22
                                    }}></div>
                                <p style={{fontSize:10.2,fontWeight:'bold',color:'#40FFE8',width:'26px'}}>REMIX</p>
                               
                        </div>




                                        <div id="script-tag" onClick={()=> {
           
                                    
                                        }} style={{
                                            display:'flex',
                            color:'rgb(64, 255, 232)',
                            height:'52px',
                            width:'48px',
                            flexDirection:'column',
                            alignItems:'center',
                            borderRight:'1px solid #181818',
                            borderBottom:'1px solid #181818',
                            justifyContent:'center'}} className="menu-bg-border">
                                                <div style={{
                                    fontSize:'15px',
                                    color:'white',
                                    backgroundImage:'url(../code.svg)',
                                    backgroundSize:'100% 100%',
                                    backgroundRepeat:'no-repeat',
                                    height:'14px',
                                    width:'16px',
                                    marginBottom:'3px'
                                    }}></div>
                                                    <p id="details-text" style={{fontSize:10.2,fontWeight:'bold',color:'#525252',width:'26px'}}>SCRIPT</p>
                                    </div>
                                    <div id="save-tab" onClick={()=> {
                                       
                                       this.openModal(false)
                               
                               }} style={{
                                    display:that.state.userNameSelf === that.state.userName ? 'flex' : 'none',
                                    color:'rgb(64, 255, 232)',
                                    height:'52px',
                                    width:'48px',
                                    flexDirection:'column',
                                    alignItems:'center',
                                    borderRight:'1px solid #181818',
                                    borderBottom:'1px solid #181818',
                                    justifyContent:'center'
                               }} 
                               className="menu-bg-border">
                                    <div style={{
                                        fontSize:'15px',
                                        color:'white',
                                        backgroundImage:'url(../save-regular-grey.svg)',
                                        backgroundSize:'100% 100%',
                                        backgroundRepeat:'no-repeat',
                                        height:'14px',
                                        width:'16px',
                                        marginBottom:'3px'
                            
                               }}></div>
                                   <p id="save-text" style={{fontSize:10.2,fontWeight:'bold',color:'#525252'}}>SAVE</p>
                       </div>
                       <div id="del-tab" onClick={()=> {
                                       
                                       let currentRoomID = window.location.pathname.split("room/").pop();
                                     firebase.database().ref(`rooms/${currentRoomID}`).remove();
                                     firebase.database().ref(`UsersRooms/${currentRoomID}/${that.state.userNameSelf}`).remove();
                                     firebase.database().ref(`${that.state.userNameSelf}/${currentRoomID}`).remove();
                                     window.location.replace('/');
                               
                               }} style={{
                       display:that.state.userNameSelf === that.state.userName ? 'flex' : 'none',
                       color:'rgb(64, 255, 232)',
                       height:'52px',
                       width:'48px',
                       flexDirection:'column',
                       alignItems:'center',
                       borderRight:'1px solid #181818',
                       borderBottom:'1px solid #181818',
                       justifyContent:'center'
                               }} 
                               className="menu-bg-border">
                                    <div style={{
                               fontSize:'15px',
                               color:'white',
                               backgroundImage:'url(../save-regular-grey.svg)',
                               backgroundSize:'100% 100%',
                               backgroundRepeat:'no-repeat',
                               height:'14px',
                               width:'16px',
                               marginBottom:'3px'
                               }}></div>
                                   <p id="publish-text" style={{fontSize:10.2,fontWeight:'bold',color:'#525252'}}>DELETE</p>
                       </div>
                                     <div id="post-tab" onClick={()=> {
                                       
                                            this.openModal(true)
                                    
                                    }} style={{
                            display:that.state.postBtnVisible ? 'flex' : 'none',
                            color:'rgb(64, 255, 232)',
                            height:'52px',
                            width:'48px',
                            flexDirection:'column',
                            alignItems:'center',
                            borderRight:'1px solid #181818',
                            borderBottom:'1px solid #181818',
                            justifyContent:'center'
                                    }} 
                                    className="menu-bg-border">
                                         <div style={{
                                    fontSize:'15px',
                                    color:'white',
                                    backgroundImage:'url(../save-regular-grey.svg)',
                                    backgroundSize:'100% 100%',
                                    backgroundRepeat:'no-repeat',
                                    height:'14px',
                                    width:'16px',
                                    marginBottom:'3px'
                                    }}></div>
                                        <p id="publish-text" style={{fontSize:10.2,fontWeight:'bold',color:'#525252',width:'38px'}}>PUBLISH</p>
                            </div>


                            <div id="full-screen" onClick={()=> {
                                    }} style={{
                            display:'flex',
                            color:'rgb(64, 255, 232)',
                            height:'52px',
                            width:'48px',
                            flexDirection:'column',
                            alignItems:'center',
                            borderRight:'1px solid #181818',
                            borderBottom:'1px solid #181818',
                            justifyContent:'center'
                                    }} 
                                    className="menu-bg-border">
                                         <div style={{
                                    fontSize:'15px',
                                    color:'white',
                                    backgroundImage:'url(../fullscreen_icon.png)',
                                    backgroundSize:'100% 100%',
                                    backgroundRepeat:'no-repeat',
                                    height:'14px',
                                    width:'16px',
                                    marginBottom:'3px'
                                    }}></div>
                                        <p id="full-text" style={{fontSize:10.2,fontWeight:'bold',color:'#525252',width:'22px'}}>FULL</p>
                            </div>

                                 <div id="objects" onClick={()=> {
                                    let objectsid = document.getElementById('objects');
                                    objectsid.className = 'menubg';
                                    objectsid.style.borderRight = '0px solid #181818';
                                    document.getElementById('objects').className = 'menubg'
                                    let remixid = document.getElementById('details');
                                    remixid.className = '';
                                    remixid.style.borderRight = '0px solid #181818';
                                    let getclasses = document.getElementsByClassName('menubg');
                                    this.setState({details:false,
                                        objects:true,
                                        comments:false,
                                        draw:false,
                                        remix:false,
                                        preferences:false,
                                        record:false
                                    });
                                    
                                    if(document.getElementById('remixhead') !== null) {
                                        document.getElementById('remixhead').style.display = 'none';
                                    }
                                   
                                    document.getElementById('main-menu').style.display = 'flex';
                                     let tagstoRemove = document.querySelectorAll('#main-menu li');
                                     
                                    for(let i = 0; i < tagstoRemove.length; i++) {
                                      
                                        tagstoRemove[i].remove()
                                    }
                             }} style={{height:'50px',width:'48px',display:'flex',
                                    flexDirection:'column',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    borderRight:'1px solid #181818',
                                    borderBottom:'1px solid #181818'}} className="menu-bg-border">
                        
                                </div> 

                                   
                     
                        </div>
            
                        <div id="main-menu" style={{width:'378px', borderRight:'1px solid #181818',background:'#FCFDFF',overflow:'hidden',overflowY:'scroll',backgroundColor:'#181818',flexDirection:'column',alignItems:'center'}}>
                        <div style={{height:'170px', width:'259px'}}>
                        <div style={{border:'1px solid #222222',
    height:'147px',
    width:'259px',
    borderRadius:'3px',
    marginTop:'11px'}}></div>
    </div>
            
                            {
                                this.menuSelect()  
                            }
                
                        
                        </div>
                        <div style={{display:'flex', flexDirection:'column', background:'white', width:'100%', position:'relative', border:'0px solid red'}}>
                            <Editor/>
                            <div style={{width:'100%', borderBottom:'1px solid black',background:'rgb(24, 24, 24)'}}>
                            <div className="tabs-wrap"></div>        
                        </div>
                    </div>
                </div>
                <div style={{display:this.state.userName == ''? 'none':'flex',flex:1, border:'0px solid red'}}>
                    <Comments isRemix={this.state.isRemix} 
                        remixRoomID={this.state.remixRoomID} 
                        remixUserName={this.state.remixUserName}
                        userName={this.state.userName}
                    />
                    <div style={{height:'42px',
                            width:'100%',
                            background:'rgb(14, 14, 14)',
                            border:'0px solid red',
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'space-between',
                            position:'absolute',
                            right:'0px'
                            }}></div>
                    <div style={{
                        height:'100vh',
                        width:'400px',
                        background:'white',
                        justifyContent:'center',
                        marginTop:'32px',
                        display:'flex',
                        flexDirection:'column'
                    }}>
                    
                    <div style={{display:this.state.userName == ''? 'none':'flex', alignItems:'center',height:40,width:'100%',background:'#0f0f0f'}}>
                        <p style={{color:'white',fontSize:17,fontWeight:900}}>Recommended Flows</p>
                    </div>
                    <div style={{height:'100%', width:'100%',background:'#0f0f0f'}}>


                        
                            {
                                that.state.relatedRooms.map((i)=>{
                                    return(<RelatedRoomPost 
                                        shortID={i.shortID}
                                        title={i.title} 
                                        userName={i.userName}    
                                        views={i.views} 
                                        thumbnail={i.thumbnail}   
                                        roomHeight={118} 
                                        roomWidth={225}
                                        isRemix={i.isRemix}
                                        
                                        />)
                                })
                            }
                        
                    </div>
                    </div>
                </div>
            </div>
        </div>)
       
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn:state.isLoggedIn,
        props:ownProps,
        state:state
    }
}

const mapDispatchToProps = (dispatch) => ({
    openModal: (modal) => dispatch(OPEN_MODAL(modal))
  });

const ConnectedRoomMain = connect(mapStateToProps,mapDispatchToProps)(RoomMain)

export default ConnectedRoomMain;