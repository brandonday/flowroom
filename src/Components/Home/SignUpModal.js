import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Responsive from 'react-responsive';
import { firebase } from '../firebase/firebase';
import { createAccount, userStore } from '../../actions/authentication';
import { connect } from 'react-redux';
import SignUpForm2 from './SignUpForm2';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { OPEN_MODAL } from '../../actions/entireApp';
import AppModal from './AppModal';
import FileUploader from "react-firebase-file-uploader";
import { WithContext as ReactTags } from 'react-tag-input';
import Logo from './Logo.js';

const KeyCodes = {
    comma: 188,
    enter: 13,
  };
   
  const delimiters = [KeyCodes.comma, KeyCodes.enter];


const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;
 
const database = firebase.database();
const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };
const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  }
  
  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };
  
 class SignUp extends Component {
   constructor() {
       super();
       this.state = {
           file:'',
           fileName:'',
           preview:'',
           cropResults:'',
           image: {},
           username: "",
           avatar: "",
           isUploading: false,
           progress: 0,
           avatarURL: "",
           postedPicURL:'',
           fullname:'',
           isLoggedIn:false
       }
       this.createUserAccount = this.createUserAccount.bind(this);
       this.updateProfile = this.updateProfile.bind(this);
       this.openModal = this.openModal.bind(this)

   }
   _crop(){
    // image in dataUrl
    let imageURL = this.refs.cropper.getCroppedCanvas().toDataURL();
    this.setState({
        cropResult: imageURL
    });
   // alert(this.state.cropResult)
  }

    createUserAccount ({createAccount, userStore}) {
        let that = this;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let fullname = document.getElementById('fullname').value;
       
        localStorage.setItem("email", `${email}`);
        localStorage.setItem("fullname", `${fullname}`);
        
                createAccount(email, password).then(() => {
                    
                    that.setState({isLoggedIn:true});
                    
                }).catch((error)=> {
                    alert(error.message)
                });  
        
    }
    LoginHere() {
        return (
            <p className="signup-section-log-in-here-p">Log in here</p>
        )
    }
    skipStep() {
        this.props.history.push('/')
    }
    updateProfile() {
        let that = this;
        let username = document.getElementById('username').value;
        username = username.toLowerCase();
        
        let nameCaseSensitive = username;
        let email = localStorage.getItem("email"); 
        let fullname = localStorage.getItem("fullname");      
        let bio = document.getElementById('bioText').value;
        let location = document.getElementById('bioText').value;
        let pic = this.state.postedPicURL;
        if(username === '') {
            document.getElementById('username').focus();
        } else {
            
            firebase.database().ref(`users/${username}`).set({
                username:username,
                email:email,
                nameCaseSensitive:nameCaseSensitive,
                bio:bio,
                location:location, 
                pic:pic,
                fullname:fullname
            }).then(() => {
                
                firebase.auth().currentUser.updateProfile({ 
                    displayName:username,
                    photoURL:pic,
                    fullname:fullname
                }).then(()=> {


                    firebase.database().ref(`follows/${username}`).update({
                        following:'',
                        followers:'',
                        fullname:fullname,
                        verified:false
                    }).then(() => {
                        
                        this.props.history.push('/');
                        
                    }).catch((error) => {
        
                    });


                        




                });
                
            }).catch((error) => {

            });
        }
    }
    componentDidMount() {
 
    }
    componentWillUnmount() {
        //Make sure to revoke the data uris to avoid memory leaks
        // const {files} = this.state;
        // for (let i = files.length; i >= 0; i--) {
        //   const file = files[0];
        //   //URL.revokeObjectURL(file.preview);
        // }
      }
      openModal() {
        this.props.openModal({isModalOpen:true, modalType:'image', customStyles:{
          overlay: {
            backgroundColor:'transparent'
          },
          content: {
            color: 'lightsteelblue',
            backgroundColor:'white',
            height:'60%',
            width:'60%',
            marginLeft:'auto',
            marginRight:'auto',
            borderRadius:10, 
            padding:0
          }
        }})
      }
      onDrop = (files) => {
        this.setState({
            files: files.map(file => ({
              ...file,
              preview: URL.createObjectURL(file)
            }))
          });
       }

    handleChangeUsername = event =>
       this.setState({ username: event.target.value });
     handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
     handleProgress = progress => this.setState({ progress });
     handleUploadError = error => {
       this.setState({ isUploading: false });
       console.error(error);
     };
    

     handleUploadSuccess = filename => {
        let usernamef = document.getElementById('username').value;

        this.setState({ avatar: filename, progress: 100, isUploading: false });
        firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(url => {
                this.setState({ postedPicURL: url });
                this.props.userStore({username:usernamef,pic:url});
           
        });
     
    };
    removePhoto() {
        this.setState({ postedPicURL:'' });
        this.props.userStore({pic:''});
    }  
    render() {
        const {file} = this.state;

        // const thumbs = files.map(file => (
        //     <div style={thumb}>
        //       <div style={thumbInner}>
        //         <img
        //           src={file.preview}
        //           style={img}
        //         />
        //       </div>
        //     </div>
        //   ));

        if(!this.state.isLoggedIn) {    
            return ( 
                
                <div style={{flex:'1',display:'flex'}}>
        
                
                        <div style={{flex:'1',display:'flex'}}>
                            <div className="main-section-wrap-signup-screen">
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
</div><p style={{color:'white',marginBottom:10}}>Or Sign Up with flowroom</p>
                                <div className="main-section-signup-box">
                                
                                    <div className="signup-section-fields">
                                        <div>
                                            <p className="signup-screen-lbl">Username</p>
                                            <input type="text" id="fullname" style={{marginRight:'16px'}} className="signup-section-input-field" placeholder="Name"/>
                                        </div>
                                        <div>
                                            <p className="signup-screen-lbl">Email</p>
                                            <input type="text" id="email" className="signup-section-input-field" placeholder="email@address.com"/>
                                        </div>
                                    </div>
                                    <div className="signup-section-fields">
                                        <div>
                                            <p className="signup-screen-lbl">Password</p>
                                            <input type="text" id="password" type="password" style={{marginRight:'16px'}} className="signup-section-input-field" placeholder="Password"/>
                                        </div>
                                        <div>
                                            <p className="signup-screen-lbl">Retype Password</p>
                                            <input type="text" id="confirmPassword" type="password" className="signup-section-input-field" placeholder="Confirm Password"/>
                                        </div>
                                    </div>
                                    <button onClick={()=>this.createUserAccount(this.props)} className="signup-section-signup-button">SIGN UP</button>
                                    <p style={{display:'flex'}} className="signup-section-p">Already have an account? <Link to="/login">{'login here'}</Link></p>
                                </div>
                            </div>
                        </div>
                     
                </div>
            )
        } else {
            return (
                <div style={{flex:'1',display:'flex'}}>
                    <div id="cropModal" style={{position:'absolute', display:'none', alignItems:'center',justifyContent:'center',height:'100%', width:'100%', top:0,left:0,bottomm:0}}>
                        <div onClick={()=>{
                        document.getElementById('cropModal').style.display = 'none';
                    }}  style={{height:'100%',width:'100%',background:'black',opacity:0.5}}>
                        </div>
                        <div style={{height:'80%', display:'flex',width:'80%',backgroundColor:'white',position:'absolute'}}>
                        <Cropper
                            ref='cropper'
                            src={this.state.file}
                            style={{flex:1, width: '100%'}}
                            // Cropper.js options
                            aspectRatio={16 / 9}
                            guides={true}
                            crop={this._crop.bind(this)} 
                            scalable={true}
                            cropBoxMovable={true}
                            cropBoxResizable={true}
                                                    
                        />
                        <div style={{
                            display:'flex',
                            flex:1, 
                            backgroundImage:`url(${this.state.cropResult})`, 
                            backgroundSize:'contain', 
                            backgroundRepeat:'no-repeat',
                            justifyContent:'center', 
                            alignItems:'center',
                            padding:'0 50px'
                        }}>
                            <button onClick={this.save} className="community-create-community-button" style={{marginTop:20}}>
                                Save
                            </button>
                        </div>
                        </div>
                        
                    </div>
                    <div className="main-section-wrap-signup-screen">
                        <p className="signup-screen-label">{'{sign up}'}</p>
                        <div className="main-section-signup-box" style={{height:430}}>
                            <p className="signup-section-p">Enter more information about yourself</p>
                            <div style={{width:'100%'}}>
                                <div style={{width:'100%', padding:'0px 15px'}}>
                                    <div id="profilePic" 
                                        style={{
                                        float:'left', 
                                        height:'50px', 
                                        width:'50px', 
                                        borderRadius:25, 
                                        backgroundColor:'orange', 
                                        overflow:'hidden', 
                                        marginRight:20,
                                        backgroundImage:`url(${this.state.postedPicURL})`,
                                        backgroundRepeat:'no-repeat',
                                        backgroundPosition:'center center',
                                        backgroundSize:'cover',
                                        backgroundRepeat:'no-repeat'
                                        }}>
                                    {this.state.avatarURL && <img src={this.state.postedPicURL} style={{height:'50px', width:'50px'}} />}
                                    </div>
                                    <div style={{display:'flex', flexDirection:'row'}}>
                                    <div>
                    
       

                                        </div>
              
                                    </div>
                   
                                    <AppModal/>
                                    <div style={{display:'flex',flexDirection:'row', flex:1}}>
                                    
                                    {/* <Dropzone 
                                        onDrop={this.onDrop.bind(this)}
                                        multiple={false}
                                        style={{position:'relative',width:'144px',height:'50px',
                                                borderWidth:'2px',
                                                borderColor:'rgb(102, 102, 102)',
                                                borderRadius:'5px'}}> */}
                                           {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          
                                        <button style={{ border:'1px solid light-gray',
                                            color:'gray',
                                            cursor:'pointer',
                                            fontSize:'1.4rem',
                                            fontFamily: 'Source Sans Pro',
                                            /* margin-bottom: 10px; */
                                            width:'140px',
                                            height:'35px',
                                            borderRadius:'6px',
                                            margin:'10px 16px 6px 0px',
                                            display:'flex',
                                            justifyContent:'center',
                                            alignItems:'center'
                                            }}>
                            <label style={{height:34, width:'100%', border:'0px solid black',zIndex:99999999,display:'flex',
    alignItems:'center',
    justifyContent:'center'}}>
                                <p style={{display:'flex',fontSize:12,justifyContent:'center'}}>Upload</p> 
                                {(<FileUploader
                                    hidden
                                    accept="image/*"
                                    name="pic"
                                    randomizeFilename
                                    storageRef={firebase.storage().ref("images")}
                                    onUploadStart={this.handleUploadStart}
                                    onUploadError={this.handleUploadError}
                                    onUploadSuccess={this.handleUploadSuccess}
                                    onProgress={this.handleProgress}
                                    />) 
                                }
                        
                            </label>
          </button>
                                        


                                            {/* </Dropzone> */}
                                        <button onClick={this.removePhoto.bind(this)} style={{
                                            border:'1px solid light-gray',
                                            color:'gray',
                                            cursor:'pointer',
                                            fontSize:'1.4rem',
                                            fontFamily: 'Source Sans Pro',
                                            /* margin-bottom: 10px; */
                                            padding:'1rem',
                                            lineHeight:'0',
                                            width:'140px',
                                            height:'35px',
                                            borderRadius:'6px',
                                            margin:'10px 0px 6px'}}>Remove Photo</button>
                                    </div>
                                    <div style={{display:'flex', flexDirection:'row', marginBottom:'0px'}}>
                                        <div style={{display:'flex', flexDirection:'column', marginRight:'16px',marginTop:'7px'}}>
                                            <p className="signup-screen-lbl">Username</p>
                                            <input id="username" type="text" className="signup-section-input-field" style={{height:35}} placeholder="Username"/>
                                        </div>
                                        <div style={{display:'flex', flexDirection:'column', marginTop:'7px'}}>
                                            <p className="signup-screen-lbl">Location</p>
                                            <input id="location" type="text" className="signup-section-input-field" style={{height:35}} placeholder="City, state, or country"/>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="signup-screen-lbl">Bio</p>
                                        <textarea id="bioText" className="signup-section-input-field" style={{width:'100%', height:'80px', resize:'none'}} maxlength="300" placeholder="Up to 300 characters">

                                        </textarea>
                                    </div>
                                    <div style={{display:'flex',width:'100%', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                        <button style={{backgroundColor:'#1BB243',
                                            border:'1px solid #0A7F29',
                                            color:'white',
                                            cursor:'pointer',
                                            fontSize:'1.4rem',
                                            fontFamily: 'Source Sans Pro',
                                            /* margin-bottom: 10px; */
                                            padding:'1rem',
                                            lineHeight:'0',
                                            width:'140px',
                                            height:'32px',
                                            borderRadius:'6px',
                                            margin:'10px 11px 6px',
                                        }} onClick={this.updateProfile}>Finish</button>
                                            {/* <p onClick={this.skipStep.bind(this)} style={{fontSize:12}}>Skip this step</p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
 
        }
    } 
}

const mapDispatchToProps = (dispatch) => ({
    createAccount: (email,password) => dispatch(createAccount(email,password)),
    userStore: (user) => dispatch(userStore(user)),
    openModal: (modal) => dispatch(OPEN_MODAL(modal))
});

const mapStateToProps = (state) => ({
    isLoggedIn: state.isLoggedIn,
    username: state.username, 
    email: state.email,
    nameCaseSensitive: state.nameCaseSensitive

});

const ConnectedSignUp = connect(mapStateToProps, mapDispatchToProps)(SignUp)

export default ConnectedSignUp;