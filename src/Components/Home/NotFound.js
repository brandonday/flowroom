import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ProfileRooms from './ProfileRooms.js';
import RoomPost from './RoomPost.js';
import { firebase } from '../firebase/firebase';


class NotFound extends Component {
  constructor() {
    super();
  }
  componentDidMount() {

  }   
  render() {
    return (
      <div className="notfound-main" style={{ display:'flex', flexDirection:'column', alignItems:'center', backgroundColor:'#F9FAFA', flex: 1}}>
        <p className="404-label" style={{fontFamily:'Source Sans Pro',fontSize:'86px',fontWeight:'600',color:'#1BB243',height:'103px'}}>404</p>
        <p className="page-not-found-label" style={{fontFamily:'Source Sans pro', color:'#494A4C', fontSize:'18px', marginBottom:'12px'}}>Page not found</p>
        <div className="doors-3x"></div>
        <p className="notfound-text">Looks like you found a page that doesn’t exist. This can happen when you land on a page that has since been deleted, or the link was incorrect to begin with.</p>
        <Link to="/"> Go to home</Link>
      </div>
    )
  }
  
}

export default NotFound;