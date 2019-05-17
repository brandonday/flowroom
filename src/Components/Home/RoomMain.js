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
import { WithContext as ReactTags } from 'react-tag-input';
let database = firebase.database();

AWS.config.update({
  region: 'us-west-2',
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-west-2:5df2511a-5595-416c-b148-aba28893c3f3'
  })
});


  
  const s3 = new S3();
  
  
  var moment = require('moment');
  let timer = null; 
  const messages = [];
  let names = [];
  let messagesSent = [];
  let messageList = [];
  let preventDuplicateArray = []; //keeps track
  let postData = [];
  let callOnce = false;
  let isUploaded = false;





let Loaded = false;
let isMenuOpen = false;
let gui = new dat.GUI();
document.getElementsByClassName('close-button close-bottom')[0].style.display = 'none';
let addedBefore = false;
let roomsPerPage = 4;
let roomFilter = 'weight';
let relatedRooms = [];
const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters1 = [KeyCodes.comma, KeyCodes.enter];
  const delimiters2 = [KeyCodes.comma, KeyCodes.enter];
  const delimiters3 = [KeyCodes.comma, KeyCodes.enter];
  const delimiters4 = [KeyCodes.comma, KeyCodes.enter];
  const delimiters5 = [KeyCodes.comma, KeyCodes.enter];
 let thumbPicURL;
class RoomMain extends Component {
    constructor(props) {
        super(props);
        this.descriptionhandleChange = this.descriptionhandleChange.bind(this);
        this.titlehandleChange = this.titlehandleChange.bind(this);
        this.imageTextPostedhandleChange = this.imageTextPostedhandleChange.bind(this);
        this.textPostedhandleChange = this.textPostedhandleChange.bind(this);
        this.communityhandleChange = this.communityhandleChange.bind(this);
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
           isLoading:false,
           userNameSelf:'',
           relatedRooms:[],
           isRemix:false,
           remixRoomID:'',
           remixUserName:'',
           userName:'',
           shortID:'',
           dateCreated:'',
           isOpen:false,
           showPublish:true,
           modalopen:false,
        ideaByTags: [

         ],
         creditsTags: [

         ],
         compatibleTags: [
            { id: "IE", text: "IE" },
            { id: "Chrome", text: "Chrome" },
            { id: "Firefox", text: "Firefox" },
            { id: "Opera", text: "Opera" },
         ],
         tags: [

         ],
         suggestionsIdeaBy: [

         ],
         suggestionscredits: [

         ],
         suggestionsCompatibleTags: [

         ],
         suggestionsTags: [

         ],
         suggestionNamesTags : [

         ],
         NamesTags : [

         ],
            isRemixable:false,
            isLive:false,
            isAR:false,
            isVR:false,
            is360:false,
            isAI:false,
            isDesktop:false,
            isTable:false,
            isMobile:false,
            isAllRes:false,
            isProduction:true,
            isObject:false,
            publicBtnClass:'',
            privateBtnClass:'',
            notPrivateBtnClass:'',
            unlistedBtnClass:'',
            notUnlistedBtnClass:'',
            roomPostBtnClass:'',
            imagePostBtnClass:'',
            textPostBtnClass:'',
            webBtnClass:'',
            nativeBtnClass:'',
            isWebNative:'',
            regBtnClass:'',
            exBtnClass:'',
            rmxBtnClass:'',
            notRmxBtnClass:'',
            liveBtnClass:'',
            notLiveBtnClass:'',
            notArVr360Class:'',
            arBtnClass:'',
            notARBtnClass:'',
            vrBtnClass:'',
            notVRBtnClass:'',
            three60BtnClass:'',
            notThree60BtnClass:'',
            aiBtnClass:'',
            notAIBtnClass:'',
            allResBtnClass:'',
            mobileBtnClass:'',
            tabletBtnClass:'',
            desktopBtnClass:'',
            objectBtnClass:'',
            notObjectClass:'',
            description:'',
            avatar:'',
            picURL:'',
            thumbPicURL:'',
            progress: 100,
            isUploading: false,
            descriptionD:'block',
            thumbnailPicBox:'flex',
            imagePost:'none',
            imageText:'none',
            roomType:'',
            textPosted:'',
            imageTextPosted:'',
            postedPicURL:'',
            objectOptions:{},
            textPosted:'',
            roomPrivacy:'',
            compatability:'',
            performance:'',
            communityApartOf:'',
            isWeb:false,
            isNative:false,
            isWebNative:false,
            placeholder:'',
            imagePostDisplay:'none',
            username:'',
            newMessage:'',
            messageTo:'',
            showBack:false,
            myusername:'',
            messages:[],
            messagebox:[],
            picForMessage:'',
            fullname:'',
            messageList:[],
            messageReset:false,
            theMessages:true,
            room_title:'',
            shortID:'',
            showSignInSignUp:false,
            room_card_height:246,
            room_aspect_ratio:1.3,
            repostedBy:'',
            repostedByArray:[],
            remixedByArray:[],
            isRemix:false, 
            remixRoomID:'', 
            remixUserName:''
            
        };
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

      this.handleDeletecredits = this.handleDeletecredits.bind(this);
      this.handleAdditioncredits = this.handleAdditioncredits.bind(this);
      this.handleDragcredits = this.handleDragcredits.bind(this);

      this.handleDeleteNames = this.handleDeleteNames.bind(this);
      this.handleAdditionalNames = this.handleAdditionalNames.bind(this);
      this.handleDragNames = this.handleDragNames.bind(this);

      this.handleDeleteIdeaBy = this.handleDeleteIdeaBy.bind(this);
      this.handleAdditionIdeaBy = this.handleAdditionIdeaBy.bind(this);
      this.handleDragIdeaBy = this.handleDragIdeaBy.bind(this);

      this.handleDeleteCompatibleTags = this.handleDeleteCompatibleTags.bind(this);
      this.handleAdditionCompatibleTags = this.handleAdditionCompatibleTags.bind(this);
      this.handleDragIdeaBy = this.handleDragIdeaBy.bind(this);

      this.handleDeleteTags = this.handleDeleteTags.bind(this);
      this.handleAdditionTags = this.handleAdditionTags.bind(this);
      this.handleDragTags = this.handleDragTags.bind(this);

