import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Comment from './Comment.js';


const dummyComments = [{
    fullname:'Brando',
    comment:'sasasadsddsdssdasaddadasdassssdsdsdaddasdasdsadssddsadsadsadasdsadsadsassdsdsadssadsdadsssdsdsdsaddsadsadsasasdsdsadsdsaadsadsadsasdadssadadsadsdssd',
    date: new Date()
},
{fullname:'Brando',
    comment:'sasasadsddsdssdasaddadasdassssdsdsdaddasdasdsadssddsadsadsadasdsadsadsassdsdsadssadsdadsssdsdsdsaddsadsadsasasdsdsadsdsaadsadsadsasdadssadadsadsdssd',
    date: new Date()
}, 
{fullname:'Brando',
comment:'sasasadsddsdssdasaddadasdassssdsdsdaddasdasdsadssddsadsadsadasdsadsadsassdsdsadssadsdadsssdsdsdsaddsadsadsasasdsdsadsdsaadsadsadsasdadssadadsadsdssd',
date: new Date()
},
{fullname:'Brando',
    comment:'sasasadsddsdssdasaddadasdassssdsdsdaddasdasdsadssddsadsadsadasdsadsadsassdsdsadssadsdadsssdsdsdsaddsadsadsasasdsdsadsdsaadsadsadsasdadssadadsadsdssd',
    date: new Date()
},
{fullname:'Brando',
    comment:'sasasadsddsdssdasaddadasdassssdsdsdaddasdasdsadssddsadsadsadasdsadsadsassdsdsadssadsdadsssdsdsdsaddsadsadsasasdsdsadsdsaadsadsadsasdadssadadsadsdssd',
    date: new Date()
},
{fullname:'Brando',
    comment:'sasasadsddsdssdasaddadasdassssdsdsdaddasdasdsadssddsadsadsadasdsadsadsassdsdsadssadsdadsssdsdsdsaddsadsadsasasdsdsadsdsaadsadsadsasdadssadadsadsdssd',
    date: new Date()
}
]

const postComment = () => {
    var comment = document.getElementById('comment');
    var commentObj = {fullname:'Brando', comment:comment.value, date: new Date()}
    dummyComments.push(comment);
    comment.value = '';
}


 const Comments = () => (
    <div>
            <div className="main-section-wrap-comments-screen">
                <div style={{display:'flex',  height:'32px', alignItems:'center', position:'relative', width:'100%'}}>
                    <div style={{display:'flex'}}>
                        <div className="back-arrow-3x"></div>
                        <p style={{fontFamily: "Source Sans Pro", fontSize:'14px',fontWeight:'600',cursor:'pointer',color: '#686B72',marginLeft:'26px',marginTop:'-1px', webkitFontSmoothing:'antialiased'}}>Back to room</p>
                    </div>
                </div>
                <div className="main-section-wrap-comments-box">
                    <div style={{display:'flex',height:'32px', width:'100%'}}>
                        <p style={{color:'#1BB243'}}>Recent Comments</p>
                    </div>
                    <div style={{width:'100%', border:'1px solid red', padding:'9px 243px 10px 23px'}}>
                        <textarea id="comment" style={{border:'1px solid #DDE0EB',borderRadius:'6px',
    color:'#333333',
    resize:'100%',
    fontSize:'1.4rem',
    marginBottom:'1.4rem',
    padding:'1rem',
    fontFamily:'Helvetica, Arial, sans-serif',
    outline:'none',
    backgroundColor:'#F9FAFA',
    webkitFontSmoothing:'antialiased',
    height:'100px',
    width:'100%',
    resize:'none'
    }} placeholder="Write a new comment here...">
   
    </textarea>
    <button onClick={postComment}>Post</button>
                    </div>
                    <ul style={{width:'100%'}}>
                        { 
                            dummyComments.map((obj)=>{
                                return (<Comment fullname={obj.fullname} comment={obj.comment} time={obj.date}/>)
                            })
                        }
                    </ul>
                </div>
            </div>  
    </div>
)

export default Comments;