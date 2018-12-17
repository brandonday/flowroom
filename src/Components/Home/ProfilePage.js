import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ProfileRooms from './ProfileRooms.js';
import RoomPost from './RoomPost.js';
import { firebase } from '../firebase/firebase';

const rooms = [{
    id:312321,
    date: new Date(),
    html:'',
    css:'',
    js:'',
    pic:'',
    views:'',
    comments:'',
    likes:'',
    description:'',
    objectNum:0
},
{
    id:34321,
    date: new Date(),
    html:'',
    css:'',
    js:'',
    pic:'',
    views:'',
    comments:'',
    likes:'',
    description:'',
    objectNum:0
},
{
    id:34529921,
    date: new Date(),
    html:'',
    css:'',
    js:'',
    pic:'',
    views:'',
    comments:'',
    likes:'',
    description:'',
    objectNum:0
},
{
    id:34554989321,
    date: new Date(),
    html:'',
    css:'',
    js:'',
    pic:'',
    views:'',
    comments:'',
    likes:'',
    description:'',
    objectNum:0
},
{
    id:3453094095321,
    date: new Date(),
    html:'',
    css:'',
    js:'',
    pic:'',
    views:'',
    comments:'',
    likes:'',
    description:'',
    objectNum:0
},
{
    id:34553254501,
    date: new Date(),
    html:'',
    css:'',
    js:'',
    pic:'',
    views:'',
    comments:'',
    likes:'',
    description:'',
    objectNum:0
}]


class ProfilePage extends Component {
    constructor() {
        super();
        this.state = {
            hasName:''
        }
    }
    componentWillMount() {
    //   console.log('current user', firebase.auth())
    // let name = this.props.match.params.id.toLowerCase();
    // let ref = firebase.database().ref("users");
    // ref.once("value")
    //   .then((snapshot) => {
    //     let hasName = snapshot.hasChild(`${name}`); // true
    //     if(hasName) {
    //         this.setState({hasName:'found'});
    //     } else {
    //         this.setState({hasName:'notfound'});
    //     }
    //   });
    
    }   
    render() {
        return (
            <div>
                <div className="profile-main">
                    <div className="profile-info">
                        <div style={{height:'80px',width:'80px'}}>
                            <div className="profile-pic">
                            </div>
                        </div>
                        <div className="profile-top-section-bottom-section-wrap">
                            <div className="name-badge-follow-wrap">
                                <div className="name-badge-follow">
                                    <p className="profile-name-profile">Jake Kwaschenefski</p>
                                    <div style={{height:'14px',width:'14px'}}>
                                        <div className="profile-verified"></div>
                                    </div>
                                    <button className="profile-follow-button">Follow</button>
                                </div>
                                <div className="profile-followers">
                                    <div><p className="profile-follower-num">14 Followers</p></div>
                                    <div style={{marginLeft:16}}><p style={{fontSize:13, fontWeight:600}}>8 Following</p></div>
                                </div>
                            </div>

                            <div className="bio-info">
                                <p style={{fontSize:14}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    id hendrerit quam. Nulla facilisi.
                                </p>
                            </div>
                        </div>

                    </div>            
                </div>  
                <div className="profile-rooms-wrap" style={{overflow:'hidden',
                    padding:'0 20px',
                    minHeight:'100%'
                }}>
             
                    <section>
                        <div className="main">
                            <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-between', margin:'0px 0px 20px auto',fontSize:'16px'}}>
                            </div>
                            <div className="rooms-profile" style={{display:'flex', flexWrap:'wrap', justifyContent:'space-between', margin:'0 auto'}}>
                                { 
                                    rooms.map((i)=> {
                                        return (<RoomPost id={i}/>)
                                    })
                                }
                            </div> 
                        </div>   
                    </section>
                    <nav className="pagination-buttons-wrap">
                        <a href="" className="pagination-button">Previous Page</a>
                        <a href="" className="pagination-button">Next Page</a>
                    </nav>
                </div>
            </div>
        )
    }
}

export default ProfilePage;