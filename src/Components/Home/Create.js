import React, { Component } from 'react';
import { connect } from 'react-redux';
import { communitiesFilter } from '../../actions/communitiesFilter';
import { firebase } from '../firebase/firebase';
//import 'materialize-css/dist/css/materialize.min.css'
import CarouselMobile from './CarouselMobile'
import Carousel from './Carousel'
import CTags from './CTags';
import CTagsMobile from './CTagsMobile';
import M from 'materialize-css';
import {openMenu} from '../../actions/openMenu';


class Create extends Component {
    constructor() {
        super();
        this.state = {
            lastcom:'',
            width:0,
            height:0,
            menuMobile:false,
            isRoom:false
        }
    }

    componentDidMount() {
 

        
            document.addEventListener('DOMContentLoaded', ()=> {
                if(window.innerWidth > 1024) {
                   // alert('sds')
                    let options = {indicators:true,dist:5,shift:15}
                    var elems = document.querySelectorAll('.carousel');
                    var instances = M.Carousel.init(elems,options);
                    //var elems = document.querySelectorAll('.tap-target');
                    //var instancesTarget = M.TapTarget.init(elems);
                    var instance = M.Carousel.getInstance(elems);
                  
                    window.next = function() {
                      var el = document.querySelector(".carousel");
                      var l = M.Carousel.getInstance(el);
                      l.next(1);
                      let classOp = document.getElementsByClassName('carousel-item-c');
                      for(let i = 0; i < classOp.length; i++) {
                        classOp[i].style.opacity = 0;
                      }
  
                    }

                    window.prev = function() {
                      var el = document.querySelector(".carousel");
                      var l = M.Carousel.getInstance(el);
                      l.prev(1);
                    }

                    document.getElementById('left-arrow').addEventListener('click', ()=> {
                      window.prev();
                    });

                    document.getElementById('right-arrow').addEventListener('click', ()=> {
                      window.next()
                    })
                    
                    that.setState({menuMobile:false});
                } else {
                   // alert('dsd')
                    var elems = document.querySelectorAll('.carousel');
                    var instances = M.Carousel.init(elems,{indicators:false,shift:25,dist:-20,onCycleTo:function(data){
                      //var elems = document.querySelectorAll('.tap-target');
                      
                      
                    // let id = document.querySelectorAll('.carousel-item-c-mobile');
             
                   
                    
                    }});
                   
                    that.setState({menuMobile:true});
                }    
            })
        
            
   
          //carousel.style.height = '450px'
          let that = this;
          function myFunction(x) {
            if (x.matches) { // If media query matches
              that.setState({menuMobile:true});
              let options = {}
              //document.addEventListener('DOMContentLoaded', ()=> {
                var elems = document.querySelectorAll('.carousel');
                var instances = M.Carousel.init(elems,{indicators:false, shift:25,dist:-20});
                let indicators = document.querySelectorAll('.indicators')
                for(let i=0; i < indicators.length; i++) {
                  indicators[i].style.display = 'none';
                }
                
               
              //});
            
            } else {
                that.setState({menuMobile:false});
                let options = {indicators:true,dist:0,shift:15}
               // document.addEventListener('DOMContentLoaded', ()=> {
                  var elems = document.querySelectorAll('.carousel');
                  var instances = M.Carousel.init(elems,options);
                  let indicators = document.querySelectorAll('.indicators')
                 // indicators.style.display = 'block';
                 
                //});
   
            }
          }
          
          // var x = window.matchMedia("(max-width: 1024px)")
          // myFunction(x) // Call listener function at run time
          // x.addListener(myFunction) // Attach listener function on state changes
          var shortID = window.location.pathname.split("room/").pop();

          if(shortID !== '/') {
            
            this.setState({isRoom:true})
          } else {
           
            this.setState({isRoom:false})
            
    
          }
    }
    
