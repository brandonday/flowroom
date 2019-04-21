import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { loginAccount } from '../../actions/authentication';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();
const loginUserAccount = ({ loginAccount }) => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    loginAccount(email, password).then(()=> {
        // TODO: ???
     
      document.location.replace('/')
    }).catch((error) => {
        // TODO: show error message

    });
}

 const Login = (props) => (
    <div className="login-screen-wrap">
            
        <div className="main-section-wrap-login-screen">
        <a href="/"><div style={{backgroundImage:'url("../logo.svg")', height:'31px', width:'136px', backgroundSize:'contain', backgroundRepeat:'no-repeat', top:40, position:'relative'}}></div></a>
        <p style={{color:'white',marginBottom:10, marginTop:56}}>Sign In with</p>

        <div className="main-section-login-box" style={{display:'flex',
            height:70, 
            marginBottom:20,
            backgroundColor: '#202020',
            border:'none',
            flexDirection:'row',
            alignItems:'center'
        }}>
            <div style={{display:'flex',
                backgroundColor:'#4267b2',
                height:38,
                width:'100%',
                maxWidth:117,
                borderRadius:3,
                justifyContent:'center',
                alignItems:'center',
                fontSize:'17px',
                marginRight:10
            }}><i class="fab fa-facebook-f" style={{color:'white'}}></i></div>
            <div style={{display:'flex',
                backgroundColor:'#38A1F3',
                height:38,
                width:'100%',
        maxWidth:117,
                borderRadius:3,
                justifyContent:'center',
                alignItems:'center',
                fontSize:'17px',
                marginRight:10
            }}><i class="fab fa-twitter" style={{color:'white'}}></i></div>
            <div style={{display:'flex',
                backgroundColor:'#d34836',
                height:38,
                width:'100%',
        maxWidth:117,
                borderRadius:3,
                justifyContent:'center',
                alignItems:'center',
                fontSize:'17px',
                marginRight:10
            }}><i class="fab fa-google" style={{color:'white'}}></i></div>
        </div>

            <p style={{color:'white',marginBottom:10}}>Or Sign In with flowroom</p>
            <div className="main-section-login-box" style={{backgroundColor:'#202020',border:'none'}}>
                <p className="login-section-p" style={{color:'white',fontSize:14}}>Username of Email Address</p>
                <div className="login-section-fields" style={{display:'flex',flexDirection:'column'}}>
                    <div style={{flex:1,marginBottom:0}}>
                        <p className="email-address-label">Email Address</p>
                        <input id="email" style={{width:'100%',height:30,borderRadius:3}} className="login-section-input-field" placeholder="Email Address"/>
                    </div>
                    <div className="password-forgot-password">

                        <p className="password-label" style={{color:'white'}}>Password</p>
                        <div style={{display:'flex'}}>
                            <input id="password" style={{flex:1, height:30,borderRadius:3}} className="login-section-input-field-password" type="password" placeholder="Password"/>
                            {/* <div className="forgot-button">Forgot ?</div> */}
                        </div>
                    </div>
                </div>
                {/* <p className="forgot-password">Forgot password?</p> */}
                <button onClick={()=>{loginUserAccount(props)}} className="login-section-login-button">SIGN IN</button>
                {/* <p style={{display:'flex'}} className="login-section-p">Don't have an account? <Link to="/signup">{"Sign Up"}</Link></p> */}
            </div>
        </div>
    </div>
)


const mapDispatchToProps = (dispatch) => ({
    loginAccount: (email, password) => dispatch(loginAccount(email,password))
});

const ConnectedLogin = connect(undefined, mapDispatchToProps)(Login)

export default ConnectedLogin;
