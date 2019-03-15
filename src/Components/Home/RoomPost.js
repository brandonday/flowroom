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
            return ( <div style={{display:'flex', width:'100%',justifyContent:'center',flexDirection:'column'}}></div>)
       } else {
            return(<div></div>)
       }
    }

    display() {
        return (
        <div style={{display:'flex',
            position:'relative', height:'34px'}}>
            
           
                {this.props.isRemixable ? (<a href={`room/${this.props.shortID}`}>
                
                <div style={{display:'flex',
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
                    right:'-25px',
                    transition:'color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, width 0.3s ease, opacity 0.3s ease'}}>
                        <i class="fas fa-random" style={{color:'rgb(10, 127, 41)'}}></i>
                        <p style={{fontSize:12}}>Remix</p>
                      
                </div></a>): (<a href={`room/${this.props.shortID}`}>
                
                <div style={{display:'flex',
                    justifyContent:'space-around',
                    alignItems:'center',
                    outline:'none',
                    cursor:'pointer',
                    border:'1px solid rgb(10, 127, 41)',
                    borderRadius:'40px',
                    height:'32px',
                    width:'78px',
                    backgroundColor:'rgb(27, 178, 67)',
                    fontFamily:"Source Sans Pro",
                    color:'white',
                    fontSize:'14px',
                    fontWeight:'600',
                    padding:'0 8px',
                    position:'relative',
                    right:'-25px',
                    transition:'color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, width 0.3s ease, opacity 0.3s ease'}}>
                        <p style={{fontSize:12, with:20}}>Go to Room</p>
                      
                </div></a>)}
                
       
    </div>)

    }
    post() {
        if(this.props.roomType === 'other') {
            return (
                <Fullscreen
                    enabled={this.state.isFull}
                    onChange={(isFull) => {
                        this.setState({isFull,fullscreen:true});
                       
                    if(!isFull) {
                        let fullscreennode = document.getElementsByClassName('full-screenable-node');
                        let toptitle = document.getElementsByClassName('top-title');
                        let roomtitlecard = document.getElementsByClassName('room-card-title');
                  
                        let iframe = document.getElementById(`${this.props.id.id}`);
                        iframe.style.transform = 'scale(0.5)';
                        iframe.style.height = '200%';
                        iframe.style.width = '200%';
                        for(let i = 0; i < fullscreennode.length; i++) {
                            fullscreennode[i].style.height = '246px';
                            fullscreennode[i].style.width = '100%';
                        }
                        for(let i = 0; i < toptitle.length; i++) {
                            toptitle[i].style.display = 'flex';
                        }
                        for(let i = 0; i < roomtitlecard.length; i++) {
                            roomtitlecard[i].style.display = 'flex';
                        }
                
                        
                    }
                    }}>

                    <div className="top-title" style={{display:'flex',height:'75px',width:'100%'}}>
                        <div style={{display:'flex',
                            marginTop:10,
                            marginLeft:'19px',
                            position:'relative'}}>
                            <div style={{height:'50px',width:'50px',borderRadius:30,backgroundColor:'black', backgroundImage:`url(${this.props.pic})`, marginRight:'10px'}}></div>
                            <div style={{display:'flex',flexDirection:'column'}}>
                            <p className="room-card-title" style={{color:'white'}}>{this.props.room_title}</p>

                                <p style={{overflow:'hidden',
                                    textOverflow:'ellipsis',
                                    textAlign:'left',
                                    width:'97px',
                                    fontSize:'16px',
                                    color:'white'
                                }}>{`@${this.props.username}`}</p>
                            </div>
                            </div>
                            <div style={{flex:1,
                                display:'flex',
                                justifyContent:'flex-end',
                                /* align-items: center; */
                                fontSize:'20px',
                                marginRight:'10px',
                                marginTop:'30px'}}>
                                <i class="fas fa-ellipsis-v" style={{color:'white'}}></i>
                            </div>
                            
                        </div>
                        <div className="full-screenable-node" style={{height:246}}>
                            <iframe id={`${this.props.id.id}`} src={"/full/" + this.props.id.id} style={{
                                height:'200%', border:'1px solid red',
                                width:'200%',
                                border:0,
                                // position:'absolute',
                                top:0,
                                left: 0,
                                background:'white',
                                WebkitTransform:'scale(0.5)',
                                transform:'scale(0.5)',
                                WebkitTransformOrigin:'top left',
                                transformOrigin:'top left'
                            }} />
                        </div>
                </Fullscreen>
            )
        } else if(this.props.roomType === 'image') {
            return (<img style={{height:'auto', width:'100%'}} src={this.props.postedPicURL}/>)
        } else {
            return (<p>{this.props.postText}</p>)
        }



    }
    goFull = () => {

        document.fullscreenEnabled = false
        if(document.fullscreenEnabled === true) {
        let iframe = document.getElementById(`${this.props.id.id}`);
        // alert(this.props.id.id)
        let fullscreennode = document.getElementsByClassName('full-screenable-node');
        let toptitle = document.getElementsByClassName('top-title');
        let roomtitlecard = document.getElementsByClassName('room-card-title');
        iframe.style.height = '100%';
        iframe.style.width = '100%';
        iframe.style.transform = 'none';
        for(let i = 0; i < fullscreennode.length; i++) {
            fullscreennode[i].style.height = '100%';
            fullscreennode[i].style.width = '100%';
        }
        for(let i = 0; i < toptitle.length; i++) {
            toptitle[i].style.display = 'none';
        }
        for(let i = 0; i < roomtitlecard.length; i++) {
            roomtitlecard[i].style.display = 'none';
        }
        this.setState({ isFull: true });
        } else {
            alert('no ')
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
                    WebkitBoxSizing:'border-box',
                    MozBoxSizing:'border-box',
                    boxSizing:'border-box',
                    backgroundColor:'#242424'
                    }}>

                        {this.post()}

                        <div id={this.props.id.id} className={this.props.roomType === 'image'? '':"room-overlay"}></div>
                        {/* <Link to={"/room/" + this.props.id.id} >
                            <div id={this.props.id.id + "description"} className={this.props.roomType === 'image'?'': "description-overlay"}>
                                <p>{this.props.roomType === 'image'?''}</p>
                            </div>
                        </Link> */}
                    </div>
                
                    {this.displayExtraInfo()}

                    <div style={{display:'flex',
                        justifyContent:'space-between',
                        height:'39px',
                        width:'100%',
                        padding:'0px 10px',
                        alignItems:'center',
                        marginTop:20,
                        position:'relative',
                    
                        }}>
                        
                            <div style={{border:'0px solid red',overflow:'hidden',height:'50px',display:'flex',
                                alignItems:'center'}}>
                            <div style={{display:'flex',width:'auto',justifyContent:'space-between',alignItems:'center',marginRight:'18px',flexDirection:'column',height:'37px'}}>
                            <i class="far fa-eye" style={{fontSize:20, color:'white'}}></i>
                                <p style={{fontFamily:'Source Sans Pro',color:'white',fontSize:'14px'}}>{this.props.views}</p>
                            </div>
                            <div style={{display:'flex',width:'auto',justifyContent:'space-between',alignItems:'center', marginRight:'18px',flexDirection:'column',height:'37px'}}>
                            <i class="far fa-heart" style={{fontSize:20, color:'white'}}></i>
                                <p style={{fontFamily:'Source Sans Pro',color:'white',fontSize:'14px'}}>{this.props.likes}</p>
                            </div>
                            <div style={{display:'flex',width:'auto',justifyContent:'space-between',alignItems:'center',flexDirection:'column',height:'37px',marginRight:'18px'}}>
                            <i class="fas fa-comment-alt" style={{fontSize:20, color:'white'}}></i>
                            <p style={{fontFamily:'Source Sans Pro',color:'white',fontSize:'14px'}}>{this.props.commentsCount}</p>
                            </div>
                            <div style={{display:'flex',width:'auto',justifyContent:'space-between',alignItems:'center',flexDirection:'column',height:'37px'}}>
                            <i class="far fa-share-square" style={{fontSize:20, color:'white'}}></i>
                            </div>
                    </div>
                    {this.display()}
                    <div onClick={this.goFull} style={{padding:'0px 10px',display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <i className="fas fa-expand" style={{marginRight:'10px',fontSize:20, color:'white'}}></i>
                        </div>
                </div>
                <div id="descriptionWrapText" style={{fontSize:'16px', padding:'0px 10px 10px'}}>
                        <p id="descriptionText" style={{wordBreak:'break-all', fontSize:'12px', color:'white'}}>

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
