import React, { Component } from 'react';
import '../styles/stylesheet.css';
import { connect } from 'react-redux';
import { logOut } from '../../actions/authentication';
import createHistory from 'history/createBrowserHistory';
import { firebase } from '.././firebase/firebase';
import { isFulfilled } from 'q';


let history = createHistory();

let database = firebase.database();

class ProfilePic extends Component {
  constructor() {
    super();
      this.state = {
        menuVisible:false,
        pic:'',
        isLoading:false,
        username:''
     }

  }
  componentDidMount() {
  
    let that = this;
    this.setState({isLoading:true});
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        
        database.ref(`users/${user.displayName}`).once('value').then(function(snapshot) {
                
          that.setState({
              pic:snapshot.val() !== null?snapshot.val().pic:'',
              username:user.displayName,
              isLoading:false
          });

      });
      } else {
        // No user is signed in.
        //that.getProfileInfo('nousername')
      }
    });

  }
  render() {
    const {isLoading} = this.state;
    return (
      <div>

    {
        isLoading ? <div>.</div> :
      (<div onClick={()=> {
        if(this.state.menuVisible === false) {
          this.setState({menuVisible:true});
        } else {
          this.setState({menuVisible:false}); 
        }
      }} ><div style={{display:'flex'}}><div className="header-profile-pic" style={{
        backgroundImage:`url(${this.state.pic})`,
        backgroundRepeat:'no-repeat',
        backgroundPosition:'center center',
        backgroundSize:'cover',
        backgroundRepeat:'no-repeat',
        cursor:'pointer'
        }}>
     
        
        </div>
        <div style={{display:'flex',marginLeft:5,alignItems:'center'}}>
        <p style={{color:'white',fontSize:12,cursor:'pointer'}}>{this.state.username}</p>  
        <i style={{marginLeft:5,color:'white',cursor:'pointer'}} className="fas fa-chevron-down"></i>
        </div>
        </div>
        
        <div style={{position:'relative'}}>
          <div style={{
            position:'absolute',
            height:'105px',
            width:'100px',
            border:'0.1px solid rgb(64, 255, 232)',
            top:'28px',
         
            background:'black',

            zIndex:'999999',
            display:this.state.menuVisible ? 'flex' : 'none',
            flexDirection:'column'
          }}>
            <div onClick={()=> {
              window.location.replace(`/${this.state.username}`)
            }} style={{display:'flex', borderBottom:'1px solid rgb(64, 255, 232)', height:'35px', textAlign:'center', justifyContent:'center', alignItems:'center',color:'rgb(64, 255, 232)',pointer:'cursor'}}>View Profile</div>
            <div onClick={()=> {
              window.location.replace(`/${this.state.username}/edit`)
            }} style={{display:'flex', borderBottom:'1px solid rgb(64, 255, 232)', height:'35px', textAlign:'center', justifyContent:'center', alignItems:'center',color:'rgb(64, 255, 232)',pointer:'cursor'}}>Edit Profile</div>
            <div onClick={logOut()} style={{display:'flex', borderBottom:'1px solid rgb(64, 255, 232)', height:'35px', textAlign:'center', justifyContent:'center', alignItems:'center',color:'rgb(64, 255, 232)',pointer:'cursor'}}>Log Out</div>
          </div>
        </div>
      </div>)

          }
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