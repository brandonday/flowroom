import React, { Component } from 'react';
import '../styles/stylesheet.css';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { startCreateRoom } from '../../actions/rooms';
import { OPEN_MODAL } from '../../actions/entireApp';
import Modal from 'react-modal';
import { firebase } from '../firebase/firebase';
import uuid from 'uuid';
import Hashids from 'hashids';
import NewMessageButton from './NewMessageButton';
import MessageItem from './MessageItem';
import Create from './Create';
import { WithContext as ReactTags } from 'react-tag-input';
import FileUploader from "react-firebase-file-uploader";
import Convo from './Convo';
import SignUp from './SignUp';

var moment = require('moment');

const messages = [];
let names = [];
let messagesSent = [];
let messageList = [];
let preventDuplicateArray = []; //keeps track
let postData = [];
let callOnce = false;
// {
//     userName:'Brandon',
//     pic:'',
//     timeAgo:'5hr',
//     recentMessage:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquam eget enim nec venenatis. Donec ac tortor id.'
// },
// {
//     userName:'Jesse',
//     pic:'',
//     timeAgo:'7m',
//     recentMessage:'Lorem ipsum dolor sit amet'
// },
// {
//     userName:'John',
//     pic:'',
//     timeAgo:'10h',
//     recentMessage:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquam eget enim nec venenatis. Donec ac tortor id.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquam eget enim nec venenatis. Donec ac tortor id.'
// },
// {
//     userName:'Danny',
//     pic:'',
//     timeAgo:'24h',
//     recentMessage:'Lorem ipsum dolor sit amet'
// }

