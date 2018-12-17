import React, { Component } from 'react';
import '../styles/stylesheet.css';
import { connect } from 'react-redux';
import { logOut } from '../../actions/authentication';
import createHistory from 'history/createBrowserHistory';
import { firebase } from '.././firebase/firebase';

let history = createHistory();

class ProfilePic extends Component {
  constructor() {
    super();
      this.state = {
        menuVisible:false,
        pic:''
     }

  }
  componentDidMount() {
    let user = firebase.auth().currentUser.displayName;
    let that = this;
 
  

  }
  render() {
    let pic = this.props.state.auth.pic;
    return (
      <div onClick={()=> {
        if(this.state.menuVisible === false) {
          this.setState({menuVisible:true});
        } else {
          this.setState({menuVisible:false}); 
        }
      }} className="header-profile-pic" style={{
        backgroundImage:`url(${pic})`,
        backgroundRepeat:'no-repeat',
        backgroundPosition:'center center',
        backgroundSize:'cover',
        backgroundRepeat:'no-repeat'
        
        }}>
        <div style={{position:'relative'}}>
          <div style={{
            position:'absolute',
            height:'105px',
            width:'100px',
            border:'1px solid #E2E2E2',
            top:'38px',
            left:'-31px',
            background:'white',
            borderRadius:'6px',
            zIndex:'99999',
            display:this.state.menuVisible ? 'flex' : 'none',
            flexDirection:'column'
          }}>
            <div onClick={()=> {
              window.location.replace(`/${this.props.state.auth.username}`)
            }} style={{display:'flex', borderBottom:'1px solid #E2E2E2', height:'35px', textAlign:'center', justifyContent:'center', alignItems:'center'}}>View Profile</div>
            <div onClick={()=> {
              window.location.replace(`/${this.props.state.auth.username}/edit`)
            }} style={{display:'flex', borderBottom:'1px solid #E2E2E2', height:'35px', textAlign:'center', justifyContent:'center', alignItems:'center'}}>Edit Profile</div>
            <div onClick={logOut()} style={{display:'flex', borderBottom:'1px solid #E2E2E2', height:'35px', textAlign:'center', justifyContent:'center', alignItems:'center'}}>Log Out</div>
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  state:state
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logOut())
});
  
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePic);