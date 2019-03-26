import React, { Component } from 'react';
import Responsive from 'react-responsive';
import {Link} from 'react-router-dom';
import Fullscreen from "react-full-screen";
import Tag from './Tag';
import { firebase } from '.././firebase/firebase';
//import createHistory from 'history/createBrowserHistory';

// let history = createHistory();



let tagsLengthArray = [];
let tagCounter = 0;
class RoomPost extends Component {
    constructor(){
        super();
        this.state = {
            theHeight:'29vw',
            isFull: false,
            fullscreen:false,
            pHeight:'',
            dElem:'',
            showMoreTag:false,
            tags:[],
            tagColor:''
        }
    }
    componentDidMount() {
        let tags = this.props.tags;
        
        tags.map((tag)=> {
            if(tagsLengthArray.length < 3) {
                tagsLengthArray.push(tag);
            }
        })
        
        this.setState({tags:tagsLengthArray});
        if(tags.length > 3) {
            this.setState({showMoreTag:true});
        }
    }
    incrementViews() {
        let database = firebase.database();
        database.ref(`rooms/${this.props.shortID}/views`).transaction(function(currentViews) {
            // If node/clicks has never been set, currentRank will be `null`.
            return (currentViews || 0) + 1;
          }).then(()=> {
            window.location.replace(`room/${this.props.shortID}`)
          });
    }
    incrementViewsFull() {
        let database = firebase.database();
        database.ref(`rooms/${this.props.shortID}/views`).transaction(function(currentViews) {
            // If node/clicks has never been set, currentRank will be `null`.
            return (currentViews || 0) + 1;
          });
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
            position:'relative', height:'34px',width:188,justifyContent:'space-between',marginTop:'10px'}}>
            
            {/* <a href={`room/${this.props.shortID}`}> */}
                
                <div onClick={()=>{
                     this.incrementViews();
                   
                }} style={{display:'flex',
                    justifyContent:'space-around',
                    alignItems:'center',
                    outline:'none',
                    cursor:'pointer',
                    border:'1px solid #49A540',
                    borderRadius:'40px',
                    height:'25px',
                    width:'78px',
                    backgroundColor:'#49A540',
                    fontFamily:"Source Sans Pro",
                    color:'white',
                    fontSize:'14px',
                    fontWeight:'600',
                    padding:'0 8px',
                    position:'relative',
                    transition:'color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, width 0.3s ease, opacity 0.3s ease'}}>
                        <i class="fas fa-play" style={{fontSize:10, width:0}}></i>
                        <p style={{fontSize:13, with:20}}>Enter</p>
                      
                </div>
                {/* </a> */}
                <a href={`room/${this.props.shortID}`}>
                
                <div style={{display:'flex',
                    justifyContent:'space-around',
                    alignItems:'center',
                    outline:'none',
                    cursor:'pointer',
                    border:'1px solid #429DCE',
                    borderRadius:'40px',
                    height:'25px',
                    width:'78px',
                    backgroundColor:'#429DCE',
                    fontFamily:"Source Sans Pro",
                    color:'white',
                    fontSize:'14px',
                    fontWeight:'600',
                    padding:'0 8px',
                    position:'relative',
                    transition:'color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, width 0.3s ease, opacity 0.3s ease'}}>
                        <i class="fas fa-infinity" style={{color:'white'}}></i>
                        <p style={{fontSize:13, with:20}}>Remix</p>
                      
                </div></a>
                <div onClick={this.goFull} style={{display:'flex'}}>
                            <i className="fas fa-expand" style={{fontSize:15, color:'#B846F6',margin:'5px 4px'}}></i>
                        </div>
             
                
       
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

                    <div className="top-title" style={{display:'flex',height:'60px',width:'100%'}}>
                        <div style={{display:'flex',
                            marginTop:10,
                            marginLeft:'9px',
                            position:'relative'}}>
                            <div style={{height:'40px',width:'40px',borderRadius:30,backgroundColor:'black', backgroundImage:`url(${this.props.pic})`, marginRight:'10px'}}></div>
                            <div style={{display:'flex',flexDirection:'column'}}>
                            <p className="room-card-title" style={{color:'white'}}>{this.props.room_title}</p>

                                <p style={{overflow:'hidden',
                                    textOverflow:'ellipsis',
                                    textAlign:'left',
                                    width:'97px',
                                    fontSize:'12px',
                                    color:'white',
                                    position:'relative',
                                    top:'-4px'
                                }}>{`@${this.props.username}`}</p>
                            </div>
                            </div>
                            <div style={{flex:1,
                                display:'flex',
                                justifyContent:'flex-end',
                                /* align-items: center; */
                                fontSize:'20px',
                                marginRight:'17px',
                                marginTop:'17px'}}>
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
        this.incrementViewsFull();
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
                    {console.log('commentsCount :', this.props.commentsCount)}
                    <div style={{display:'flex',
                        justifyContent:'space-between',
                        height:'39px',
                        width:'100%',
                        padding:'0px 10px',
                        alignItems:'center',
                        position:'relative',
                    
                        }}>
                        
                            <div style={{border:'0px solid red',overflow:'hidden',height:'50px',display:'flex',
                                alignItems:'center',
                                margin:'10px 5px 0px'}}>
                            {/* <div style={{display:'flex',width:'auto',justifyContent:'space-between',alignItems:'center',marginRight:'18px',flexDirection:'column',height:'37px'}}>
                            <i class="far fa-eye" style={{fontSize:20, color:'white'}}></i>
                                <p style={{fontFamily:'Source Sans Pro',color:'white',fontSize:'14px'}}>{this.props.views}</p>
                            </div> */}
                            <div style={{display:'flex',width:'auto',alignItems:'center', marginRight:'18px',flexDirection:'row',height:'37px'}}>
                            <i class="far fa-heart" style={{fontSize:13, color:'white',marginRight:6.5}}></i>
                                <p style={{fontFamily:'Source Sans Pro',color:'white',fontSize:'14px'}}>{this.props.likes}</p>
                            </div>
                            <div style={{display:'flex',width:'auto',justifyContent:'space-between',alignItems:'center',flexDirection:'row',height:'37px',marginRight:'18px'}}>
                            <i className="far fa-comment-alt" style={{fontSize:13, color:'white',marginRight:6.5}}></i>
                            <p style={{fontFamily:'Source Sans Pro',color:'white',fontSize:'14px'}}>{this.props.commentsCount}</p>
                            </div>
                            {/* <div style={{display:'flex',width:'auto',justifyContent:'space-between',alignItems:'center',flexDirection:'column',height:'37px'}}>
                            <i class="far fa-share-square" style={{fontSize:20, color:'white'}}></i>
                            </div> */}
                    </div>
                    {this.display()}
                   
                </div>
                <div id="descriptionWrapText" style={{fontSize:'16px', padding:'0px 10px 10px',marginBottom:'15px'}}>
                       


                <p style={{fontSize:'12px', color:'white',marginTop:12}}>{`${this.props.id.description}`}<span onClick={this.expandText.bind(this)} style={{color:'#5c5c5c'}}>... [Read More]</span>
</p>



                         
                </div>
                <div id="tags-area" style={{display:'flex',height:26,width:'100%',paddingLeft:'11px',marginBottom:20}}>
                            {
                          
                            this.state.tags.map((tag)=> {
                                
                                let tagColor;
                                if(tagCounter === 0) {
                                    tagColor = '#429DCE';
                                   
                                } else if (tagCounter === 1) {
                                    tagColor = '#B846F6';
                                    
                                } else {
                                    tagColor = '#C96D4E'
                                }
                                tagCounter++;
                                if(tagCounter == this.state.tags.length) {
                                    tagCounter = 0;
                                }
                                
                              
                                return (
                                  <Tag tagColor={tagColor} tag={tag}/>
                                )   
                            })
                           
                            }
                    <div style={{display:this.state.showMoreTag ? 'block':'none',color:'#C7524D', border:'1px solid #C7524D', borderRadius:'12px', padding:'0 8px'}}><p>{'+10'}</p></div>
                </div>
            </div>
        )
    }
}



export default RoomPost;
