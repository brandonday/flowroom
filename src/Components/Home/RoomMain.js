import React, { Component } from 'react';
import { Resizable, ResizableBox } from 'react-resizable';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import * as CodeMirror from 'codemirror';
import Comments from './RoomComponents/Comments.js';
import Editor from './Editor.js';
import Responsive from 'react-responsive';
import uuid from 'uuid';
import Hashids from 'hashids';
import EditorOptionsDesktop from './EditorOptionsDesktop.js';
import EditorOptionsTablet from './EditorOptionsTablet.js';
import { OPEN_MODAL } from '../../actions/entireApp';
import { connect } from 'react-redux';
import { firebase } from '../firebase/firebase';
import { tween, styler } from 'popmotion';
import { startCreateRoom } from '../../actions/rooms';
import axios from 'axios';
import * as dat from 'dat.gui';
import html2canvas from 'html2canvas';
// import ImageEdit from './ImageEdit.js';
import AWS from 'aws-sdk';
import ImageEdit from './ImageEdit.js';
import * as S3 from 'aws-sdk/clients/s3';
import RelatedRoomPost from './RelatedRoomPost.js';



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


const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

let Loaded = false;
let isMenuOpen = false;
 let gui = new dat.GUI();
 document.getElementsByClassName('close-button close-bottom')[0].style.display = 'none';
 let addedBefore = false;

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
           user:'',
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

        let dummy = [{
            shortID:'0esmik', 
            title:'Crossing the Bridge', 
            createdBy:'daltonpereira', 
            remixedBy:'daltonpereira',
            repostedBy:'daltonpereira', 
            views:0,
            thumbnail:'http://test.flowroom.com/uploads/M0sZuL.jpg'
        },{
            shortID:'0esmik', 
            title:'Crossing the Bridge', 
            createdBy:'daltonpereira', 
            remixedBy:'daltonpereira',
            repostedBy:'daltonpereira', 
            views:0,
            thumbnail:'http://test.flowroom.com/uploads/M0sZuL.jpg'
        },{
            shortID:'0esmik', 
            title:'Crossing the Bridge', 
            createdBy:'daltonpereira', 
            remixedBy:'daltonpereira',
            repostedBy:'daltonpereira', 
            views:0,
            thumbnail:'http://test.flowroom.com/uploads/M0sZuL.jpg'
        }];
        this.setState({relatedRooms:dummy});


        document.getElementById('main-menu').style.display = 'none';
        document.getElementById('tab-menu').style.height = 'none';
        
       //if(Loaded === false) {
       if(firebase.auth().currentUser !== null) {
        that.setState({user:firebase.auth().currentUser.displayName
        
        });
       }
      
       window.datGUI = function(obj) {
        let output = document.getElementById('output_frame').contentWindow;
        let text;
        let createDatGUI = function() {
          
          for(let i = 0; i < obj.length; i++) {
            this[Object.keys(obj[i])[0]] = obj[i][Object.keys(obj[i])[0]];
            // this.message = 'hello'
          }
        }
        text = new createDatGUI();
        

        // console.log(gui.domElement)
        console.log(document.getElementsByClassName('dg')[0]);

        var customContainer = document.getElementById('main-menu');
        customContainer.appendChild(gui.domElement);
        document.getElementsByClassName('close-button')[0].style.display = 'none';
       
        for(let i = 0; i < obj.length; i++) {
            
            gui.add(text, Object.keys(obj[i])[0]).onChange(setValue);
        }
        setValue();
        function setValue() {
           
           
            for(let i = 0; i < obj.length; i++) {
                 //text[Object.keys(obj[i])[0]]
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
          
          var x = window.matchMedia("(max-width: 768px)")
          myFunction(x) // Call listener function at run time
          x.addListener(myFunction) // Attach listener function on state changes

//          alert('hgghhg')
//          var FizzyText = function() {

//             this.color0 = "#ffae23"; // CSS string
//             this.color1 = [ 0, 128, 255 ]; // RGB array
//             this.color2 = [ 0, 128, 255, 0.3 ]; // RGB with alpha
//             this.color3 = { h: 350, s: 0.9, v: 0.3 }; // Hue, saturation, value
          
//             // Define render logic ...
          
//           };
          
//           //window.onload = function() {
          
//             var text = new FizzyText();
//             var gui = new dat.GUI();
          
//             gui.addColor(text, 'color0');
//             gui.addColor(text, 'color1');
//             gui.addColor(text, 'color2');
//             gui.addColor(text, 'color3');
          
//           //};
// setTimeout(function() {
// var customContainer = document.getElementById('main-menu');
// customContainer.appendChild(gui.domElement);
// },5000)
         // this.setState({isLoaded:true})
       
        
        const targetElement = document.querySelector("#room-main-page");
        disableBodyScroll(targetElement);

        if(window.location.pathname === '/room/spacegame') {
            this.setState({descriptionText:'A simple remixable space game I made'});
        } else if (window.location.pathname === '/room/slider') {
            this.setState({descriptionText:'A slider showing before and after'});
        }

        
        var parts = window.location.pathname.split('/');
        var lastSegment = parts.pop() || parts.pop();  // handle potential trailing slash


        firebase.database().ref(`/rooms/${lastSegment}`).once('value').then((snapshot)=> {
            if(snapshot.val() !== null) {
              
              //console.log(snapshot.val())
              let uid = snapshot.val().uid;
              that.setState({
                isRemix:snapshot.val().isRemix,
                remixRoomID:snapshot.val().remixRoomID,
                remixUserName:snapshot.val().remixUserName,
                userName:snapshot.val().userName,
                shortID:snapshot.val().shortID
              })
             
              //console.log(firebase.auth())
              if(firebase.auth().currentUser !== null) {
                let currentUser = firebase.auth().currentUser.uid;
                //alert(currentUser)
                
                if(currentUser === uid) {
                  //alert('the same');
                  
                  that.setState({display:'flex', postBtnVisible:false});
                } else {
                  //alert('not');
                  that.setState({saveVisible:'block',postVisible:'block',remixVisible:'block'});
                }
              } else {
                  that.setState({saveVisible:'block',postVisible:'block',remixVisible:'block'});
              }
            } else {
              //alert('not');
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

        //this.setState({isLoaded:true});
        //     Loaded = true;
        //  }
    }

    remix() {

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
        });


      }
    openModal(isPostAsNew = true) {
        console.log('this open modal')
        let that = this;
        let iframe = document.getElementById('output_frame');
        try{
        iframe.contentWindow.flowroom.SaveScreenShot(function() {
            console.log('screen shot callback')
            let imageData = localStorage.getItem("thumbnail");
            let isRemix = isPostAsNew;
            let remixRoomID = isPostAsNew ? that.state.shortID : that.state.remixRoomID;
            let remixUserName = isPostAsNew ? that.state.userName : that.state.remixUserName;

            localStorage.setItem("thumbnailUrl", "");
            that.props.openModal({isModalOpen:true, modalType:'room', post:isPostAsNew, image:imageData, isRemix:isRemix, remixRoomID:remixRoomID, remixUserName:remixUserName, customStyles:{
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
              }});
              let thumbnail = document.getElementById('thumbnail-pic-display');
            thumbnail.src = imageData;
            console.log('thumbnail set: ',thumbnail)
            thumbnail.setAttribute("height", "100%");
            thumbnail.setAttribute("width", "100%");
            that.putObject(imageData, (url) => { 
                console.log('thumbnail url', url)
                localStorage.setItem("thumbnailUrl", url);
                console.log('thumbnail URL: ',localStorage.getItem("thumbnailUrl"));
            });
            
            
            
            
        });
    } catch(error) {
        that.props.openModal({isModalOpen:true, modalType:'room', post:post, customStyles:{
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
          }});
    }
         
        
        
      }
      dropDownAnimate() {
   
        var elem = document.getElementById("resizable-box"); 
        var pos = 0;
        var id = setInterval(frame, 0);
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
            return (<p>jkjkkj</p>)
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

                                    
                                    // axios.post(`https://pixabay.com/api/?username=mjweaver01&key=11834841-58b8712ec406d0b987a8d8509" + request + "&image_type=photo`, {
        
                                    // },
                                    // {headers: {
                                    //   'X-Api-Key': '11834841-58b8712ec406d0b987a8d8509'

                                    // }}).then(data => {
                                    //     alert(data)
                                    //   // let img_base64_val = this.base64Encode(res.data);
                                    //   // var reader = new FileReader();
                                    //   // reader.onload = (function(self) {
                                    //   //   return function(e) {
                                    //   //     document.getElementById("img").src = e.target.result;
                                    //   //   }
                                    //   // });
                                    //   // reader.readAsDataURL(new Blob([res.data]));
                                    //   // this.setState({image:img_base64_val});
                                    //   // console.log(img_base64_val)
                                    // });

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
           
                                            // let commentsid = document.getElementById('comments');
                                            // commentsid.className = 'menubg';
                                            // commentsid.style.borderRight = '0px solid #181818';
                                            // let getclasses = document.getElementsByClassName('menubg');
                                            // this.setState({
                                            //     details:false,
                                            //     objects:false,
                                            //     comments:true,
                                            //     draw:false,
                                            //     remix:false,
                                            //     preferences:false,
                                            //     record:false
                                            // });
                                            // document.getElementById('main-menu').style.display = 'flex';
                                            // for(let i=0; i < getclasses.length; i++) {
                                            //     if(getclasses[i].id !== 'comments') {
                                            //         getclasses[i].style.borderRight = '1px solid #181818';
                                            //         getclasses[i].className = '';
                        
                                            //     }
                                            // }
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
                                       
                                       this.openModal(true)
                               
                               }} style={{
                                    display:that.state.postBtnVisible ? 'none' : 'flex',
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
                                     firebase.database().ref(`UsersRooms/${currentRoomID}/${that.state.user}`).remove();
                                     firebase.database().ref(`${that.state.user}/${currentRoomID}`).remove();
                                     window.location.replace('/');
                               
                               }} style={{
                       display:that.state.postBtnVisible ? 'none' : 'flex',
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
                                        // let drawid = document.getElementById('draw');
                                        // drawid.className = 'menubg';
                                        // drawid.style.borderRight = '0px solid #181818';
                                        // let getclasses = document.getElementsByClassName('menubg');
                                        // this.setState({
                                        //     details:false,
                                        //     objects:false,
                                        //     comments:false,
                                        //     draw:true,
                                        //     remix:false,
                                        //     preferences:false,
                                        //     record:false
                                        // });
                                        // document.getElementById('main-menu').style.display = 'flex';
                                        // for(let i=0; i < getclasses.length; i++) {
                                        //     if(getclasses[i].id !== 'draw') {
                                        //         getclasses[i].style.borderRight = '1px solid #181818';
                                        //         getclasses[i].className = '';
                                        //     }
                                        // }
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
                                    // for(let i=0; i < getclasses.length; i++) {
                                    //     if(getclasses[i].id !== 'objects') {
                                    //         getclasses[i].style.borderRight = '1px solid #181818';
                                    //         getclasses[i].className = '';
                        

                                    //     }
                                    // }
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
                                {/* <p id="details-text" className="details-text" style={{fontSize:11,fontWeight:'bold',color:'white'}}>Add New</p>
                                <p style={{fontSize:11,fontWeight:'bold',color:'white'}}>Content</p> */}
                                </div> 

                                   
                            {/* <div id="remix" onClick={()=> {
                                let remixid = document.getElementById('remix');
                                remixid.className = 'menubg';
                                remixid.style.borderRight = '0px solid #181818';
                                let getclasses = document.getElementsByClassName('menubg');
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
                                <p id="details-text" className="details-text">Video</p>
                            </div> */}
                            {/* <div id="preferences" onClick={()=> {
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
                                    record:false
                                });
                                document.getElementById('main-menu').style.display = 'flex';

                                for(let i=0; i < getclasses.length; i++) {
                                    if(getclasses[i].id !== 'preferences') {
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
                                    borderBottom:'1px solid #181818'}} 
                                    className="menu-bg-border">
                                <div id="preferences-icon" className="details-3x"></div>
                                <p id="details-text" className="details-text">Apps</p>
                            </div> */}
                            {/* <div id="record" onClick={()=> {
                                let recordid = document.getElementById('record');
                                recordid.className = 'menubg';
                                recordid.style.borderRight = '0px solid #181818';
             
                                let getclasses = document.getElementsByClassName('menubg');
                                this.setState({
                                    details:true,
                                    objects:false,
                                    comments:false,
                                    draw:false,
                                    remix:false,
                                    preferences:false,
                                    record:true
                                });
                                document.getElementById('main-menu').style.display = 'flex';

                                for(let i=0; i < getclasses.length; i++) {
                                    if(getclasses[i].id !== 'record') {
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
                                <div id="record-icon" className="details-3x"></div>
                                <p id="details-text" className="details-text">Record</p>
                            </div> */}
                        </div>
            
                        <div id="main-menu" style={{width:'378px', borderRight:'1px solid #181818',background:'#FCFDFF',overflow:'hidden',overflowY:'scroll',backgroundColor:'#181818',flexDirection:'column',alignItems:'center'}}>
                        <div style={{height:'170px', width:'259px'}}>
                        <div style={{border:'1px solid #222222',
    height:'147px',
    width:'259px',
    borderRadius:'3px',
    marginTop:'11px'}}></div>
    </div>
                        {/* <div style={{display:'flex', justifyContent:'flex-end', height:'30px', width:'100%', border:'1px solid #202020', color:'white', fontSize:20,}}>
                            <i id="close-menu" className="far fa-window-close" style={{margin:'3px', color:'rgb(95, 95, 95)'}} onClick={()=>{
                                   const element = document.querySelector('#main-menu');
                                   const tabs = document.getElementById('tab-menu');
                                   const ball = styler(element);
                                   const ball2 = styler(tabs); 
                                   function myFunction(x) {
                                     if (x.matches) { // If media query matches
                                  
                                         if(isMenuOpen === true) {
                                             tween({ from:0, to: -1000, duration: 200 })
                                             .start(v => ball.set('x', v));
                                             tween({ from:0, to: -1000, duration: 200 })
                                             .start(v => ball2.set('x', v));
                                            document.getElementById('main-menu').style.display = 'none';
                                             //that.setState({isMenuOpen:false});
     
                                           } else {
                                               element.style.display = 'flex';
                                               document.getElementById('main-menu').style.display = 'none';
                                               tween({ from:-1000, to:0, duration: 200 })
                                             .start(v => ball.set('x', v));
                                             tween({ from:-1000, to: 0, duration: 200 })
                                             .start(v => ball2.set('x', v));
                                            // that.setState({isMenuOpen:true});
                                           }
                                       
                                     } else {
                                    
                                        let remixid = document.getElementById('details');
                                        remixid.className = '';
                                        remixid.style.borderRight = '0px solid #181818';
        
                                        let objectsid = document.getElementById('objects');
                                        objectsid.className = '';
                                        objectsid.style.borderRight = '0px solid #181818';
                                       document.getElementById('main-menu').style.display = 'none';
                          
                                     }
                                   }
                                   
                                   var x = window.matchMedia("(max-width: 768px)")
                                   myFunction(x) // Call listener function at run time
                                   x.addListener(myFunction) // Attach listener function on state changes
                                


                                //this.setState({isMenuOpen:false})
                            }}></i>
                        </div> */}
                            {
                                this.menuSelect()  
                            }
                
                            {/* <div onClick={()=>{
                                document.getElementById('main-menu').style.display = 'none';
                                let getclasses = document.getElementsByClassName('menubg');
                    
                                for(let i=0; i < getclasses.length; i++) {
               
                                    getclasses[i].style.borderRight = '1px solid #181818';
                                    getclasses[i].className = '';
                        
                                }
                            }}
                            style={{height:'584px',
                                width:'10px',
                                background: 'rgb(32, 32, 32)',
                                left:'432px',
                                position:'absolute',
                                top:'-1px'}}>
                                <div style={{background:'rgb(95, 95, 95', zIndex:'90000', top:'200px', height:'44px',width:'10px',border:'0px solid rgb(221, 224, 235)',float:'right',position:'absolute'}}>
                                <p style={{
                                color:'white',
                                transform:'rotate(89deg)',
                                position:'relative',
                                fontSize:'12px',top:'6px',}}>hide</p>
                                </div>
                            </div> */}
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
                                        createdBy={i.createdBy}  
                                        remixedBy={i.remixedBy}
                                        repostedBy={i.repostedBy}  
                                        views={i.views} 
                                        thumbnail={i.thumbnail}   
                                        roomHeight={118} 
                                        roomWidth={225}
                                        
                                        />)
                                })
                            }
                        
                    </div>
                            
                        {/* <button id="open-code-editor" onClick={this.dropDownAnimate.bind(this)} style={{fontWeight:'bold',
                                color:'white',
                                fontSize:'15px',
                                width:'129px',
                                height:'27px',
                                backgroundColor:'rgb(179, 0, 254)',
                                border:'none',
                                borderRadius:'5px',
                                justifyContent:'space-between',
                                display:'flex',
                                padding:'0px 9px'}}>
                                Open Code Editor</button> */}
                        {/* <button id="openCloseBtn" onClick={()=>{
                              const element = document.querySelector('#main-menu');
                              const tabs = document.getElementById('tab-menu');
                              const ball = styler(element);
                              const ball2 = styler(tabs); 
                              function myFunction(x) {
                                if (x.matches) { // If media query matches
                             
                                    if(isMenuOpen === true) {
                                        tween({ from:0, to: -400, duration: 200 })
                                        .start(v => ball.set('x', v));
                                        tween({ from:0, to: -400, duration: 200 })
                                        .start(v => ball2.set('x', v));
                                        document.getElementById('main-menu').style.display = 'none';
                                        isMenuOpen = false

                                      } else {
                                          element.style.display = 'flex';
                                          document.getElementById('main-menu').style.display = 'block';
                                          tween({ from:-300, to:0, duration: 200 })
                                        .start(v => ball.set('x', v));
                                        tween({ from:-300, to: 0, duration: 200 })
                                        .start(v => ball2.set('x', v));
                                        isMenuOpen = true
                                        tabs.style.display = 'block';
                                      }
                                  
                                } else {
                               
                       
                     
                                }
                              }
                              
                              var x = window.matchMedia("(max-width: 768px)")
                              myFunction(x) // Call listener function at run time
                              x.addListener(myFunction) // Attach listener function on state changes
                          

                        }} style={{fontWeight:'bold',
                                color:'white',
                                fontSize:'15px',
                                width:'132px',
                                height:'27px',
                                backgroundColor:'rgb(179, 0, 254)',
                                border:'none',
                                borderRadius:'5px',
                                justifyContent:'space-between',
                                display:that.state.openBtnVisible ? 'flex' : 'none',
                                padding:'0px 9px'}}>
                                {isMenuOpen ? 'Close Remix Menu' : 'Open Remix Menu'}</button> */}
                            {/* <button id="postbtn" onClick={()=>{
                                // this.openModal(true)
                                
                            
                            }} style={{fontWeight:'bold',
                                color:'white',
                                fontSize:'15px',
                                width:'50px',
                                height:'27px',
                                backgroundColor:'rgb(179, 0, 254)',
                                border:'none',
                                borderRadius:'5px',
                                justifyContent:'space-between',
                                display:that.state.postBtnVisible ? 'flex' : 'none',
                                padding:'0px 9px'}}>
                                Post</button> */}
                                {/* <button id="savechanges" onClick={()=>{this.openModal(false)}} style={{fontWeight:'bold',
                                color:'white',
                                fontSize:'15px',
                                width:'105px',
                                height:'27px',
                                backgroundColor:'rgb(179, 0, 254)',
                                border:'none',
                                borderRadius:'5px',
                                justifyContent:'space-between',
                                display:that.state.postBtnVisible ? 'none' : 'flex',
                                padding:'0px 9px'}}>
                                Save Changes</button> */}
                                {/* <button id="deletebtn" onClick={()=>{
                                     let currentRoomID = window.location.pathname.split("room/").pop();
                                     firebase.database().ref(`rooms/${currentRoomID}`).remove();
                                     firebase.database().ref(`UsersRooms/${currentRoomID}/${that.state.user}`).remove();
                                     firebase.database().ref(`${that.state.user}/${currentRoomID}`).remove();
                                     window.location.replace('/');

                                }} style={{fontWeight:'bold',
                                color:'white',
                                fontSize:'15px',
                                width:'55px',
                                height:'27px',
                                backgroundColor:'rgb(179, 0, 254)',
                                border:'none',
                                borderRadius:'5px',
                                justifyContent:'space-between',
                                display:that.state.postBtnVisible ? 'none' : 'flex',
                                padding:'0px 9px'}}>
                                Delete</button> */}
                                {/* <i className="fas fa-expand" style={{fontSize:30, color:'rgb(179, 0, 254)', marginRight:25}}></i> */}
                       
                        
                        {/* <RelatedRooms/> */}
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