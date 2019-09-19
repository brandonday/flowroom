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
import MdShare from 'react-ionicons/lib/MdShare'
import MdInfinite from 'react-ionicons/lib/MdInfinite'
import MdExpand from 'react-ionicons/lib/MdExpand'

class Embed extends Component {
    constructor() {
        super();
        this.state = {
            lastcom:'',
            width:0,
            height:0,
            menuMobile:false,
            shortID:'shortID'
        }
    }

    componentDidMount() {
   
      var shortID = window.location.pathname.split("room/").pop();
      this.setState({shortID:shortID})
    }


    render() {
      let that = this;
        return(

          <div style={{height:'100vh',width:'100%'}}>
            <div style={{height:'100%',width:'100%',borderRadius:5}}>
            <iframe id="embed-content" style={{width:'100%',border:0,height:'calc(100% - 22px - 30px)'}} src={`/full/0aikSQ`}></iframe>
            <div style={{
              backgroundColor:'#1F1F1F',
              borderRadius:'0 0 5px 5px',
              width:'100%',
              height:'50px',
              display:'flex',
              alignItems:'center',
              justifyContent:'space-between'
              }}>
                <div style={{backgroundImage:'url(../logo.svg)',
                        height:'34px',
                        width:'145px',
                        backgroundSize:'129px 35px',
                        backgroundRepeat:'no-repeat',
                        marginLeft:'12px',
                    
                    backgroundRepeat:'no-repeat',marginLeft:12}}></div>
                    <div style={{display:'flex', width:216, justifyContent:'space-between',marginRight:10}}>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:60}}>
                        <MdShare  color="#FAFAFA" fontSize="20px" />
                        <p style={{color:'#FAFAFA',fontSize:14}}>Share</p>
                      </div>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:70}}>
                        <MdInfinite fontSize="25px" color='#FAFAFA' fontWeight="500"  />
                        <p style={{color:'#FAFAFA',fontSize:14}}>Remix</p>
                      </div>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:45,marginRight:14}}>
                        <MdExpand fontSize="17px" color='#FAFAFA' />
                        <p style={{color:'#FAFAFA',fontSize:14}}>Full</p>
                      </div>
                    </div>



              </div>
            </div>
          </div>

        )
    }
  }

  

export default Embed;
