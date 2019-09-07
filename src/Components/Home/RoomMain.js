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
import { tween, styler, calc } from 'popmotion';
import { startCreateRoom } from '../../actions/rooms';
import axios from 'axios';
import * as dat from 'dat.gui';
import html2canvas from 'html2canvas';
import AWS from 'aws-sdk';
import ImageEdit from './ImageEdit.js';
import * as S3 from 'aws-sdk/clients/s3';
import RelatedRoomPost from './RelatedRoomPost.js';
import { WithContext as ReactTags } from 'react-tag-input';
import { rgbUnit } from 'style-value-types';
import M from 'materialize-css';
var GphApiClient = require('giphy-js-sdk-core')
let client = GphApiClient("ybxqH0QDbtfnHTrTrFJ0BmLMX6QpEpWu")

let apps = [{},{}]
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
    let objects_arr = []


    let elements_arr = [{},{},{}];
    let element_options = ['GIFS','STICKERS','EMOJIS','TEXT'];

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
    let infinityIcon = `url(../infinity_cyan.svg)`;
    let infinityIconGray = `url(../infinity_grey.svg)`;

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
                modasOpen:true,
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
                remixUserName:'',
                postAsNewBtnVisible:false,
                welcome:false,
                element_menu:false,
                app_menu:false,
                script_menu:false,
                publish_menu:false,
                object_arr:[],
                fontAwesomeAdded:false,
                funType:'cats'
            
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
            this.makeResizableDiv =  this.makeResizableDiv.bind(this)
            this.funStuff = this.funStuff.bind(this)
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
            document.addEventListener('DOMContentLoaded', function() {
                var elems = document.querySelectorAll('.modal');
                var instances = M.Modal.init(elems);

                
              });
            let that = this;
            // alert('room loaded')
            let hashids = new Hashids(uuid(), 6);
       
            this.setState({shortID:hashids.encode(1, 2, 3)});

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
                            if(key !== 'color') {
                                this[key] = array[i][Object.keys(array[i])[0]];
                            } else {
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
                    document.getElementById('main-menu').style.height = '100%';
                    document.getElementById('main-menu').style.width = '271px';
                    document.getElementById('main-menu').style.zIndex = '999994';
                    document.getElementById('main-menu').style.top = '0px';
                    document.getElementById('main-menu').style.zIndex = '999999';
                    document.getElementById('main-menu').style.left = '56px';
                    // document.getElementById('remix-image-box').style.position = 'relative';
                    // document.getElementById('remix-image-box').style.top = '64px';
                    // if(document.getElementsByClassName('publish-wrap-wrap') !== null){
                    //     document.getElementsByClassName('publish-wrap-wrap')[0].style.width = '250px';
                    // }
                    document.getElementById('publish-menu').style.width = '267px'
                    document.getElementById('publish-menu').style.display = 'none';

                    document.getElementById('main-menu').style.display = 'none';
                    document.getElementById('main-section-wrap-comments-screen-wrap').style.top = '10px';
                    document.getElementById('tab-menu').style.position = 'absolute';
                    document.getElementById('tab-menu').style.zIndex = '999999';
                    document.getElementById('tab-menu').style.height = '100%';
                    document.getElementById('tab-menu').style.width = '56px';
                    document.getElementById('tab-menu').style.display = 'none';
                    if(document.getElementById('menu-info') !== null) {
                        document.getElementById('menu-info').style.width = '240px';
                    }
                    let remixImages = document.getElementsByClassName('remix-image');
                    for(let i = 0; i < remixImages.length; i++) {
                        remixImages[i].style.width = '112px';

                    }
                    document.getElementById('publish-menu').style.padding = '5px 16px 4px 3px'
                    document.getElementById('menu-btn-mobile').style.display = 'flex';
                    document.getElementById('rf-right').style.display = 'none';
                    document.getElementById('rf-top').style.display = 'flex';
                    document.getElementsByClassName('main-section-wrap-comments-box')[0].style.paddingLeft = '10px';
                    document.getElementsByClassName('main-section-wrap-comments-box')[0].style.paddingRight = '10px';
                    document.getElementById('save-as-draft').style.width = '118px';
                    document.getElementById('publish-room').style.width = '118px';
                    document.getElementById('publish-room').style.height = '30px';
                    document.getElementById('save-as-draft').style.height = '30px';
                    document.getElementById('save-as-draft').style.fontSize = '12px';
                    document.getElementById('publish-room').style.fontSize = '12px';
                    
                    if(document.getElementById('welcome-text') !== null) {
                     document.getElementById('welcome-text').style.fontSize = '14px';
                    }
                    if(document.getElementById('first-line-text') !== null) {
                        document.getElementById('first-line-text').style.fontSize = '12px';
                    }
                    if(document.getElementById('second-line-text') !== null) {
                        document.getElementById('second-line-text').style.fontSize = '12px';
                    }
                    if(document.getElementById('third-line-text') !== null) {
                        document.getElementById('third-line-text').style.fontSize = '12px';
                    }
                    if(document.getElementById('remix-image-box') !== null) {
                       
                        document.getElementById('remix-image-box').style.marginTop = '5px'
                       
                    }
                    if(document.getElementById('menu-info') !== null) {
                        document.getElementById('menu-info-box').style.width = '240px'
                       }
                    //document.getElementById('room-main-page').style.marginTop = '30px';
                   
                    
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
                    document.getElementById('room-main-page').style.marginTop = '0px';
                    //document.getElementById('room-wrap').style.flex = '5 1 0%';
                    document.getElementById('main-menu').style.maxWidth = '330px';
                    document.getElementById('main-menu').style.width = '100%';


               
                       if(document.getElementById('first-line-text') !== null) {
                           document.getElementById('first-line-text').style.fontSize = '1.6rem';
                       }
                       if(document.getElementById('second-line-text') !== null) {
                           document.getElementById('second-line-text').style.fontSize = '1.6remx';
                       }
                       if(document.getElementById('third-line-text') !== null) {
                           document.getElementById('third-line-text').style.fontSize = '1.6rem';
                       }
                       if(document.getElementById('remix-image-box') !== null) {
                          
                           document.getElementById('remix-image-box').style.marginTop = '1.6rem'
                          
                       }
                       if(document.getElementById('menu-info') !== null) {
                        document.getElementById('menu-info-box').style.width = '300px'
                       }
                       if(document.getElementById('welcome-text') !== null) {
                        document.getElementById('welcome-text').style.fontSize = '1.6rem';
                       }

                       if(document.getElementsByClassName('remix-image') !== null) {
                        let getclasses = document.getElementsByClassName('remix-image');
                        for(let i = 0; i < getclasses.length; i++) {
                            getclasses[i].style.height = '201px';
                            getclasses[i].style.width = '139px'
                        }
        

                       }
                       document.getElementById('publish-menu').style.width = '326px'
                       if(isMenuOpen === false) {
                        const element = document.querySelector('#main-menu');
                        const ball = styler(element); 
                        // alert('nnbnnb')
                        element.style.transform = 'translateX(0px) translateZ(-378px)';
                        }
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
                    that.setState (
                        {
                            isRemix:snapshot.val().isRemix,
                            remixRoomID:snapshot.val().remixRoomID,
                            remixUserName:snapshot.val().remixUserName,
                            userName:snapshot.val().userName,
                            shortID:snapshot.val().shortID,
                            dateCreated:snapshot.val().date
                        }   
                    );
              
                    if(firebase.auth().currentUser !== null) {
                        that.setState (
                        {
                            userNameSelf:firebase.auth().currentUser.displayName
                        }
                    );
                    let currentUser = firebase.auth().currentUser.uid;
                        if(currentUser === uid) {
                            that.setState({display:'flex', postBtnVisible:false, postAsNewBtnVisible:true, saveVisible:true});
                        } else {
                            that.setState({saveVisible:false,postBtnVisible:false, postAsNewBtnVisible:true,remixVisible:'block'});
                        }
                    } else {
                        that.setState({saveVisible:false,postBtnVisible:false, postAsNewBtnVisible:true, remixVisible:'block'});
                    }
                } else {
                    that.setState(
                        {
                            saveVisible:false,
                            postVisible:true,
                            remixVisible:true,
                            isRemix:false,
                            openModalomID:'',
                            remixUserName:'',
                            userName:'',
                            shortID:''
                        }
                    );
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
                that.setState(
                    {
                        username:name, 
                        pic:photoUrl, 
                        fullname:fullname,
                        suggestionNamesTags:names, 
                        myusername:name
                    }
                );
                    
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
                    that.setState(
                            {
                                room_title:snapshot.val().room_title,
                                description:snapshot.val().description, 
                                tags:snapshot.val().tags !== ''? snapshot.val().tags : [],
                                room_card_height:snapshot.val().room_card_height
                            }
                        );
                
                    }
                );

            }
            this.setState (
                {
                    publicBtnClass:'selected-background',
                    privateBtnClass:'',unlistedBtnClass:'',webBtnClass:'selected-background',
                    roomType:'other',roomPostBtnClass:'selected-background',isProduction:true,
                    regBtnClass:'selected-background',exBtnClass:'',isRemixable:false,rmxBtnClass:'selected-background',
                    notRmxBtnClass:'',isLive:false,liveBtnClass:'selected-background',notLiveBtnClass:'',
                    isAR:false,isVR:false,is360:false,notArVr360Class:'selected-background',arBtnClass:'',
                    vrBtnClass:'',three60BtnClass:'',aiBtnClass:'',notAIBtnClass:'selected-background',
                    isAI:false, mobileBtnClass:'selected-background',isDesktop:true,isTable:true,
                    isMobile:true,tabletBtnClass:'selected-background',desktopBtnClass:'selected-background',
                    isObject:false, notObjectClass:'selected-background',objectBtnClass:''
                }      
            );
            
       
        }
        componentWillUnmount() {
            this.setState({thumbPicURL:''});
        }
        saveRoom () {
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
        
 
            let iframe = document.getElementById('output_frame');
                            
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
            let uid = firebase.auth().currentUser.uid;
            s3.putObject(params, function(err, data) {
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

            let html = this.props.state.dhtml.hasOwnProperty("dhtml") ?  this.props.state.dhtml.dhtml.html : '';
            let css = this.props.state.dhtml.hasOwnProperty("dhtml") ?  this.props.state.dhtml.dhtml.css: '';
            let js = this.props.state.dhtml.hasOwnProperty("dhtml") ?  this.props.state.dhtml.dhtml.js: '';

            let fileNameHTML = this.getFileName('html');
            let fileNameCSS = this.getFileName('css');
            let fileNameJS = this.getFileName('js');

            const urlHTML = `http://test.flowroom.com/uploads/${fileNameHTML}`;
            const urlCSS = `http://test.flowroom.com/uploads/${fileNameCSS}`;
            const urlJS = `http://test.flowroom.com/uploads/${fileNameJS}`;
            

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
                    shortID:this.state.shortID,
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

                }
            );

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
                    this.setState (
                        {
                            placeholder:'description...', 
                            roomPostBtnClass:'selected-background',
                            imagePostBtnClass:'',
                            textPostBtnClass:'',
                            description:"",
                            descriptionD:'block',
                            imagePost:'none',
                            imageText:'none',
                            thumbnailPicBox:'flex',
                            roomType:'other',
                            imagePostDisplay:'none'
                        }
                    );
                }
                if(elID === 'room-post-image-btn') {

                    this.setState(
                        {
                            descriptionD:'none',imagePost:'block',roomPostBtnClass:'',imagePostBtnClass:'selected-background',
                            textPostBtnClass:'',imageText:'block',thumbnailPicBox:'none',roomType:'image',imagePostDisplay:'flex'
                        }   
                    );
                }
                if(elID === 'room-post-text-btn') {
                    this.setState(
                        {
                            placeholder:"What's up?",roomPostBtnClass:'',imagePostBtnClass:'',
                            textPostBtnClass:'selected-background',description:"",descriptionD:'block',imagePost:'none',
                            imageText:'none',thumbnailPicBox:'none',roomType:'text',imagePostDisplay:'none'
                        }
                    )
                }
                if(elID === 'public-btn') {
                    this.setState(
                        {
                            publicBtnClass:'selected-background',privateBtnClass:'',
                            unlistedBtnClass:'',isPrivate:false,isUnlisted:false
                        }
                    );

                }
                if(elID === 'private-btn') {
                    this.setState(
                        {
                            publicBtnClass:'',privateBtnClass:'selected-background',
                            unlistedBtnClass:'',isPrivate:true,isUnlisted:false
                        }
                    );

                }
                if(elID === 'unlisted-btn') {
                    this.setState(
                        {   
                            publicBtnClass:'',privateBtnClass:'', unlistedBtnClass:'selected-background',
                            isPrivate:false, isUnlisted:true
                        }
                    );
                }
                if(elID === 'web-btn') {
                    this.setState(
                        {
                            webBtnClass:'selected-background',
                            nativeBtnClass:'',webNativeBtnClass:'',isWeb:true,
                            isNative:false,isWebNative:false
                        }
                    );
                }
                if(elID === 'native-btn') {
                    this.setState(
                        {
                            webBtnClass:'',nativeBtnClass:'selected-background',
                            webNativeBtnClass:'',isWeb:false,isNative:true,isWebNative:false
                        }
                    );
                }
                if(elID === 'web-native-btn') {
                    this.setState(
                        {
                            webBtnClass:'',nativeBtnClass:'',webNativeBtnClass:'selected-background',
                            isWeb:false,isNative:false,isWebNative:true
                        }
                    );
                }
                if(elID === 'reg-btn') {
                    this.setState(
                        {
                            isProduction:true,regBtnClass:'selected-background',exBtnClass:''
                        }
                    );
                }
                if(elID === 'exp-btn') {
                    this.setState (
                        {
                            isProduction:false,regBtnClass:'',exBtnClass:'selected-background'
                        }
                    );
                }
                if(elID === 'not-remixable') {
                    document.getElementById('not-remixable').className = 'selected-background';
                    this.setState(
                        {
                            isRemixable:false,rmxBtnClass:'selected-background',notRmxBtnClass:''
                        }
                    );
                }
                if(elID === 'remixable-btn') {
                    document.getElementById('remixable-btn').className = 'selected-background';
                    this.setState (
                        {
                            rmxBtnClass:'',notRmxBtnClass:'selected-background',isRemixable:true
                        }
                    );
                }
                if(elID === 'not-live') {
                    this.setState(
                        {
                            isLive:false,liveBtnClass:'selected-background',notLiveBtnClass:''
                        }
                    );
                }
                if(elID === 'live-btn') {
                    this.setState(
                        {
                            isLive:true,liveBtnClass:'',notLiveBtnClass:'selected-background'
                        }
                    );
                }
                if(elID === 'no-ar-vr-360-btn') {
                    this.setState(
                        {
                            isAR:false,isVR:false,is360:false,notArVr360Class:'selected-background',
                            arBtnClass:'',vrBtnClass:'',three60BtnClass:''
                        }
                    );
                }
                if(elID === 'ar-btn') {
                    this.setState(
                        {
                            arBtnClass:'selected-background',notArVr360Class:'',vrBtnClass:'',
                            three60BtnClass:'',isAR:true,isVR:false,is360:false
                        }
                    );
                }
                if(elID === 'vr-btn') {
                    this.setState(
                        {   
                            isAR:false,vrBtnClass:'selected-background',
                            arBtnClass:'',notArVr360Class:'',three60BtnClass:'',
                            isVR:true,is360:false
                        }
                    );
                }
                if(elID === '360-btn') {
                    this.setState(
                        {
                            arBtnClass:'',vrBtnClass:'',notArVr360Class:'',
                            three60BtnClass:'selected-background',isAR:false,isVR:false,
                            is360:true
                        }
                    );
                }
                if(elID === 'yes-ai-btn') {
                    this.setState(
                        {
                            isAI:true,aiBtnClass:'selected-background',notAIBtnClass:''
                        }
                    );
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
            ref.once("value").then((snapshot) => {
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
        imageSearch(){
            const element = document.querySelector('#main-add-section #menu-sel-wrap');
            const ball = styler(element); 

            tween({ from:600, to: -1081, duration: 200 })
            .start(v => ball.set('x', v));

                                

            fetch('https://pixabay.com/api/?username=mjweaver01&key=11834841-58b8712ec406d0b987a8d8509')
            .then(function(response) {
                return response.json();
            }).then(function(myJson) {
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
                        //alert(getImageSaved);
                        document.getElementById('menu-wrap').style.display = 'block';
                        document.getElementById('menu').style.display = 'block';
                    });
                    img.src = myJson.hits[i].previewURL; 
                    node.appendChild(img);   
                    document.getElementById("innerSel").appendChild(node); 

                }
            });
        }
        shapesSection() {
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
        }
        funStuff(type = 'gifs', funType) {
            elements_arr = [];
            if(elements_arr.length === 0) {
                
            client.search(type, {"q": `${funType}`}).then((response) => {
                response.data.forEach((gifObject) => {
                    elements_arr.push(gifObject)
                                    let element_menu = document.createElement('div');

                element_menu.style.display = 'flex';
                element_menu.style.width = '100%';
                element_menu.style.flexWrap = 'wrap';
                element_menu.setAttribute("id","element-menu");
                element_menu.style.top = '10px';
                element_menu.style.position = 'relative';
                element_menu.style.display = 'flex';
                element_menu.style.justifyContent = 'space-between'
                    elements_arr.map((i) => {
                        let element = document.createElement('div');
                        if(i.images !== undefined) {
                            console.log(i.images.downsized_medium.url)
                            if(window.innerWidth < 698) {
                                element.style.height = '117px';
                                element.style.width = '117px';
                            } else {
                                element.style.height = '147px';
                                element.style.width = '147px';
                            }
                           
                            element.style.border = '0px solid white';
                            //element.style.marginRight = '7px';
                            element.style.marginBottom = '12px';
                            element.style.backgroundImage = `url(${i.images.downsized_medium.url})`;
                            element.style.borderRadius = '4px';
                            element.style.backgroundSize = 'cover';
    
                            element.addEventListener('click',()=>{
                                let object = document.createElement('div');
                                let resizers = document.createElement('div');
                                let resizerOne = document.createElement('div');
                                let resizerTwo = document.createElement('div');
                                let resizerThree = document.createElement('div');
                                let resizerFour = document.createElement('div');
                                let header = document.createElement('div');
                                header.style.height = '20px';
                                header.style.width = '125px';
                                //header.style.border = '1px solid black';
                                header.style.position = 'relative';
                                header.style.margin = 'auto';
                                header.style.display = 'flex';
                                header.style.top = '-34px';
    
                                let dragwrapper = document.createElement('div');
                                dragwrapper.style.display = 'flex';
                                dragwrapper.style.height = '20px';
                                dragwrapper.style.width = '64px';
                                //dragwrapper.style.border = '1px solid black';
                                dragwrapper.style.position = 'absolute';
                                dragwrapper.style.right = '0px';
                                dragwrapper.style.justifyContent = 'space-between';
    
    
                                let minimize = document.createElement('div');
                                minimize.setAttribute("id", 'minimize_' + i.id);
                                let minicon = document.createElement('i');
                                minicon.style.color = 'white';
                                minicon.className = 'fas fa-window-minimize';
                                // minicon.style.fontSize = '20px';
    
                                minimize.appendChild(minicon);
                                //minimize.style.height = '20px';
                                //minimize.style.width = '20px';
                                //minimize.style.border = '1px solid black';
    
                                let maximize = document.createElement('div');
                                maximize.setAttribute("id", 'maximize_' + i.id);
                                let maxicon = document.createElement('i');
                                maxicon.style.color = 'white';
                                maxicon.className = 'fas fa-window-maximize';
                                maximize.appendChild(maxicon);
    
                                //maximize.style.border = '1px solid black';
    
                                let close = document.createElement('div');
                                close.setAttribute('id', 'close_' + i.id);
                                let closeicon = document.createElement('i');
                                closeicon.style.color = 'white';
                                closeicon.className = 'fas fa-window-close';
                                close.appendChild(closeicon);
    
                                //close.style.border = '1px solid black';
    
                                dragwrapper.appendChild(minimize);
                                dragwrapper.appendChild(maximize);
                                dragwrapper.appendChild(close);
    
                                header.appendChild(dragwrapper);
    
    
                                header.style.display = 'flex';
                                header.style.flexDirection = 'row';
                                header.style.alignItems = 'center';
                                header.setAttribute("id", `${i.id+'header'}`);  
                                header.setAttribute("class", "draggable")
                                let dragMe = document.createElement('p');
    
                                dragMe.appendChild(document.createTextNode('DRAG'));
                                dragMe.style.color = 'white';
                                header.appendChild(dragMe);
    
                                let hashids = new Hashids(uuid(), 6);
    
    
                                // resizers.className = 'resizers';
                                // resizerOne.className = 'resizer top-left';
                                // resizerTwo.className = 'resizer top-right';
                                // resizerThree.className = 'resizer bottom-left';
                                // resizerFour.className = 'resizer bottom-right';
    
    
                                object.style.backgroundSize = 'cover';
                                object.style.height = '100px';
                                object.style.width = '100px';
                                object.style.border = '1px solid white';
                                //object.style.zIndex = '1000000000000000000000000';
                                object.className = 'resizable';
                               // object.style.position = 'absolute';
                                object.style.top = '0px';
                                let object_id = 'OBJECT_' + hashids.encode(1,2,3);
                                object.setAttribute("id", object_id);
                                // resizers.appendChild(resizerOne);
                                // resizers.appendChild(resizerTwo);
                                // resizers.appendChild(resizerThree)
                                // resizers.appendChild(resizerFour);
    
                                //object.appendChild(header)
                                //object.appendChild(resizers);
    
                                console.log(i)
    
    
    
                                //if(i.type === 'gif') {
                                let objectWrapper = document.createElement('div');
                                let dragSection = document.createElement('div');
                                dragSection.style.height = '30px';
                                dragSection.style.width = '100%';
                                document.getElementById('output_frame').contentDocument.body.style.display = 'flex';
                                let div = document.createElement('div');
                                //div.style.height = '200px';
                                // div.style.width = '300px';
                                div.style.margin = '10px 20px'
                                div.style.border = '0px solid blue';
                                div.style.position = 'relative';
                                div.setAttribute("id", `container${object.id}`);
                                let resizable = document.createElement('div');
                                resizable.className = 'resizable';
    
                                let resizers_box = document.createElement('div');
                                resizers_box.className = 'resizers';
                                let resizerTopLeft = document.createElement('div');
                                resizerTopLeft.className = 'resizer top-left';
                                let resizerTopRight = document.createElement('div');
                                resizerTopRight.className = 'resizer top-right';
                                let resizerBottomLeft = document.createElement('div');
                                resizerBottomLeft.className = 'resizer bottom-left';
                                let resizerBottomRight = document.createElement('div');
                                resizerBottomRight.className = 'resizer bottom-right';
    
                                resizers_box.appendChild(resizerTopLeft);
                                resizers_box.appendChild(resizerTopRight);
                                resizers_box.appendChild(resizerBottomLeft);
                                resizers_box.appendChild(resizerBottomRight);
    
                                resizable.setAttribute("id",`${i.id}`)
                                resizable.appendChild(resizers_box);
                                //resizable.appendChild(object)
                                
                                div.appendChild(resizable);
                                
    
                                document.getElementById('overlay_output_frame').contentDocument.getElementById('overlay-container').appendChild(div);
                                document.getElementById('overlay_output_frame').contentDocument.body.style.padding = '10px';
                    
                                resizable.style.backgroundImage = `url(${i.images.downsized_medium.url})`;
                               
                                this.makeResizableDiv(`#${i.id}`);
                                
                                // const xDraggables = document.getElementById('overlay_output_frame').contentWindow.Subjx(`#${object.id}`).drag({
                                    
                                // container:`#container${object.id}`,
                                // each: {
                                //     move: false,
                                //     resize: true, 
                                //     rotate: true
                                // }
                                // // snapping to grid (default: 10)
        
                                // });
    
    
                            
        
        
                                //}
                                let dhtml = JSON.parse(localStorage.getItem("dhtml"));
    
                                let html = document.getElementById('output_frame').contentWindow.document.body.innerHTML;
                                let dhtmlObj = {html:html, js:dhtml.js, css:dhtml.css}
    
    
                                localStorage.setItem("dhtml", JSON.stringify(dhtmlObj));
    
    
                            })
    
                            document.getElementById('element-menu').appendChild(element)
                        }
                    });
                })
            }).catch((err) => { })
          
            /// Sticker Search
        }
            
        }
        menuSelect() {
            if(this.state.details === true) {
        
                return (
                    <div className="menu-select">
                        <input className="menu-search" type="text" placeholder="search..."/>
            
                        <div id="main-add-section" className="main-add-section">
                            <div id="menu-sel-wrap" className="menu-sel-wrap">
                                <div className="menu-sel-wrap-wrap">

                                    <div className="images-section"  onClick={this.imageSearch.bind(this)} className="ball">
                                        <i className="fas fa-images"></i>
                                        <p>Images</p>
                                    </div>
                                    <div className="text-section">
                                        <i className="fas fa-font"></i>
                                        <p>Text</p>
                                    </div>
                                    <div classNames="gifs-section">
                                        <i className="fas fa-images"></i>
                                        <p>GIFS</p>
                                    </div>
                                    <div className="stickers-section">
                                        <i className="fas fa-images"></i>
                                        <p>Stickers</p>
                                    </div>
                                    <div className="shapes-section">
                                        <i class="fas fa-shapes" onClick={this.shapesSection.bind(this)}></i>
                                        <p>Shapes</p>
                                    </div>
                                    <div className="icons-section">
                                        <i className="fas fa-images"></i>
                                        <p>Icons</p>
                                    </div>
                                    <div className="videos-section">
                                        <i className="fas fa-images"></i>
                                        <p>Video</p>
                                    </div>
                                    <div className="audio-section">
                                        <i className="fas fa-images"></i>
                                        <p>Audio</p>
                                    </div>
                                </div>
                                <div id="selection" className="selection">
                                    <div id="innerSel" className="innerSel"></div>
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
                    <div className="publish-wrap-wrap" style={{height:'100%',paddingBottom:70}}>
                        <div className="publish-wrap">
                            <div className="publish-room" style={{height:30, marginBottom:7, width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0px 0px 0px 12px'}}>
                                <p style={{color:'white', fontSize:16}}>Publish Room</p>
                                <i className="fas fa-times" style={{color:'white',fontSize:14}}></i>
                            </div>     
                            <div className="publish-title" style={{height:75, marginBottom:10, width:'100%', backgroundColor:'rgb(31,31,31)', padding:'5px 10px'}}>
                                <p style={{color:'white',fontSize:14,marginBottom:5}}>Title</p>
                                <input type="text" onChange={this.titlehandleChange.bind(this)} style={{height:33, width:'100%',borderRadius:3,border:'0px',backgroundColor:'rgb(37,37,37)',outline:'none',paddingLeft:10,color:'white',fontSize:15,color:'rgb(64, 255, 232)'}}/>
                            </div>
                            <div className="publish-description" style={{height:155, marginBottom:10, width:'100%', backgroundColor:'rgb(31,31,31)',padding:'5px 10px'}}>
                                <p style={{color:'white',fontSize:14}}>Description</p>
                                <textarea className="description-textarea" onChange={this.descriptionhandleChange.bind(this)} style={{border:'0px', outline:'none',width:'100%',borderRadius:3,backgroundColor:'rgb(37,37,37)',resize:'none',marginTop:5,height:114,padding:10,fontSize:15,color:'rgb(64, 255, 232)'}} placeholder="Type in your text"></textarea>
                            </div>
                            <div className="publish-tags" style={{marginBottom:10, width:'100%', backgroundColor:'rgb(31,31,31)',padding:'2px 10px'}}>
                                <p style={{color:'white',fontSize:14,margin:'4px 0px 6px 0px'}}>Tags</p>
                                <ReactTags style={{marginBottom:10}} inline={false} tags={this.state.tags}
                                suggestions={this.state.suggestionsTags}
                                handleDelete={this.handleDeleteTags}
                                handleAddition={this.handleAdditionTags}
                                handleDrag={this.handleDragTags}
                                placeholder={'Type any tags here'}
                                delimiters={delimiters4} />
                            </div>
                            <div className="publish-visibility" style={{height:90, marginBottom:18, width:'100%', backgroundColor:'rgb(31,31,31)',padding:'1px 10px'}}>
                                <p style={{color:'white',fontSize:14,margin:'10px 0px'}}>Visibility</p>

                                <div class="dropdown" style={{width:'100%'}}>
                                    <input type="checkbox" id="my-dropdown" value="" name="my-checkbox" style={{width:'100%'}}/>
                                        <label for="my-dropdown" data-toggle="dropdown" style={{width:'100%',color:'white'}}>
                                            <p style={{fontSize:12}}>Choose one</p>
                                            <i class="fas fa-chevron-down" style={{float:'right',position:'absolute',right:'10px',top:'10px'}}></i>
                                        </label>
                                        <ul style={{zIndex:999999999, backgroundColor:'rgb(37, 37, 37)'}}>
                                            <li style={{fontSize:12.5,color:'#fff',margin:'10px 5px'}}>Public (Everyone including followers)</li>
                                            <li style={{fontSize:12.5,color:'#fff',margin:'10px 5px'}}>Followers (Only your followers)</li>
                                            <li style={{fontSize:12.5,color:'#fff',margin:'10px 5px'}}>Private (Only me)</li>
                                            <li style={{fontSize:12.5,color:'#fff',margin:'10px 5px'}}>Unlisted (Share with a link)</li>
                                          
                                        </ul>
                                </div>  
                            </div>
                            <div style={{height:290, marginBottom:7, width:'100%', backgroundColor:'rgb(31,31,31)',padding:'0px 10px'}}>
                                <div style={{display:'flex',justifyContent:'space-between'}}>
                                    <p style={{color:'white',fontSize:14,margin:'10px 0px'}}>Card Preview</p>
                                    <p onClick={()=>{
                                        document.getElementById('card-thumb-wrap').style.display = 'flex';
                                        document.getElementById('black-opacity-modal').style.display = 'flex';
                                    }} style={{color:'white',fontSize:11,margin:'10px 0px'}}>Edit</p>
                                </div>
                                <div id="thumbnail-pic-box" style={{width:'100%', height:240,backgroundColor:'rgb(37,37,37)',borderRadius:3,position:'relative'}}>
                                    <div id="thumb-pre-loader" style={{position:'absolute',height:120,width:278,display:'flex',justifyContent:'center',alignItems:'center',display:'none'}}>
                                        <div className="preloader-wrapper big active">
                                            <div className="spinner-layer spinner-blue-only">
                                                <div className="circle-clipper left">
                                                    <div className="circle"></div>
                                                </div>
                                                <div className="gap-patch">
                                                    <div className="circle"></div>
                                                </div>
                                                <div className="circle-clipper right">
                                                    <div className="circle"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="thumbnail-pic-display" style={{backgroundImage:`url{${this.props.state.entireApp.image})`, backgroundSize:'cover',backgroundPosition:'center'}}
                                        width={150}></div>
                                    <div style={{position:'absolute',height:'100%',width:'320px',backgroundColor:'black',top:'0px',visibility:'hidden'}}>
                                        <div id="iframe-wrap" style={{height:'246px', width:'320px'}}>
                                    
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            } else if(this.state.script_menu === true) {
                return ( 
                    <div  style={{border:'1px solid rgb(34, 34, 34)', width:'259px', 
                        borderRadius:'3px', marginTop:'11px', 
                        padding:'20px', display:'flex', 
                        justifyContent:'center', 
                        flexDirection:'column'}}>
                        {/* <div style={{display:'flex', 
                            justifyContent:'space-between', 
                            height:'20px', 
                            width: '100%'}}>
                            <div style={{backgroundImage:infinityIcon, 
                                backgroundSize:'100% 100%', 
                                backgroundRepeat:'no-repeat', 
                                height:'20px', 
                                width:'25px'}}></div>
                                <div style={{display:'flex', 
                                    alignItems:'center', 
                                    justifyContent:'space-between', 
                                    width:'45px'}}>
                                        <p style={{fontSize:'11px', color:'white'}}>close</p>
                                        <p style={{fontSize:'20px', color:'white'}}>X</p></div></div>
                                        <p style={{color:'rgb(54, 255, 233)'}}>Welcome to the Script Menu</p><div>
                                        <p style={{color:'white', fontSize:'15px'}}>Here you can swap Text,</p>
                                        <p style={{color:'white', fontSize: '15px'}}>Images, and other elements</p>
                                        <p style={{color: 'white', fontSize: '15px', paddingBottom:'10px'}}>inside of flows.</p>
                                        <p style={{color:'white', fontSize:'15px'}}>Click here for step by step</p>
                                        <p style={{color:'white', fontSize:'15px'}}>video walkthroughs</p>
                                    </div> */}
                        </div>
                )
            }
        }

        RemixTab(e) {
  
            let list = document.getElementById('main-menu');
            let thisElement = document.getElementById(e.target.id);
            let tabsWithMenubgClass = document.getElementsByClassName('menubg');
            let menuinfo = document.createElement('div');
            document.getElementById('publish-section').style.display = 'none';
    
            menuinfo.setAttribute("id", "menu-info");
            
            // menuinfo.style.height = '170px';
            // menuinfo.style.width = '300px';
            //menuinfo.style.left = '8px';

            if(window.innerWidth > 698) {
                menuinfo.style.height = '200px';
                menuinfo.style.width = '300px';
              } else {
                menuinfo.style.height = '200px';
                menuinfo.style.width = '240px';
              }
             
            menuinfo.style.position = 'relative';
            let menuinfobox = document.createElement('div');
            let menuinfotop = document.createElement('div');
            let infinity = document.createElement('div');
            menuinfotop.style.display = 'flex';
            menuinfotop.style.justifyContent = 'space-between';
            menuinfotop.style.height = '20px';
            menuinfotop.style.width = '100%';
            menuinfobox.style.border = '1px solid #222222';
            // menuinfobox.style.height = '147px';
       
            
            //menuinfobox.style.width = '300px';
            
            menuinfobox.style.borderRadius = '3px';
            menuinfobox.style.marginTop = '11px';
            infinity.style.backgroundImage = infinityIcon;
            infinity.style.backgroundSize = '100% 100%';
            infinity.style.backgroundRepeat = 'no-repeat';
            infinity.style.height = '20px';
            infinity.style.width = '25px';
            let closebox = document.createElement('div');
            closebox.style.display = 'flex';
            closebox.style.alignItems = 'center';
            closebox.style.justifyContent = 'space-between';
            closebox.style.width = '45px';
            let welcometext = document.createElement('p');
            welcometext.style.color = 'rgb(54, 255, 233)';
            welcometext.style.marginTop = '10px';
            welcometext.style.marginBottom = '10px';
            welcometext.appendChild(document.createTextNode('Welcome to the Remix Menu'));
            welcometext.setAttribute("id","welcome-text");
            if(window.innerWidth > 698) {
                welcometext.style.fontSize = '1.6rem'
            } else {
                welcometext.style.fontSize = '14px';
            }
    
            let firstLine = document.createElement('p');
            firstLine.style.color = 'white';
            //firstLine.style.fontSize = '15px';
            firstLine.appendChild(document.createTextNode('Here you can swap Text, Images,'));
            if(window.innerWidth > 698) {
                firstLine.style.fontSize = '1.6rem'
            } else {
                firstLine.style.fontSize = '12px';
            }
            firstLine.setAttribute("id","first-line-text");
    
            let secondLine = document.createElement('p');
            secondLine.style.color = 'white';
           // secondLine.style.fontSize = '15px';
            secondLine.appendChild(document.createTextNode('and other elements inside of flows.'));
            if(window.innerWidth > 698) {
                secondLine.style.fontSize = '1.6rem'
            } else {
                secondLine.style.fontSize = '12px';
            }

            secondLine.setAttribute("id","second-line-text");

            let thirdLine = document.createElement('p');
            thirdLine.style.color = 'white';
            //thirdLine.style.fontSize = '15px';
            thirdLine.appendChild(document.createTextNode('Click on the Remixable Items below to get started.'));
            thirdLine.setAttribute("id", "third-line-text");
            thirdLine.style.paddingBottom = '10px';
            thirdLine.style.marginTop = '10px';
            if(window.innerWidth > 698) {
                thirdLine.style.fontSize = '1.6rem'
            } else {
                thirdLine.style.fontSize = '12px';
            }
            let fourthLine = document.createElement('p');
            fourthLine.style.color = 'white';
            //fourthLine.style.fontSize = '15px';
           // fourthLine.appendChild(document.createTextNode('Click here for step by step'));
            if(window.innerWidth > 698) {
                fourthLine.style.fontSize = '1.6rem'
            } else {
                fourthLine.style.fontSize = '12px';
            }
    
            let fifthLine = document.createElement('p');
            fifthLine.style.color = 'white';
            //fifthLine.style.fontSize = '15px';
            //fifthLine.appendChild(document.createTextNode('video walkthroughs'));
            if(window.innerWidth > 698) {
                fifthLine.style.fontSize = '1.6rem'
            } else {
                fifthLine.style.fontSize = '12px';
            }
            let welcome_texts = document.createElement('div');
    
            let closet = document.createElement('p');
            let closex = document.createElement('p');
            let closeicon = document.createElement('i');
            closeicon.setAttribute("class", "fa fa-times");
            closeicon.style.color = 'white'; 
            closeicon.style.float = 'right'; 
            closeicon.style.fontSize = '15px';
            closex.appendChild(closeicon);
            closex.style.fontSize = '20px';
            closex.style.color = 'white';
            closet.appendChild(document.createTextNode('Close'));
            closet.style.fontSize = '11px';
            closet.style.color = 'white';
            menuinfotop.appendChild(infinity);
            closebox.appendChild(closet);
            closebox.appendChild(closex);
            
            closebox.addEventListener('click', ()=>{
                document.getElementById('menu-info').remove()
            });
            closebox.style.cursor = 'pointer';
            menuinfotop.appendChild(closebox);
            menuinfobox.appendChild(menuinfotop)
            menuinfobox.appendChild(welcometext);
            menuinfobox.style.padding = '20px';
            menuinfobox.setAttribute("id", "menu-info-box");
            
            welcome_texts.appendChild(firstLine);
            welcome_texts.appendChild(secondLine);
            welcome_texts.appendChild(thirdLine);
            welcome_texts.appendChild(fourthLine);
            welcome_texts.appendChild(fifthLine);
           
       
            if(this.state.welcome === false) {
                menuinfo.appendChild(menuinfobox);
            
            menuinfobox.appendChild(welcome_texts);
            menuinfobox.style.display = 'flex';
            menuinfobox.style.justifyContent = 'center';
            menuinfobox.style.flexDirection = 'column';
            this.setState({welcome:true});
            list.style.padding = '7px 14px 2px 7px';
            list.appendChild(menuinfo);
            }
            
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
    
                    document.getElementById('remix-icon').style.backgroundImage = infinityIcon;
                    document.getElementById('remix-text').style.color = "rgb(54, 255, 233)";
    
                    document.getElementById('script-icon').style.backgroundImage = `url(../code_grey.svg)`;
                    document.getElementById('script-text').style.color = "rgb(82, 82, 82)";
                    if(document.getElementById('publish-new-icon') !== null) {
                        document.getElementById('publish-new-icon').style.backgroundImage = `url(../save-regular-grey.svg)`;
                        document.getElementById('publish-text-new').style.color = "rgb(82, 82, 82)";
                        document.getElementById('publish-text-publish').style.color = 'rgb(82, 82, 82)'
                    }
                    document.getElementById('elements-icon').style.color = `rgb(82, 82, 82)`;
                    document.getElementById('elements-text').style.color = "rgb(82, 82, 82)";
    
                    document.getElementById('apps-icon').style.color = `rgb(82, 82, 82)`;
                    document.getElementById('apps-text').style.color = "rgb(82, 82, 82)";
    
               
                    if(document.getElementById('element-menu') !== null) {
                        document.getElementById('element-menu').remove();
                    }
                    if(document.getElementById('app-menu') !== null) {
                        document.getElementById('app-menu').remove();
                    }
                    if(document.getElementById('elements') !== null) {
                        document.getElementById('elements').remove();
                    }

                    if(document.getElementById('search-input') !== null) {
                        document.getElementById('search-input').remove()
                    }

                    if(document.getElementById('search-giphy-wrap') !== null) {
                        document.getElementById('search-giphy-wrap').remove()
                    }

                    if(document.getElementById('close-search-wrap') !== null) {
                        document.getElementById('close-search-wrap').remove()
                    }

            
              // document.querySelector(".svgClass").getSVGDocument().getElementById("svgInternalID").setAttribute("fill", "red")
    
                }  
            }
            this.setState(
                    {
                        details:false,
                        objects:false,
                        comments:false,
                        draw:false,
                        remix:true,
                        preferences:false,
                        record:false
      
                    }
            );
            document.getElementById('main-menu').style.display = 'block';
            document.getElementById('main-menu').style.overflowY = 'scroll';
            //document.getElementById('main-menu').style.width = '269px';
            isMenuOpen = true;
        }
        ElementsTabs(e) {
            let thisElement = document.getElementById(e.target.id);
            let tabsWithMenubgClass = document.getElementsByClassName('menubg');
            let menuinfo = document.getElementById('menu-info');
            this.funStuff('gifs');
            
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

                document.getElementById('remix-icon').style.backgroundImage = infinityIconGray;
                document.getElementById('remix-text').style.color = "rgb(82, 82, 82)";

                document.getElementById('script-icon').style.backgroundImage = `url(../code_grey.svg)`;
                document.getElementById('script-text').style.color = "rgb(82, 82, 82)";

                if(document.getElementById('publish-new-icon') !== null) {
                    document.getElementById('publish-new-icon').style.backgroundImage = `url(../save-regular-grey.svg)`;
                    document.getElementById('publish-text-new').style.color = "rgb(82, 82, 82)";
                    document.getElementById('publish-text-publish').style.color = "rgb(82, 82, 82)";
                }
                document.getElementById('elements-icon').style.color = `rgb(54, 255, 233)`;
                document.getElementById('elements-text').style.color = 'rgb(54, 255, 233)';
            
                document.getElementById('apps-icon').style.color = `rgb(82, 82, 82)`;
                document.getElementById('apps-text').style.color = 'rgb(82, 82, 82)';

                let mainmenu = document.getElementById('main-menu');
                mainmenu.style.display = 'flex';
                //mainmenu.style.width = '269px';
                mainmenu.style.padding = '10px'
                let element_menu = document.createElement('div');

                element_menu.style.display = 'flex';
                element_menu.style.width = '100%';
                element_menu.style.flexWrap = 'wrap';
                element_menu.setAttribute("id","element-menu");
                element_menu.style.top = '10px';
                element_menu.style.position = 'relative';
                element_menu.style.display = 'flex';
                element_menu.style.justifyContent = 'space-between';
                element_menu.style.padding = '0px 2px';
                element_menu.style.height = 'calc(100% - 124px)';
                element_menu.style.overflowY = 'scroll'

                elements_arr.map((i) => {
                    let element = document.createElement('div');
                    if(i.images !== undefined) {
                        console.log(i.images.downsized_medium.url)
                        if(window.innerWidth < 698) {
                            element.style.height = '117px';
                            element.style.width = '117px';
                        } else {
                            element.style.height = '147px';
                            element.style.width = '147px';
                        }
                 
                        element.style.border = '0px solid white';
                         //element.style.marginRight = '7px';
                         element.style.marginBottom = '12px';
                        element.style.backgroundImage = `url(${i.images.downsized_medium.url})`;
                        element.style.backgroundSize = 'cover';
                        element.style.borderRadius = '4px'

                        element.addEventListener('click',()=>{
                            let object = document.createElement('div');
                            let resizers = document.createElement('div');
                            let resizerOne = document.createElement('div');
                            let resizerTwo = document.createElement('div');
                            let resizerThree = document.createElement('div');
                            let resizerFour = document.createElement('div');
                            let header = document.createElement('div');
                            header.style.height = '20px';
                            header.style.width = '125px';
                            //header.style.border = '1px solid black';
                            header.style.position = 'relative';
                            header.style.margin = 'auto';
                            header.style.display = 'flex';
                            header.style.top = '-34px';

                            let dragwrapper = document.createElement('div');
                            dragwrapper.style.display = 'flex';
                            dragwrapper.style.height = '20px';
                            dragwrapper.style.width = '64px';
                            //dragwrapper.style.border = '1px solid black';
                            dragwrapper.style.position = 'absolute';
                            dragwrapper.style.right = '0px';
                            dragwrapper.style.justifyContent = 'space-between';


                            let minimize = document.createElement('div');
                            minimize.setAttribute("id", 'minimize_' + i.id);
                            let minicon = document.createElement('i');
                            minicon.style.color = 'white';
                            minicon.className = 'fas fa-window-minimize';
                            // minicon.style.fontSize = '20px';

                            minimize.appendChild(minicon);
                            //minimize.style.height = '20px';
                            //minimize.style.width = '20px';
                            //minimize.style.border = '1px solid black';

                            let maximize = document.createElement('div');
                            maximize.setAttribute("id", 'maximize_' + i.id);
                            let maxicon = document.createElement('i');
                            maxicon.style.color = 'white';
                            maxicon.className = 'fas fa-window-maximize';
                            maximize.appendChild(maxicon);

                            //maximize.style.border = '1px solid black';

                            let close = document.createElement('div');
                            close.setAttribute('id', 'close_' + i.id);
                            let closeicon = document.createElement('i');
                            closeicon.style.color = 'white';
                            closeicon.className = 'fas fa-window-close';
                            close.appendChild(closeicon);

                            //close.style.border = '1px solid black';

                            dragwrapper.appendChild(minimize);
                            dragwrapper.appendChild(maximize);
                            dragwrapper.appendChild(close);

                            header.appendChild(dragwrapper);


                            header.style.display = 'flex';
                            header.style.flexDirection = 'row';
                            header.style.alignItems = 'center';
                            header.setAttribute("id", `${i.id+'header'}`);  
                            header.setAttribute("class", "draggable")
                            let dragMe = document.createElement('p');

                            dragMe.appendChild(document.createTextNode('DRAG'));
                            dragMe.style.color = 'white';
                            header.appendChild(dragMe);

                            let hashids = new Hashids(uuid(), 6);


                            // resizers.className = 'resizers';
                            // resizerOne.className = 'resizer top-left';
                            // resizerTwo.className = 'resizer top-right';
                            // resizerThree.className = 'resizer bottom-left';
                            // resizerFour.className = 'resizer bottom-right';


                            object.style.backgroundSize = 'cover';
                            if(window.innerWidth < 698) {
                                object.style.height = '117px';
                                object.style.width = '117px';
                            } else {
                                object.style.height = '147px';
                                object.style.width = '147px';
                            }
                            


                            object.style.border = '1px solid white';
                            //object.style.zIndex = '1000000000000000000000000';
                            object.className = 'resizable';
                           // object.style.position = 'absolute';
                            object.style.top = '0px';
                            let object_id = 'OBJECT_' + hashids.encode(1,2,3);
                            object.setAttribute("id", object_id);
                            // resizers.appendChild(resizerOne);
                            // resizers.appendChild(resizerTwo);
                            // resizers.appendChild(resizerThree)
                            // resizers.appendChild(resizerFour);

                            //object.appendChild(header)
                            //object.appendChild(resizers);

                            console.log(i)



                            //if(i.type === 'gif') {
                            let objectWrapper = document.createElement('div');
                            let dragSection = document.createElement('div');
                            dragSection.style.height = '30px';
                            dragSection.style.width = '100%';
                            document.getElementById('output_frame').contentDocument.body.style.display = 'flex';
                            let div = document.createElement('div');
                            //div.style.height = '200px';
                            // div.style.width = '300px';
                            div.style.margin = '10px 20px'
                            div.style.border = '0px solid blue';
                            div.style.position = 'relative';
                            div.setAttribute("id", `container${object.id}`);
                            let resizable = document.createElement('div');
                            resizable.className = 'resizable';

                            let resizers_box = document.createElement('div');
                            resizers_box.className = 'resizers';
                            let resizerTopLeft = document.createElement('div');
                            resizerTopLeft.className = 'resizer top-left';
                            let resizerTopRight = document.createElement('div');
                            resizerTopRight.className = 'resizer top-right';
                            let resizerBottomLeft = document.createElement('div');
                            resizerBottomLeft.className = 'resizer bottom-left';
                            let resizerBottomRight = document.createElement('div');
                            resizerBottomRight.className = 'resizer bottom-right';

                            resizers_box.appendChild(resizerTopLeft);
                            resizers_box.appendChild(resizerTopRight);
                            resizers_box.appendChild(resizerBottomLeft);
                            resizers_box.appendChild(resizerBottomRight);

                            resizable.setAttribute("id",`${i.id}`)
                            resizable.appendChild(resizers_box);
                            //resizable.appendChild(object)
                            
                            div.appendChild(resizable);
                            

                            document.getElementById('overlay_output_frame').contentDocument.getElementById('overlay-container').appendChild(div);
                            document.getElementById('overlay_output_frame').contentDocument.body.style.padding = '10px';
                
                            resizable.style.backgroundImage = `url(${i.images.downsized_medium.url})`;
                           
                            //this.makeResizableDiv(`#${i.id}`);
                            
                            const xDraggables = document.getElementById('overlay_output_frame').contentWindow.Subjx(`#${object.id}`).drag({
                                
                            container:`#container${object.id}`,
                            each: {
                                move: false,
                                resize: true, 
                                rotate: true
                            }
                            // snapping to grid (default: 10)
    
                            });


                        
    
    
                        
                            let dhtml = JSON.parse(localStorage.getItem("dhtml"));

                            let html = document.getElementById('output_frame').contentWindow.document.body.innerHTML;
                            let dhtmlObj = {html:html, js:dhtml.js, css:dhtml.css}


                            localStorage.setItem("dhtml", JSON.stringify(dhtmlObj));


                        })

                        element_menu.appendChild(element);
                    }
                });

                let searchGIFS = document.createElement('div');
                let closeSearch = document.createElement('i');
                let closeSearchWrap = document.createElement('div');
                let searchInput = document.createElement('input');
                searchInput.setAttribute("id","search-input");
                searchInput.style.color = 'white';
                searchInput.style.fontSize = '12px';
                let searchGiphy = document.createElement('div');
                let searchGiphyWrap = document.createElement('div');
                searchGiphyWrap.setAttribute("id", "search-giphy-wrap");
                closeSearchWrap.setAttribute("id","close-search-wrap");
                var typingTimer;
                var doneTypingInterval = 700;
                let that = this;
                searchInput.addEventListener('input',(e)=>{
                    elements_arr = []
                    let getSel = document.getElementsByClassName('elementbg')
                    clearTimeout(typingTimer);
                    typingTimer = setTimeout(
                    function(){
                        document.getElementById('element-menu').innerHTML = '';
                        that.funStuff(getSel[0].innerText.toLowerCase(), e.target.value);
                        that.setState({funType:e.target.value})
                  
                       
                    },
                        doneTypingInterval
                    );
            
                    return true;
                });
                searchInput.value = this.state.funType

                searchGIFS.style.height = '20px';   
                searchGIFS.style.width = '150px';
                searchGIFS.style.border = '1px solid white';

                searchGiphy.style.backgroundImage = 'url(/poweredbygiphy.png';
                searchGiphy.style.backgroundSize = 'contain';
                searchGiphy.style.backgroundRepeat = 'no-repeat';
                searchGiphy.style.height = '20px';
                searchGiphy.style.width = '130px';
                searchGiphy.style.float = 'right';

                searchGiphyWrap.style.height = '20px';
                searchGiphyWrap.style.width = '100%';
                searchGiphyWrap.appendChild(searchGiphy);

                let elementTabs = document.createElement('ul');

                elementTabs.style.display = 'flex';
                elementTabs.style.alignItems = 'center';
                elementTabs.style.height = '30px';
                elementTabs.style.width = '245px';
                elementTabs.style.border = '0px solid white';
                elementTabs.style.padding = '10px 0px';
                elementTabs.setAttribute("id","elements")
                closeSearch.style.color = 'white';
                closeSearch.className = 'fa fa-times';
                closeSearch.style.float = 'right'
                closeSearch.style.fontSize = '15px'
                closeSearchWrap.style.width = '100%';
                closeSearchWrap.style.height = '20px';

           
            
                for(let i=0; i < element_options.length; i++) {
                    let li = document.createElement('li');
                    li.style.color = 'white';
                    li.style.listStyleType = 'none';
                    li.style.fontSize = '14px';
                    li.style.fontFamily = 'Open Sans';
                    li.style.cursor = 'pointer';
                    li.setAttribute("id",`ELEMENTS_${element_options[i]}`)
                    li.appendChild(document.createTextNode(element_options[i]));
                    li.addEventListener('click', ()=> {
                        let elements = document.getElementsByClassName('elementbg');
                        for(let i =0; i < elements.length; i++) {
                            elements[i].className = '';
                        }
                        li.className = 'elementbg';
                        this.funStuff('gifs');
                    })
                 
                    elementTabs.appendChild(li);
                    
                }
                
                let elemetBox = document.createElement('div');
                closeSearchWrap.appendChild(closeSearch);
                searchInput.style.backgroundColor = '#252525';
                searchInput.style.height = '30px';
                searchInput.style.width = '100%';
                searchInput.style.border = 'none';
                searchInput.style.margin = '10px 0px';
                searchInput.style.outline = 'none';
                searchInput.style.paddingLeft = '10px';
                searchInput.style.color = 'rgb(64, 255, 232)';
                searchInput.style.fontSize = '15px';

                searchInput.setAttribute("placeholder", 'Search for stuff here...');
                searchInput.className = 'search-placeholder';
                document.getElementById('main-menu').appendChild(closeSearchWrap);
                
               

                if(document.getElementById('element-menu') === null) {
                    mainmenu.appendChild(elementTabs);
                    //mainmenu.appendChild(searchGIFS);
                    document.getElementById('main-menu').appendChild(searchInput);
                    document.getElementById('main-menu').appendChild(searchGiphyWrap);
                    mainmenu.appendChild(element_menu);

                }   
                if(this.state.element_menu === false) {
                    mainmenu.appendChild(element_menu);
                    this.setState({element_menu:true});
                }

               
                if(menuinfo !== null) {
                    menuinfo.remove();
                    this.setState({welcome:false});
                }

                // if(document.getElementById('element-menu') !== null) {
                //     document.getElementById('element-menu').remove();
                // }

                if(document.getElementById('app-menu') !== null) {
                    document.getElementById('app-menu').remove();
                   }

                   if(document.getElementById('remix-image-box') !== null) {
                    document.getElementById('remix-image-box').remove();
                   }

                   this.setState(
                        {
                            details:false,
                            objects:false,
                            comments:false,
                            draw:false,
                            remix:false,
                            showPublish:false,
                            script_menu:false
                        }
                    );

                }
                document.getElementById("ELEMENTS_GIFS").className = 'elementbg';
                //document.getElementById("ELEMENTS_GIFS").style.fontWeight = '900'
            }

            document.getElementById('publish-section').style.display = 'none';
            document.getElementById('main-menu').style.display = 'block';
            document.getElementById('main-menu').style.overflowY = 'scroll';
            
        }
        AppsTab(e) {

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

                    document.getElementById('remix-icon').style.backgroundImage = infinityIcon;
                    document.getElementById('remix-text').style.color = "rgb(82, 82, 82)";

                    document.getElementById('script-icon').style.backgroundImage = `url(../code_grey.svg)`;
                    document.getElementById('script-text').style.color = "rgb(82, 82, 82)";

                    if(document.getElementById('publish-new-icon') !== null) {
                        document.getElementById('publish-new-icon').style.backgroundImage = `url(../save-regular-grey.svg)`;
                    }
                    //document.getElementById('publish-text').style.color = "rgb(82, 82, 82)";
                    document.getElementById('publish-text-publish').style.color = "rgb(82, 82, 82)";
                    document.getElementById('publish-text-new').style.color = "rgb(82, 82, 82)";

                    document.getElementById('elements-icon').style.color = `rgb(82, 82, 82)`;
                    document.getElementById('elements-text').style.color = "rgb(82, 82, 82)";

               
               
                    document.getElementById('apps-icon').style.color = `rgb(54, 255, 233)`;
                    document.getElementById('apps-text').style.color = "rgb(54, 255, 233)";
                    if(document.getElementById('element-menu') !== null) {
                        document.getElementById('element-menu').remove();
                    }

        
                    let mainmenu = document.getElementById('main-menu');
                    mainmenu.style.display = 'flex';
                    //mainmenu.style.width = '269px';
                    mainmenu.style.padding = '10px'
                    let app_menu = document.createElement('div');
                    app_menu.style.display = 'flex';
                    app_menu.style.width = '100%';
                    app_menu.style.flexWrap = 'wrap';
                    app_menu.setAttribute("id","app-menu")
                    apps.map((i) => {
                        let app = document.createElement('div');
                        app.style.height = '100px';
                        app.style.width = '100px';
                        app.style.border = '1px solid white';
                        app.style.margin = '5px';


                        
                        
                        let hashids = new Hashids(uuid(), 6);


                        // resizers.className = 'resizers';
                        // resizerOne.className = 'resizer top-left';
                        // resizerTwo.className = 'resizer top-right';
                        // resizerThree.className = 'resizer bottom-left';
                        // resizerFour.className = 'resizer bottom-right';
                        app.addEventListener('click', ()=>{
                        let object = document.createElement('div')
                        object.style.backgroundSize = 'cover';
                        object.style.height = '100px';
                        object.style.width = '100px';
                        object.style.border = '1px solid white';
                        //object.style.zIndex = '1000000000000000000000000';
                        object.className = 'resizable';
                       // object.style.position = 'absolute';
                        object.style.top = '0px';
                        let object_id = 'OBJECT_' + hashids.encode(1,2,3);
                        object.setAttribute("id", object_id);
                        // resizers.appendChild(resizerOne);
                        // resizers.appendChild(resizerTwo);
                        // resizers.appendChild(resizerThree)
                        // resizers.appendChild(resizerFour);

                        //object.appendChild(header)
                        //object.appendChild(resizers);

                        console.log(i)



                        //if(i.type === 'gif') {
                        let objectWrapper = document.createElement('div');
                        let dragSection = document.createElement('div');
                        dragSection.style.height = '30px';
                        dragSection.style.width = '100%';
                        document.getElementById('output_frame').contentDocument.body.style.display = 'flex';
                        let div = document.createElement('div');
                        //div.style.height = '200px';
                        // div.style.width = '300px';
                        div.style.margin = '10px 20px'
                        div.style.border = '0px solid blue';
                        div.style.position = 'relative';
                        div.setAttribute("id", `container${object.id}`);
                        let resizable = document.createElement('div');
                        resizable.className = 'resizable';

                        let resizers_box = document.createElement('div');
                        resizers_box.className = 'resizers';
                        let resizerTopLeft = document.createElement('div');
                        resizerTopLeft.className = 'resizer top-left';
                        let resizerTopRight = document.createElement('div');
                        resizerTopRight.className = 'resizer top-right';
                        let resizerBottomLeft = document.createElement('div');
                        resizerBottomLeft.className = 'resizer bottom-left';
                        let resizerBottomRight = document.createElement('div');
                        resizerBottomRight.className = 'resizer bottom-right';

                        resizers_box.appendChild(resizerTopLeft);
                        resizers_box.appendChild(resizerTopRight);
                        resizers_box.appendChild(resizerBottomLeft);
                        resizers_box.appendChild(resizerBottomRight);

                        resizable.setAttribute("id",`${i.id}`)
                        resizable.appendChild(resizers_box);
                        //resizable.appendChild(object)
                        
                        div.appendChild(resizable);
                        

                        document.getElementById('overlay_output_frame').contentDocument.getElementById('overlay-container').appendChild(div);
                        document.getElementById('overlay_output_frame').contentDocument.body.style.padding = '10px';
            
                        //resizable.style.backgroundImage = `url(${i.images.downsized_medium.url})`;
                       
                        this.makeResizableDiv(`#${i.id}`);
                        })


                        app_menu.appendChild(app);
                    });
                    if(document.getElementById('menu-info') !== null) {
                        document.getElementById('menu-info').remove();
                        this.setState({welcome:false});
                    }
                    if(document.getElementById('app-menu') === null) {
                        mainmenu.appendChild(app_menu);
                    }
                    if(document.getElementById('menu-info-box') !== null) {
                        document.getElementById('menu-info-box').remove()
                    }
              

                    if(document.getElementById('remix-image-box') !== null) {
                        document.getElementById('remix-image-box').remove();
                    }

                    if(document.getElementById('elements') !== null) {
                        document.getElementById('elements').remove();
                    }

                    if(document.getElementById('search-input') !== null) {
                        document.getElementById('search-input').remove()
                    }

                    if(document.getElementById('search-giphy-wrap') !== null) {
                        document.getElementById('search-giphy-wrap').remove()
                    }

                    if(document.getElementById('close-search-wrap') !== null) {
                        document.getElementById('close-search-wrap').remove()
                    }

               

                    this.setState(
                        {
                            details:false,
                            objects:false,
                            comments:false,
                            draw:false,
                            remix:false,
                            showPublish:false,
                            script_menu:false
                        }
                    );

                    if(this.state.app_menu === false) {
                   
                        mainmenu.appendChild(app_menu);
                        this.setState({app_menu:true, script_menu:false});
                    }
                    this.setState({script_menu:false});
                           
            

                    // if(document.getElementById('element-menu') !== null) {
                    //     document.getElementById('element-menu').remove();
                    // }


                
               
                }
            }
            document.getElementById('publish-section').style.display = 'none';
            document.getElementById('main-menu').style.display = 'block';
            document.getElementById('main-menu').style.overflowY = 'scroll';
        }
        ScriptTag(e){

            let thisElement = document.getElementById(e.target.id);
            let tabsWithMenubgClass = document.getElementsByClassName('menubg');
            let menuinfo = document.getElementById('menu-info');

            
            
            
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

                    document.getElementById('remix-icon').style.backgroundImage = infinityIcon;
                    document.getElementById('remix-text').style.color = "rgb(82, 82, 82)";

                    document.getElementById('script-icon').style.backgroundImage = `url(../code_cyan.svg)`;
                    document.getElementById('script-text').style.color = "rgb(54, 255, 233)";
                    if(document.getElementById('publish-new-icon') !== null) {
                    document.getElementById('publish-new-icon').style.backgroundImage = `url(../save-regular-grey.svg)`;
                    }
                    //document.getElementById('publish-text').style.color = "rgb(82, 82, 82)";
                    document.getElementById('publish-text-publish').style.color = "rgb(82, 82, 82)";
                    document.getElementById('publish-text-new').style.color = "rgb(82, 82, 82)";

                    document.getElementById('apps-icon').style.color = `rgb(82, 82, 82)`;
                    document.getElementById('apps-text').style.color = "rgb(82, 82, 82)";

                    document.getElementById('elements-icon').style.color = `rgb(82, 82, 82)`;
                    document.getElementById('elements-text').style.color = 'rgb(82, 82, 82)';
                    if(document.getElementById('menu-info') !== null) {
                        document.getElementById('menu-info').remove();
                        this.setState({welcome:false});
                        }
                    if(document.getElementById('app-menu') !== null){
                        document.getElementById('app-menu').remove();
                    }
                    // if(menuinfo !== null) {
                    //     menuinfo.remove()
                    // }
                    // if(document.getElementById('menu-info-box') !== null) {
                    //     document.getElementById('menu-info-box').remove()
                    //    }
                    if(document.getElementById('element-menu') !== null) {
                        document.getElementById('element-menu').remove();
                    }
         
                    if(document.getElementById('remix-image-box') !== null) {
                        document.getElementById('remix-image-box').remove();
                       }

                       if(document.getElementById('elements') !== null) {
                        document.getElementById('elements').remove();
                       }
                       
                       if(document.getElementById('search-input') !== null) {
                        document.getElementById('search-input').remove()
                    }

                    if(document.getElementById('search-giphy-wrap') !== null) {
                        document.getElementById('search-giphy-wrap').remove()
                    }

                    if(document.getElementById('close-search-wrap') !== null) {
                        document.getElementById('close-search-wrap').remove()
                    }

                       this.setState(
                        {
                            details:false,
                            objects:false,
                            comments:false,
                            draw:false,
                            remix:false,
                            showPublish:false,
                            script_menu:true
                        }
                    );

                       
                       this.setState({script_menu:true});
                                   

                    

                }
                document.getElementById('publish-section').style.display = 'none';
                document.getElementById('main-menu').style.display = 'block';
            document.getElementById('main-menu').style.overflowY = 'scroll';
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
        }
        PostAsNewTab(e) {

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
            let list = document.getElementById('main-menu');
            let menuinfo = document.getElementById('menu-info')
            list.style.padding = '7px 14px 2px 7px';
            list.style.overflowX = 'hidden'
            //list.style.width = '354px'
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
                    document.getElementById('remix-icon').style.backgroundImage = infinityIcon;
                    document.getElementById('remix-text').style.color = "rgb(82, 82, 82)";

                    document.getElementById('script-icon').style.backgroundImage = `url(../code_grey.svg)`;
                    document.getElementById('script-text').style.color = "rgb(82, 82, 82)";
                    
                    if(document.getElementById('publish-icon') !== null) {
                        document.getElementById('publish-icon').style.backgroundImage = `url(../save-regular.svg)`;
                    }
                    
 
                        document.getElementById('publish-new-icon').style.backgroundImage = `url(../save-regular.svg)`;
                        document.getElementById('publish-text-publish').style.color = "rgb(54, 255, 233)";
                        document.getElementById('publish-text-new').style.color = "rgb(54, 255, 233)";
                    

                    

                    document.getElementById('apps-icon').style.color = `rgb(82, 82, 82)`;
                    document.getElementById('apps-text').style.color = "rgb(82, 82, 82)";

                    document.getElementById('elements-icon').style.color = `rgb(82, 82, 82)`;
                    document.getElementById('elements-text').style.color = 'rgb(82, 82, 82)';
   
                    
               
                    if(document.getElementById('menu-info') !== null) {
                        //    document.getElementById('menu-info').remove();
                        if(document.getElementById('remix-image-box')){
                            document.getElementById('remix-image-box').remove();
                        }
                        document.getElementById('menu-info').remove();
                        //    document.getElementById('remix-list').remove();
                    }
                    that.setState(
                        {
                            details:false,
                            objects:false,
                            comments:false,
                            draw:false,
                            remix:false,
                            showPublish:true
                        }
                    );

                }
         
                let iframe = document.createElement('regular-thumbnail');
                let dhtml = JSON.parse(localStorage.getItem("dhtml"));

              
                let html_ = dhtml.html;
                let css_ = dhtml.css;
                let js_ = dhtml.js;
                
                let html2canvas = '<script src="../html2canvas.min.js"></script>';
                let JSflowroom = '<script src="../flowroom.js"></script>';

                 
                let base_tpl = "<!doctype html>\n" +
                 "<html>\n\t" +
                "<head>\n\t\t" +
                "<meta charset=\"utf-8\">\n\t\t" +
                "<title>Test</title>\n\n\t\t\n\t" +
                "</head>\n\t" +
                "<body>\n\t\n\t" +
                "</body>\n" +
                "</html>";



                let prepareSource = () => {
                    let html = html_,
                    css = css_,
                    js = js_,

                    src = '';
                    src = base_tpl.replace('</body>', html + '</body>');
                    css = '<style>' + css + '</style>';
                    src = src.replace('</head>', css + html2canvas + JSflowroom + '</head>');
                    js = '<script>' + js + '<\/script>';
                    src = src.replace('</body>', js + '</body>');
                    let dhtmlObj = {html:html, js:js, css:css}

                    // alert(htmlObj.html);
                
                    return src;
                };

                let renderDHTML = () => {
                     // alert('called')
                     
                    let iframeWrap = document.createElement('div');
                    let cardWrap = document.createElement('div');
                    let cardWrapWrap = document.createElement('div');

                    let profilePic = document.createElement('div');
                    profilePic.style.height = '40px';
                    profilePic.style.width = '40px';
                    profilePic.style.borderRadius = '20px';
                    profilePic.style.background = 'white';
                    profilePic.style.margin = '10px';
                    let roominfowrap = document.createElement('div');
                    let roomTitle = document.createElement('p');
                    roomTitle.style.color = 'white';
                    roomTitle.style.fontSize = '15px';
                    roomTitle.appendChild(document.createTextNode('Crossing the Bridge'));
                  

                    let remixedOrCreatedBy = document.createElement('p');
                    remixedOrCreatedBy.style.color = 'white';
                    remixedOrCreatedBy.style.fontSize = '10px';
                    remixedOrCreatedBy.appendChild(document.createTextNode('remixed by @Element'))


                    let profilePicAndTitleWrap = document.createElement('div');
                  
                    roominfowrap.style.display = 'flex';
                    roominfowrap.style.flexDirection = 'column';
                    roominfowrap.style.justifyContent = 'center';
                    profilePicAndTitleWrap.appendChild(profilePic);
                    profilePicAndTitleWrap.appendChild(roominfowrap);
                    let ellipsis = document.createElement('i');
                    ellipsis.className = 'fas fa-ellipsis-v';
                    ellipsis.style.fontSize = '18px';
                    ellipsis.style.float = 'right';
                    ellipsis.style.position = 'absolute';
                    ellipsis.style.top = '17px';
                    ellipsis.style.color = 'white';
                    ellipsis.style.right = '12px';
                    profilePicAndTitleWrap.appendChild(ellipsis)
                    profilePicAndTitleWrap.style.display = 'flex';
                    profilePicAndTitleWrap.style.flexDirection = 'row';
                    profilePicAndTitleWrap.style.position = 'relative';
                    //profilePicAndTitleWrap.style.justifyContent = 'center';
                    roominfowrap.appendChild(roomTitle);
                    roominfowrap.appendChild(remixedOrCreatedBy);

                    cardWrapWrap.appendChild(profilePicAndTitleWrap);
                    let handleTop = document.createElement('div');
                    let handleBottom = document.createElement('div');
                    let overlay = document.createElement('div');
                    let cardWrapWrapWrap = document.createElement('div');
                    overlay.style.position = 'absolute';
                    overlay.style.left = '0';
                    overlay.style.top = '0';
                    overlay.style.bottom = '0';
                    overlay.style.height = '100%';
                    overlay.style.width = '100%';
                    overlay.style.zIndex = '100';
             
                    cardWrapWrapWrap.style.width = '362px'; 
                    cardWrapWrapWrap.style.display = 'flex';
                    cardWrapWrapWrap.style.justifyContent = 'center';
                    cardWrapWrapWrap.style.backgroundColor = 'rgb(17,17,17)';
                    cardWrapWrapWrap.style.flexDirection = 'column';
                    cardWrapWrapWrap.style.padding = '30px 21px';

                    cardWrapWrap.style.paddingBottom = '33px'; 
                    cardWrapWrap.style.backgroundColor = 'rgb(32,32,32)';
                    cardWrapWrap.style.margin = '10px 0px';

                    let cardpreview = document.createElement('p');
                    cardpreview.style.color = 'white';
                    cardpreview.style.fontSize = '15px';
                    cardpreview.style.fontWeight = 'bold';

                    let cardpreviewTxt = document.createElement('p');
                    cardpreviewTxt.style.color = 'white';
                    cardpreviewTxt.style.fontSize = '10px';

                    cardpreview.appendChild(document.createTextNode('Card Preview'))

                    cardWrapWrapWrap.appendChild(cardpreview)
                    cardpreviewTxt.appendChild(document.createTextNode('Adjust the thumbnail below using the handle'));
                    cardWrapWrapWrap.appendChild(cardpreviewTxt)
                    let source = prepareSource();
                    let iframe = document.createElement('iframe');
                    iframeWrap.style.position = 'absolute';
                    iframeWrap.style.height = '100%';
                    iframeWrap.style.width = '100%';
                    iframeWrap.style.zIndex = '99999999';
                    iframeWrap.style.backgroundColor = 'transparent';
                    iframeWrap.style.display = 'flex';
                    iframeWrap.style.justifyContent = 'center';
                    iframeWrap.style.alignItems = 'center';
                    iframeWrap.setAttribute("id", "card-thumb-wrap");
                    iframeWrap.style.zIndex = '999999999';
                    let closecardthumbwrap = document.createElement('p');
                    closecardthumbwrap.style.fontSize = '40px';
                    closecardthumbwrap.style.color = 'white';
                    closecardthumbwrap.appendChild(document.createTextNode('X'));
                    
                    closecardthumbwrap.style.top = '0px';
                    closecardthumbwrap.style.position = 'absolute';
                    closecardthumbwrap.style.right = '20px';
                    closecardthumbwrap.addEventListener('click', ()=>{
                        iframeWrap.style.display = 'none';
                        document.getElementById('black-opacity-modal').style.display = 'none'
                    })
                    iframeWrap.appendChild(closecardthumbwrap);
                    let blackOpacityModal = document.createElement('div');
                    blackOpacityModal.setAttribute("id", "black-opacity-modal");
                    blackOpacityModal.style.position = 'absolute';
                    blackOpacityModal.style.height = '100%';
                    blackOpacityModal.style.width = '100%';
                    blackOpacityModal.style.backgroundColor = 'black';
                    blackOpacityModal.style.opacity = '0.8';
                    blackOpacityModal.style.zIndex = '9999999';
                    document.getElementById('root').appendChild(blackOpacityModal);
                    document.getElementById('root').appendChild(iframeWrap);

                    iframe.setAttribute("id","regular-thumbnail");
                    iframe.style.height = '200%';
                    iframe.style.width = '200%';
                    iframe.style.top = '0px';
                    iframe.style.left = '0px';
                    iframe.style.background = 'black';
                    iframe.style.transform = 'scale(0.5)';
                    iframe.style.transformOrigin = 'left top';
                    iframe.style.display = 'block';
                    iframe.style.border = '0px';
                    cardWrap.appendChild(overlay);
                    cardWrap.style.height = that.state.room_card_height + 'px';
                    cardWrap.style.width = '320px';
                    cardWrap.style.borderTop = '2px solid rgb(54,255,233)';
                    cardWrap.style.borderBottom = '2px solid rgb(54,255,233)';
                    cardWrap.style.position = 'relative';

                    iframe.style.overflow = 'hidden';

                 
                   
                    var resizer = document.createElement('div');
                    resizer.className = 'resizer';
                    resizer.style.width = '15px';
                    resizer.style.height = '15px';
                    resizer.style.background = 'rgb(54, 255, 233)';
                    resizer.style.position = 'absolute';
                    resizer.style.zIndex = '1000';
                    resizer.style.right = 0;
                    resizer.style.bottom = 0;
                    resizer.style.cursor = 'se-resize';
                    resizer.style.zIndex = '10000';
                    resizer.style.right = '154px';
                    resizer.style.bottom = '-8px';
                    resizer.style.cursor = 'se-resize';
                    resizer.style.borderRadius = '20px';
                    cardWrap.appendChild(resizer);
                    resizer.addEventListener('mousedown', initResize, false);

                    function initResize(e) {
                        window.addEventListener('mousemove', Resize, false);
                        window.addEventListener('mouseup', stopResize, false);
                    }
                    function Resize(e) {
                        //cardWrap.style.width = (e.clientX - cardWrap.offsetLeft) + 'px';
                        cardWrap.style.height = (e.clientY - cardWrap.offsetTop) + 'px';
                    }
                    function stopResize(e) {
                        window.removeEventListener('mousemove', Resize, false);
                        window.removeEventListener('mouseup', stopResize, false);
                    }



                    cardWrap.appendChild(iframe)
                    let heart = document.createElement('i');
                    let comments = document.createElement('i');
                    let enterbtn = document.createElement('div');

                    let fullbtn = document.createElement('i');
                    fullbtn.className = 'fas fa-expand';
                    fullbtn.style.color = 'white';
                    enterbtn.style.display = 'flex';
                    enterbtn.style.justifyContent = 'space-around'; 
                    enterbtn.style.alignItems = 'center'; 
                    enterbtn.style.outline = 'none'; 
                    enterbtn.style.cursor = 'pointer'; 
                    enterbtn.style.border = '0px solid rgb(73, 165, 64)'; 
                    enterbtn.style.borderRadius = '40px'; 
                    enterbtn.style.height = '25px'; 
                    enterbtn.style.width = '78px'; 
                    enterbtn.style.marginRight = '10px'; 
                    enterbtn.style.backgroundColor = 'rgb(49, 51, 51)';
                    enterbtn.style.fontFamily = "Source Sans Pro"; 
                    enterbtn.style.color = 'white'; 
                    enterbtn.style.fontSize  = '14px'; 
                    enterbtn.style.fontWeight = '600'; 
                    enterbtn.style.padding = '0px 8px'; 
                    enterbtn.style.position = 'relative'; 
                    enterbtn.style.transition = 'color 0.3s ease 0s, background-color 0.3s ease 0s';
                    enterbtn.style.borderColor = '0.3s ease 0s, width 0.3s ease 0s, opacity 0.3s ease 0s';
                    heart.className = 'far fa-heart';
                    heart.style.fontSize = '12px';
                    heart.style.color = 'white';
                    
                    comments.className = 'far fa-comment-alt';
                    comments.style.fontSize = '12px';
                    comments.style.color = 'white';
                    comments.style.margin = '5px';
               
                    

                    cardWrapWrap.appendChild(cardWrap);
       
                    heart.className = 'far fa-heart';
                    heart.style.fontSize = '12px';
                    heart.style.color = 'white';
                    heart.style.position = 'relative';
                    heart.style.margin = '5px';
               

                    let bottomWrap = document.createElement('div');
                    let likescomments = document.createElement('div');
                    likescomments.appendChild(heart);
                    likescomments.appendChild(comments);
                    likescomments.style.display = 'flex';
                    likescomments.style.width = '100px';

                    let enterAndFull = document.createElement('div');
                    enterAndFull.style.width = '100px';
                    enterAndFull.style.display = 'flex';
                    enterAndFull.appendChild(enterbtn);
                    enterAndFull.appendChild(fullbtn);

                    bottomWrap.style.position = 'absolute';
                    bottomWrap.appendChild(likescomments);
                    bottomWrap.appendChild(enterAndFull);
                    bottomWrap.style.bottom = '-27px';
                    bottomWrap.style.width = '100%';
                    bottomWrap.style.display = 'flex';
                    bottomWrap.style.justifyContent = 'space-between';

                    let descriptionWrapText = document.createElement('div');
                    let descriptionText = document.createElement('div');
                    descriptionWrapText.style.fontSize = '16px';
                    descriptionWrapText.style.padding = '0px 10px 0px';
                    descriptionText.style.maxWidth = '100%';
                    descriptionText.style.height = 'auto';
                    descriptionText.style.fontSize = '14px';
                    descriptionText.style.lineHeight = '1.2';
                    descriptionText.style.position = 'relative';
                    descriptionText.style.top = '5px';
                    descriptionText.style.overflow = 'hidden';
                    descriptionText.style.color = 'white';
                    descriptionText.style.marginLeft = '3';
                    descriptionText.style.paddingBottom = '20';
                    descriptionText.appendChild(document.createTextNode(`${this.getTruncatedString(this.state.descriptionText).string}`));
                    if(this.getTruncatedString(this.state.descriptionText).isReadMore === true) {
                        let span = document.createElement('span');
                        span.style.color = 'white';
                        span.style.marginLeft = '2px';
                        span.appendChild(document.createTextNode('...[Read More]'));
                        descriptionText.appendChild(span);
                    }
                    bottomWrap.appendChild(descriptionText)
                    
             
                    cardWrap.appendChild(bottomWrap);
                    //cardWrapWrap.appendChild(heart);

                    cardWrapWrapWrap.appendChild(cardWrapWrap);
                    let save = document.createElement('div');
                    save.style.height = '30px';
                    save.style.width = '50px';
                    save.style.borderRadius = '4px';
                    save.style.backgroundColor = 'rgb(54,255,233)';
                    save.style.display = 'flex';
                    save.style.justifyContent = 'center';
                    save.style.alignItems = 'center';
                    let savetxt = document.createElement('p');
                    savetxt.style.color = 'black';
                    savetxt.style.fontSize = '12px';
                    savetxt.style.fontWeight = 'bold';
                    savetxt.appendChild(document.createTextNode('SAVE'))
                    save.appendChild(savetxt);
                    save.addEventListener('click', ()=>{
                        that.setState({room_card_height:cardWrap.height});
                        document.getElementById('black-opacity-modal').style.display = 'none'
                        document.getElementById('card-thumb-wrap').style.display = 'none';

                    })
                    cardWrapWrapWrap.appendChild(cardWrapWrap);
                    cardWrapWrapWrap.appendChild(save);
                    iframeWrap.appendChild(cardWrapWrapWrap);
                    
                    iframeWrap.style.visibility = 'hidden'
                    blackOpacityModal.style.display = 'none';
                    let iframe_doc = iframe.contentDocument;
                    //window.Subj('#regular-thumbnail').draggle();
                    console.log('window',window)
                    iframe_doc.open();
                    iframe_doc.write(source);
                    iframe_doc.close();

                   
                //alert('re')
                    //when removing last library, set to [];

                };
                renderDHTML();
                
                let get_iframe = document.getElementById('regular-thumbnail');
                var iframeDoc = get_iframe.contentWindow;
                   // var timer = setInterval(()=> {
                        
                        
                        // Check if loading is complete
                        // if (iframeDoc.readyState == 'complete' || iframeDoc.readyState == 'interactive') {
                     
                            get_iframe.onload = () => {
                            document.getElementById('thumb-pre-loader').style.display = 'flex';   
                            setTimeout(()=>{
                           iframeDoc.flowroom.SaveScreenShot(
                                ()=> {
                                    //alert('call')
                                    let imageData = localStorage.getItem("thumbnail");
                                    //alert(imageData)
                                    // let isRemix = isPostAsNew;
                                    // let remixRoomID = isPostAsNew ? that.state.shortID : that.state.remixRoomID;
                                    // let remixUserName = isPostAsNew ? that.state.userName : that.state.remixUserName;
                                    localStorage.setItem("thumbnailUrl", "");
                                    let thumbnail = document.getElementById('thumbnail-pic-display');
                                    thumbnail.style.backgroundImage = `url(${imageData})`;
                                    thumbnail.style.backgroundRepeat = 'no-repeat';
                                    thumbnail.style.backgroundSize = 'cover';
                                    that.putObject (
                                        imageData, 
                                        (url) => { 
                                            localStorage.setItem("thumbnailUrl", url);
                                        }
                                    );
                                    document.getElementById('thumb-pre-loader').style.display = 'none';   
                                }

                            );

                            },5000)
                            }
                        
                    //         clearInterval(timer);
                    //         return;
                    //     }
                    // }, 4000);
      
                
                if(menuinfo !== null) {
                    menuinfo.remove();
                    this.setState({welcome:false});
                }

                // if(document.getElementById('element-menu') !== null) {
                //     document.getElementById('element-menu').remove();
                // }

                if(document.getElementById('app-menu') !== null) {
                    document.getElementById('app-menu').remove();
                   }

                   if(document.getElementById('remix-image-box') !== null) {
                    document.getElementById('remix-image-box').remove();
                   }
                if(document.getElementById('element-menu') !== null) {
             
                    document.getElementById('element-menu').remove();
                }
                if(document.getElementById('elements') !== null) {
                    document.getElementById('elements').remove();
                }

                document.getElementById('publish-section').style.display = 'flex';

                if(document.getElementById('app-menu') !== null){
                    document.getElementById('app-menu').remove();
                }
                if(document.getElementById('search-input') !== null) {
                    document.getElementById('search-input').remove()
                }

                if(document.getElementById('search-giphy-wrap') !== null) {
                    document.getElementById('search-giphy-wrap').remove()
                }

                if(document.getElementById('close-search-wrap') !== null) {
                    document.getElementById('close-search-wrap').remove()
                }
            }
            document.getElementById('main-menu').style.display = 'block';
            document.getElementById('main-menu').style.overflowY = 'scroll';
            document.getElementById('publish-menu').style.display = 'flex';

        }
        PostTab(e) {
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
                if(document.getElementById('remix-image-box')){
                document.getElementById('remix-image-box').remove();
                }
               document.getElementById('menu-info').remove();
            //    document.getElementById('remix-list').remove();
              }
              if(document.getElementById('elements') !== null) {
                document.getElementById('elements').remove();
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
           
                let iframe = document.getElementById('output_frame');
                let dhtml = JSON.parse(localStorage.getItem("dhtml"));
                let html_ = dhtml.html;
                let css_ = dhtml.css;
                let js_ = dhtml.js;
            
                

                 
                let base_tpl = "<!doctype html>\n" +
                "<html>\n\t" +
                "<head>\n\t\t" +
                "<meta charset=\"utf-8\">\n\t\t" +
                "<title>Test</title>\n\n\t\t\n\t" +
                "</head>\n\t" +
                "<body>\n\t\n\t" +
                "</body>\n" +
                "</html>";



                let prepareSource = () => {
                    let html = html_,
                    css = css_,
                    js = js_,

                    src = '';
                    src = base_tpl.replace('</body>', html + '</body>');
                    css = '<style>' + css + '</style>';
                    src = src.replace('</head>', css + '</head>');
                    js = '<script>' + js + '<\/script>';
                    src = src.replace('</body>', js + '</body>');
                    let dhtmlObj = {html:html, js:js, css:css}

                    // alert(htmlObj.html);
                    localStorage.setItem("dhtml", JSON.stringify(dhtmlObj));
                    localStorage.setItem("css", JSON.stringify(css));
                    localStorage.setItem("js", JSON.stringify(js));
                    return src;
                };

                let renderDHTML = () => {
                    // alert('called')
                let source = prepareSource();
                let iframe = document.querySelector('#regular-thumbnail');
                let iframe_doc = iframe.contentDocument;
  
                iframe_doc.open();
                iframe_doc.write(source);
                iframe_doc.close();


                //when removing last library, set to [];
                //iframe.contentWindow.flowroom.SaveScreenShot(
                //     ()=> {
                //         let imageData = localStorage.getItem("thumbnail");
                //         alert(imageData)
                //         let isRemix = isPostAsNew;
                //         let remixRoomID = isPostAsNew ? that.state.shortID : that.state.remixRoomID;
                //         let remixUserName = isPostAsNew ? that.state.userName : that.state.remixUserName;
                //         localStorage.setItem("thumbnailUrl", "");
                //         let thumbnail = document.getElementById('thumbnail-pic-display');
                //         thumbnail.src = imageData;
                //         thumbnail.setAttribute("height", "100%");
                //         thumbnail.setAttribute("width", "100%");
                //         that.putObject (
                //             imageData, 
                //             (url) => { 
                //                 localStorage.setItem("thumbnailUrl", url);
                //             }
                //         );
                //     }
                // );



        };


        renderDHTML()

            }
        }
        OpenMenu() {
            
            let list = document.getElementById('main-menu');
            let thisElement = document.getElementById('remix-tab');
            let tabsWithMenubgClass = document.getElementsByClassName('menubg');
            let menuinfo = document.createElement('div');
            

            menuinfo.setAttribute("id", "menu-info");
            if(window.innerWidth > 698) {
                menuinfo.style.height = '170px';
                menuinfo.style.width = '240px';
            } else {
                menuinfo.style.height = '200px';
                menuinfo.style.width = '240px';
            }
           

            let menuinfobox = document.createElement('div');
            let menuinfotop = document.createElement('div');
            let infinity = document.createElement('div');
            menuinfotop.style.display = 'flex';
            menuinfotop.style.justifyContent = 'space-between';
            menuinfotop.style.height = '20px';
            menuinfotop.style.width = '100%';
            menuinfobox.style.border = '1px solid #222222';
            // menuinfobox.style.height = '147px';
            menuinfobox.style.width = '240px';
            menuinfobox.style.borderRadius = '3px';
            menuinfobox.style.marginTop = '11px';
            infinity.style.backgroundImage = infinityIcon;
            infinity.style.backgroundSize = '100% 100%';
            infinity.style.backgroundRepeat = 'no-repeat';
            infinity.style.height = '20px';
            infinity.style.width = '25px';
            let closebox = document.createElement('div');
            closebox.style.display = 'flex';
            closebox.style.alignItems = 'center';
            closebox.style.justifyContent = 'space-between';
            closebox.style.width = '45px';
            let welcometext = document.createElement('p');
            welcometext.style.color = 'rgb(54, 255, 233)';
            welcometext.style.marginTop = '10px';
            welcometext.style.marginBottom = '10px';
            welcometext.appendChild(document.createTextNode('Welcome to the Remix Menu'));
            welcometext.setAttribute("id","welcome-text");

            let firstLine = document.createElement('p');
            firstLine.style.color = 'white';
            
            if(window.innerWidth > 768) {
                welcometext.style.fontSize = '15px';
            } else {
                welcometext.style.fontSize = '14px';
            }
            firstLine.appendChild(document.createTextNode('Here you can swap Text, Images,'));

            if(window.innerWidth > 768) {
                firstLine.style.fontSize = '15px';
            } else {
                firstLine.style.fontSize = '12px';
            }
            let secondLine = document.createElement('p');
            secondLine.style.color = 'white';
            if(window.innerWidth > 768) {
                secondLine.style.fontSize = '15px';
            } else {
                secondLine.style.fontSize = '12px';
            }    


            
            secondLine.appendChild(document.createTextNode('and other elements inside of flows.'));


            let thirdLine = document.createElement('p');
            thirdLine.style.color = 'white';
            if(window.innerWidth > 768) {
                thirdLine.style.fontSize = '15px';
            } else {
                thirdLine.style.fontSize = '12px'
            }
            

            thirdLine.appendChild(document.createTextNode('Click on the Remixable Items below to get started.'));
            thirdLine.style.paddingBottom = '10px'
            thirdLine.style.marginTop = '10px';
            let fourthLine = document.createElement('p');
            fourthLine.style.color = 'white';
            if(window.innerWidth > 768) {
                fourthLine.style.fontSize = '15px';
            } else {
                fourthLine.style.fontSize = '12px';

            }
            
            //fourthLine.appendChild(document.createTextNode('Click here for step by step'));
           

            let fifthLine = document.createElement('p');
            fifthLine.style.color = 'white';
            if(window.innerHeight > 768) {
                fifthLine.style.fontSize = '12px';
            } else {
                fifthLine.style.fontSize = '12px';
            }
           
            //fifthLine.appendChild(document.createTextNode('video walkthroughs'));
            
            let welcome_texts = document.createElement('div');

            let closet = document.createElement('p');
            let closex = document.createElement('p');
            let closeicon = document.createElement('i');
            closeicon.className = 'fa fa-times';
            closeicon.style.fontSize = '15px';
            closex.appendChild(closeicon);
            closex.style.fontSize = '20px';
            closex.style.color = 'white';
            closet.appendChild(document.createTextNode('Close'));
            closet.style.fontSize = '11px';
            closet.style.color = 'white';
            menuinfotop.appendChild(infinity);
            closebox.appendChild(closet);
            closebox.appendChild(closex);
            menuinfotop.appendChild(closebox);
            menuinfobox.appendChild(menuinfotop)
            menuinfobox.appendChild(welcometext);
            menuinfobox.style.padding = '20px';
            menuinfobox.setAttribute("id", "menu-info-box");
            
            welcome_texts.appendChild(firstLine);
            welcome_texts.appendChild(secondLine);
            welcome_texts.appendChild(thirdLine);
            welcome_texts.appendChild(fourthLine);
            welcome_texts.appendChild(fifthLine);
           
       
            if(this.state.welcome === false) {
                menuinfo.appendChild(menuinfobox);
            
            menuinfobox.appendChild(welcome_texts);
            menuinfobox.style.display = 'flex';
            menuinfobox.style.justifyContent = 'center';
            menuinfobox.style.flexDirection = 'column';
            this.setState({welcome:true});
            list.style.padding = '7px 14px 2px 7px';
            list.appendChild(menuinfo);
            }
            
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

                    document.getElementById('remix-icon').style.backgroundImage = infinityIcon;
                    document.getElementById('remix-text').style.color = "rgb(54, 255, 233)";

                    document.getElementById('script-icon').style.backgroundImage = `url(../code_grey.svg)`;
                    document.getElementById('script-text').style.color = "rgb(82, 82, 82)";
                    if(document.getElementById('publish-new-icon') !== null) {
                        document.getElementById('publish-new-icon').style.backgroundImage = `url(../save-regular-grey.svg)`;
                        document.getElementById('publish-text-new').style.color = "rgb(82, 82, 82)";
                        document.getElementById('publish-text-publish').style.color = 'rgb(82, 82, 82)'
                    }
                    document.getElementById('elements-icon').style.color = `rgb(82, 82, 82)`;
                    document.getElementById('elements-text').style.color = "rgb(82, 82, 82)";

                    document.getElementById('apps-icon').style.color = `rgb(82, 82, 82)`;
                    document.getElementById('apps-text').style.color = "rgb(82, 82, 82)";

               
                    if(document.getElementById('element-menu') !== null) {
                        document.getElementById('element-menu').remove();
                    }
                    if(document.getElementById('app-menu') !== null) {
                        document.getElementById('app-menu').remove();
                    }
                    if(document.getElementById('elements') !== null) {
                        document.getElementById('elements').remove();
                    }
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
            document.getElementById('main-menu').style.display = 'block';
            document.getElementById('main-menu').style.overflowY = 'scroll';
            //document.getElementById('main-menu').style.width = '269px';
            isMenuOpen = true;
            if(document.getElementById('search-input') !== null) {
                document.getElementById('search-input').remove()
            }

            if(document.getElementById('search-giphy-wrap') !== null) {
                document.getElementById('search-giphy-wrap').remove()
            }

            if(document.getElementById('close-search-wrap') !== null) {
                document.getElementById('close-search-wrap').remove()
            }
          
            if(this.state.isOpen === false) {
                const element = document.querySelector('#main-menu');
                const ball = styler(element); 
            
                tween({ from:0, to: 0, duration: 300 })
                .start(v => ball.set('x', v));
                document.getElementById('tab-menu').style.display = 'block';
                //document.getElementById('main-menu').style.width = '269px';
                this.setState({isOpen:true});
                let remixid = document.getElementById('remix-tab');
                remixid.className = 'menubg';
             
                this.setState(
                        {
                            details:false,
                            objects:false,
                            comments:false,
                            draw:false,
                            remix:true,
                            preferences:false,
                            record:false
      
                        }
                );
                document.getElementById('main-menu').style.display = 'block';
                isMenuOpen = true;
           } else {
                const element = document.querySelector('#main-menu');
                const ball = styler(element); 
            
                tween({ from:0, to: -378, duration: 200 })
                .start(v => ball.set('x', v));
                document.getElementById('tab-menu').style.display = 'none';
                //document.getElementById('main-menu').style.width = '269px';
                this.setState(
                        {
                            isOpen:false
                        }
                    );
                document.getElementById('publish-menu').style.display = 'none';
                isMenuOpen = false;
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
        getNumberToString(num) {
            if(num === undefined) {
                return 0;
            }
            if(num > 999999) {
                return (num/1000000).toFixed(num >= 10000000 ? 0 : 1) + 'M';
            } else if(num > 999) {
                return (num/1000).toFixed(num >= 10000 ? 0 : 1) + 'K';
            } else {
                return num
            } 
        }
        getTruncatedString(stringIn) {
            return {
                isReadMore: stringIn.length >= 120,
                string: stringIn.length < 120 ? stringIn : stringIn.substring(0, 120)
            };
        }
        /*Make resizable div by Hung Nguyen*/




    makeResizableDiv(div) {
       
        const element = document.getElementById('overlay_output_frame').contentWindow.document.querySelector(div);
        const resizers =  document.getElementById('overlay_output_frame').contentWindow.document.querySelectorAll(div + ' .resizer')
        const minimum_size = 20;
        let original_width = 0;
        let original_height = 0;
        let original_x = 0;
        let original_y = 0;
        let original_mouse_x = 0;
        let original_mouse_y = 0;
        for (let i = 0;i < resizers.length; i++) {
            const currentResizer = resizers[i];
            currentResizer.addEventListener('mousedown', function(e) {
            e.preventDefault()
            original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
            original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
            original_x = element.getBoundingClientRect().left;
            original_y = element.getBoundingClientRect().top;
            original_mouse_x = e.pageX;
            original_mouse_y = e.pageY;
            document.getElementById('overlay_output_frame').contentWindow.addEventListener('mousemove', resize)
            document.getElementById('overlay_output_frame').contentWindow.addEventListener('mouseup', stopResize)
        })
      
        function resize(e) {
         
          //document.getElementById('out-cover').style.display = 'block';
            if (currentResizer.classList.contains('bottom-right')) {
                const width = original_width + (e.pageX - original_mouse_x);
                const height = original_height + (e.pageY - original_mouse_y)
                if (width > minimum_size) {
                    element.style.width = width + 'px'
                }
                if (height > minimum_size) {
                    element.style.height = height + 'px'
                }
            } else if (currentResizer.classList.contains('bottom-left')) {
                const height = original_height + (e.pageY - original_mouse_y)
                const width = original_width - (e.pageX - original_mouse_x)
                if (height > minimum_size) {
                    element.style.height = height + 'px'
                }
                if (width > minimum_size) {
                    element.style.width = width + 'px'
                    element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
                }
            } else if (currentResizer.classList.contains('top-right')) {
                    const width = original_width + (e.pageX - original_mouse_x)
                    const height = original_height - (e.pageY - original_mouse_y)
                    if (width > minimum_size) {
                        element.style.width = width + 'px'
                    }
                    if (height > minimum_size) {
                        element.style.height = height + 'px'
                        element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
                    }
                } else {
                    const width = original_width - (e.pageX - original_mouse_x)
                    const height = original_height - (e.pageY - original_mouse_y)
                    if (width > minimum_size) {
                        element.style.width = width + 'px'
                        element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
                    }
                    if (height > minimum_size) {
                        element.style.height = height + 'px'
                        element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
                    }
                }
            }
      
            function stopResize() {
                document.getElementById('overlay_output_frame').contentWindow.removeEventListener('mousemove', resize)
            }
        }
    }
 

    dragElement(elmnt) {
 
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            /* if present, the header is where you move the DIV from:*/
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    
        } else {
            /* otherwise, move the DIV from anywhere inside the DIV:*/
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
     
            e = e || window.event;
            e.preventDefault();
    
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

 
    render() {
        let that = this;
        const {isLoading} = this.state;

        return (
            <div id="room-main-page" className="page-wrap twilight room-main-page-wrap">
                <div className="room-wrap-wrap" style={{flexDirection:'column', height:'100vh',width:'100%'}}>
                    <div id="room-wrap" style={{display:'flex',position:'relative',overflow:'hidden'}}>
                        <div id="tab-menu" className="tab-menu" style={{
                            width:'60px', 
                            background:'rgb(14, 14, 14)',
                            height:'100%'
                        }}>
                        <div id="remix-tab" className="remix-tab" onClick={this.RemixTab.bind(this)} 
                            onDoubleClick={()=>{document.getElementById('main-menu').style.display = 'none'}}
                            style={{
                                display:'flex',
                                height:'59px',
                                width:'59px',
                                flexDirection:'column',
                                alignItems:'center',
                                borderRight:'1px solid #181818',
                                borderBottom:'1px solid #181818',
                                justifyContent:'center',
                                cursor:'pointer'
                               
                            }} className="menu-bg-border">
                                <div id="remix-icon" className="remix-icon" style={{
                                    backgroundImage:'url(../infinity_grey.svg)',
                                    backgroundSize: 'contain',
                                    backgroundRepeat:'no-repeat',
                                    height:'19px',
                                    width:'26px',
                                    pointerEvents:'none',
                                    position:'relative',
                                    top:3
                                    }}></div>
                                <p id="remix-text" style={{fontSize:'11px',
    fontWeight:600,
    pointerEvents:'none',
    pointerEvents:'none', marginTop:0,position:'relative',
    top:'0px',
    left:'-0.5px'}} className="menubgnot">REMIX</p>
                               
                        </div>
                        <div id="elements-tag" onClick={this.ElementsTabs.bind(this)} 
                        onDoubleClick={()=>{document.getElementById('main-menu').style.display = 'none'}}
                        style={{
                            display:'flex',
                            cursor:'pointer',
                            height:'59px',
                            width:'59px',
                            flexDirection:'column',
                            alignItems:'center',
                            borderRight:'1px solid #181818',
                            borderBottom:'1px solid #181818',
                            justifyContent:'center'
                        }} className="menu-bg-border">
                            
                            <i id="elements-icon" className="fas fa-shapes" style={{color:'white', fontSize:19,marginBottom:4,color:'rgb(82, 82, 82)',pointerEvents:'none',height:'20px',
    width:'20px'}}></i>
                            <p id="elements-text" style={{fontSize:8.5,fontWeight:600,pointerEvents:'none'}} className="menubgnot">ELEMENTS</p>
                        </div>
                        <div id="app-tag"  onClick={this.AppsTab.bind(this)} 
                        onDoubleClick={()=>{document.getElementById('main-menu').style.display = 'none'}}
                        style={{
                            display:'flex',
                            cursor:'pointer',
                            height:'59px',
                                width:'59px',
                            flexDirection:'column',
                            alignItems:'center',
                            borderRight:'1px solid #181818',
                            borderBottom:'1px solid #181818',
                            justifyContent:'center'
                        }} className="menu-bg-border">
                            
                            <i id="apps-icon" className="fas fa-cubes" style={{color:'white', fontSize:22,marginBottom:4,color:'rgb(82, 82, 82)',pointerEvents:'none'}}></i>
                            <p id="apps-text" style={{fontSize:11.2,fontWeight:600,pointerEvents:'none'}} className="menubgnot">APPS</p>
                        </div>
                        <div id="script-tag" refs="script-tag" onClick={this.ScriptTag.bind(this)}
                        onDoubleClick={()=>{document.getElementById('main-menu').style.display = 'none'}}
                        style={{
                            display:'flex',
                            cursor:'pointer',
                            height:'59px',
                            width:'59px',
                            flexDirection:'column',
                            alignItems:'center',
                            borderRight:'1px solid #181818',
                            borderBottom:'1px solid #181818',
                            justifyContent:'center'
                        }} className="menu-bg-border">
                            <div id="script-icon" style={{
                                fontSize:'18px',
                                color:'white',
                                backgroundImage:'url(../code.svg)',
                                backgroundSize:'100% 100%',
                                backgroundRepeat:'no-repeat',
                                height:'15px',
                                width:'21px',
                                marginBottom:'3px',
                                pointerEvents:'none'
                            }}></div>
                            <p id="script-text" style={{fontSize:11.2,fontWeight:600,pointerEvents:'none'}} className="menubgnot">SCRIPT</p>
                        </div>
                        <div id="save-tab" onClick={()=> {
                            this.openModal(false)
                        }} 
                        onDoubleClick={()=>{document.getElementById('main-menu').style.display = 'none'}}
                        style={{
                            display:that.state.saveVisible ? 'flex' : 'none',
                          
                            height:'57px',
                                width:'67px',
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
                                height:'57px',
                                width:'67px',
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
                                display:'none',
                               
                                height:'57px',
                                width:'67px',
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
                            <p id="publish-text" style={{fontSize:10.2,fontWeight:500,color:'#525252'}}>DELETE</p>
                        </div>
                        <div id="post-as-new-tab" onDoubleClick={()=>{document.getElementById('main-menu').style.display = 'none'}}
                        onClick={this.PostAsNewTab.bind(this)} style={{
                           
                           
                            height:'87px',
                                width:'59px',
                            flexDirection:'column',
                            alignItems:'center',
                            borderRight:'1px solid #181818',
                            borderBottom:'1px solid #181818',
                            justifyContent:'center',
                            cursor:'pointer',
                            display:'flex',
                        }} 
                        className="menu-bg-border">
                            <div id="publish-new-icon" style={{
                                fontSize:'15px',
                                color:'white',
                                backgroundImage:'url(../save-regular-grey.svg)',
                                backgroundSize:'100% 100%',
                                backgroundRepeat:'no-repeat',
                                height:'16px',
                                width:'16px',
                                marginBottom:'3px',
                                pointerEvents:'none'
                            }}></div>
                            <p id="publish-text-publish" style={{fontSize:11.2,fontWeight:600, pointerEvents:'none'}} className="menubgnot">PUBLISH</p>
                            <p id="publish-text-new" style={{fontSize:11.2,fontWeight:600,pointerEvents:'none'}} className="menubgnot">NEW</p>
                        </div>
                        <div id="post-tab" onClick={this.PostTab.bind(this)} onDoubleClick={()=>{document.getElementById('main-menu').style.display = 'none'}} style={{
                            display:'none',
                           
                            height:'57px',
                            width:'67px',
                            flexDirection:'column',
                            alignItems:'center',
                            borderRight:'1px solid #181818',
                            borderBottom:'1px solid #181818',
                            justifyContent:'center',
                            cursor:'pointer'
                        }} 
                        className="menu-bg-border">
                            <div id="publish-icon" style={{
                                
                                fontSize:'15px',
                                color:'white',
                                backgroundImage:'url(../save-regular-grey.svg)',
                                backgroundSize:'100% 100%',
                                backgroundRepeat:'no-repeat',
                                height:'57px',
                                width:'67px',
                                marginBottom:'3px',
                                pointerEvents:'none'
                            }}></div>
                            <p id="publish-text-" style={{fontSize:10.2,fontWeight:'bold', pointerEvents:'none'}} className="menubgnot">PUBLISH</p>
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
                                transform:'none'
                        }}>
 
            
                            {
                                this.menuSelect()  
                            }
                
                        
                        </div>
                        <div id="flow-content" style={{display:'flex', flexDirection:'column', background:'white', width:'100%', position:'relative', border:'0px solid red'}}>
                            <Editor/>
                            {((i = 0)=>{
                          
                            })}
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
                    <div id="publish-section" style={{position:'absolute', width:269, left:48, display:'none'}}>
                        <div style={{height:'1px',
    backgroundColor:'rgb(65,65,65)',
    width:'296px',
    position:'absolute',
    top:'-57px',
    left:'19px'}}></div>
                    <div id="publish-menu" style={{display:'flex',height:55, marginBottom:7, justifyContent:'space-between',alignItems:'center', padding:'5px 26px 4px 6px',borderTop:'1px solid rgb(29,29,29)',position:'absolute',left:12,bottom:'-7px',backgroundColor:'rgb(24,24,24)',zIndex:9999999}}>
                            <div id="save-as-draft" style={{backgroundColor:'grey',display:'flex',alignItems:'center',justifyContent:'center', height:'36px',width:'141px',borderRadius:3,backgroundColor:'rgb(37, 37, 37)',color:'#FFF',fontSize:14,fontWeight:900}}>SAVE AS DRAFT</div>
                            <div id="publish-room" style={{backgroundColor:'grey',display:'flex',alignItems:'center',justifyContent:'center', height:'36px',width:'141px',borderRadius:3,backgroundColor:'rgb(54, 255, 233)',fontWeight:900,color:'#000',fontSize:14}} onClick={
                                this.saveRoom.bind(this)
                            }>PUBLISH ROOM</div>
                        </div>   
                    </div>

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
                                <button id="menu-btn-mobile" onClick={this.OpenMenu.bind(this)} style={{
                                    fontWeight:400,
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

                                        

                <div id="modal1" class="modal" style={{height:450,position:'absolute',top:20,zIndex:9999999999}}>
                    <div class="modal-content">
                        <div style={{height:40, width:'100%',borderBottom:'1px solid #979797'}}>
                            <h4 style={{fontWeight:'bold'}}>Share Flow</h4>
                        </div>
                        <div class="share-icons" style={{display:'flex',flexWrap:'wrap'}}>
                            <div class="facebook" style={{width:'68px',
                                height:'68px',
                                backgroundImage:'url(/facebook.png)',
                                backgroundRepeat:'no-repeat',
                                backgroundSize:'contain',margin:'20px 12px'}}>
                                    <p>Facebook</p>
                                </div>
                            <div class="instagram" style={{width:'68px',
                                height:'68px',
                                backgroundImage:'url(/instagram.png)',
                                backgroundRepeat:'no-repeat',
                                backgroundSize:'contain',margin:'20px 12px'}}></div>
                            <div class="snapchat" style={{width:'68px',
                                height:'68px',
                                backgroundImage:'url(/snapchat.png)',
                                backgroundRepeat:'no-repeat',
                                backgroundSize:'contain',margin:'20px 12px'}}></div>
                            <div class="twitter" style={{width:'68px',
                                height:'68px',
                                backgroundImage:'url(/twitter.png)',
                                backgroundRepeat:'no-repeat',
                                backgroundSize:'contain',margin:'20px 12px'}}></div>
                            <div class="pinterest" style={{width:'68px',
                                height:'68px',
                                backgroundImage:'url(/pinterest.png)',
                                backgroundRepeat:'no-repeat',
                                backgroundSize:'contain',margin:'20px 12px'}}></div>
                            <div class="tumblr" style={{width:'68px',
                                height:'68px',
                                backgroundImage:'url(/tumblr.png)',
                                backgroundRepeat:'no-repeat',
                                backgroundSize:'contain',margin:'20px 12px'}}></div>
                            <div class="youtube" style={{width:'68px',
                                height:'68px',
                                backgroundImage:'url(/youtube.png)',
                                backgroundRepeat:'no-repeat',
                                backgroundSize:'contain',margin:'20px 12px'}}></div>
                            <div class="reddit" style={{width:'68px',
                                height:'68px',
                                backgroundImage:'url(/reddit.png)',
                                backgroundRepeat:'no-repeat',
                                backgroundSize:'contain',margin:'20px 12px'}}></div>
                            <div class="whatsapp" style={{width:'68px',
                                height:'68px',
                                backgroundImage:'url(/whatsapp.png)',
                                backgroundRepeat:'no-repeat',
                                backgroundSize:'contain',margin:'20px 12px'}}></div>
                            <div class="messenger" style={{width:'68px',
                                height:'68px',
                                backgroundImage:'url(/messenger.png)',
                                backgroundRepeat:'no-repeat',
                                backgroundSize:'contain',margin:'20px 12px'}}></div>
                            <div class="linkedin" style={{width:'68px',
                                height:'68px',
                                backgroundImage:'url(/linkedin.png)',
                                backgroundRepeat:'no-repeat',
                                backgroundSize:'contain',margin:'20px 12px'}}></div>
                            <div class="slack" style={{width:'68px',
                                height:'68px',
                                backgroundImage:'url(/slack.png)',
                                backgroundRepeat:'no-repeat',
                                backgroundSize:'contain',margin:'20px 12px'}}></div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
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