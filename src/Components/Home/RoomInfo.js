import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

class RoomInfo extends Component {
    render() {
        return (
            <div>
                <div className="room-info-wrap-box">
                    <div className="room-info-wrap"></div>
                    <div className="room-info">
                        {/* <div className="button-hover"><p className="button-hover-text">Button Hover</p></div> */} 
                        <div className="room-by"><p className="room-by-text">room by</p></div>
                        <div className="full-name-info"><p className="full-name-text">{this.props.name}</p></div>
                        <div className="room-like-mobile"><div className="like-3x"></div></div>
                        <div className="room-like-number-mobile"><p className="room-like-number-text">{this.props.likes}</p></div>
                        <div className="room-save-mobile" style={{display:this.props.saveVisible}}><p className="room-save-text">Save</p></div>
                        <div className="room-share-mobile"><p className="room-share-link">Share</p></div>
                        <div className="room-share-mobile" style={{display:this.props.postVisible}} onClick={this.props.callback}><p className="room-share-link">Remix</p></div>
                        <div className="room-share-mobile" style={{display:this.props.remixVisible}} onClick={this.props.post}><p className="room-share-link">Post</p></div>
                        <div className="room-share-mobile" onClick={this.props.close}><p className="room-share-link">Close</p></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => {
    return {
        state:state
    }
})(RoomInfo);