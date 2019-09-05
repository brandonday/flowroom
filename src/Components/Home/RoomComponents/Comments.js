import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Comment from './Comment.js';
import { firebase } from '../../../Components/firebase/firebase';
import { connect } from 'react-redux';
import uuid from 'uuid';
import Hashids from 'hashids';
import Profile from '../Profile.js';
import RelatedRoomPost from '../RelatedRoomPost.js';
import RelatedRoomPostTop from '../RelatedRoomPostTop.js';

var moment = require('moment');
const database = firebase.database();
let commentLoaded = [];
const dummyComments = [];
const replies = [];
const repliesNum = [];
let relatedRooms = [];
let roomsPerPage = 4;
let roomFilter = 'weight';
 class Comments extends Component {
     constructor() {
         super();
         this.state = {
            dummyComments:[],
            replies:[],
            repliesShow:false,
            plus:'+',
            room_title:'',
            description:'',
            views:'',
            loggedIn:false,
            displayNameSelf:'',
            followersNum:0,
            followlbl:'FOLLOW',
            roomCreator:'',
            roomCreatorPic:'',
            userPic:'',
            value:0,
            displayIfOwn:'none',
            relatedRooms:[]
         }
         this.getProfileInfo = this.getProfileInfo.bind(this)
    }
    isComment(id) {
        for(let i = 0; i < commentLoaded.length; i++) {
            if(commentLoaded[i] === id) {
                return true;
            }
        }
    }
    test(id, comment) {
        const database = firebase.database();
        // dummyComments.push(commentObj);
        let hashids = new Hashids(uuid(), 10);
      
        let name = window.location.pathname;
        // name = name.replace(/\//g, "");
        //name = name.substr(0, name.lastIndexOf("room/"));
        var str = name;
        var tmp = str.split("room/");
        let shortID = tmp.pop();
       
        firebase.auth().onAuthStateChanged((user)=> {
            if(user) {
                var theDate = new Date().getTime();
                
                database.ref(`CommentReplies/${shortID}`).push({
                    commentID:hashids.encode(1, 2, 3),
                    commentIDReplyingTo:id,
                    fullname:user.displayName, 
                    comment:comment, 
                    photo:user.photoURL,
                    date:theDate,
                    replyNum:0
                }).then(() => {
                    //alert('saved')
                    //comment.value = '';

                    // database.ref(`CommentReplies/${id}`).update({
                    //     replyNum:+1
                    // });

                });
             
            } else {

              
         
            }
        });
    }
    componentDidMount() {
        let name = window.location.pathname;
        // name = name.replace(/\//g, "");
        //name = name.substr(0, name.lastIndexOf("room/"));
        var str = name;
        var tmp = str.split("room/");
        let shortID = tmp.pop();
        let that = this;
        database.ref(`rooms/${shortID}`).once('value').then(function(snapshot) {
            
            that.setState({room_title:snapshot.val() !== null ? snapshot.val().room_title :'',
                description:snapshot.val() !== null ? snapshot.val().description : '',
                views:snapshot.val() !== null ? snapshot.val().views : '',
                roomCreator:snapshot.val() !== null ? snapshot.val().userName : ''
            });

            database.ref(`users/${that.state.roomCreator}`).once('value').then(function(snapshot) {
            
                that.setState({
                    roomCreatorPic:snapshot.val() !== null? snapshot.val().pic: ''
                });
    
            });

            firebase.auth().onAuthStateChanged((user)=> {
                if(user) {
                    that.setState({
                        loggedIn:true,
                        displayNameSelf:user.displayName
                    });
                    database.ref(`users/${that.state.displayNameSelf}`).once('value').then(function(snapshot) {
                
                        that.setState({
                            userPic:snapshot.val() !== null? snapshot.val().pic : ''
                        });
            
                    });
    
                    
                    that.getProfileInfo(that.state.displayNameSelf)
    
                  
    
                } else {
    
                    that.setState({loggedIn:false});
                    that.getProfileInfo('notsignedin');
                }
            });

        });
      

        database.ref(`CommentReplies/${shortID}`).once('value').then(function(snapshot) {
          
            that.setState({comment_number:snapshot.numChildren()
            
            });

        });

       
       
        
        // database.ref(`Comments/${shortID}`).once('value').then((snapshot) => {
        //     snapshot.forEach((childSnapShot) => {

        //         dummyComments.push({fullname:childSnapShot.val().fullname, comment:childSnapShot.val().comment, date: childSnapShot.val().date, photo:childSnapShot.val().photo, commentID:childSnapShot.val().commentID,  })
                
        //     });
        //     this.setState({dummyComments:dummyComments});
       
      
            database.ref(`CommentReplies/${shortID}`).once('value').then((snapshot) => {
                snapshot.forEach((childSnapShot) => {
                    if(!this.isComment(childSnapShot.val().commentID)) {
                    var ul = document.getElementById(childSnapShot.val().commentIDReplyingTo);
                  
                    
                    if(ul !== null) {
                    ul.style.display = 'block';
                    var li = document.createElement('li');
                    li.style.display = 'flex';
                    li.style.marginTop = '8px';
                    li.style.marginLeft = '19px';
                    li.style.flexDirection = 'column';
                    li.style.background = 'rgb(30, 30, 30)';
                    var div = document.createElement('div');
                    var div2 = document.createElement('div');
                    var div3 = document.createElement('div');
                    var div4 = document.createElement('div');
                    var div5 = document.createElement('div');
                    var div6 = document.createElement('div');
                    var div7 = document.createElement('div');
                    var pdiv6 = document.createElement('p');
                    let name = document.createElement('p');
                    let time = document.createElement('p');
                    let comment = document.createElement('p');
                    var textarea = document.createElement('textarea');
                    var div8 = document.createElement('div');
                    var wrapComment = document.createElement('div');
                    let button = document.createElement('button');
                    var bottomWrap = document.createElement('div');
                    var ProfilePic = document.createElement('div');
                    bottomWrap.setAttribute("id", `bottomWrap${childSnapShot.val().commentID}`);
                    bottomWrap.style.display = 'none';
                    let replyDiv = document.createElement('div');
                    
                    div.setAttribute("id", `li${childSnapShot.val().commentID}li`);
                    div.style.flex = '0 1 40px';
                    div.style.border = '0px solid red';
                    div.style.backgroundImage = `url(${childSnapShot.val().photo})`;
                    div.style.backgroundRepeat = 'no-repeat';
                    div.style.backgroundSize = 'cover';
                    div.style.borderRadius = '30px';
                    div.style.height = '40px';
                    div.style.marginRight = '14px';
                    div.style.marginLeft = '20px';
                  
                   
                    li.appendChild(div);
                    

                    div2.style.display = 'flex';
                    div2.style.flexDirection = 'column';
                    div2.style.width = '100%';
                    div3.style.border = '0px solid red';
                    div3.style.marginRight = '52px';
                    div4.style.flex = '1 1 0px';
                    div4.style.border = '0px solid red';
                    div5.style.display = 'flex';
                    div5.style.fontFamily = 'Source Sans Pro';
                    div5.style.color = 'black';
                    div5.style.fontSize = '4px';
                    div5.style.paddingTop = '5px';
                    div5.style.paddingLeft = '1px';
                    div6.style.flex = '1 1 0px';
                    div6.style.border = '0px solid red';
                    div6.overflowWrap = 'break-word';
                    div8.style.display = 'flex';
                    div8.style.width = '100%';
                    div8.setAttribute("id", `reply${childSnapShot.val().commentID}`);
                    div8.style.display = 'none';
                    name.style.fontSize = '14px';
                    name.style.fontWeight = '600';
                    time.style.fontSize = '12px';
                    time.style.marginLeft = '10px';
                    time.style.marginTop = '2px';
                    time.style.fontWeight = '300';
                    time.style.color = 'white'; 

                    comment.style.fontSize = '13px';
                    comment.style.fontFamily = 'Source Sans Pro';
                    comment.style.fontWeight = '500';
                    comment.style.color = 'white';
                    comment.style.background = 'rgb(31, 31, 31)';

                    textarea.style.resize = 'none';
                    textarea.style.width = '100%';
                    textarea.style.height = '60px';
                    textarea.setAttribute("placeholder", "Write comment here...");
                    textarea.setAttribute("id", `textId${childSnapShot.val().commentID}`);

                    ProfilePic.style.flex = '1 0 39px';
                    ProfilePic.style.backgroundImage = `url(${childSnapShot.val().photo})`;
                    ProfilePic.style.height = '39px';
                    ProfilePic.style.width = '39px';
                    ProfilePic.style.backgroundRepeat = 'no-repeat';
                    ProfilePic.style.backgroundSize = 'cover';
                    ProfilePic.style.backgroundPosition = 'center';
                    ProfilePic.style.borderRadius = '20px';
                    ProfilePic.style.marginRight = '15px';

                    wrapComment.style.display = 'flex';
                    wrapComment.style.flexDirection = 'column';
                    wrapComment.style.marginLeft = '20px';
                    //wrapComment.style.background = '#1e1e1e';
                    wrapComment.style.marginBottom = '10px';
                    
                    let commentIn = document.createElement('div');
                    commentIn.appendChild(ProfilePic);
                    commentIn.appendChild(div2);
                    // wrapComment.style.flexDirection = 'column';
                    // wrapComment.style.marginLeft = '20px';

                    li.appendChild(wrapComment);
                    commentIn.style.display = 'flex';
                    commentIn.style.flexDirection = 'row';
                    commentIn.style.background = '#1e1e1e';
                    commentIn.style.marginBottom = '10px';
                    commentIn.style.padding = '15px 10px';
                    commentIn.style.borderRadius = '6px';
                    wrapComment.appendChild(commentIn);
                  
                   
                    div2.appendChild(div3);
                    div3.appendChild(div4);
                    div4.appendChild(div5);
                    div5.appendChild(name);
                    div5.appendChild(time);
                    name.appendChild(document.createTextNode(childSnapShot.val().fullname));
                    name.style.color = 'white';
                    time.appendChild(document.createTextNode(moment(childSnapShot.val().date).fromNow()));
                    div4.appendChild(div6);
                    comment.appendChild(document.createTextNode(childSnapShot.val().comment));
                    comment.style.margin ='4px 1px 16px';
                    pdiv6.appendChild(document.createTextNode('REPLY'));
                    pdiv6.setAttribute("id", `replybtn${childSnapShot.val().commentID}`);
                    div6.appendChild(comment);
                    //div7.appendChild(pdiv6);
                    div6.appendChild(div7);
                    div7.appendChild(div8);
                    div8.appendChild(textarea);
                    button.appendChild(document.createTextNode('Post'));
                    button.setAttribute("id", `btn${childSnapShot.val().commentID}btn`)
                    div8.appendChild(button);
                    
                    replyDiv.setAttribute("id", `replies${childSnapShot.val().commentID}`);
                    //let commentPost = document.getElementById(`textId${childSnapShot.val().commentID}`).value;
                    ul.appendChild(wrapComment);
                    

                    var ul2 = document.createElement("ul");
                    ul2.setAttribute("id",`${childSnapShot.val().commentID}`);
                    ul2.style.display = 'block';
                    
                    div2.appendChild(replyDiv);
                    wrapComment.appendChild(bottomWrap);
                    
                    bottomWrap.appendChild(ul2)
                    let replyN = 0;
                   
                  
                    
                    let that = this;
               
                    replyDiv.appendChild(document.createTextNode(`SHOW ${childSnapShot.val().replyNum} REPLIES`));

                    document.body.addEventListener( 'click', function ( event ) {
                        if( event.srcElement.id == `btn${childSnapShot.val().commentID}btn` ) {
                          let commentPost = document.getElementById(`textId${childSnapShot.val().commentID}`).value;
                          that.test(childSnapShot.val().commentID, commentPost);
                          
                         

                            // firebase.database().ref(`CommentReplies/${shortID}`).once('value').then(function(snapshot) {
                            //     alert(snapshot.key);
                            //     // ...
                            // });

                           
                            
                           

                            
                            database.ref(`CommentReplies/${shortID}`).once('value').then((snapshot) => {
                                snapshot.forEach((childSnapShot) => {
                              
                                    if(event.srcElement.id == `btn${childSnapShot.val().commentID}btn`) {
                                      let replyInc = childSnapShot.val().replyNum + 1;

                                       database.ref(`CommentReplies/${shortID}/${childSnapShot.key}`).update({
                                        replyNum:replyInc
                                    }).then(() => {
                                        //alert('saved')
                                        comment.value = '';
                                    });

                                       
                                    }
                                
                                })
                            });

                        };

                        if(event.srcElement.id === `replybtn${childSnapShot.val().commentID}`) {
                            document.getElementById(`reply${childSnapShot.val().commentID}`).style.display = 'block'
                        }

                        if(event.srcElement.id === `replies${childSnapShot.val().commentID}`) {
                        
                            if(that.state.repliesShow === false) {
                                
                                document.getElementById(`bottomWrap${childSnapShot.val().commentID}`).style.display = 'block'
                                that.setState({repliesShow:true});
                                replyDiv.innerHTML = `SHOW ${childSnapShot.val().replyNum} REPLIES`;

                                
                            } else {
                             
                                document.getElementById(`bottomWrap${childSnapShot.val().commentID}`).style.display = 'none';
                                that.setState({repliesShow:false});
                                replyDiv.innerHTML = `SHOW ${childSnapShot.val().replyNum} REPLIES`;
                      
                            }

                        }


                      } );

                    }
                    
                    }
                    commentLoaded.push(childSnapShot.val().commentID)
                });

             
                
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
           

        
        //});
        
    }
   
    incrementCommentsCount() {
        //database.ref(`rooms/${this.props.shortID}/commentsCount`).set({commentsCount:0}).then(() => { 
           
           let name = window.location.pathname;
        // name = name.replace(/\//g, "");
        //name = name.substr(0, name.lastIndexOf("room/"));
        var str = name;
        var tmp = str.split("room/");
        let shortID = tmp.pop();
           
            database.ref(`rooms/${shortID}/commentsCount`).transaction(function(commentsCount) {
                // If node/clicks has never been set, currentRank will be `null`.
                console.log('comments Count :', commentsCount)
                return (commentsCount || 0) + 1;
              })

        //})
       
    }
     incrementLikes() {
        let database = firebase.database();
        this.setState({likes:this.state.likes + 1});
        database.ref(`rooms/${this.props.shortID}/likes`).transaction(function(currentLikes) {
            // If node/clicks has never been set, currentRank will be `null`.
            return (currentLikes || 0) + 1;
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
    getProfileInfo(myusername) {
        
        let name = this.state.roomCreator;
        if(name == '') {
            return;
        }
     
        let ref = firebase.database().ref("users");
        ref.once("value").then((snapshot) => {
             
            let hasName =  snapshot.hasChild(`${name}`); // true
            
            if(hasName) {
       
                if(myusername !== name) {
                    this.setState({displayIfOwn:'flex'});
                    this.isFollowing(myusername);
                    this.Followers(name);
                } else {
                   this.setState({displayIfOwn:'none'});
                    this.isFollowing(myusername);
                    this.Followers(name);
                }
             
            }
          });
    } 
    isFollowing(myusername) {
        
        let name = this.state.roomCreator;
        let ref = firebase.database().ref(`follows/${name}/followers`);
        ref.once("value")
          .then((snapshot) => {
              console.log('f',snapshot.numChildren())
            this.setState({followersNum:snapshot.numChildren()})
            let hasName = snapshot.hasChild(`${myusername}`); // true
            
            if(hasName) {
                //shown when following
                this.setState({followlbl:'UNFOLLOW'});
           
            } else {
                this.setState({followlbl:'FOLLOW'});
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
    follow() {
        
        if(this.state.followlbl === 'FOLLOW') {
        firebase.database().ref(`follows/${this.props.userName}/followers/`).update({
            [this.state.displayNameSelf]:this.state.displayNameSelf
        }).then(() => {

            firebase.database().ref(`follows/${this.state.displayNameSelf}/following/`).update({
                [this.props.userName]:this.props.userName
            }).then(() => {
           
                this.setState({followlbl:'UNFOLLOW',followersNum:++this.state.followersNum});
                
            }).catch((error) => {
    
            });
            
        }).catch((error) => {

        });
        
        } else {
            firebase.database().ref(`follows/${this.props.userName}/followers/${this.state.displayNameSelf}`).remove().then(() => {
           
                firebase.database().ref(`follows/${this.state.displayNameSelf}/following/${this.props.userName}`).remove().then(() => {
           
                    this.setState({followlbl:'FOLLOW',followersNum:--this.state.followersNum});
                    
                }).catch((error) => {
        
                });
            }).catch((error) => {
    
            });





        }
    
    }  
    postComment() {
        // // dummyComments.push(commentObj);
        // let hashids = new Hashids(uuid(), 10);
      
        // let name = window.location.pathname;
        // // name = name.replace(/\//g, "");
        // //name = name.substr(0, name.lastIndexOf("room/"));
        // var str = name;
        // var tmp = str.split("room/");
        // let shortID = tmp.pop();
        // var date = new Date();
        // firebase.auth().onAuthStateChanged((user)=> {
        //     if(user) {
        //         var comment = document.getElementById('comment');
        //         console.log('user',user)
        //         var commentObj = {
        //             commentID:hashids.encode(1, 2, 3),
        //             fullname:user.displayName, 
        //             comment:comment.value, 
        //             photo:user.photoURL,
        //             date: new Date().getTime(),
        //             replyNum:0 
        //         }
        //         comment.value = '';
        //         database.ref(`Comments/${shortID}/`).push(commentObj).then(() => {
        //             //alert('saved')
        //         });
             
        //     } else {

         
        //     }
        // });
        let comment = document.getElementById('comment').value;

        const database = firebase.database();
        // dummyComments.push(commentObj);
        let hashids = new Hashids(uuid(), 10);
      
        let name = window.location.pathname;
        // name = name.replace(/\//g, "");
        //name = name.substr(0, name.lastIndexOf("room/"));
        var str = name;
        var tmp = str.split("room/");
        let shortID = tmp.pop();
       
        firebase.auth().onAuthStateChanged((user)=> {
            if(user) {
                //var comment = document.getElementById('commentTxt');
                var theDate = new Date().getTime();
                database.ref(`CommentReplies/${shortID}`).push({
                    commentID:hashids.encode(1, 2, 3),
                    commentIDReplyingTo:'main-comments',
                    fullname:user.displayName, 
                    comment:comment, 
                    photo:user.photoURL,
                    date:theDate,
                    replyNum:0
                }).then(() => {


                    dummyComments.push({commentID:hashids.encode(1, 2, 3),
                        commentIDReplyingTo:'main-comments',
                        fullname:user.displayName, 
                        comment:comment, 
                        photo:user.photoURL,
                        date:theDate,
                        replyNum:0});
                    this.setState({dummyComments:dummyComments.reverse()})
                    this.incrementCommentsCount();
                    //alert('saved')
                    //comment.value = '';

                    // database.ref(`CommentReplies/${id}`).update({
                    //     replyNum:+1
                    // });

                });
             
            } else {

         
            }
        });
        
    }
    toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.getElementById('output_frame').requestFullscreen();
        } else {
          if (document.exitFullscreen) {
            document.getElementById('output_frame').exitFullscreen(); 
          }
        }
      }
    render() {
        let that = this;
        return (
            <div style={{height:'100%',width:'100%'}}>
                <div id="rf-top" 
                    style={{
                        width:'100%',
                        justifyContent:'center',
                        marginTop:'45px',
                        display:'flex',
                        flexDirection:'column'
                }}>
                    
                    <div style={{
                        width:'100%',
                        /* padding: 10px; */
                        overflow:'hidden',
                        borderRadius:'6px',
                        margin:'10px',
                        marginRight:'10px'
                    }}>
                  
                
                    {/* <div style={{height:'100vh', width:'100%',background:'#0f0f0f'}}> */}



                    {/* </div> */}
                    <div style={{width:'100%',background:'#0f0f0f'}}>
                    
                    </div>

                    </div>

                    </div>

            <div id="main-section-wrap-comments-screen-wrap" style={{
                display:'flex',position:'relative',
                width:'100%',
                maxWidth:'1200px',
                margin:'0 auto',
                position:'relative',
                padding:'0 2px'
                
                }}>
            

        



            <div className="main-section-wrap-comments-screen">
                {/* <div style={{height:'42px', position:'relative', width:'100%'}}>
                    <div style={{
                        display:'flex', 
                        height:42, 
                        border:'0px solid red',
                        }}>
                    </div>
                </div> */}
                {/* <div style={{height:'200px',width:'100%'}}></div> */}
                <div className="main-section-wrap-comments-box">
                    <div style={{backgroundColor:'#1f1f1f',borderRadius:'6px',height:'242px',width:'100%'}}>
                    <div style={{height:'76px',width:'100%', display:'flex', borderBottom:'1px solid #373737', justifyContent:'space-between'}}>
                        <div style={{height:47,marginLeft:17,marginTop:9}}>
                        <p style={{color:'#fafafa',fontSize:20,marginBottom:6}}>{this.state.room_title ? this.state.room_title: ''}</p>
                        <div style={{display:'flex',alignItems:'center', marginLeft:'1px'}}>
                            <i className="fa fa-play" style={{fontSize:11,marginRight:10,color:'white'}}></i>
                            <p style={{fontSize:'13px',fontWeight:'500',color:'white'}}>{this.state.views}</p>
                        </div>
                        </div>
                    <div style={{display:'flex', width:196, justifyContent:'space-between',height:63}}>
                        <div style={{display:'flex',
                           
                            justifyContent:'space-between',
                            color:'white',
                       
                            alignItems:'flex-end', 
                        fontSize:'14px'}}>  
                        <div style={{display:'flex',
                            alignItems:'center',
                            justifyContent:'space-between',
                     
                        }}>
                            <i className="far fa-heart" onClick={()=>{
                                firebase.auth().onAuthStateChanged((user)=> {
                                    console.log("firebase.auth user: ",user);
                                    if(user) {
                                      this.incrementLikes();
                                    } else {
                                      this.openModal(true);
                                    }
                                });
                               
                            }} style={{marginRight:10}}></i>
                            <p>Like</p>
                        </div>
                        </div>

                        <div style={{display:'flex',
        
                            justifyContent:'space-between',
                            color:'white',
              
                            alignItems:'flex-end', 
                        fontSize:'14px'}}>  
                          
                        <div onClick={()=>{
                            /*fix this shit*/
                            document.getElementById('modal1').style.zIndex = '99999999999999'

                        }} data-target="modal1" className="btn modal-trigger" style={{display:'flex',
                            alignItems:'center',
                            justifyContent:'space-between',
                            
                        }}>
                            <i className="fas fa-share-alt" style={{marginRight:10}}></i>
                            <p>Share</p>
                        </div>
                        </div>

                        <div style={{display:'flex',

                            justifyContent:'space-between',
                            color:'white',
                            alignItems:'flex-end', 
                        fontSize:'14px'}}>  
                        <div style={{display:'flex',
                            alignItems:'center',
                            justifyContent:'space-between',
                            width:'50px',
                            marginBottom:3
                        }}>
                            <i className="fas fa-ellipsis-h"></i>
                        </div>
                        </div>

                    </div>

                    </div>
                    <div style={{height:61,padding:'5px 15px',display:'flex'}}>
                        <div style={{
                            backgroundImage:`url(${this.state.roomCreatorPic})`,
                            backgroundSize:'cover',
                            backgroundRepeat:'no-repeat',
                            backgroundPosition:'center',
                            height:43,width:43,borderRadius:25,marginTop:3}}></div>
                        <div style={{height:50}}>
                            <div style={{display:'flex', marginTop:7, flexDirection:'column',marginLeft:12}}>
                                <div style={{display:'flex'}}>
                                <Link to={`/${this.props.userName}`}><p style={{fontWeight:0,fontSize:13,color:'white',marginRight:10}}>{`${this.props.isRemix ? 'Remixed by ' + '@' + this.props.userName : 'Created by ' + '@' + this.props.userName}`}</p></Link>
                                <div onClick={this.follow.bind(this)} style={{display:this.state.displayIfOwn, alignItems:'center', justifyContent:'center', border:'1px solid rgb(64, 255, 232)', height:22,width:65,borderRadius:6, color:'rgb(64, 255, 232)'}}>
                                <p style={{fontSize:10,marginRight:2}}>+</p>
                                <p style={{fontSize:10}}>{this.state.followlbl}</p>
                                </div>
                                </div>
                                <p style={{fontSize:12, position:'relative', top:'-4px'}}>{moment(this.props.dateCreated).format("LL")}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{display:'flex',height:'58px',width:'100%'}}>
                        <p style={{color:'#fff',fontSize:14,margin:'2px 15px'}}>{this.state.description}</p>
                    </div>
                    </div>
                    <div style={{display:'flex', width:'100%',flexDirection:'column'}}>
                    <div>
                    <div style={{display:this.state.userName == ''? 'none':'flex', alignItems:'center',height:40,width:'100%',background:'#0f0f0f',margin:'15px 0px'}}>
                        <p style={{color:'white',fontSize:17,fontWeight:600}}>Recommended Flows</p>
                    </div>
                            {
                                that.state.relatedRooms.map((i)=>{
                                    return(
                                   
                                    <RelatedRoomPostTop
                                        
                                        shortID={i.shortID}
                                        title={i.title} 
                                        userName={i.userName}    
                                        views={i.views} 
                                        thumbnail={i.thumbnail}   
                                        roomWidth={160}
                                        isRemix={i.isRemix}
                                        key={i.shortID}
                                        />
                                       
                                        )
                                })
                            }
                            </div>
                    <div style={{width:'100%'}}>
                        <div style={{height:'100%',width:'100%',borderTop:'1px solid black',marginBottom:'10px'}}>
                            {this.state.loggedIn ? (<div style={{width:'100%', marginTop:'20px'}}>
                            <div style={{display:'flex', flexDirection:'column', marginBottom:20, position:'relative',background:'#1f1f1f',padding:10, height:166,borderRadius:5}}>
                                <p style={{color:'white', padding:'5px 0px 10px'}}>Leave a comment</p>
                                <div style={{display:'flex', padding:0}}>
                                    <div style={{backgroundImage:`url(${this.state.userPic}`,backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center',height:35,width:35,backgroundColor:'black',borderRadius:30,marginRight:10}}></div>
                                    <div style={{position:'absolute', right:'15px',zIndex:9,top:'55px'}}><p style={{fontSize:14}}>{that.state.value}</p></div>
                                    <textarea id="comment" 
                                        style={{
                                            border:'1px solid #DDE0EB',
                                            borderRadius:'6px',
                                            color:'#333333',
                                            resize:'100%',
                                            fontSize:'1.4rem',
                                            marginBottom:'1.4rem',
                                            padding:'1rem',
                                            fontFamily:'Helvetica, Arial, sans-serif',
                                            outline:'none',
                                            backgroundColor:'#F9FAFA',
                                            webkitFontSmoothing:'antialiased',
                                            height:'60px',
                                            width:'100%',
                                            resize:'none',
                                            position:'relative',
                                            paddingTop:'7px',
                                            paddingLeft:'11px',
                                            paddingRight:'28px',
                                            paddingBottom:'20px'
                                        }} 
                                        multiline = {true}
                                        numberOfLines = {6}
                                        maxLength = {140}
                                        onChange={(event)=>that.setState({value:event.target.value.length})}
                                        placeholder="Write a new comment here...">
   
                                    </textarea>
                                </div>
                                <div style={{display:'flex',width:144,position:'absolute',right:'10px',bottom:17,alignItems:'center',justifyContent:'space-between'}}>
                                    <p style={{fontSize:11,color:'white'}}>CANCEL</p>
                                    <button style={{border:'1px solid gray',
                                        borderRadius:'4px',
                                        background:'#3fffe8',
                                        height:'25px',
                                        width:'100px',
                                        fontFamily:'Source Sans Pro',
                                        fontWeight:'bold',
                                        fontSize:10,
                                        bottom:25,
                                        right:'10px'
                                    }} 
    
                                    onClick={this.postComment.bind(this)}>POST COMMENT</button>
                                </div>
                            </div>
                            <div style={{display:'flex',flexDirection:'row',marginBottom:25}}>
                                <i className="fa fa-comments"/>
                                <p style={{marginLeft:10}}>Comments</p>
                                <p style={{marginLeft:10}}>{this.state.comment_number}</p>
                            </div>
                       
                        </div>
                        ):(
                        <div style={{display:'flex',
                            justifyContent:'center',
                            marginBottom:'20px',
                            position:'relative',
                            background:'rgb(31, 31, 31)',
                            padding:'10px',
                            height:'166px',
                            borderRadius:'5px',
                            marginTop:'20px',

                            }}>
                            <div style={{display:'flex',justifyContent:'center',alignItems:'center', color:'#80848C'}}>
                            <span style={{color:'rgb(64, 255, 232)',display:'flex'}}>
                                <a href="/signup" style={{color:'rgb(64, 255, 232)',marginRight:4}}>
                                    Sign up
                                </a> <p style={{marginRight:4, color:'#80848C',fontSize:12,marginBottom:3}}> or</p> 
                                <a href="/login" style={{color:'rgb(64, 255, 232)',marginRight:4}}>Sign in</a> to leave a comment</span>
                            </div>
                        </div>
                    )}
                  
                    <ul style={{width:'100%'}} id="main-comments">
                        { 
                            this.state.dummyComments.map((obj)=> {
                                return (<Comment fullname={obj.fullname} comment={obj.comment} time={obj.date} photo={obj.photo} commentID={obj.commentID} replies={obj.replyNum}/>)
                            })
                            
                        }
                    </ul>
                  
                    </div>

                    </div>


              






                    </div>


                </div>
            </div>  
                  <div id="rf-right" style={{
                        height:'100vh',
                        width:'306px',
                        background:'white',
                        justifyContent:'center',

                        display:'flex',
                        flexDirection:'column'
                    }}>
                    
                    <div style={{display:this.state.userName == ''? 'none':'flex', alignItems:'center',height:40,width:'100%',background:'#0f0f0f'}}>
                        <p style={{color:'white',fontSize:17,fontWeight:900,marginTop:45,marginBottom:50}}>Recommended Flows</p>
                    </div>
                    <div style={{height:'100vh', width:'100%',background:'#0f0f0f'}}>


                        
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
                                        key={i.shortID}
                                        />)
                                })
                            }
                        
                    </div>
                    <div style={{height:'100vh', width:'100%',background:'#0f0f0f'}}>
                    </div>
                    </div>
                </div>
                
        </div>)

        }
    }



const mapStateToProps = (state) => ({
    isLoggedIn: state.isLoggedIn,
    username: state.username, 
    email: state.email,
    nameCaseSensitive: state.nameCaseSensitive

});

const ConnectedComments = connect(mapStateToProps)(Comments)

export default ConnectedComments;