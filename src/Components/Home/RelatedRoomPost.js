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

    displayExtraInfo() {
        if(this.props.isRemixable === true || this.props.roomType === 'other' ) {


        return ( <div style={{display:'flex', width:'100%',justifyContent:'center',flexDirection:'column'}}>
    </div>)
       } else {

           return(<div></div>)
       }
    }

    display() {

        return ( <div style={{display:'flex',
        width:'100%',
        position:'relative', height:'34px'}}>
        {this.props.isRemixable ? (<div style={{display:'flex',
            justifyContent:'space-around',
            alignItems:'center',
            outline:'none',
            cursor:'pointer',
            border:'1px solid rgb(10, 127, 41)',
            borderRadius:'40px',
            height:'32px',
            width:'99px',
            backgroundColor:'rgb(27, 178, 67)',
            fontFamily:"Source Sans Pro",
            color:'white',
            fontSize:'14px',
            fontWeight:'600',
            padding:'0 8px',
            position:'relative',
            right:'10px',
            transition:'color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, width 0.3s ease, opacity 0.3s ease'}}>
          <i className="fas fa-random" style={{color:'rgb(10, 127, 41)'}}></i>
          <p style={{fontSize:12}}>Remix This</p>
        </div>): ''}

    </div>)

    }
    post() {
        if(this.props.roomType === 'other') {
            return (
                <Fullscreen
                    enabled={this.state.isFull}
                    onChange={(isFull) => {
                        this.setState({isFull,fullscreen:true});

                    }}>


                    <div className="full-screenable-node" style={{height:246}}>
                        <iframe src={"/full/" + this.props.id.id} style={{
                            height:'200%', border:'1px solid red',
                            width:'200%',
                            border:0,
                            position:'absolute',
                            top:0,
                            left: 0,
                            background:'white',
                            WebkitTransform:'scale(0.5)',
                            transform:'scale(0.5)',
                            WebkitTransformOrigin:'top left',
                            transformOrigin:'top left'
                }} />
                </div>
                </Fullscreen>)
        } else if(this.props.roomType === 'image') {
            return (<img style={{height:'auto', width:'100%'}} src={this.props.postedPicURL}/>)
        } else {
            return (<p>{this.props.postText}</p>)
        }



    }
    goFull = () => {

        this.setState({ isFull: true });
        if(this.state.fullscreen === true) {
           // this.setState({fullscreen:false});
        } else {
            // let full = document.getElementById('full-screen-fallback');
            // let body = document.getElementsByTagName('body')[0];
            // full.style.position = 'absolute';



            // full.style.height = '100%';
            //           full.style.width = '100%';
            //           full.style.zIndex = '999999999';
            //           full.style.backgroundColor = 'white';
            //           full.style.display = 'flex';
            //           body.style.overflow = 'hidden';



        }

    }
    expandText() {
        let that = this;
        var pos = 0;
        var id = setInterval(frame, 0);
        function frame() {
          if (pos == that.state.pHeight) {
            clearInterval(id);
          } else {
            pos++;
            that.state.dElem.style.height = pos + "px";
          }
        }
    }
    render() {

        return  (
            <div style={{position:'relative'}} onMouseEnter={this.mouseHover.bind(this)} onMouseLeave={this.mouseLeave.bind(this)}  style={{
                height:159, width:232,
                background:'#1f1f1f',
                display:'flex',
                justifyContent:'center',
                alignItems:'flex-end',
                padding:5,
                margin:'0px 0px 15px',
                flexDirection:'column'
            }}>
            <div style={{width:232}}>
                <p style={{
                    fontSize:'12px',
                    left:'11px',
                    top:'-7px',
                    position:'relative',
                    margin:0,
                    color:'white'
                }}>{this.props.title}</p>
                <p style={{
                    fontSize:'8px',
                    left:'11px',
                    top:'-9px',
                    position:'relative',
                    margin:0,
                    color:'white'
                }}>{this.props.isRemix ? 'Remixed by ' :  'Created by ' + `@${this.props.userName}`}</p>
            </div>
            <div style={{
                height:118, 
                width:221, 
                backgroundSize:'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition:'center',
                backgroundImage:`url(${this.props.thumbnail})`,
                backgroundRepeat:'no-repeat',
                transform:'scale(1)'
            }}></div>
                
            </div>
                
            
        )
    }
}



export default RelatedRoomPost;
