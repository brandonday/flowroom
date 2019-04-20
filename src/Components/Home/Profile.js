import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { firebase } from '../firebase/firebase';

  class Profile extends Component {
      constructor() {
        super();
        this.state = {
            pic:'',
            bio:'',
            name:'',
            email:''
        }
      }
      componentDidMount() {
        this.getProfileInfo()
      }
      getProfileInfo(myusername) {
        let that = this;
        let name = this.props.match.params.id.toLowerCase();
        
        let ref = firebase.database().ref(`users/${name}`);
        ref.once("value")
          .then((snapshot) => {
            console.log('snapshot :',snapshot.val())
            that.setState({pic:snapshot.val().pic});

          });
        } 
      render() {

        return(<div style={{flex:'1',display:'flex'}}>
            <div className="main-section-wrap-community-screen" style={{padding:'31px 73px 30px',background:'black'}}>
            <div style={{
                width:'100%',
                /* max-width: 600px; */
                msFlexAlign:'center',
                alignItems:'center',
                height:'205px',
                background:'white',
                /* margin: auto; */
                border:'0px solid #DDE0EB',
                borderRadius:'6px',
                display:'-ms-flexbox',
                display:'flex',
                msFlexDirection:'column',
                flexDirection:'column',
                fontFamily:"Source Sans Pro",
                color:'#80848C',
                fontSize:'12px',
                padding:'0px 21px',
                msFlex:'1 1',
                flex:'1 1',
                padding:'31px 16px 26px',
                background:'#0f0f0f'
            }}>
                <div style={{height:'100px', 
                    width:'100px', 
                    backgroundColor:'grey', 
                    borderRadius:'50px', 
                    marginBottom:'20px',
                    backgroundImage:`url(${this.state.pic})`,
                    backgroundSize:'cover',
                    backgroundRepeat:'no-repeat',
                    backgroundPosition:'center'
                }}>
                
                </div>
                <div style={{width:'500px',
                    maxWidth:'500px',
                    justifyContent:'center',
                    alignItems:'center',
                    display:'flex',
                    flexDirection:'column'}}>
                        <div style={{display:'flex',flexDirection:'row'}}>
                            <button style={{
                                    cursor: 'pointer',
                                    fontSize:'1.4rem',
                                    fontFamily: "Source Sans Pro",
                                    padding:'1rem',
                                    lineHeight:'0',
                                    width:'140px',
                                    height:'35px',
                                    borderRadius:'6px',
                                    margin:'10px 22px 6px 0px',
                                    color:'rgb(64, 255, 232)',
                                    fontSize:'13px',
                                    backgroundColor:'transparent',
                                    border:'1px solid rgb(64, 255, 232)'}}>Upload Photo</button>
                                    <button style={{
                                        cursor: 'pointer',
                                        fontSize:'1.4rem',
                                        fontFamily: "Source Sans Pro",
                                        padding:'1rem',
                                        lineHeight:'0',
                                        width:'140px',
                                        height:'35px',
                                        borderRadius:'6px',
                                        margin:'10px 22px 6px 0px',
                                        color:'rgb(64, 255, 232)',
                                        fontSize:'13px',
                  
                                        backgroundColor:'transparent',
                                        border:'1px solid rgb(64, 255, 232)'}}>Remove Photo</button>
                        </div>
                        <div style={{display:'flex', justifyContent:'space-between', flexDirection:'row', marginBottom:'5px', marginTop:'18px', width:'100%'}}>
                            <div style={{display:'flex', flexDirection:'column',marginTop:'7px', width:'100%', }}>
                                <input id="fullname" type="text" className="signup-section-input-field" style={{border:'none',height:35,backgroundColor:'#202020',color:'rgb(64, 255, 232)'}} placeholder="Full Name"/>
                            </div>
                           
                        </div>
                        <div style={{width:'100%'}}>
                            <textarea className="community-side-bar-text" style={{height:'100px',width:'100%',resize:'none',border:'none',backgroundColor:'#202020',color:'rgb(64, 255, 232)'}} placeholder="Enter a bio here..."/>
                        </div>
                        <button style={{
                            cursor: 'pointer',
                            fontSize:'1.4rem',
                            fontFamily: "Source Sans Pro",
                            padding:'1rem',
                            lineHeight:'0',
                            borderRadius:'17.5px',
                            height:'36px',
                            width:'150px',
                            backgroundColor:'transparent',
                            fontFamily: "Source Sans Pro",
                            color:'rgb(64, 255, 232)',
                            fontWeight:'100',
                            marginTop:20,
                            fontSize:'14px',
                            border:'1px solid rgb(64, 255, 232)'
                            }}>
                                Save Settings
                        </button>
                </div>
            </div>
        </div>
    </div>)
      }
                        }

export default Profile;