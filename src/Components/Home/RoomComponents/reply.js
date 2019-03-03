import React, { Component } from 'react';
import Hashids from 'hashids';
import uuid from 'uuid';
import { firebase } from '../../../Components/firebase/firebase';
import {Link} from 'react-router-dom';

var moment = require('moment');






const database = firebase.database();
const dummyComments = [];
const replies = [];

 class Reply extends Component {
    constructor() {
        super();
        this.state = {
            dummyComments:[],
            replies:[],
            commentId:''
        }
    }
    componentDidMount() {

        let name = window.location.pathname;
        // name = name.replace(/\//g, "");
        //name = name.substr(0, name.lastIndexOf("room/"));
        var str = name;
        var tmp = str.split("room/");
        let shortID = tmp.pop();
        database.ref(`Comments/${shortID}`).once('value').then((snapshot) => {
            snapshot.forEach((childSnapShot) => {

                replies.push({fullname:childSnapShot.val().fullname, comment:childSnapShot.val().comment, date: childSnapShot.val().date, photo:childSnapShot.val().photo, commentID:childSnapShot.val().commentID })
            });
            this.setState({replies:replies});
          

            
        });
      
    }
    postReply() {
        const database = firebase.database();
        // dummyComments.push(commentObj);
        let hashids = new Hashids(uuid(), 10);
        
        let name = window.location.pathname;
        // name = name.replace(/\//g, "");
        //name = name.substr(0, name.lastIndexOf("room/"));
        var str = name;
        var tmp = str.split("room/");
        let shortID = tmp.pop();
        var date = new Date();
        alert(this.props.commentID)
        // let shortIDD = hashids.encode(1, 2, 3);
        // firebase.auth().onAuthStateChanged((user)=> {
        //     if(user) {
        //         var comment = document.getElementById('commentReply');
        //         console.log('user',user)
                
        //         database.ref(`CommentReplies/${shortID}`).push({
        //             commentID:shortIDD,
        //             commentIDReplyingTo:this.props.commentID,
        //             fullname:user.displayName, 
        //             comment:comment.value, 
        //             photo:user.photoURL,
        //             date:date
        //         }).then(() => {
        //             //alert('saved')
        //             comment.value = '';
        //         });
             
        //     } else {

         
        //     }
        // });
        
    }
    render() {

    return(<div>
        <li style={{display:'flex',marginTop:8, marginLeft:19}}>
            <div style={{flex:'0 1 40px',
                border: '0px solid red',
                /* padding: 8px; */
                backgroundImage:`url(${this.props.photo})`,
                backgroundRepeat:'no-repeat',
                backgroundSize:'cover',
                borderRadius:'30px',
                height:'40px',
                marginRight:'14px'
            }}>
            </div>
            <div style={{width:'100%'}}>
                <div style={{border:'1px solid red', marginRight:52}}>
                    <div style={{flex:1, border:'1px solid red'}}>
                        <div style={{display:'flex',fontFamily: "Source Sans Pro",color:'#494A4C',fontSize:'4px',paddingTop:'5px',paddingLeft:'1px'}}>
                        <p style={{fontSize:'14px', fontWeight:600}}>{this.props.fullname}</p>
                            <p style={{fontSize:'12px',marginLeft:'10px',marginTop:'2px',fontWeight:300}}>{moment(this.props.time).fromNow()}</p>
                        </div>
                        
                    </div>
                    <div style={{flex:1, border:'1px solid red', wordWrap:'break-word'}}>
                        <p style={{fontSize:'13px',fontFamily: "Source Sans Pro",fontWeight:'500',color:'black'}}>{this.props.comment}</p>
                        <div><p>REPLY</p></div>
                        <div style={{display:'flex'}}>
                        <textarea id="commentReply" style={{resize:'none'}}></textarea>
                        <button onClick={this.postReply.bind(this)}>Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
        <ul id={this.props.commentID} style={{marginLeft:20}}>
            {/* {
                this.state.replies.map((obj)=> { 
                    return(<Reply fullname={obj.fullname} comment={obj.comment} time={obj.date} photo={obj.photo} commentID={obj.commentID}/>)
                })
            } */}
        </ul>
    </div>)
    }
}

export default Reply;