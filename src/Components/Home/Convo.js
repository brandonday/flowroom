import React, { Component } from 'react';
import {Link} from 'react-router-dom';
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
var moment = require('moment');

const messages = [];
let names = [];
let messagesSent = [];
let messageList = [];
let preventDuplicateArray = []; //keeps track
let callOnce = false;
let theDate;

 class Convo extends Component {  
     constructor(){
         super();
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
                alreadyCreated:false,
                date:''
                
         }
     }
     componentDidMount() {
        var ul = document.getElementById("messages-list");
        ul.innerHTML = '';
        let that = this;
        const database = firebase.database();
        var user = firebase.auth().currentUser;
        var name, email, photoUrl, uid, emailVerified, fullname;
        //this.setState({newMessage:'message-screen'});
        //Modal.setAppElement('#root');
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

        }

database.ref(`Messages/${this.props.To}`).on("child_added", function(snapshot, prevChildKey) {
    snapshot.forEach((childSnapShot) => {
     
        if(childSnapShot.val().To === that.props.username || childSnapShot.val().id === that.props.username  ) {
           
            var ul = document.getElementById("messages-list");
       
            var li = document.createElement("li");
            var div = document.createElement("div");
            var date = document.createTextNode(moment(childSnapShot.val().date).format('LT'));
            var fullname = document.createTextNode(`${childSnapShot.val().id}`)
            alert(fullname)
            var pwrap = document.createElement('div');
            var pElement = document.createElement('p');
            var pMessage = document.createElement('p');
        
           
            if(theDate !== childSnapShot.val().date) {
            theDate = childSnapShot.val().date;
            pMessage.style.fontSize = '11px';
            pMessage.style.padding = '3px';
            pMessage.style.backgroundColor = 'rgb(221, 224, 235)';
            pMessage.style.borderRadius = '5px';
            pMessage.style.marginTop = '4px';
            pMessage.style.maxWidth = '70%';
            pMessage.style.wordBreak = 'break-all';
            pMessage.style.fontWeight = '800';
            

            var message = document.createTextNode(`${childSnapShot.val().message}`)
            div.style.display = 'flex';
            div.style.flexDirection = 'column';
         
           
            var profilePic = document.createElement("div");
            profilePic.style.backgroundImage = `url(${that.props.picForMessage})`;
            profilePic.style.backgroundSize = 'cover';
            profilePic.style.backgroundRepeat = 'no-repeat';
            profilePic.style.height = '22px';
            profilePic.style.width = '22px';
            profilePic.style.borderRadius = '20px';
        
            

         
            li.style.color = 'black';
            li.style.padding = '5px';
            li.style.listStyle = 'none';
            li.style.width = '100%';
            
            li.appendChild(div);
            div.appendChild(pwrap);
            if(childSnapShot.val().id === that.props.myusername) {
                div.style.float = 'right';
               
                div.style.justifyContent = 'flex-end';
                div.style.alignItems = 'flex-end';
              
            } else {
                div.style.float = 'left';
            
                div.style.justifyContent = 'flex-start';
                div.style.alignItems = 'flex-start';
               
            }
            pwrap.appendChild(profilePic);
            pwrap.appendChild(pElement)
            pElement.appendChild(fullname);
            pElement.style.margin = '0 7px';
            pElement.style.fontSize = '11px';
            pElement.style.fontFamily = 'Source Sans Pro';
            pElement.style.fontWeight = '800';
            
            pwrap.appendChild(date);
            pwrap.style.display = 'flex';
            pwrap.style.justifyContent = 'center';
            pwrap.style.alignItems = 'center';

            div.appendChild(pMessage);
            pMessage.appendChild(message);
            div.style.marginBottom = '5px';
        
            ul.appendChild(li);
            ul.style.padding = '17px';
            ul.style.display = 'flex';
            ul.style.flexDirection = 'column';
            document.getElementById('message-box').value = '';
            }
            
        
        
        }

    })
    

  });

}

     sendMessage() {
        const database = firebase.database();
        var theDate = new Date().getTime();
        let message = document.getElementById('message-box').value;
        let fullname = localStorage.getItem("fullname"); 
        let that = this;
        database.ref(`Messages/${this.props.To}`).push({
            message: {
                id:this.state.myusername, 
                message:message,
                To:this.props.To,
                pic:this.props.picForMessage,
                date:new Date().getTime(),
                fullname:fullname
            }
        }).then(() => {


            database.ref(`Messages/${this.state.myusername}`).push({
                message: {
                    id:this.state.myusername, 
                    message:message,
                    To:this.props.To,
                    pic:this.props.picForMessage,
                    date:new Date().getTime(),
                    fullname:fullname
                }
            }).then(() => {
    
    
                
                
            });

            
        });



    }
     render() {
        return (
            <div style={{height:'100%', width:'100%'}}>
            <ul id="messages-list" style={{height:'100%', width:'100%', display:'block',  flexDirection:'column', overflow:'scroll'}}></ul> 
            <div style={{height:'60px', padding:'0px 15px', backgroundColor:'#F9FAFA', display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid rgb(221, 224, 235)'}}>
            <textarea id="message-box" style={{ border:'1px solid #DDE0EB',
            height:'40px',
            borderRadius:'6px',
            color:'#333333',
            fontSize:'1.4rem',
            padding:'1rem',
            fontFamily:'Source Sans Pro',
            outline:'none',
            backgroundColor:'#FFFFFF',
            webkitFontSmoothing:'antialiased',
            flex:'1 1',
            width:'100%',
            resize:'none'
            }} placeholder="Type message...">
            </textarea>
            <div style={{position:'relative', height:'25px'}}>
            <button style={{ border:'1px solid gray',
            borderRadius:'4px',
            /* background: rgb(221, 224, 235); */
            height:'25px',
            width:'50px',
            fontFamily: "Source Sans Pro",
            fontWeight:'800',
            right:'7px',
            position:'absolute'
            }} onClick={this.sendMessage.bind(this)}>
            <p style={{fontSize:'12px'}}>Send</p>
            </button>
            </div>
            </div>
            </div>
        )
     }
 }
export default Convo;