const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters1 = [KeyCodes.comma, KeyCodes.enter];
  const delimiters2 = [KeyCodes.comma, KeyCodes.enter];
  const delimiters3 = [KeyCodes.comma, KeyCodes.enter];
  const delimiters4 = [KeyCodes.comma, KeyCodes.enter];
  const delimiters5 = [KeyCodes.comma, KeyCodes.enter];

 class AppModal extends Component {
    constructor(props) {
      super(props);
      this.descriptionhandleChange = this.descriptionhandleChange.bind(this);
      this.titlehandleChange = this.titlehandleChange.bind(this);
      this.imageTextPostedhandleChange = this.imageTextPostedhandleChange.bind(this);
      this.textPostedhandleChange = this.textPostedhandleChange.bind(this);
      this.communityhandleChange = this.communityhandleChange.bind(this);

      this.state = {
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
            cardHeight:0

      }


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
        var user = firebase.auth().currentUser;
        var name, email, photoUrl, uid, emailVerified, fullname;
        var shortID = window.location.pathname.split("room/").pop();
        
    

        this.setState({newMessage:'message-screen', shortID:shortID});
        Modal.setAppElement('#root');
        const database = firebase.database();
        let that = this;
        if (user != null) {
            name = user.displayName;
            that.setState({username:name});
            email = user.email;
            photoUrl = user.photoURL;
            emailVerified = user.emailVerified;
            fullname = user.fullname;
            uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                     // this value to authenticate with your backend server, if
                     // you have one. Use User.getToken() instead.
            that.setState({picForMessage:photoUrl, fullname:fullname});
            database.ref(`/follows/${name}/following`).once('value').then((snapshot) => {
                snapshot.forEach((childSnapShot) => {
                    names.push({id:`${childSnapShot.val()}`,text:`${childSnapShot.val()}`});
                })
                this.setState({suggestionNamesTags:names, myusername:name})
                console.log(this.state.suggestionNamesTags);

            });

            
           database.ref(`rooms/${shortID}`).once('value').then(function(snapshot) {
        
        
                that.setState({room_title:snapshot.val() !== null ? snapshot.val().room_title :'',
                description:snapshot.val() !== null ? snapshot.val().description : ''});

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
    saveRoom () {
        let hashids = new Hashids(uuid(), 6);
   
        let uid = firebase.auth().currentUser.uid;
      
        let currentRoomID = window.location.pathname.split("room/").pop();
        this.props.startCreateRoom(
            {
                description:this.state.description,
                views:0,
                likes:0,
                html:this.props.state.dhtml.dhtml.html,
                css:this.props.state.dhtml.dhtml.css,
                js:this.props.state.dhtml.dhtml.js,
                pic:'',
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
                thumbnail:this.state.thumbPicURL,
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
                room_card_height:this.state.cardHeight,
               

        });
        document.getElementById('postbtn').style.display = 'none';
        document.getElementById('savechanges').style.display = 'flex';
        document.getElementById('deletebtn').style.display = 'flex';
        this.closeModal();
    }
    sendMessage() {
        const database = firebase.database();
        var theDate = new Date().getTime();
        let message = document.getElementById('message-box').value;
        let fullname = localStorage.getItem("fullname");
        let that = this;
        database.ref(`Messages/${this.state.messageTo}`).push({
            message: {
                id:this.state.myusername,
                message:message,
                To:this.state.messageTo,
                pic:this.state.picForMessage,
                date:new Date().getTime(),
                fullname:fullname
            }
        }).then(() => {


            database.ref(`Messages/${this.state.myusername}`).push({
                message: {
                    id:this.state.myusername,
                    message:message,
                    To:this.state.messageTo,
                    pic:this.state.picForMessage,
                    date:new Date().getTime(),
                    fullname:fullname
                }
            }).then(() => {




            });


        });



    }
    LoginHere() {
        return (
            <p className="signup-section-log-in-here-p">Log in here</p>
        )
    }
    handleCardHeight(e) {
        this.setState({cardHeight: e.target.value});
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


    modalType(){
        let that = this;
        if(this.props.state.entireApp.modalType === 'message') {
            return (
                <div className="modal-wrap">
                    <div className="modal-messages-wrap">
                        <h2 className="modal-messages-title" style={{fontSize:'20px', color:'rgb(27, 178, 67)', display:'flex',
                            justifyContent:'center',
                            alignItems:'center'}}>Messages</h2>

                            {this.state.showBack === true? (<div style={{display:'flex',padding:'10px', width:'100%', justifyContent:'space-between', alignItems:'center'}}>
                                    <div style={{height:'23px', width:'23px', backgroundColor:'black',borderRadius:'30px'}}></div>
                                        <p style={{color:'black', fontSize:15,float:'left',position:'absolute',
                                            left:'152px'}}>{that.state.messageTo}</p><button style={{
                                            border:'1px solid gray',
                                            borderRadius:'4px',
                                            /* background: rgb(221, 224, 235); */
                                            height:'25px',
                                            width:'50px',
                                            fontFamily: "Source Sans Pro",
                                            fontWeight:'800'

                                        }} onClick={()=> {
                                            var ul = document.getElementById('the-messages');
                                            //ul.parentNode.removeChild(ul);

                                            this.setState({newMessage:'message-screen', showBack:false});

                                            let list = document.getElementsByTagName('li')
                                            for(let i=0; i < list.length; i++) {

                                                if(list[i].className = 'message') {
                                                    console.log(list[i]);
                                                }
                                            }

                                        }}>Back</button></div>):(<div className="modal-messages-message-box-wrap">
                                        <div onClick={()=> {
                                            this.setState({newMessage:'new-message'});
                                        }}>
                                            <NewMessageButton />
                                        </div>
                                        <div className="modal-messages-close" onClick={this.closeModal}><i className="fa fa-window-close fa-2x"></i></div>
                                    </div>
                                )
                            }

                        </div>
                        {
                            this.showMessages()
                        }
                </div>
            )
        } else if(this.props.state.entireApp.modalType === 'save') {
            return (
                <div>

                </div>
            )
        } else if(this.props.state.entireApp.modalType === 'create') {

            return (
                <div style={{height:'100%', width:'100%'}} onClick={this.closeModal}>
                    <Create/>
                </div>
            )
        } else if(this.props.state.entireApp.modalType === 'signupsignin') {

            return (
                <div style={{height:'100%', width:'100%'}}>
                   <iframe src="/signup" style={{height:'100%', width:'100%'}}></iframe>
                </div>
               
            )
        } else {
            return (
                <div style={{display:'flex', flexDirection:'column'}}>
                    <h2 ref={subtitle => this.subtitle = subtitle}>Post Room</h2>
                    <div onClick={this.closeModal} style={{position:'absolute',right:20,fontSize:20, marginBottom:20}}>X</div>
                    {/* <div id="thumbnail-pic-box" style={{display:this.state.thumbnailPicBox, flexDirection:'column'}}>
                        <div style={{display:'flex'}}>
                            <p style={{marginTop:10,marginBottom:10}}>Thumbnail pic for Room (Optional) (?)</p>
                        </div>
                        <div style={{display:this.state.thumbnailPicBox, height:'100px',border:'1px solid black', display:'flex'}}>
                            <div style={{backgroundImage:`url(${this.state.thumbPicURL})`,
                                backgroundSize:'contain',
                                height:'100%',
                                flex:1,
                                backgroundRepeat:'no-repeat',
                                overflow:'hidden',
                                border:'1px solid black'
                            }}>
                            </div>
                            <div style={{flex:2, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',border:'1px solid black'}}>
                                <label style={{height:20, width:50, marginTop:10, border:'1px solid black',zIndex:99999999}}>
                                    <p style={{display:'flex',fontSize:12,justifyContent:'center',alignItems:'center'}}>Browse</p>


                                    {<FileUploader
                                        hidden
                                        accept="image/*"
                                        name="thumbnail"
                                        randomizeFilename
                                        storageRef={firebase.storage().ref("images")}
                                        onUploadStart={this.handleUploadStart}
                                        onUploadError={this.handleUploadError}
                                        onUploadSuccess={this.handleUploadSuccess2}
                                        onProgress={this.handleProgress}
                                    />
                                    }

                                </label>
                                <p> or URL </p>
                                <input type="text" placeholder="image URL here" value={this.state.thumbPicURL} onChange={(event)=>{
                                    this.setState({thumbPicURL: event.target.value });
                                }}/>
                            </div>
                        </div>
                    </div> */}
                    <input id="room-title" className="room-title" style={{
                        height:'30px',
                        width:'100%',
                        border:'1px solid #DDE0EB',
                        borderRadius:'6px',
                        color:'#333333',
                        fontSize:'1.4rem',
                        marginBottom:'1.4rem',
                        padding:'1rem',
                        fontFamily:'Helvetica, Arial, sans-serif',
                        outline:'none',
                        backgroundColor:'#F9FAFA',
                        webkitFontSmoothing:'antialiased',
                        resize:'none',
                        marginTop:0,
                        marginBottom:0,
                       
                    }}   onLoad={()=>{
                        
                    }} onChange={this.titlehandleChange} value={this.state.room_title} placeholder={'Title (optional)'}/>
                    <textarea id="description" className="description" style={{
                        height:'50px',
                        width:'100%',
                        border:'1px solid #DDE0EB',
                        borderRadius:'6px',
                        color:'#333333',
                        fontSize:'1.4rem',
                        marginBottom:'1.4rem',
                        padding:'1rem',
                        fontFamily:'Helvetica, Arial, sans-serif',
                        outline:'none',
                        backgroundColor:'#F9FAFA',
                        webkitFontSmoothing:'antialiased',
                        resize:'none',
                        marginTop:20,
                        marginBottom:20,
                        display:this.state.descriptionD
                    }} value={this.state.description} onChange={this.descriptionhandleChange} placeholder={this.state.placeholder}></textarea>
                     <p style={{marginTop:10, marginBottom:10}}>Tags (Optional)</p>
                     <ReactTags style={{marginBottom:10}} tags={this.state.tags}
                        suggestions={this.state.suggestionsTags}
                        handleDelete={this.handleDeleteTags}
                        handleAddition={this.handleAdditionTags}
                        handleDrag={this.handleDragTags}
                        placeholder={'Any additional tags (optional)'}
                        delimiters={delimiters4} />
                    <textarea id="image-text" className="image-text" style={{
                        height:'50px',
                        width:'100%',
                        border:'1px solid #DDE0EB',
                        borderRadius:'6px',
                        color:'#333333',
                        fontSize:'1.4rem',
                        marginBottom:'1.4rem',
                        padding:'1rem',
                        fontFamily:'Helvetica, Arial, sans-serif',
                        outline:'none',
                        backgroundColor:'#F9FAFA',
                        webkitFontSmoothing:'antialiased',
                        resize:'none',
                        display:this.state.imageText,
                        marginTop:20
                    }}  value={this.state.imageTextPosted} onChange={this.imageTextPostedhandleChange} placeholder={'Type something about this image.'}></textarea>
                    <div style={{display:'flex'}}>
                        <div id="image-post" className="image-post" style={{
                            height:'100px',
                            flex:1,
                            border:'1px solid #DDE0EB',
                            borderRadius:'6px',
                            color:'#333333',
                            fontSize:'1.4rem',
                            marginBottom:'1.4rem',
                            padding:'1rem',
                            fontFamily:'Helvetica, Arial, sans-serif',
                            outline:'none',
                            backgroundColor:'#F9FAFA',
                            webkitFontSmoothing:'antialiased',
                            resize:'none',
                            marginBottom:20,
                            display:this.state.imagePost,
                            backgroundImage:`url(${this.state.postedPicURL})`,
                            backgroundSize:'contain',
                            backgroundRepeat:'no-repeat',
                            overflow:'hidden'
                        }}>
                        </div>
                        <div style={{flex:2, display:this.state.imagePostDisplay,flexDirection:'column', flexDirection:'column',
                            justifyContent:'center',
                            alignItems:'center'}}>

                            <label style={{height:20, width:50, marginTop:10, marginLeft:20, border:'1px solid black',zIndex:99999999}}>
                                <p style={{display:'flex',fontSize:12,justifyContent:'center',alignItems:'center'}}>Browse</p>
                                {this.state.postedPicURL ? '':(<FileUploader
                                    hidden
                                    accept="image/*"
                                    name="pic"
                                    randomizeFilename
                                    storageRef={firebase.storage().ref("images")}
                                    onUploadStart={this.handleUploadStart}
                                    onUploadError={this.handleUploadError}
                                    onUploadSuccess={this.handleUploadSuccess}
                                    onProgress={this.handleProgress}
                                    />)
                                }

                            </label>

                                    <p> or URL </p>
                            <input type="text" placeholder="image URL here" value={this.state.postedPicURL} onChange={(event)=>{
                                this.setState({thumbPicURL: event.target.value });
                            }}/>
                        </div>
                        <div style={{
                            backgroundImage:`url(${this.state.picURL})`,
                            backgroundSize:'contain',
                            height:'100%',
                            width:'100px',
                            backgroundRepeat:'no-repeat'
                        }}>
                        </div>
                    </div>
                    <div style={{display:'flex',border:'1px solid rgb(221, 224, 235)',listStyle:'none'}}>
                        <div onClick={()=>{this.selectPr('public-btn')}} id="public-btn" className={this.state.publicBtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>Public</p></div>
                        <div onClick={()=>{this.selectPr('private-btn')}} id="private-btn" className={this.state.privateBtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>Private</p></div>
                        <div onClick={()=>{this.selectPr('unlisted-btn')}} id="unlisted-btn" className={this.state.unlistedBtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>Unlisted</p></div>
                    </div>


                    {/* <p style={{marginTop:10}}>Community to post this room in (optional)</p>
                    <input style={{
                        border:'1px solid #DDE0EB',
                        borderRadius:'6px',
                        color:'#333333',
                        fontSize:'1.4rem',
                        marginBottom:'1.4rem',
                        padding:'1rem',
                        fontFamily:'Helvetica, Arial, sans-serif',
                        outline:'none',
                        backgroundColor:'#F9FAFA',
                        webkitFontSmoothing:'antialiased',
                        flex:'1 1',
                        width:'100%',
                        marginTop:'14px',
                        height:'35px'
                    }} value={this.state.communityApartOf} onChange={this.communityhandleChange} placeholder='Type community name here'/> */}

                     {/* <p style={{marginBottom:10}}>Credits (optional) (?)</p> */}
                     {/* <ReactTags tags={this.state.creditsTags}
                        suggestions={this.state.suggestionscredits}
                        handleDelete={this.handleDeletecredits}
                        handleAddition={this.handleAdditioncredits}
                        handleDrag={this.handleDragcredits}
                        delimiters={delimiters1}
                        placeholder={'Add additional names (optional)'}
                    /> */}


                    {/* <p style={{marginTop:10, marginBottom:10}}>Compatability</p> */}
                    {/* <ReactTags tags={this.state.compatibleTags}
                        suggestions={this.state.suggestionsCompatibleTags}
                        handleDelete={this.handleDeleteCompatibleTags}
                        handleAddition={this.handleAdditionCompatibleTags}
                        handleDrag={this.handleDragCompatibleTags}
                        delimiters={delimiters3}
                        placeholder={'Any browsers and OS compatible with (optional)'}
                    /> */}
                          <button style={{
                            outline:'none',
                            cursor:'pointer',
                            border:'1px solid rgb(10, 127, 41)',
                            borderRadius:'17.5px',
                            height:'36px',
                            width:'100%',
                            backgroundColor:'rgb(27, 178, 67)',
                            fontFamily:"Source Sans Pro",
                            color:'white',
                            fontWeight:'100',
                            fontSize:'14px',
                            marginTop:20
                        }} onClick={this.saveRoom.bind(this)}>Post</button>
                        <input onChange={this.handleCardHeight.bind(this)} id="card-height" type="number" value={this.state.cardHeight} placeholder="height"/>

                      {/* <div style={{display:'flex',border:'1px solid rgb(221, 224, 235)',listStyle:'none',marginBottom:10}}>
                        <div onClick={()=>{this.selectPr('web-btn')}} id="web-btn" className={this.state.webBtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>Web</p></div>
                        <div onClick={()=>{this.selectPr('native-btn')}} id="native-btn" className={this.state.nativeBtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>Native</p></div>
                        <div onClick={()=>{this.selectPr('web-native-btn')}} id="web-native-btn" className={this.state.webNativeBtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>Both</p></div>
                    </div> */}

                    {/* <div style={{display:'flex',border:'1px solid rgb(221, 224, 235)',listStyle:'none'}}>
                        <div onClick={()=>{this.selectPr('reg-btn')}} id="reg-btn" className={this.state.regBtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>Regular</p></div>
                        <div onClick={()=>{this.selectPr('exp-btn')}} id="exp-btn" className={this.state.exBtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>Experimental</p></div>

                    </div> */}

                    {/* <div style={{display:'flex',border:'1px solid rgb(221, 224, 235)',listStyle:'none', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'100%'}}>
                        <p>Is this Room remixable (?)</p>
                        <div style={{display:'flex', flexDirection:'row', width:'100%'}}>
                            <div onClick={()=>{this.selectPr('not-remixable')}} id="not-remixable" className={this.state.rmxBtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>Not Remixable</p></div>
                            <div onClick={()=>{this.selectPr('remixable-btn')}} id="remixable-btn" className={this.state.notRmxBtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>Remixable</p></div>
                        </div>
                    </div>

                    <div style={{display:'flex',border:'1px solid rgb(221, 224, 235)',listStyle:'none',flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                        <p>Is this Room live (?)</p>
                        <div style={{display:'flex', flexDirection:'row', width:'100%'}}>
                        <div onClick={()=>{this.selectPr('not-live')}} id="not-live" className={this.state.liveBtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>Not Live</p></div>
                        <div onClick={()=>{this.selectPr('live-btn')}} id="live-btn" className={this.state.notLiveBtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>Live</p></div>
                        </div>
                    </div>

                     <div style={{display:'flex',justifyContent:'center',flexDirection:'column',border:'1px solid rgb(221, 224, 235)',listStyle:'none', width:'100%'}}>
                     <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <p>Is this AR, VR, 360 content (?)</p>
                     </div>
                     <div style={{display:'flex',flexDirection:'row'}}>
                        <div onClick={()=>{this.selectPr('no-ar-vr-360-btn')}} id="no-ar-vr-360-btn" className={this.state.notArVr360Class} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>None</p></div>
                        <div onClick={()=>{this.selectPr('ar-btn')}} id="ar-btn" className={this.state.arBtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>AR (?)</p></div>
                        <div onClick={()=>{this.selectPr('vr-btn')}} id="vr-btn" className={this.state.vrBtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>VR (?)</p></div>
                        <div onClick={()=>{this.selectPr('360-btn')}} id="360-btn" className={this.state.three60BtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>360 (?)</p></div>
                    </div>
                    </div>
                    <div style={{display:'flex',border:'1px solid rgb(221, 224, 235)',listStyle:'none',display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'100%'}}>
                    <p>Is there AI (?)</p>
                    <div style={{display:'flex', flexDirection:'row', width:'100%'}}>
                    <div onClick={()=>{this.selectPr('no-ai-btn')}} id="no-ai-btn" className={this.state.notAIBtnClass}  style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>NO</p></div>
                        <div onClick={()=>{this.selectPr('yes-ai-btn')}} id="yes-ai-btn" className={this.state.aiBtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>YES</p></div>
                    </div>
                    </div>

                     <div style={{display:'flex',border:'1px solid rgb(221, 224, 235)',listStyle:'none', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                     <p>Select devices best viewed with</p>
                     <div style={{display:'flex', flexDirection:'row', width:'100%'}}>
                        <div onClick={()=>{this.selectPr('mobile-btn')}} id="mobile-btn" className={this.state.mobileBtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>Mobile</p></div>
                        <div onClick={()=>{this.selectPr('tablet-btn')}} id="tablet-btn" className={this.state.tabletBtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>Tablet</p></div>
                        <div onClick={()=>{this.selectPr('desktop-btn')}} id="desktop-btn" className={this.state.desktopBtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>Desktop</p></div>
                        </div>
                    </div>
                    <div style={{display:'flex',border:'1px solid rgb(221, 224, 235)',listStyle:'none', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                        <p>Is this an Object (?)</p>
                        <div style={{display:'flex', flexDirection:'row', width:'100%'}}>
                            <div onClick={()=>{this.selectPr('object-no-btn')}} id="object-no-btn" className={this.state.notObjectClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>No</p></div>
                            <div onClick={()=>{this.selectPr('object-yes-btn')}} id="object-yes-btn" className={this.state.objectBtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>Yes</p></div>
                        </div>
                    </div> */}
                    
                </div>
            )
        }

    }
    afterOpenModal() {
        // references are now sync'd and can be accessed.
        //this.subtitle.style.color = '#f00';
    }
    closeModal() {
        //document.getElementById('create').className = 'create-hide';
        //document.getElementById('default-modal').style.display = 'none';
        this.props.closeModal({isModalOpen:false, modalType:'message'});

    }

    getUnique(arr, comp) {

        const unique = arr
             .map(e => e[comp])

           // store the keys of the unique objects
          .map((e, i, final) => final.indexOf(e) === i && i)

          // eliminate the dead keys & store unique objects
          .filter(e => arr[e]).map(e => arr[e]);

         return unique;
      }

    showMessages() {
        let that = this;
        if(this.state.newMessage === 'new-message') {
            return (
                <div>
                    <p>Send message to:</p>
                    <ReactTags tags={this.state.NamesTags}
                        suggestions={this.state.suggestionNamesTags}
                        handleDelete={this.handleDeleteNames}
                        handleAddition={this.handleAdditionalNames}
                        handleDrag={this.handleDragNames}
                        delimiters={delimiters5}
                        placeholder={'Add additional names (optional)'}
                    />
                    <button onClick={()=>{
                        this.setState({newMessage:'message',messageTo:this.state.NamesTags[0].id,showBack:true});

                    }}>Next</button>
                </div>
            )
        } else if(this.state.newMessage === 'message-screen') {
            let currentId;
            firebase.auth().onAuthStateChanged((user)=> {
                if(user) {


            const database = firebase.database();
                database.ref(`Messages/${this.state.myusername}`).once('value').then((snapshot) => {
                    //alert(this.state.myusername)

                    snapshot.forEach((childSnapShot) => {
                        //alert(childSnapShot.val().message.To)
                        if(!(childSnapShot.val().message.fullname === undefined || childSnapShot.val().message.To === undefined)) {
                            //preventDuplicateArray.push(`${childSnapShot.val().message.fullname}`);

                            if(childSnapShot.val().message.To !== this.state.myusername) {
                                messageList.push({
                                    name:`${childSnapShot.val().message.To}`,
                                    pic:childSnapShot.val().message.pic,
                                    message:childSnapShot.val().message.message,
                                    you:true, //if their name is going to be shown then the "you" will be where your message
                                    date:childSnapShot.val().message.date
                                });

                            } else  {

                                messageList.push({
                                    name:`${childSnapShot.val().message.fullname}`,
                                    pic:childSnapShot.val().message.pic,
                                    message:childSnapShot.val().message.message,
                                    you:false,
                                    date:childSnapShot.val().message.date
                                });
                            }



                        }



                })
                if(!callOnce) {



                    console.log(this.getUnique(messageList,'name'))
                    //console.log(messageList)
                    this.setState({messageList:this.getUnique(messageList.reverse(),'name')})

                    console.log(messageList)

                    callOnce = true;
                }


              });

            }
        });




            return (
                <div>
                    <ul id="the-messages" style={{height:'100%', width:'100%', display:this.state.theMessages === true ? 'block':'none',  flexDirection:'column', overflow:'scroll'}}>
                     {this.state.messageList.map((i)=> {
                         return (
                         <li onClick={()=>{
                            this.setState({newMessage:'message',messageTo:i.name,showBack:true});

                         }} className="message" style={{height:'92px',
                         width:'100%',
                         borderBottom:'1px solid rgb(204, 204, 204)'}}>
                         <div style={{display:'flex'}}>
                         <div style={{
                             backgroundImage:`url(${i.pic})`,
                             backgroundRepeat:'no-repeat',
                             backgroundSize:'cover',
                             height:43,
                             width:43,
                             borderRadius:20,
                             margin:'10px 20px'
                            }}>
                         </div>
                         <div style={{display:'flex', flexDirection:'column'}}>
                         <div style={{display:'flex'}}>
                            <p style={{fontFamily:"Source Sans Pro", fontWeight:'800',marginTop:'10px',fontSize:'14px', color:"black"}}>{i.name}</p>
                            <p style={{fontFamily:"Source Sans Pro", fontWeight:'800',marginTop:'10px',fontSize:'14px', color:"black", marginLeft:10, fontSize:14, fontWeight:500}}>{moment(i.date).fromNow()}</p>
                         </div>
                         {i.you === true ? (<p style={{fontFamily:"Source Sans Pro", color:"black"}}>You:{i.message}</p>):(<p style={{fontFamily:"Source Sans Pro", color:"black"}}>{i.message}</p>)}
                         </div>
                         </div>
                        </li> )
                     })}

                    </ul>
                </div>
            )
        } else if(this.state.newMessage === 'message') {

            return(<Convo To={this.state.messageTo} myusername={this.state.myusername}
                picForMessage={this.state.picForMessage}
                username={this.state.username}
            />)
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
                this.setState({ postedPicURL: url });

            alert(url)
        });

    };

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

    };
    render() {
        const { tags, suggestions } = this.state;
        return (
            <div>
                <div className="modal-box-background"></div>

                    <Modal
                        isOpen={this.props.state.entireApp.isModalOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={this.props.state.entireApp.customStyles}

                    >
                        {
                            this.modalType()
                        }

                    </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
    state:state,
    props:ownProps
  }
};
const mapDispatchToProps = (dispatch) => ({
    closeModal: (modal) => dispatch(OPEN_MODAL(modal)),
    startCreateRoom: (room) => dispatch(startCreateRoom(room)),
    openModal: (modal) => dispatch(OPEN_MODAL(modal))
});
const ConnectedAppModal = connect(mapStateToProps, mapDispatchToProps)(AppModal);
export default ConnectedAppModal;
