import React, { Component } from 'react';


const MessageItem = (props) => {
    return (   
        <div>
            <li style={{display:'flex', flexDirection:'row', height:82, borderBottom:'1px solid gray'}}>
                <div style={{display:'flex', flex:'0 0 78px', border:'0px solid red', width:'79px', justifyContent:'center', alignItems:'center'}}>
                    <div style={{height:'40px', width:'40px', borderRadius:20, backgroundColor:'orange'}}></div>
                </div>
                <div style={{display:'flex',flexDirection:'column', flex:1}}>
                    <div style={{display:'flex', alignItems:'center',marginTop:'8px'}}>
                        <p style={{fontSize:14, color:'black', fontWeight:'bold'}}>{props.userName}</p>
                        <p style={{fontSize:12, marginLeft:5, color:'black'}}>{props.timeAgo}</p>
                    </div>
                    <div style={{
                            top:'-2px',
                            position:'relative',          
                            flexWrap:'wrap',
                            /* overflow-wrap: normal; */
                            overflow:'hidden',
                            /* text-overflow: ellipsis; */
                            width:'100%',
                            display:'flex',
                            height:'53px'
                    }}>
                        <p style={{margin:0, color:'black', fontSize:14}}>
                            {props.recentMessage}
                        </p>
                    </div>
                </div>
            </li>
        </div>
    )
}

export default MessageItem;