import React, { Component } from 'react';
import Responsive from 'react-responsive';
import {Link} from 'react-router-dom';



class RelatedRoomPostTop extends Component {
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
                height:100, width:'100%',
                background:'rgb(15, 15, 15)',
                display:'flex',
                flexDirection:'row',
                margin:10
            }}>
        
            <div style={{
                height:'93px', 
                width:'168px', 
                backgroundSize:'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition:'center',
                backgroundImage:`url(${this.props.thumbnail})`,
                backgroundRepeat:'no-repeat',
                transform:'scale(1)'
            }}></div>
                <div style={{display:'flex',flexDirection:'column'}}>
                <Link to={`/room/${this.props.shortID}`}><p style={{
                    fontSize:'12px',
                    left:'11px',
                    top:'-7px',
                    position:'relative',
                    margin:0,
                    color:'white'
                }}>{this.props.title}</p></Link>
                <Link to={`/${this.props.userName}`}><p style={{
                    fontSize:'8px',
                    left:'11px',
                    top:'-9px',
                    position:'relative',
                    margin:0,
                    color:'white'
                }}>{this.props.isRemix ? 'Remixed by ' :  'Created by ' + `@${this.props.userName}`}</p></Link>
                </div>
            </div>
                
            
        )
    }
}



export default RelatedRoomPostTop;
