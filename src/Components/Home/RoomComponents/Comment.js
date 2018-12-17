import React, { Component } from 'react';
import {Link} from 'react-router-dom';
var moment = require('moment');

 const Comment = (props) => (
    <div>
        <li style={{display:'flex',marginTop:8, marginLeft:19}}>
            <div style={{flex:'0 48px', border:'1px solid red', padding:'25px'}}>
            </div>
            <div style={{width:'100%'}}>
                <div style={{border:'1px solid red', marginRight:52}}>
                    <div style={{flex:1, border:'1px solid red'}}>
                        <div style={{display:'flex',fontFamily: "Source Sans Pro",color:'#494A4C',fontSize:'4px',paddingTop:'5px',paddingLeft:'1px'}}>
                        <p style={{fontSize:'14px', fontWeight:600}}>{props.fullname}</p>
                            <p style={{fontSize:'12px',marginLeft:'10px',marginTop:'2px',fontWeight:300}}>{moment(props.time).fromNow()}</p>
                        </div>
                        
                    </div>
                    <div style={{flex:1, border:'1px solid red', wordWrap:'break-word'}}>
                        <p style={{fontSize:'13px',fontFamily: "Source Sans Pro",fontWeight:'500',color:'black'}}>{props.comment}</p>
                    </div>
                </div>
            </div>
           
        </li>
    </div>
)

export default Comment;