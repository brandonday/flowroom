import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Comment from './Comment.js';
import { firebase } from '../../../Components/firebase/firebase';
import { connect } from 'react-redux';
import uuid from 'uuid';
import Hashids from 'hashids';
import Profile from '../Profile.js';
var moment = require('moment');
const database = firebase.database();
let commentLoaded = [];
const dummyComments = [];
const replies = [];
const repliesNum = [];

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
            loggedIn:false
         }
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
                views:snapshot.val() !== null ? snapshot.val().views : ''
            });

        });

        database.ref(`CommentReplies/${shortID}`).once('value').then(function(snapshot) {
          
            that.setState({comment_number:snapshot.numChildren()
            
            });

        });

        firebase.auth().onAuthStateChanged((user)=> {
            if(user) {
                this.setState({loggedIn:true})

            } else {

                this.setState({loggedIn:false})
            }
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
                    comment.appendChild(document.createTextNode(childSnapShot.val().comment))
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
    render() {
        return(<div style={{height:'100%',width:'100%'}}>
            <div className="main-section-wrap-comments-screen">
                <div style={{height:'42px', position:'relative', width:'100%'}}>
                    <div style={{display:'flex', height:42, border:'0px solid red',background:'rgb(32, 32, 32)'}}>
                       
                    </div>
                </div>
                {/* <div style={{height:'200px',width:'100%'}}></div> */}
                <div className="main-section-wrap-comments-box">
                    <div style={{backgroundColor:'#1f1f1f',borderRadius:'6px',height:'242px',width:'100%'}}>
                    <div style={{height:'76px',width:'100%', display:'flex', borderBottom:'1px solid #373737', justifyContent:'space-between'}}>
                        <div style={{height:47,marginLeft:17,marginTop:9}}>
                        <p style={{color:'#fafafa',fontSize:20,marginBottom:6}}>{this.state.room_title ? this.state.room_title: ''}</p>
                        <div style={{display:'flex',alignItems:'center'}}>
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
                            <i class="far fa-heart" style={{marginRight:10}}></i>
                            <p>Like</p>
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
                            
                        }}>
                            <i class="fas fa-share-alt" style={{marginRight:10}}></i>
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
                            width:'50px'
                        }}>
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                        </div>

                    </div>

                    </div>
                    <div style={{height:40,padding:'5px 10px',display:'flex'}}>
                        <div style={{backgroundColor:'black',height:45,width:45,borderRadius:25,marginTop:3}}></div>
                        <div style={{height:100}}>
                            <div style={{display:'flex', marginTop:7, flexDirection:'column'}}>
                                <div style={{display:'flex'}}>
                                <p style={{fontWeight:0,fontSize:13,color:'white',marginLeft:5,marginRight:10}}>{`${this.props.isRemix ? 'Remix by ' + '@' + this.props.userName : 'Created by ' + '@' + this.props.userName}`}</p>
                                <div style={{display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid rgb(64, 255, 232)', height:22,width:65,borderRadius:6, color:'rgb(64, 255, 232)'}}>
                                <p style={{fontSize:10,marginRight:2}}>+</p>
                                <p style={{fontSize:10}}>FOLLOW</p>
                                </div>
                                </div>
                                <p style={{marginLeft:10, fontSize:10}}> Published on April 10 2019</p>
                            </div>
                        </div>
                    </div>
                    <div style={{display:'flex',height:'58px',width:'100%'}}>
                        <p style={{color:'#fff',fontSize:14,margin:15}}>{this.state.description}</p>
                    </div>
                    </div>
                    <div style={{height:'100%',width:'100%',borderTop:'1px solid black',marginBottom:'10px'}}>
                    {this.state.loggedIn ? (<div style={{width:'100%', marginTop:'20px'}}>
                        <div style={{display:'flex', flexDirection:'column', marginBottom:20, position:'relative',background:'#1f1f1f',padding:10, height:166,borderRadius:5}}>
                            <p style={{color:'white', padding:'5px 0px 10px'}}>Leave a comment</p>
                            <div style={{display:'flex', padding:0}}>
                                <div style={{height:35,width:35,backgroundColor:'black',borderRadius:30,marginRight:10}}></div>
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
                                position:'relative'
                            }} placeholder="Write a new comment here...">
   
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
    
                        onClick={this.postComment.bind(this)}
                        >POST COMMENT</button>
                        </div>
                        </div>
                        <div style={{display:'flex',flexDirection:'row',marginBottom:25}}>
                            <i className="fa fa-comments"/>
                            <p style={{marginLeft:10}}>Comments</p>
                            <p style={{marginLeft:10}}>{this.state.comment_number}</p>
                        </div>
                       
                    </div>):(
                        <div style={{color:'black'}}>Not logged in</div>
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