    selectCommunity = (i) => {
        // let elID = i;
        // document.getElementById(elID).className = 'selected';
        // let classElements = document.getElementsByClassName('selected');
        // console.log(classElements)
        // for(i = 0; i < classElements.length; i++) {
        //     if(elID != classElements[i].id) {
        //         classElements[i].className = '';
        //     }
        // }
        // this.props.filterSelection({communitySelected:elID});
    }
    onResize() {

    }
    mobileMenu() {
       
    }
    componentWillReceiveProps(){
    
      
    }
    render() {
        return(


<div id="create-box" style={{position:'absolute',height:'540px',zIndex:'9999999',backgroundColor:'#151515',width:'100%',top:this.state.isRoom ? '0px' : '69px',display:this.props.state.openMenu.openMenu? 'block':'none'}}>
  <div id="create-box-wrap" style={{display:'flex',width:'100%',flexDirection:this.state.menuMobile ? 'column':'row'}}>
    <div id="create-from-scratch-wrap" style={{height:'100%',alignItems:'center',display:'flex',flexDirection:'column'}}>
      <p style={{color:'white',fontSize:this.state.menuMobile ? '16px':'20px',fontWeight:700,marginTop:this.state.menuMobile ? '18px':'37px',marginBottom:this.state.menuMobile ? '7px':'0px',position:'relative'}}>Create A Flow From Scratch</p>
      <div style={{display:this.state.menuMobile ? 'none':'block',backgroundColor:'#FFFFFF',
      borderRadius:'10px',
      width:'295px',
      height:'175px',margin:'23px 45px',backgroundImage:'url(https://media.giphy.com/media/TigiW06eiQCClpNnKy/giphy.gif)',
      backgroundSize:'cover',
      backgroundRepeat:'no-repeat'
      }}></div>
      <p style={{color:'white',fontSize:this.state.menuMobile ? '12px':'16px'}}>Drag & Drop Gifs, Images, Text, Emojis,{`${this.state.mobileMenu ? ' or add in':''}`}</p> 
      <p style={{color:'white',fontSize:this.state.menuMobile ? '12px':'16px'}}>{`${this.state.mobileMenu ? '':'  or add in'}`} apps like YouTube, Spotify,{`${!this.state.mobileMenu ? '':' and much more.'}`}</p> 
      <p style={{color:'white',fontSize:this.state.menuMobile ? '12px':'16px'}}>{`${!this.state.mobileMenu ? ' and much more.':''}`}</p>
      
      <a href="room/"><div style={{marginTop:this.state.menuMobile ? '15px':'27px',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <p style={{color:'#FFFFFF',

fontSize:this.state.menuMobile ? '12px':'20px',
fontWeight:700,
lineHeight:'14px',
textAlign:'left',position:'absolute',zIndex:999}}>CREATE</p>
      <div style={{backgroundColor:'#40FFE8',
      borderRadius:'5px',
      opacity:'0.7',
      width:this.state.menuMobile ? '75px':'130px',
      height:this.state.menuMobile ? '25px':'48px',
     display:'flex',alignItems:'center',justifyContent:'center'}}></div>
    </div></a>
  
    </div>
    <div style={{height:this.state.menuMobile ? '100%':'340px',border:'0.5px solid #444444',marginTop:'24px',marginLeft:this.state.menuMobile ? '30px':'0px',marginRight:this.state.menuMobile ? '30px':'0px'}}></div>
    <div style={{display:'flex',flexDirection:'column',height:'100%',width:'100%',justifyContent:'center'}}>
      <p style={{color:'white',fontSize:this.state.menuMobile ?'15px':'20px',fontWeight:'700',
      marginLeft:this.state.menuMobile ?'auto':'40px',marginRight:this.state.menuMobile ? 'auto':'0px',marginTop:this.state.menuMobile ? '23px':'0px',top:this.state.menuMobile ? '':'28px',position:'relative',background:'#151515'}}>Or choose a Template</p>
      <a onClick={(e)=>{
          e.preventDefault()
              if(this.props.state.openMenu.openMenu !== true) {
                this.props.openMenu({openMenu:true});
                document.getElementById("default-modal").style.display = 'block'
                document.getElementById("default-modal").style.top = '80px'
    
            } else {
                this.props.openMenu({openMenu:false});
                document.getElementById("default-modal").style.display = 'none'
                document.getElementById("default-modal").style.top = '80px'
    
            }
      }}href="" style={{display:this.state.menuMobile ? 'none':'block',color:'#40FFE8',
    right:'88px',
    position: 'absolute',
    top:'31px'}}><div style={{display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
      width:'65px'}}><p>Close</p><i className="fa fa-times" style={{fontSize:'14px', color:'#40ffe8'}}></i></div></a>
      <div id="create-tags" style={{display:'flex',flexDirection:'row',background:'#151515'}}>
  
      </div>
      <div style={{display:'flex',flexDirection:this.state.menuMobile ? 'column':'row',alignItems:'center'}}>
          <div id="left-arrow"  class="fa fa-angle-left" style={{display:this.state.menuMobile ? 'none':'block',color:'#898989',fontSize:'30px',marginLeft:'15px',marginRight:'12px',cursor:'pointer'}}></div>   
          <div style={{display:'flex',flexDirection:'column',width:'100%'}}>
            <CTags display={this.state.menuMobile ? 'none':'flex'}/> 
            <CTagsMobile display={this.state.menuMobile ? 'flex':'none'}/>
            {this.props.state.openMenu.openMenu ? (<Carousel display={!this.state.menuMobile ? 'flex':'none'}/>):''}
            
            {this.props.state.openMenu.openMenu ? (<CarouselMobile display={this.state.menuMobile ? 'flex':'none'}/>):''}
         
          </div>
          
      <div id="right-arrow" class="fa fa-angle-right" style={{display:this.state.menuMobile ? 'none':'block',color:'#898989', fontSize:'30px',marginLeft:'13px',marginRight:'31px',cursor:'pointer'}}></div>

    </div>
    </div>
    
</div>
</div>






        )
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    openMenu: (bool) => dispatch(openMenu(bool))
  });
  const ConnectedCreateMenu = connect((state) => {
    return {
      state:state
    }
  },mapDispatchToProps)(Create)
  

export default ConnectedCreateMenu;
