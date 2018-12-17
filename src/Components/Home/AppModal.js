import React, { Component } from 'react';
import '../styles/stylesheet.css';
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


// let database = firebase.database();
// database.ref().child('rooms').orderByChild('shortID').equalTo('LpH4FK').on("value", function(snapshot) {
//     console.log(snapshot.val());
//     snapshot.forEach(function(data) {
//         console.log('room', data.key);
//     });
// });

const messages = [{
    userName:'Brandon',
    pic:'',
    timeAgo:'5hr',
    recentMessage:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquam eget enim nec venenatis. Donec ac tortor id.'
},
{
    userName:'Jesse',
    pic:'',
    timeAgo:'7m',
    recentMessage:'Lorem ipsum dolor sit amet'
},
{
    userName:'John',
    pic:'',
    timeAgo:'10h',
    recentMessage:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquam eget enim nec venenatis. Donec ac tortor id.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquam eget enim nec venenatis. Donec ac tortor id.'
},
{
    userName:'Danny',
    pic:'',
    timeAgo:'24h',
    recentMessage:'Lorem ipsum dolor sit amet'
}];

const KeyCodes = {
    comma: 188,
    enter: 13,
  };
   
  const delimiters1 = [KeyCodes.comma, KeyCodes.enter];
  const delimiters2 = [KeyCodes.comma, KeyCodes.enter];
  const delimiters3 = [KeyCodes.comma, KeyCodes.enter];
  const delimiters4 = [KeyCodes.comma, KeyCodes.enter];

 class AppModal extends Component {
    constructor(props) {
      super(props);
      this.descriptionhandleChange = this.descriptionhandleChange.bind(this);
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
            isProduction:false,
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
            

      }
    

      this.handleDeletecredits = this.handleDeletecredits.bind(this);
      this.handleAdditioncredits = this.handleAdditioncredits.bind(this);
      this.handleDragcredits = this.handleDragcredits.bind(this);

      this.handleDeleteIdeaBy = this.handleDeleteIdeaBy.bind(this);
      this.handleAdditionIdeaBy = this.handleAdditionIdeaBy.bind(this);
      this.handleDragIdeaBy = this.handleDragIdeaBy.bind(this);

      this.handleDeleteCompatibleTags = this.handleDeleteCompatibleTags.bind(this);
      this.handleAdditionCompatibleTags = this.handleAdditionCompatibleTags.bind(this);
      this.handleDragIdeaBy = this.handleDragIdeaBy.bind(this);

      this.handleDeleteTags = this.handleDeleteTags.bind(this);
      this.handleAdditionTags = this.handleAdditionTags.bind(this);
      this.handleDragTags = this.handleDragTags.bind(this);

      

    //   this.handleDelete = this.handleDelete.bind(this);
    //   this.handleAddition = this.handleAddition.bind(this);
    //   this.handleDrag = this.handleDrag.bind(this);

      this.closeModal = this.closeModal.bind(this)
      this.selectPr.bind(this)
    }
    descriptionhandleChange(event) {
        this.setState({description: event.target.value});
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
        var name, email, photoUrl, uid, emailVerified;
        Modal.setAppElement('#root');

        if (user != null) {
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            emailVerified = user.emailVerified;
            uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                     // this value to authenticate with your backend server, if
                     // you have one. Use User.getToken() instead.
    
            // this.setState({ideaByTags:[{ id:name, text:name}]});
            // this.setState({creditsTags:[{ id:name, text:name}]})
        }
        this.setState({publicBtnClass:'selected-background'});
        this.setState({privateBtnClass:''});
        this.setState({unlistedBtnClass:''});

        this.setState({webBtnClass:'selected-background'});
       
        this.setState({roomType:'other'});
        this.setState({roomPostBtnClass:'selected-background'})

        this.setState({isProduction:true});
        this.setState({regBtnClass:'selected-background'});
        this.setState({exBtnClass:''});

        this.setState({isRemixable:false});
        this.setState({rmxBtnClass:'selected-background'});
        this.setState({notRmxBtnClass:''});

        this.setState({isLive:false});
        this.setState({liveBtnClass:'selected-background'});
        this.setState({notLiveBtnClass:''});

        this.setState({isAR:false});
        this.setState({isVR:false});
        this.setState({is360:false});
        this.setState({notArVr360Class:'selected-background'});
        this.setState({arBtnClass:''});
        this.setState({vrBtnClass:''});
        this.setState({three60BtnClass:''});

        this.setState({aiBtnClass:''});
        this.setState({notAIBtnClass:'selected-background'});
        this.setState({isAI:false});

        this.setState({allResBtnClass:'selected-background'});
        this.setState({mobileBtnClass:''});
        this.setState({isAllRes:true});  
        this.setState({isDesktop:false});
        this.setState({isTable:false});
        this.setState({isMobile:false});  
        this.setState({isAllRes:false});
        this.setState({tabletBtnClass:''});
        this.setState({desktopBtnClass:''});

        this.setState({isObject:false});   
        this.setState({notObjectClass:'selected-background'});
        this.setState({objectBtnClass:''});
    }
    saveRoom () {
        let hashids = new Hashids(uuid(), 6);
        let uid = firebase.auth().currentUser.uid;
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
                userName:'',
                emailAddress:'',
                shortID:hashids.encode(1, 2, 3),
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
                isWebNative:this.state.isWebNative


        })
    }
    selectPr = (i) => {
        if(i !== null) {
            let elID = i;
            if(elID === 'room-post-btn') {
                this.setState({placeholder:'description...'})
                this.setState({roomPostBtnClass:'selected-background'});
                this.setState({imagePostBtnClass:''});
                this.setState({textPostBtnClass:''});
                this.setState({description:""});
                this.setState({descriptionD:'block'});
                this.setState({imagePost:'none'});
                this.setState({imageText:'none'});
                this.setState({thumbnailPicBox:'flex'});
                this.setState({roomType:'other'});
                this.setState({imagePostDisplay:'none'})

            }
            if(elID === 'room-post-image-btn') {
               
                this.setState({descriptionD:'none'});
                this.setState({imagePost:'block'});
                this.setState({roomPostBtnClass:''})
                this.setState({imagePostBtnClass:'selected-background'});
                this.setState({textPostBtnClass:''});
                this.setState({imageText:'block'});
                this.setState({thumbnailPicBox:'none'});
                this.setState({roomType:'image'});
                this.setState({imagePostDisplay:'flex'});
              
                

            }
            if(elID === 'room-post-text-btn') {
                this.setState({placeholder:"What's up?"})
                this.setState({roomPostBtnClass:''})
                this.setState({imagePostBtnClass:''});
                this.setState({textPostBtnClass:'selected-background'});
                this.setState({description:""});
                this.setState({descriptionD:'block'});
                this.setState({imagePost:'none'});
                this.setState({imageText:'none'});
                this.setState({thumbnailPicBox:'none'});
                this.setState({roomType:'text'});
                this.setState({imagePostDisplay:'none'});

            }
            if(elID === 'public-btn') {
                //this.setState({isProduction:true});
                this.setState({publicBtnClass:'selected-background'});
                this.setState({privateBtnClass:''});
                this.setState({unlistedBtnClass:''});
                this.setState({isPrivate:false});
                this.setState({isUnlisted:false});
            }
            if(elID === 'private-btn') {
                //this.setState({isProduction:true});
                this.setState({publicBtnClass:''});
                this.setState({privateBtnClass:'selected-background'});
                this.setState({unlistedBtnClass:''});
                this.setState({isPrivate:true});
                this.setState({isUnlisted:false});
      
            }
            if(elID === 'unlisted-btn') {
                //this.setState({isProduction:true});
                this.setState({publicBtnClass:''});
                this.setState({privateBtnClass:''});
                this.setState({unlistedBtnClass:'selected-background'});
                this.setState({isPrivate:false});
                this.setState({isUnlisted:true});
            }
            if(elID === 'web-btn') {
                //this.setState({isProduction:true});
                this.setState({webBtnClass:'selected-background'});
                this.setState({nativeBtnClass:''});
                this.setState({webNativeBtnClass:''});
                this.setState({isWeb:true});
                this.setState({isNative:false});
                this.setState({isWebNative:false});
            }
            if(elID === 'native-btn') {
                //this.setState({isProduction:true});
                this.setState({webBtnClass:''});
                this.setState({nativeBtnClass:'selected-background'});
                this.setState({webNativeBtnClass:''});
                this.setState({isWeb:false});
                this.setState({isNative:true});
                this.setState({isWebNative:false});
      
            }
            if(elID === 'web-native-btn') {
                //this.setState({isProduction:true});
                this.setState({webBtnClass:''});
                this.setState({nativeBtnClass:''});
                this.setState({webNativeBtnClass:'selected-background'});
                this.setState({isWeb:false});
                this.setState({isNative:false});
                this.setState({isWebNative:true});
            }
            if(elID === 'reg-btn') {
                this.setState({isProduction:true});
                this.setState({regBtnClass:'selected-background'});
                this.setState({exBtnClass:''});
            }
            if(elID === 'exp-btn') {
                this.setState({isProduction:false});
                this.setState({regBtnClass:''});
                this.setState({exBtnClass:'selected-background'});
            }

            if(elID === 'not-remixable') {
                document.getElementById('not-remixable').className = 'selected-background';
                this.setState({isRemixable:false});
                this.setState({rmxBtnClass:'selected-background'});
                this.setState({notRmxBtnClass:''});
            }
            if(elID === 'remixable-btn') {
                document.getElementById('remixable-btn').className = 'selected-background';
                this.setState({rmxBtnClass:''});
                this.setState({notRmxBtnClass:'selected-background'});
                this.setState({isRemixable:true});
            }
            if(elID === 'not-live') {
                this.setState({isLive:false});
                this.setState({liveBtnClass:'selected-background'});
                this.setState({notLiveBtnClass:''});
            }
            if(elID === 'live-btn') {
                this.setState({isLive:true});
                this.setState({liveBtnClass:''});
                this.setState({notLiveBtnClass:'selected-background'});
            }
            if(elID === 'no-ar-vr-360-btn') {
                this.setState({isAR:false});
                this.setState({isVR:false});
                this.setState({is360:false});
                this.setState({notArVr360Class:'selected-background'});
                this.setState({arBtnClass:''});
                this.setState({vrBtnClass:''});
                this.setState({three60BtnClass:''});
            }
            if(elID === 'ar-btn') {
                
                this.setState({arBtnClass:'selected-background'});
                this.setState({notArVr360Class:''});
                this.setState({vrBtnClass:''});
                this.setState({three60BtnClass:''});
                this.setState({isAR:true});
                this.setState({isVR:false});
                this.setState({is360:false});
            }
            if(elID === 'vr-btn') {
                this.setState({isAR:false});
                this.setState({vrBtnClass:'selected-background'});
                this.setState({arBtnClass:''});
                this.setState({notArVr360Class:''});
                this.setState({three60BtnClass:''});
                this.setState({isVR:true});
                this.setState({is360:false});
            }
            if(elID === '360-btn') {
                this.setState({arBtnClass:''});
                this.setState({vrBtnClass:''});
                this.setState({notArVr360Class:''});
                this.setState({three60BtnClass:'selected-background'});
                this.setState({isAR:false});
                this.setState({isVR:false});
                this.setState({is360:true});
            }
            if(elID === 'yes-ai-btn') {
                this.setState({isAI:true});
                this.setState({aiBtnClass:'selected-background'});
                this.setState({notAIBtnClass:''});
            }
            if(elID === 'no-ai-btn') {
                this.setState({aiBtnClass:''});
                this.setState({notAIBtnClass:'selected-background'});
                this.setState({isAI:false});
            }
            if(elID === 'all-res-btn') {
                this.setState({allResBtnClass:'selected-background'});
                this.setState({mobileBtnClass:''});
                this.setState({isAllRes:true});  
                this.setState({isDesktop:false});
                this.setState({isTable:false});
                this.setState({isMobile:false});  
                this.setState({isAllRes:false});
                this.setState({tabletBtnClass:''});
                this.setState({desktopBtnClass:''});
            }
            if(elID === 'mobile-btn') {
                this.setState({allResBtnClass:''});
                this.setState({mobileBtnClass:'selected-background'});
                this.setState({allResBtnClass:''});
                this.setState({isDesktop:false});
                this.setState({isTable:false});
                this.setState({isMobile:true});  
                this.setState({isAllRes:false});
                this.setState({tabletBtnClass:''});
                this.setState({desktopBtnClass:''});
            }
            if(elID === 'tablet-btn') {
                this.setState({isDesktop:false});
                this.setState({isTable:true});
                this.setState({isMobile:false}); 
                this.setState({isAllRes:false}); 
                this.setState({tabletBtnClass:'selected-background'});
                this.setState({mobileBtnClass:''});
                this.setState({allResBtnClass:''});
                this.setState({desktopBtnClass:''});
            }
            if(elID === 'desktop-btn') {
                this.setState({isDesktop:true});
                this.setState({isTable:false});
                this.setState({isMobile:false});  
                this.setState({isAllRes:false});
                this.setState({tabletBtnClass:''});
                this.setState({desktopBtnClass:'selected-background'});
            
            }   
            if(elID === 'object-yes-btn') {
                this.setState({isObject:true});
                this.setState({objectBtnClass:'selected-background'});
                this.setState({notObjectClass:''});
            }
            if(elID === 'object-no-btn') {
                this.setState({isObject:false});   
                this.setState({notObjectClass:'selected-background'});
                this.setState({objectBtnClass:''});
            }
            // document.getElementById(elID).className = 'selected-background';
            // let classElements = document.getElementsByClassName('selected-background');
            // console.log(classElements)
            // for(i = 0; i < classElements.length; i++) {
            //     if(elID != classElements[i].id) {
            //         classElements[i].className = '';
            //     } 
            // 
        }

    }

    
    modalType(){
        let that = this;
        if(this.props.state.entireApp.modalType === 'message') {
            
            return (
                <div className="modal-wrap">
                    <div className="modal-messages-wrap">
                        <h2 className="modal-messages-title">Messages</h2>
                        <div className="modal-messages-message-box-wrap">
                            <NewMessageButton/>
                            <div className="modal-messages-close" onClick={this.closeModal}>X</div>
                        </div>
                    </div>
                    <ul>
                        { 
                            messages.map((i)=> {
                                return (<MessageItem pic={i.pic} userName={i.userName} timeAgo={i.timeAgo} recentMessage={i.recentMessage} />)
                            })
                        }
                    </ul>
       
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
        }  else {
            return (
                <div style={{display:'flex', flexDirection:'column'}}>
                    <h2 ref={subtitle => this.subtitle = subtitle}>Post Room</h2>
                    <div onClick={this.closeModal} style={{position:'absolute',right:20,fontSize:20, marginBottom:20}}>X</div>
                    <button style={{outline:'none',
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
                    <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop:20}}><p>Type of Post</p></div>
                    <div style={{display:'flex',border:'1px solid rgb(221, 224, 235)',listStyle:'none',marginTop:20}}>
                        <div onClick={()=>{this.selectPr('room-post-btn')}} id="room-post-btn" className={this.state.roomPostBtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>Room</p></div>
             
                        <label onClick={()=>{this.selectPr('room-post-image-btn')}} id="room-post-image-btn" className={this.state.imagePostBtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}>
                            <p>Image</p>  
                            {/* {this.state.postedPicURL ? '':(<FileUploader
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
                            } */}
                        
                        </label>
                        <div onClick={()=>{this.selectPr('room-post-text-btn')}} id="unlisted-btn" className={this.state.textPostBtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>Text</p></div>   
                    </div>
                    <div id="thumbnail-pic-box" style={{display:this.state.thumbnailPicBox, flexDirection:'column'}}>
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
                    </div>
             
                    <textarea id="description" className="description" style={{
                        height:'100px', 
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
       
               
                    <p style={{marginTop:10}}>Community to post this room in (optional)</p>
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
                    }} value={this.state.communityApartOf} onChange={this.communityhandleChange} placeholder='Type community name here'/>

                     <p style={{marginBottom:10}}>Credits (optional) (?)</p>
                     <ReactTags tags={this.state.creditsTags}
                        suggestions={this.state.suggestionscredits}
                        handleDelete={this.handleDeletecredits}
                        handleAddition={this.handleAdditioncredits}
                        handleDrag={this.handleDragcredits}
                        delimiters={delimiters1} 
                        placeholder={'Add additional names (optional)'}
                    /> 


                    <p style={{marginTop:10, marginBottom:10}}>Compatability</p>     
                    <ReactTags tags={this.state.compatibleTags}
                        suggestions={this.state.suggestionsCompatibleTags}
                        handleDelete={this.handleDeleteCompatibleTags}
                        handleAddition={this.handleAdditionCompatibleTags}
                        handleDrag={this.handleDragCompatibleTags}
                        delimiters={delimiters3} 
                        placeholder={'Any browsers and OS compatible with (optional)'}
                    />

                    <p style={{marginTop:10, marginBottom:10}}>Tags (Optional)</p>
                     <ReactTags style={{marginBottom:10}} tags={this.state.tags}
                        suggestions={this.state.suggestionsTags}
                        handleDelete={this.handleDeleteTags}
                        handleAddition={this.handleAdditionTags}
                        handleDrag={this.handleDragTags}
                        placeholder={'Any additional tags (optional)'}
                        delimiters={delimiters4} />

                      <div style={{display:'flex',border:'1px solid rgb(221, 224, 235)',listStyle:'none',marginBottom:10}}>
                        <div onClick={()=>{this.selectPr('web-btn')}} id="web-btn" className={this.state.webBtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>Web</p></div>
                        <div onClick={()=>{this.selectPr('native-btn')}} id="native-btn" className={this.state.nativeBtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>Native</p></div>
                        <div onClick={()=>{this.selectPr('web-native-btn')}} id="web-native-btn" className={this.state.webNativeBtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>Both</p></div>
                    </div>

                    <div style={{display:'flex',border:'1px solid rgb(221, 224, 235)',listStyle:'none'}}>
                        <div onClick={()=>{this.selectPr('reg-btn')}} id="reg-btn" className={this.state.regBtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>Regular</p></div>
                        <div onClick={()=>{this.selectPr('exp-btn')}} id="exp-btn" className={this.state.exBtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>Experimental</p></div>

                    </div>

                    <div style={{display:'flex',border:'1px solid rgb(221, 224, 235)',listStyle:'none', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'100%'}}>
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

                     <div style={{display:'flex',border:'1px solid rgb(221, 224, 235)',listStyle:'none'}}>
                     <div onClick={()=>{this.selectPr('no-ar-vr-360-btn')}} id="no-ar-vr-360-btn" className={this.state.notArVr360Class} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>None</p></div>
                        <div onClick={()=>{this.selectPr('ar-btn')}} id="ar-btn" className={this.state.arBtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>AR (?)</p></div>
                        <div onClick={()=>{this.selectPr('vr-btn')}} id="vr-btn" className={this.state.vrBtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>VR (?)</p></div>
                        <div onClick={()=>{this.selectPr('360-btn')}} id="360-btn" className={this.state.three60BtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>360 (?)</p></div>
                    </div>
                    <div style={{display:'flex',border:'1px solid rgb(221, 224, 235)',listStyle:'none',display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'100%'}}>
                    <p>Is there AI (?)</p>
                    <div style={{display:'flex', flexDirection:'row', width:'100%'}}>
                    <div onClick={()=>{this.selectPr('no-ai-btn')}} id="no-ai-btn" className={this.state.notAIBtnClass}  style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>NO</p></div>
                        <div onClick={()=>{this.selectPr('yes-ai-btn')}} id="yes-ai-btn" className={this.state.aiBtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>YES</p></div>
                    </div>
                    </div>

                     <div style={{display:'flex',border:'1px solid rgb(221, 224, 235)',listStyle:'none', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                     <p>Best for:</p>
                     <div style={{display:'flex', flexDirection:'row', width:'100%'}}>
                     <div onClick={()=>{this.selectPr('all-res-btn')}} id="all-res-btn" className={this.state.allResBtnClass} style={{height:30,display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}><p>All</p></div>
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
                    </div>
                </div>
            )
        }
   
    }
    afterOpenModal() {
        // references are now sync'd and can be accessed.
        //this.subtitle.style.color = '#f00';
    } 
    closeModal() {
        document.getElementById('create').className = 'create-hide';
        this.props.closeModal({isModalOpen:false, modalType:'message'});
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

const mapStateToProps = (state) => { 
    return {
    state:state
  }
};
const mapDispatchToProps = (dispatch) => ({
    closeModal: (modal) => dispatch(OPEN_MODAL(modal)),
    startCreateRoom: (room) => dispatch(startCreateRoom(room))
});
const ConnectedAppModal = connect(mapStateToProps, mapDispatchToProps)(AppModal);
export default ConnectedAppModal;