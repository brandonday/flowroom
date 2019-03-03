import React, { Component } from 'react';
import Responsive from 'react-responsive';
import {Link} from 'react-router-dom';
import Fullscreen from "react-full-screen";
const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;



class RoomPost extends Component {
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
        <div style={{display:'flex', width:'100%',justifyContent:'space-between', 
            display:'flex',
            width:'100%',
            padding:'0px 10px',
            fontFamily:'Source Sans Pro',
            color:'rgb(128, 132, 140)',
            fontSize:'1px',
            lineHeight:'0'}}>
                <div style={{display:'flex', fontSize:'16px', justifyContent:'center', alignItems:'center'}}>
                    <p style={{fontSize:'15px'}}>Credits</p>
                    <i style={{color:'#979797', fontSize:'16px',margin:'0 5px'}} className="fas fa-question-circle"/>
                </div>
                <div style={{display:'flex', fontSize:'16px', justifyContent:'center', alignItems:'center'}}>
                    <p>Performance </p>
                    <i style={{color:'#979797', fontSize:'16px', margin:'0 5px'}} className="fas fa-question-circle"/>
                </div>
        </div>
    </div>)
       } else {
           
           return(<div></div>)
       }
    }
    display() {
       
        return ( <div style={{display:'flex',
        width:'100%',
        position:'relative', height:'34px'}}>
        <div onClick={this.goFull} style={{padding:'0px 10px',display:'flex', justifyContent:'center', alignItems:'center'}}>
            <i class="fas fa-expand" style={{marginRight:'10px',fontSize:20, color:'rgb(48, 184, 82)'}}></i>
            <p style={{color:'rgb(128, 132, 140)'}}>full screen</p>
        </div>
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
            position:'absolute',
            right:'10px',
            transition:'color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, width 0.3s ease, opacity 0.3s ease'}}>
          <i class="fas fa-random" style={{color:'rgb(10, 127, 41)'}}></i>
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
                            webkitTransform:'scale(0.5)',
                            transform:'scale(0.5)',
                            webkitTransformOrigin:'top left',
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
            <div style={{position:'relative'}} onMouseEnter={this.mouseHover.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} className="room-post" style={{
                height:this.props.roomHeight
            }}>
            
                <div style={{height:this.props.roomType === 'image'? '100%':'78%',
                    background:'#F9F9F9',
                    overflow:'hidden',
                    position:'relative',
                    webkitBoxSizing:'border-box',
                    mozBoxSizing:'border-box',
                    boxSizing:'border-box'}}>
                 
                        {this.post()}

                        <div id={this.props.id.id} className={this.props.roomType === 'image'? '':"room-overlay"}></div>
                        {/* <Link to={"/room/" + this.props.id.id} >
                            <div id={this.props.id.id + "description"} className={this.props.roomType === 'image'?'': "description-overlay"}>
                                <p>{this.props.roomType === 'image'?''}</p>
                            </div>
                        </Link> */}
                    </div>
                    {this.display()}
                    {this.displayExtraInfo()}
           
                    <div style={{display:'flex',
                        justifyContent:'space-between',
                        height:'39px',
                        width:'100%',
                        padding:'0px 10px',
                        alignItems:'center',
                        position:'relative'
                        }}>
                            <div style={{display:'flex',
                                alignItems:'center'}}>
                                <div style={{height:'20px',width:'20px',borderRadius:20,backgroundColor:'black', marginRight:'10px'}}></div>
                                <p style={{overflow:'hidden',
                                    textOverflow:'ellipsis',
                                    textAlign:'left',
                                    width:'97px',
                                    fontSize:'14px',
                                    color:'rgb(128, 132, 140)'
                                    }}>Brandon</p>
                            </div>
                            <div style={{border:'0px solid red',overflow:'hidden',height:'31px',display:'flex',
                                alignItems:'center'}}>
                            <div style={{display:'flex',width:'41px',justifyContent:'space-between',alignItems:'center',marginRight:'18px'}}>
                                <div className="view-3x"></div>
                                <p style={{fontFamily:'Source Sans Pro',color:'#80848C',fontSize:'14px',lineHeight:0}}>324</p>
                            </div>
                            <div style={{display:'flex',width:'33px',justifyContent:'space-between',alignItems:'center', marginRight:'18px'}}>
                                <div className="likes-3x"></div>
                                <p style={{fontFamily:'Source Sans Pro',color:'#80848C',fontSize:'14px',lineHeight:0}}>24</p>
                            </div>
                            <div style={{display:'flex',width:'27px',justifyContent:'space-between',alignItems:'center'}}>
                                <div className="comments-preview-3x"></div>
                            <p style={{fontFamily:'Source Sans Pro',color:'#80848C',fontSize:'14px', lineHeight:0}}>3</p>
                        </div>
                    </div>
                </div>
                <div id="descriptionWrapText" style={{fontSize:'16px', padding:'0px 10px 10px'}}>
                        <p id="descriptionText" style={{wordBreak:'break-all', fontSize:'12px', color:'rgb(128, 132, 140)'}}>

{/* 
                            <b style={{marginRight:'4px'}}>{`${this.props.username}`}</b>
                            <span onClick={this.expandText.bind(this)} style={{position:'relative',height:'20px', width:'41px', float:'right', overflow:'hidden',top:'18px'}}>... more</span> */}

                            {`${this.props.id.description}`}
                            </p>
                    </div>
            </div>
        )
    }
}


  
export default RoomPost;