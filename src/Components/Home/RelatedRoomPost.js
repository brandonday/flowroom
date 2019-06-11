import React, { Component } from 'react';
import Responsive from 'react-responsive';
import {Link} from 'react-router-dom';
import Fullscreen from "react-full-screen";
const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;



class RelatedRoomPost extends Component {
    constructor(){
        super();
        this.state = {
            theHeight:'29vw',
            isFull: false,
            fullscreen:false,
            pHeight:'',
            dElem:''
        }
    }
    componentDidMount() {

    }
    mouseHover() {
        // if(this.props.id.id !== null) {
        //     document.getElementById(this.props.id.id).style.display = 'flex';
        //     document.getElementById(this.props.id.id + "description").style.display = 'flex';
        // }
    }

    mouseLeave() {
        // if(this.props.id.id !== null) {
        // document.getElementById(this.props.id.id).style.display = 'none';
        // document.getElementById(this.props.id.id + "description").style.display = 'none';
        // }
    }

    

    render() {

        return  (
            <div style={{position:'relative'}} onMouseEnter={this.mouseHover.bind(this)} onMouseLeave={this.mouseLeave.bind(this)}  style={{
                width:232,
                background:'#1f1f1f',
            
                justifyContent:'center',
                alignItems:'flex-end',
                margin:'0px 0px 15px',
                flexDirection:'column',
                padding:'8px 8px 6px'
            }}>
            <div style={{width:232}}>
                <Link to={`/room/${this.props.shortID}`}><p style={{
                    fontSize:'16px',
                    position:'relative',
                    margin:0,
                    color:'white'
                }}>{this.props.title}</p></Link>
                <Link to={`/${this.props.userName}`}><p style={{
                    fontSize:'14px',
                    position:'relative',
                    margin:0,
                    color:'white'
                }}>{this.props.isRemix ? 'Remixed by ' :  'Created by ' + `@${this.props.userName}`}</p></Link>
            </div>
            <div style={{
                height:118, 
                backgroundSize:'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition:'center',
                backgroundImage:`url(${this.props.thumbnail})`,
                backgroundRepeat:'no-repeat',
                transform:'scale(1)',
                marginTop:8
            }}></div>
                
            </div>
                
            
        )
    }
}



export default RelatedRoomPost;
