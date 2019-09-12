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


class Embed extends Component {
    constructor() {
        super();
        this.state = {
            lastcom:'',
            width:0,
            height:0,
            menuMobile:false
        }
    }

    componentDidMount() {
   

    }


    
    render() {
        return(

          <div>
            <iframe id="embed-content" style={{height:'100%',width:'100%'}}></iframe>
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
  

export default Embed;