      this.closeModal = this.closeModal.bind(this)
      this.selectPr.bind(this)

      this.getFileName = this.getFileName.bind(this);
      this.putObject = this.putObject.bind(this);
      this.getMimeType = this.getMimeType.bind(this);
    }
    descriptionhandleChange(event) {
        this.setState({description: event.target.value});
      }
    titlehandleChange(event) {
        this.setState({room_title: event.target.value});
      }
    imageTextPostedhandleChange(event) {
        this.setState({imageTextPosted: event.target.value});
    }
    textPostedhandleChange(event) {
        this.setState({textPosted: event.target.value});
    }
    communityhandleChange(event) {
        this.setState({communityApartOf: event.target.value});
    
    }
    componentDidMount() {
        let that = this;
        //this.incrementViews();
        var user = firebase.auth().currentUser;
        var name, email, photoUrl, uid, emailVerified, fullname;
        var shortID = window.location.pathname.split("room/").pop();
        let imageData = localStorage.getItem("thumbnail");
        this.setState({thumbPicURL:imageData});
        document.getElementById('main-menu').style.display = 'none';
        document.getElementById('tab-menu').style.height = 'none';
        
        window.datGUI = function(array) {
            let output = document.getElementById('output_frame').contentWindow;
            let guiProperties;
            let createDatGUI = function() {
                //alert('created')
                for(let i = 0; i < array.length; i++) {
                  

                    Object.keys(array[i]).forEach((key)=> {

                        //alert(key);
                        if(key !== 'color') {
                        this[key] = array[i][Object.keys(array[i])[0]];
                        }else {
                        this.color = '#fff'
                        }
                       });
                    
                    
                }
                //alert(this.text)
               
              //  document.getElementsByClassName("string").firstChild.style.display = 'flex';
            }
            guiProperties = new createDatGUI();
            let mainmenu = document.getElementById('main-menu');
            let remixTextBox = document.createElement('div');
            //remixTextBox.style.border = '1px solid red';
            remixTextBox.style.height = '330px';
            remixTextBox.style.width = '269px';
            remixTextBox.style.overflow = 'hidden';
            remixTextBox.style.marginTop = '20px';
            let remixTextTitle = document.createElement('div');
            let imgtitle = document.createElement('p');
            let imgclose = document.createElement('p');

            let imgico = document.createElement('i');
            imgico.className = 'fas fa-font';
            imgtitle.appendChild(imgico);
            imgtitle.appendChild(document.createTextNode('Text'));
            imgclose.appendChild(document.createTextNode('Close'));
            imgtitle.style.color = 'white';
            imgtitle.style.fontSize = '13px';
            imgtitle.style.marginLeft = '10px';
            imgtitle.style.fontWeight = '900';
            imgtitle.style.marginTop = '4px';
            imgclose.style.color = 'white';
            imgclose.style.fontSize = '10px';
            imgclose.style.marginRight = '20px'
            imgclose.addEventListener('click', function() {
              if(imgclose.innerText === 'Close') {
                remixTextBox.style.height = '33px';
                imgclose.innerText = 'Open';
              } else {
                remixTextBox.style.height = '330px';
                imgclose.innerText = 'Close';
                
              }
              
            });
            remixTextTitle.style.height = '28px';
            remixTextTitle.style.width = '100%';
            remixTextTitle.style.backgroundColor = '#141414';
            remixTextTitle.style.alignItems = 'center';
            remixTextTitle.style.display = 'flex';
            remixTextTitle.style.justifyContent = 'space-between';
            imgico.style.marginRight = '7px';
            remixTextTitle.appendChild(imgtitle);
            remixTextTitle.appendChild(imgclose);

            remixTextBox.appendChild(remixTextTitle);
            //gui.domElement
            remixTextBox.appendChild(gui.domElement);
            mainmenu.appendChild(remixTextBox);
            
            document.getElementsByClassName('close-button')[0].style.display = 'none';
            document.getElementsByClassName('dg')[0].style.display = 'block';

            for(let i = 0; i < array.length; i++) {
                

                    Object.keys(array[i]).forEach(function(key) {

                      // alert(key);

                        if(key === 'color') {
                            //alert('add color',  Object.keys(array[i])[1])
                            gui.addColor(guiProperties, 'color').onChange(setValue);
                        } else if (key !== 'color') {
                            //alert('add title',  Object.keys(array[i])[0])
                            gui.add(guiProperties, Object.keys(array[i])[0]).onChange(setValue);
                        }
                      
                      });
            }
            
            setValue();
            function setValue() {
                for(let i = 0; i < array.length; i++) {
                    // output[Object.keys(obj[i])[0]].innerHTML = text[Object.keys(obj[i])[0]];
                    // output[Object.keys(obj[i])[0]].style.color = text[Object.keys(obj[i])[0]];
                    // console.log(obj[i].remix)
                    Object.keys(array[i]).forEach(function(key) {

                       
                        if(key === 'color') {
                            output['title'].style.color = guiProperties['color'];
                        } else if (key !== 'color') {
                            output[key].innerHTML = guiProperties[Object.keys(array[i])[0]];
                        }
                      
                      });
                    
                        
                        
                }
            }
        }
        function myFunction(x) {
            if (x.matches) { // If media query matches
                if(isMenuOpen === false) {
                    //document.getElementById('tab-menu').style.display = 'none';
                } else {
                    //document.getElementById('tab-menu').style.display = 'block';
                }
                if(isMenuOpen === true) {
                    //document.getElementById('main-menu').style.display = 'block';
                }
          
                document.getElementById('main-menu').style.position = 'absolute';
                document.getElementById('main-menu').style.height = '583px';
                document.getElementById('main-menu').style.width = '330px';
                document.getElementById('main-menu').style.zIndex = '999994';
                document.getElementById('main-menu').style.top = '0px';
                document.getElementById('main-menu').style.zIndex = '999999';
                document.getElementById('main-menu').style.left = '48px';
                document.getElementById('main-menu').style.display = 'none';
                document.getElementById('main-section-wrap-comments-screen-wrap').style.top = '10px';
                document.getElementById('tab-menu').style.position = 'absolute';
                document.getElementById('tab-menu').style.zIndex = '999999';
                document.getElementById('tab-menu').style.height = '100%';
                document.getElementById('tab-menu').style.display = 'none';
                document.getElementById('menu-btn-mobile').style.display = 'flex';
                document.getElementById('rf-right').style.display = 'none';
                document.getElementById('rf-top').style.display = 'flex';
                document.getElementsByClassName('main-section-wrap-comments-box')[0].style.paddingLeft = '10px';
                document.getElementsByClassName('main-section-wrap-comments-box')[0].style.paddingRight = '10px';
                // document.getElementById('main-menu').style.position = 'absolute';
                // document.getElementById('main-menu').style.left = '-330px';
            } else {
                let main = document.getElementById('main-menu');
                let tabMenu = document.getElementById('tab-menu');
                tabMenu.style.position = 'relative';
                tabMenu.style.display = 'block';
                document.getElementById('tab-menu').style.transform = 0;
              
                
                main.style.borderRight = '1px solid rgb(24, 24, 24)';
                main.style.background = 'rgb(24, 24, 24)';
       
                main.style.flexDirection = 'column';
                if(isMenuOpen === true) {
                    //document.getElementById('main-menu').style.display = 'flex';
                }
                main.style.position = 'relative';
                main.style.left = '0px';
                document.getElementById('rf-right').style.display = 'flex';
                document.getElementById('rf-top').style.display = 'none';
                document.getElementById('menu-btn-mobile').style.display = 'none';
                document.getElementsByClassName('main-section-wrap-comments-box')[0].style.paddingLeft = '77px';
                document.getElementsByClassName('main-section-wrap-comments-box')[0].style.paddingRight = '36px';
                document.getElementById('main-section-wrap-comments-screen-wrap').style.top = '60px';
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
                dateCreated:snapshot.val().date
              });
              
              if(firebase.auth().currentUser !== null) {
                that.setState (
                    {
                     userNameSelf:firebase.auth().currentUser.displayName
                    }
                );
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
        
        const database = firebase.database();

        if (user != null) {
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            console.log('photo :',photoUrl)
            emailVerified = user.emailVerified;
            fullname = user.fullname;
            uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                     // this value to authenticate with your backend server, if
                     // you have one. Use User.getToken() instead.
                     that.setState({username:name, 
                        pic:photoUrl, 
                        fullname:fullname,
                        suggestionNamesTags:names, 
                        myusername:name
                    });
                    
            database.ref(`/follows/${name}/following`).once('value').then((snapshot) => {
                snapshot.forEach((childSnapShot) => {
                    names.push({id:`${childSnapShot.val()}`,text:`${childSnapShot.val()}`});
                })
                

            });

            
           database.ref(`rooms/${shortID}`).once('value').then(function(snapshot) {
                
                if(snapshot.val() == null) {
                    return;
                }
                console.log('snapshot :', snapshot.val())
                that.setState({room_title:snapshot.val().room_title,
                    description:snapshot.val().description, 
                    tags:snapshot.val().tags !== ''? snapshot.val().tags : [],
                    room_card_height:snapshot.val().room_card_height
                });
                
            });

        }
        this.setState({publicBtnClass:'selected-background',
            privateBtnClass:'',unlistedBtnClass:'',webBtnClass:'selected-background',
            roomType:'other',roomPostBtnClass:'selected-background',isProduction:true,
            regBtnClass:'selected-background',exBtnClass:'',isRemixable:false,rmxBtnClass:'selected-background',
            notRmxBtnClass:'',isLive:false,liveBtnClass:'selected-background',notLiveBtnClass:'',
            isAR:false,isVR:false,is360:false,notArVr360Class:'selected-background',arBtnClass:'',
            vrBtnClass:'',three60BtnClass:'',aiBtnClass:'',notAIBtnClass:'selected-background',
            isAI:false, mobileBtnClass:'selected-background',isDesktop:true,isTable:true,
            isMobile:true,tabletBtnClass:'selected-background',desktopBtnClass:'selected-background',
            isObject:false, notObjectClass:'selected-background',objectBtnClass:''
        });

                
    }
    componentWillUnmount() {
        this.setState({thumbPicURL:''});
    }
    saveRoom () {
        let hashids = new Hashids(uuid(), 6);
        let uid = firebase.auth().currentUser.uid;
        let html = this.props.state.dhtml.hasOwnProperty("dhtml") ?  this.props.state.dhtml.dhtml.html : '';
        let css = this.props.state.dhtml.hasOwnProperty("dhtml") ?  this.props.state.dhtml.dhtml.css: '';
        let js = this.props.state.dhtml.hasOwnProperty("dhtml") ?  this.props.state.dhtml.dhtml.js: '';

        let fileNameHTML = this.getFileName('html');
        let fileNameCSS = this.getFileName('css');
        let fileNameJS = this.getFileName('js');

        const urlHTML = `http://test.flowroom.com/uploads/${fileNameHTML}`;
        const urlCSS = `http://test.flowroom.com/uploads/${fileNameCSS}`;
        const urlJS = `http://test.flowroom.com/uploads/${fileNameJS}`;

        this.putObject('html', fileNameHTML, html);
        this.putObject('css', fileNameCSS, css);
        this.putObject('js', fileNameJS, js);

        // console.log('dhtml :',this.props.state.dhtml);
        // console.log('dhtml.dhtml :', this.props.state.dhtml.dhtml);
        let currentRoomID = window.location.pathname.split("room/").pop();
        this.props.startCreateRoom(
            {
                description:this.state.description,
                views:0,
                likes:0,
                html:'',
                css:'',
                js:'',
                urlHTML: urlHTML,
                urlCSS: urlCSS,
                urlJS: urlJS,
                pic:this.state.pic,
                objectNum:'',
                date: new Date(),
                filterGroup:'',
                Category:'',
                communityApartOf:this.state.communityApartOf,
                credits:this.state.creditsTags, //objects like arrays
                ideaBy:'', //
                likedBy:'',
                remixedBy:'',
                sharedBy:'',
                tags:this.state.tags,
                live:this.state.isLive,
                roomState:'',
                banned:'',
                objects:'',
                preferences:'',
                javascriptLibraries:'',
                HTML_Libraries:'',
                CSS_Style:'',
                flaggedNumber:'',
                report:'',
                isRemixable:this.state.isRemixable,
                isLive:this.state.isLive,
                isAR:this.state.isAR,
                isVR:this.state.isVR,
                is360:this.state.is360,
                isAI:this.state.isAI,
                isDesktop:this.state.isDesktop,
                isTable:this.state.isTable,
                isMobile:this.state.isMobile,
                isAllRes:this.state.isAllRes,
                isProduction:this.state.isProduction,
                isObject:this.state.isObject,
                upvotes:0,
                downvotes:0,
                roomType:'',
                isLocked:false,
                ipAddress:'',
                Name:'',
                browserCompatability:'', //objects like arrays,
                isUnlisted:false,
                isPrivate:false,
                isNSFW:false,
                isVerified:false,
                isDeveloper:false,
                isNormalUser:this.state.isProduction,
                userName:this.state.username,
                emailAddress:'',
                shortID:this.props.state.entireApp.post ? hashids.encode(1, 2, 3) : currentRoomID,
                permissions: { },
                uid:uid,
                postedPicURL:this.state.postedPicURL,
                roomType:this.state.roomType,
                thumbnail:localStorage.getItem("thumbnailUrl") === null? '' : localStorage.getItem("thumbnailUrl"),
                objectOptions:{},
                textPosted:this.state.textPosted,
                roomPrivacy:this.state.roomPrivacy,
                compatability:this.state.compatability,
                performance:this.state.performance,
                isWeb:this.state.isWeb,
                isNative:this.state.isNative,
                isWebNative:this.state.isWebNative,
                isPosted:false,
                real_time:[],
                data:[],
                room_title:this.state.room_title,
                room_aspect_ratio:this.state.room_aspect_ratio,
                room_card_height:this.state.room_card_height,
                repostedBy:this.state.repostedBy,
                repostedByArray:this.state.remixedByArray,
                remixedByArray:this.state.remixedByArray,
                isRemix:this.props.state.entireApp.isRemix, 
                remixRoomID:this.props.state.entireApp.remixRoomID, 
                remixUserName:this.props.state.entireApp.remixUserName,

        });
        if(document.getElementById('postbtn')) {
            document.getElementById('postbtn').style.display = 'none';
        }
        
     
        if(document.getElementById('savechanges')) {
            document.getElementById('savechanges').style.display = 'flex';
        }
        if(document.getElementById('deletebtn')) {
            document.getElementById('deletebtn').style.display = 'flex';
        }
    }
    async putObject(type, fileName, data) {
   
        let params = { 
            Bucket: 'test.flowroom.com',
            Key:'uploads/' + fileName,
            ContentEncoding: 'base64',
            ContentType: this.getMimeType(type),
            Body: data,
            
          }
      
        
        let that = this;
        s3.putObject(params, function(err, data) {
          console.log('err: ', err)
          if (err) {
            console.log('error :',err);
          } else {
            console.log('data :', data);
            let obj = {
              url:`http://test.flowroom.com/uploads/${fileName}`
            }
            console.log('obj :', obj);
            
          }
        });
      }
      getMimeType(type) {
        let mimeType = '';
        switch (type) {
          case 'html':
            mimeType = 'text/html';
            break;
          case 'css':
            mimeType = 'text/css';
            break;
          case 'js':  
            mimeType = 'text/javascript';
            break;
        }

        return mimeType;
    }
    getFileName(type) {
        let extension = '';
        switch (type) {
          case 'html':
            extension = '.html';
            break;
          case 'css':
            extension = '.css';
            break;
          case 'js': 
            extension = '.js'; 
            break;
        }
        let hashids = new Hashids(uuid(), 6);
        let fileName = hashids.encode(1, 2, 3) + extension;
        return fileName;
    }
    
    loadScreenShot() {
        console.log('load thumbnail')
            let imageData = localStorage.getItem('thumbnail');
            if(imageData !== null) {
                this.setState({thumbPicURL:imageData})
            }

    }
    handleCardAspectRatio(e) {
        this.setState({room_aspect_ratio: e.target.value});
    }
    handleCardHeight(e) {
        this.setState({room_card_height: e.target.value});
    }
    selectPr = (i) => {
        if(i !== null) {
            let elID = i;
            if(elID === 'room-post-btn') {
                this.setState({placeholder:'description...', roomPostBtnClass:'selected-background',
                    imagePostBtnClass:'',textPostBtnClass:'',description:"",descriptionD:'block',imagePost:'none',
                    imageText:'none',thumbnailPicBox:'flex',roomType:'other',imagePostDisplay:'none'
                });
            }
            if(elID === 'room-post-image-btn') {

                this.setState({descriptionD:'none',imagePost:'block',roomPostBtnClass:'',imagePostBtnClass:'selected-background',
                    textPostBtnClass:'',imageText:'block',thumbnailPicBox:'none',roomType:'image',imagePostDisplay:'flex'
                });
            }
            if(elID === 'room-post-text-btn') {
                this.setState({placeholder:"What's up?",roomPostBtnClass:'',imagePostBtnClass:'',
                    textPostBtnClass:'selected-background',description:"",descriptionD:'block',imagePost:'none',
                    imageText:'none',thumbnailPicBox:'none',roomType:'text',imagePostDisplay:'none'
                })
            }
            if(elID === 'public-btn') {
                this.setState({publicBtnClass:'selected-background',privateBtnClass:'',
                    unlistedBtnClass:'',isPrivate:false,isUnlisted:false
                });

            }
            if(elID === 'private-btn') {
                this.setState({publicBtnClass:'',privateBtnClass:'selected-background',
                    unlistedBtnClass:'',isPrivate:true,isUnlisted:false
                });

            }
            if(elID === 'unlisted-btn') {
                this.setState({publicBtnClass:'',privateBtnClass:'', unlistedBtnClass:'selected-background',
                    isPrivate:false, isUnlisted:true
                });

            }
            if(elID === 'web-btn') {
                this.setState({webBtnClass:'selected-background',
                    nativeBtnClass:'',webNativeBtnClass:'',isWeb:true,
                    isNative:false,isWebNative:false
                });
            }
            if(elID === 'native-btn') {
                this.setState({webBtnClass:'',nativeBtnClass:'selected-background',
                    webNativeBtnClass:'',isWeb:false,isNative:true,isWebNative:false
                });
            }
            if(elID === 'web-native-btn') {
                this.setState({webBtnClass:'',nativeBtnClass:'',webNativeBtnClass:'selected-background',
                    isWeb:false,isNative:false,isWebNative:true
                });
            }
            if(elID === 'reg-btn') {
                this.setState({isProduction:true,regBtnClass:'selected-background',exBtnClass:''});
            }
            if(elID === 'exp-btn') {
                this.setState({isProduction:false,regBtnClass:'',exBtnClass:'selected-background'});
            }
            if(elID === 'not-remixable') {
                document.getElementById('not-remixable').className = 'selected-background';
                this.setState({isRemixable:false,rmxBtnClass:'selected-background',notRmxBtnClass:''});
            }
            if(elID === 'remixable-btn') {
                document.getElementById('remixable-btn').className = 'selected-background';
                this.setState({rmxBtnClass:'',notRmxBtnClass:'selected-background',isRemixable:true});
            }
            if(elID === 'not-live') {
                this.setState({isLive:false,liveBtnClass:'selected-background',notLiveBtnClass:''});
            }
            if(elID === 'live-btn') {
                this.setState({isLive:true,liveBtnClass:'',notLiveBtnClass:'selected-background'});
            }
            if(elID === 'no-ar-vr-360-btn') {
                this.setState({isAR:false,isVR:false,is360:false,notArVr360Class:'selected-background',
                    arBtnClass:'',vrBtnClass:'',three60BtnClass:''
                });
            }
            if(elID === 'ar-btn') {
                this.setState({arBtnClass:'selected-background',notArVr360Class:'',vrBtnClass:'',
                    three60BtnClass:'',isAR:true,isVR:false,is360:false
                });
            }
            if(elID === 'vr-btn') {
                this.setState({isAR:false,vrBtnClass:'selected-background',
                    arBtnClass:'',notArVr360Class:'',three60BtnClass:'',
                    isVR:true,is360:false
                });
            }
            if(elID === '360-btn') {
                this.setState({arBtnClass:'',vrBtnClass:'',notArVr360Class:'',
                    three60BtnClass:'selected-background',isAR:false,isVR:false,
                    is360:true
                });
            }
            if(elID === 'yes-ai-btn') {
                this.setState({isAI:true,aiBtnClass:'selected-background',notAIBtnClass:''});
            }
            if(elID === 'no-ai-btn') {
                this.setState({aiBtnClass:'',notAIBtnClass:'selected-background',isAI:false});
            }
            if(elID === 'mobile-btn') {
                if(this.state.isMobile === false) {
                    this.setState({mobileBtnClass:'selected-background',isMobile:true});
                } else {
                    this.setState({mobileBtnClass:'',isMobile:false});
                }
            }
            if(elID === 'tablet-btn') {
                if(this.state.isTable === false) {
                    this.setState({isTable:true,tabletBtnClass:'selected-background'});
                } else {
                    this.setState({isTable:false,tabletBtnClass:''});
                }
            }
            if(elID === 'desktop-btn') {
                if(this.state.isDesktop === false) {
                    this.setState({isDesktop:true,desktopBtnClass:'selected-background'});
                } else {
                    this.setState({isDesktop:false,desktopBtnClass:''});
                }
            }
            if(elID === 'object-yes-btn') {
                this.setState({isObject:true,objectBtnClass:'selected-background'});
            }
            if(elID === 'object-no-btn') {
                this.setState({isObject:false,notObjectClass:'selected-background'});
            }
        }

    }
    incrementViews() {
        let database = firebase.database();
        database.ref(`rooms/${this.props.shortID}/views`).transaction(function(currentViews) {
            // If node/clicks has never been set, currentRank will be `null`.
            return (currentViews || 0) + 1;
          }).then(()=> {
            
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
    getProfileInfo(myusername) {
        let name = this.props.match.params.id.toLowerCase();
        let ref = firebase.database().ref("users");
        ref.once("value")
          .then((snapshot) => {
              console.log(snapshot.val())
            let hasName = snapshot.hasChild(`${name}`); // true
            
            if(hasName) {
                let snap = snapshot.val();
                let bio = snap[name].bio;
                let pic = snap[name].pic;
                if(myusername !== name) {
                    this.setState({displayIfOwn:'block'});
                    this.isFollowing(myusername);
                    this.Followers(name);
                } else {
                    this.setState({displayIfOwn:'none'});
                    this.isFollowing(myusername);
                    this.Followers(name);
                }
                this.setState({hasName:'found', name:name, bio:bio, pic:pic});
            } else {
                this.setState({hasName:'notfound',loading:(<div style={{display:'flex',flex:'1'}}>not found</div>)});
    
            }
          });
    } 
    isFollowing(myusername) {
        
        let name = this.props.match.params.id.toLowerCase();
        let ref = firebase.database().ref(`follows/${name}/followers`);
        ref.once("value")
          .then((snapshot) => {
              console.log('f',snapshot.numChildren())
            this.setState({followersNum:snapshot.numChildren()})
            let hasName = snapshot.hasChild(`${myusername}`); // true
            
            if(hasName) {
                //shown when following
                this.setState({followlbl:'unfollow'});
           
            } else {
                this.setState({followlbl:'follow'});
            }
          });
    } 
    Followers(name) {
      
        let ref = firebase.database().ref(`follows/${name}/following`);
        ref.once("value")
          .then((snapshot) => {
    
            this.setState({followingNum:snapshot.numChildren()})
         
          });
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
    async putObject(type, fileName, data) {
   
        let params = { 
            Bucket: 'test.flowroom.com',
            Key:'uploads/' + fileName,
            ContentEncoding: 'base64',
            ContentType: this.getMimeType(type),
            Body: data,
            
          }
      
        
        let that = this;
        s3.putObject(params, function(err, data) {
          console.log('err: ', err)
          if (err) {
            console.log('error :',err);
          } else {
            console.log('data :', data);
            let obj = {
              url:`http://test.flowroom.com/uploads/${fileName}`
            }
            console.log('obj :', obj);
            
          }
        });
      }
    createPublish() { 
       return(<div>testing</div>) 

    }
    description(e){
        //this.setState({description:e.target.value});
    }
    roomTitle(e) {
        console.log('state works', this.props.state);
        this.setState({room_title:e.target.value});
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
                                <i className="fas fa-font"></i>
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
                                <i class="fas fa-shapes" onClick={()=> {
                                    const element = document.querySelector('#main-add-section #menu-sel-wrap');
                                    const ball = styler(element); 

                                    tween({ from:600, to: -1081, duration: 200 }).start(v => ball.set('x', v));
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
                            <div id="innerSel" style={{justifyContent:'center',display:'flex', flexWrap:'wrap', height:'100%',width:'100%', alignItems:'center', background:'rgb(24, 24, 24)'}}></div>
                        </div>
                    </div>
                </div>
            </div>
            )
        } else if(this.state.remix === true) {
            
            return (
                <ImageEdit/>
)
        } else if(this.state.showPublish === true) {
            return (
                <div style={{height:'100%', width:'259px'}}>
                       <div style={{height:30, marginBottom:7, width:'100%', backgroundColor:'rgb(31,31,31)', display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0px 10px'}}>
                           <p style={{color:'white', fontSize:12}}>Publish Room</p>
                           <i className="fas fa-times" style={{color:'white'}}></i>
                        </div>     
                        <div style={{height:45, marginBottom:7, width:'100%', backgroundColor:'rgb(31,31,31)', padding:'0px 10px'}}>
                            <p style={{color:'white',fontSize:11}}>Title</p>
                            <input type="text" onChange={this.titlehandleChange.bind(this)} style={{height:20, width:'100%',borderRadius:3,border:'0px',backgroundColor:'rgb(37,37,37)',outline:'none'}}/>
                        </div>
                        <div style={{height:130, marginBottom:7, width:'100%', backgroundColor:'rgb(31,31,31)',padding:'0px 10px'}}>
                            <p style={{color:'white',fontSize:11}}>Description</p>
                            <textarea onChange={this.descriptionhandleChange.bind(this)} style={{border:'0px', outline:'none', height:50,width:'100%',borderRadius:3,backgroundColor:'rgb(37,37,37)',resize:'none'}}></textarea>
                        </div>
                        <div style={{height:55, marginBottom:7, width:'100%', backgroundColor:'rgb(31,31,31)',padding:'0px 10px'}}>
                            <p style={{color:'white',fontSize:11}}>Tags</p>
                            <ReactTags style={{marginBottom:10}} tags={this.state.tags}
                        suggestions={this.state.suggestionsTags}
                        handleDelete={this.handleDeleteTags}
                        handleAddition={this.handleAdditionTags}
                        handleDrag={this.handleDragTags}
                        placeholder={'Type any tags here'}
                        delimiters={delimiters4} />
                        </div>
                        <div style={{height:55, marginBottom:7, width:'100%', backgroundColor:'rgb(31,31,31)',padding:'0px 10px'}}>
                            <p style={{color:'white',fontSize:11}}>Visibility</p>
                            <select id="dropdown">
                                <option value="public">Public (Everyone including followers)</option>
                                <option value="private">Private (Only me)</option>
                                <option value="unlisted">Unlisted (Everyone you share with except followers)</option>
                                <option value="followers">Followers</option>
                            </select>                        
                        </div>
                        <div style={{height:147, marginBottom:7, width:'100%', backgroundColor:'rgb(31,31,31)',padding:'0px 10px'}}>
                            <p style={{color:'white',fontSize:11}}>Thumbnail Preview</p>
                            <div id="thumbnail-pic-box" style={{width:'100%', height:120,backgroundColor:'rgb(37,37,37)',borderRadius:3}}>
                            <img id="thumbnail-pic-display"
                             src={this.props.state.entireApp.image}
                             width={150}/>
                            </div>
                        </div>
                        <div style={{display:'flex',height:55, marginBottom:7, width:'100%', justifyContent:'center',alignItems:'center', padding:'0 10px'}}>
                            <div style={{backgroundColor:'grey',display:'flex',alignItems:'center',justifyContent:'center', height:'29px',width:'170px',marginRight:10,borderRadius:3,backgroundColor:'rgb(37, 37, 37)'}}>SAVE AS DRAFT</div>
                            <div style={{backgroundColor:'grey',display:'flex',alignItems:'center',justifyContent:'center', height:'29px',width:'170px',borderRadius:3,backgroundColor:'rgb(54, 255, 233)',fontWeight:'bold',color:'rgb(82, 82, 82)'}} onClick={
                                this.saveRoom.bind(this)
                            }>PUBLISH ROOM</div>
                        </div>              
                </div>
            )
        } else if(this.state.record === true) {
            return (<p>record</p>)
        }
     }
    
     handleDeletecredits(i) {
        const { creditsTags } = this.state;
        this.setState({
            creditsTags: creditsTags.filter((tag, index) => index !== i),
        });
    }

    handleAdditioncredits(tag) {
        this.setState(state => ({ creditsTags: [...state.creditsTags, tag] }));
    }

    handleDragcredits(tag, currPos, newPos) {
        const tags = [...this.state.creditsTags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ creditsTags: newTags });
    }



    handleDeleteIdeaBy(i) {
        const { ideaByTags } = this.state;
        this.setState({
           ideaByTags: ideaByTags.filter((tag, index) => index !== i),
        });
    }

    handleAdditionIdeaBy(tag) {
        this.setState(state => ({ ideaByTags: [...state.ideaByTags, tag] }));
    }

    handleDragIdeaBy(tag, currPos, newPos) {
        const tags = [...this.state.ideaByTags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ ideaByTags: newTags });
    }


    handleDeleteCompatibleTags(i) {
        const { compatibleTags } = this.state;
        this.setState({
            compatibleTags : compatibleTags.filter((tag, index) => index !== i),
        });
    }

    handleAdditionCompatibleTags(tag) {
        this.setState(state => ({ compatibleTags: [...state.compatibleTags, tag] }));
    }

    handleDragCompatibleTags(tag, currPos, newPos) {
        const tags = [...this.state.compatibleTags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ compatibleTags: newTags });
    }


    handleDeleteTags(i) {
        const { tags } = this.state;
        this.setState({
         tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAdditionTags(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }

    handleDragTags(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
    }


    handleDeleteNames(i) {
        const { NamesTags } = this.state;
        this.setState({
            NamesTags: NamesTags.filter((tag, index) => index !== i),
        });
    }

    handleAdditionalNames(tag) {
        this.setState(state => ({ NamesTags: [...state.NamesTags, tag] }));
    }

    handleDragNames(tag, currPos, newPos) {
        const tags = [...this.state.NamesTags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ NamesTags: newTags });
    }

    handleUploadSuccess = filename => {
        this.setState({ avatar: filename, progress: 100, isUploading: false });
        firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(url => {
                //this.setState({ postedPicURL: url });

            alert(url)
        });

    };

    handleUploadStart() {
        alert('daad')
    }
    handleUploadSuccess2 = filename => {
        this.setState({ avatar: filename, progress: 100, isUploading: false });
        firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(url => {
                this.setState({thumbPicURL: url });

                alert(url)
            });

    }
    render() {
        let that = this;
        const {isLoading} = this.state;

        return (
            <div id="room-main-page" className="page-wrap twilight room-main-page-wrap">
                <div style={{display:'flex',flexDirection:'column', height:'100%',width:'100%'}}>
                    <div style={{display:'flex',flex:'0 583px',position:'relative',overflow:'hidden'}}>
                        <div id="tab-menu" style={{
                            width:'48px', 
                            background:'rgb(14, 14, 14)',
                            height:'100%'
                        }}>
                        <div id="remix-tab" onClick={(e)=> { 
                                let thisElement = document.getElementById(e.target.id);
                                let tabsWithMenubgClass = document.getElementsByClassName('menubg');
                            if(thisElement !== undefined) {
                                if(thisElement.className !== 'menubg') {                            
                                   
                                   for(let i = 0; tabsWithMenubgClass.length; i++) {
                                    if(tabsWithMenubgClass[i] != undefined) {
                                        if(tabsWithMenubgClass[i].id !== thisElement.id) {
                                            tabsWithMenubgClass[i].className = '';
                                        } 
                                    }
                                   }
                                   thisElement.className = 'menubg'; 
                                  document.getElementById('remix-icon').style.backgroundImage = 'url(../infinity_cyan.svg)';
                               
                                  // document.querySelector(".svgClass").getSVGDocument().getElementById("svgInternalID").setAttribute("fill", "red")

                                }  
                            }
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
                            }} 
                            style={{
                                display:'flex',
                                height:'52px',
                                width:'48px',
                                flexDirection:'column',
                                alignItems:'center',
                                borderRight:'1px solid #181818',
                                borderBottom:'1px solid #181818',
                                justifyContent:'center',
                                cursor:'pointer'
                               
                            }} className="menu-bg-border">
                                <div id="remix-icon" style={{
                                    backgroundImage:'url(../infinity_grey.svg)',
                                    backgroundSize: '100% 100%',
                                    backgroundRepeat:'no-repeat',
                                    height:9,
                                    width:22,
                                    pointerEvents:'none'
                                    }}></div>
                                <p id="remix-text" style={{fontSize:10.2,fontWeight:'bold',width:'26px', pointerEvents:'none', marginTop:4}} className="menubgnot">REMIX</p>
                               
                        </div>
                        <div id="script-tag" refs="script-tag" onClick={(e)=> {
                            document.getElementById('resizable-box').style.height = '300px';
                            let thisElement = document.getElementById(e.target.id);
                            let tabsWithMenubgClass = document.getElementsByClassName('menubg');
                          if(thisElement !== undefined) {
                            if(thisElement.className !== 'menubg') {                            
                               
                               for(let i = 0; tabsWithMenubgClass.length; i++) {
                                if(tabsWithMenubgClass[i] != undefined) {
                                    if(tabsWithMenubgClass[i].id !== thisElement.id) {
                                        tabsWithMenubgClass[i].className = 'menubgnot';
                                    } 
                                }
                               }
                               thisElement.className = 'menubg'; 
                            }
                        }
                            
                            // let remixid = document.getElementById('remix-tab');
                            // let script = document.getElementById('script-tag');
                            // let postTab = document.getElementById('post-tab');
                            // remixid.className = '';
                            // remixid.style.borderRight = '0px solid #181818';  
                            // script.className = 'menubg';
                            // script.style.color = 'rgb(64, 255, 232)';
                            // postTab.className = '';
                            // postTab.style.color = 'rgb(82, 82, 82)';  
                            // remixid.style.color = 'rgb(82, 82, 82)';   
                        }} style={{
                            display:'flex',
                            cursor:'pointer',
                            height:'52px',
                            width:'48px',
                            flexDirection:'column',
                            alignItems:'center',
                            borderRight:'1px solid #181818',
                            borderBottom:'1px solid #181818',
                            justifyContent:'center'
                        }} className="menu-bg-border">
                            <div style={{
                                fontSize:'15px',
                                color:'white',
                                backgroundImage:'url(../code.svg)',
                                backgroundSize:'100% 100%',
                                backgroundRepeat:'no-repeat',
                                height:'14px',
                                width:'16px',
                                marginBottom:'3px',
                                pointerEvents:'none'
                            }}></div>
                            <p id="details-text" style={{fontSize:10.2,fontWeight:'bold',width:'26px',pointerEvents:'none'}} className="menubgnot">SCRIPT</p>
                        </div>
                        <div id="save-tab" onClick={()=> {
                            this.openModal(false)
                        }} style={{
                            display:that.state.userNameSelf === that.state.userName ? 'flex' : 'none',
                          
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
                        <div id="post-tab" onClick={(e)=> {
                            let that = this;
                            //this.openModal(true);
                            // let remixid = document.getElementById('remix-tab');
                            // let script = document.getElementById('script-tag');
                            // let postTab = document.getElementById('post-tab');
                            // remixid.className = '';
                            // remixid.style.borderRight = '0px solid #181818';  
                            // script.className = '';
                            // script.style.color = 'rgb(82, 82, 82)';
                            // postTab.className = 'menubg';
                            // postTab.style.color = 'rgb(64, 255, 232)';
                            let thisElement = document.getElementById(e.target.id);
                            let tabsWithMenubgClass = document.getElementsByClassName('menubg');
                            let mainmenu = document.getElementById('main-menu');
                            let remixImageList = document.getElementById('remix-image-list');
                           
                            if(thisElement != undefined) {
                            if(thisElement.className !== 'menubg') {                            
                               
                               for(let i = 0; tabsWithMenubgClass.length; i++) {
                                if(tabsWithMenubgClass[i] != undefined) {
                                    if(tabsWithMenubgClass[i].id !== thisElement.id) {
                                        tabsWithMenubgClass[i].className = 'menubgnot'
                                    } 
                                }
                               }
                               thisElement.className = 'menubg'; 
                               
                              if(document.getElementById('menu-info') !== null) {
                            //    document.getElementById('menu-info').remove();
                               document.getElementById('remix-image-box').remove();
                               document.getElementById('menu-info').remove();
                            //    document.getElementById('remix-list').remove();
                              }
                               that.setState({
                                details:false,
                                objects:false,
                                comments:false,
                                draw:false,
                                remix:false,
                                showPublish:true
                                });
                            
                            }
                        }
                        }} style={{
                            display:that.state.postBtnVisible ? 'flex' : 'none',
                           
                            height:'52px',
                            width:'48px',
                            flexDirection:'column',
                            alignItems:'center',
                            borderRight:'1px solid #181818',
                            borderBottom:'1px solid #181818',
                            justifyContent:'center',
                            cursor:'pointer'
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
                                marginBottom:'3px',
                                pointerEvents:'none'
                            }}></div>
                            <p id="publish-text" style={{fontSize:10.2,fontWeight:'bold',width:'38px', pointerEvents:'none'}} className="menubgnot">PUBLISH</p>
                        </div>
                        {/* <div id="objects" onClick={()=> {
                            // let objectsid = document.getElementById('objects');
                            // objectsid.className = 'menubg';
                            // objectsid.style.borderRight = '0px solid #181818';
                            // document.getElementById('objects').className = 'menubg'
                            // let remixid = document.getElementById('details');
                            // remixid.className = '';
                            // remixid.style.borderRight = '0px solid #181818';
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
                             }} style={{
                                    height:'50px',width:'48px',display:'flex',
                                    flexDirection:'column',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    borderRight:'1px solid #181818',
                                    borderBottom:'1px solid #181818'
                                    }} className="menu-bg-border">
                        
                            </div>  */}
                        </div>
            
                        <div id="main-menu" 
                            style={{
                                 
                                borderRight:'1px solid #181818',
                                background:'#FCFDFF',
                                left:'-330px',
                                backgroundColor:'#181818',
                                flexDirection:'column',
                                alignItems:'center',
                                transform:'none'
                        }}>
 
            
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
                    <div style={{display:this.state.userName == ''? 'none':'flex',flex:1, border:'0px solid red',background:'rgb(15, 15, 15)'}}>
                    {/* <button
                    style={{
                    position:'absolute',
                    background:'black',
                    height:'24px',
                    width:'68px',
                    zIndex:'9999999',
                    bottom:'3px',
                    right:'145px',
                    border:'1px solid rgb(64, 255, 232)',
                    color:'rgb(64, 255, 232)',
                    borderRadius:3
                    }}
                    >MENU</button> */}
                        <Comments isRemix={this.state.isRemix} 
                            remixRoomID={this.state.remixRoomID} 
                            remixUserName={this.state.remixUserName}
                            userName={this.state.userName}
                            dateCreated={this.state.dateCreated}
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
                            }}>
                            <div style={{
                                position:'absolute', 
                                height:'100%', 
                                width:'147px',
                                display:'flex',
                                justifyContent:'space-between',
                                alignItems:'center',
                                right:'59px'
                            }}>
                                <button id="menu-btn-mobile" onClick={()=>{
                                    
                                  
                                   if(this.state.isOpen === false) {
                                    const element = document.querySelector('#main-menu');
                                    const ball = styler(element); 
                                    
                                    tween({ from:0, to: 0, duration: 300 })
                                    .start(v => ball.set('x', v));
                                    document.getElementById('tab-menu').style.display = 'block';
                                    document.getElementById('main-menu').style.width = '269px';
                                    this.setState({isOpen:true});
                                    let remixid = document.getElementById('remix-tab');
                                    remixid.className = 'menubg';
                                     
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
                                   } else {
                                    const element = document.querySelector('#main-menu');
                                    const ball = styler(element); 
                                    
                                    tween({ from:0, to: -378, duration: 200 })
                                    .start(v => ball.set('x', v));
                                    document.getElementById('tab-menu').style.display = 'none';
                                    document.getElementById('main-menu').style.width = '269px';
                                    this.setState({isOpen:false});
                                   }
                                }} style={{
                                    fontWeight:'bold',
                                    color:'rgb(64, 255, 232)',
                                    fontSize:'11px',
                                    backgroundColor:'transparent',
                                    border:'1px solid rgb(64, 255, 232)',
                                    borderRadius:'5px',
                                    padding:'3px',
                                    right:'10px',
                                    display:'none',
                                    marginRight:'8px',
                                    outline:'none'
                            }}>{this.state.isOpen ? 'CLOSE MENU' : 'OPEN MENU'}</button>
                            <div id="full-screen" onClick={this.toggleFullScreen} style={{
                                display:'flex',
                                color:'white',
                        
                                flexDirection:'row',
                                alignItems:'center',
                                borderRight:'1px solid #181818',
                                borderBottom:'1px solid #181818',
                                justifyContent:'center',
                           
                                right:'69px',
                                bottom:'0px',
                                zIndex:'99999',
                                overflow:'hidden',
                                width:'63px',
                                justifyContent:'space-around'
                            }} 
                            className="menu-bg-border">
                                <i className="fas fa-expand" style={{
                                    fontSize:'15px',
                                    color:'white',
                                    position:'relative',
                                    }}></i>
                                    <p id="full-text" style={{fontSize:15,fontWeight:'bold',color:'white',width:'22px'}}>Full</p>
                            </div>
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
    startCreateRoom: (room) => dispatch(startCreateRoom(room))
  });

const ConnectedRoomMain = connect(mapStateToProps,mapDispatchToProps)(RoomMain)

export default ConnectedRoomMain;