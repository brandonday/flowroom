import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { roomsFiltersOne} from '../../actions/filters';
import { roomsFiltersTwo } from '../../actions/roomsFilters';
import { SizeMe } from 'react-sizeme';

//maybe utilize state here? and make a class component?

let regular;
let allres;
let mobile;
let tablet;
let desktop;
let live;
let remixable;
let aiType;
let arType;
let vrType;
let three60Type;



class RoomFilters extends Component {
    constructor() {
        super();
        this.state = {
            isMenuVisible:false,
            keyToColor:'',
            regular:true,
            allres:false,
            mobile:false,
            tablet:false,
            desktop:false,
            live:false,
            remixable:false,
            aiType:false,
            arType:false,
            vrType:false,
            three60Type:false
        }
        this.selection = this.selection.bind(this)
    }
    componentDidMount() {

        

    }
   
    selection(key) {
        
      if (key === 'mobile') {
            if (this.state.mobile != true) {
                document.getElementById('Mobile').style.color = 'green';
                mobile = true;
                this.setState({mobile:true});
            } else {
                document.getElementById('Mobile').style.color = '';
                mobile = false;
                this.setState({mobile:false});
            }
            
        } 
        if (key === 'tablet') {
            if (this.state.tablet != true) {
                document.getElementById('Tablet').style.color = 'green';
                tablet = true;
                this.setState({tablet:true});
            } else {
                document.getElementById('Tablet').style.color = '';
                tablet = false;
                this.setState({tablet:false});
            }

        } 
        
        if (key === 'desktop') {
            if (this.state.desktop != true) {
                document.getElementById('Desktop').style.color = 'green';
                desktop = true;
                this.setState({desktop:true});
            } else {
                document.getElementById('Desktop').style.color = '';
                desktop = false;
                this.setState({desktop:false});
            }

        } 
        
        if (key === 'liveYes') {
            
            if (this.state.live != true) {
                document.getElementById('liveYes').style.color = 'green';
                live = true;
                this.setState({live:true});
            } else {
                document.getElementById('liveYes').style.color = '';
                live = false;
                this.setState({live:false});
            }


        } 
        
        if (key === 'remixableYes') {

            if (this.state.remixable != true) {
                document.getElementById('remixableYes').style.color = 'green';
                remixable = true;
                this.setState({remixable:true});
            } else {
                document.getElementById('remixableYes').style.color = '';
                remixable = false;
                this.setState({remixable:false});
            }
        } 
        if (key === 'aiYes') {
            if (this.state.aiType != true) {
                document.getElementById('AIYes').style.color = 'green';
                aiType = true;
                this.setState({aiType:true});
            } else {
                document.getElementById('AIYes').style.color = '';
                aiType = false;
                this.setState({aiType:false});
            }
        }
    

        if (key === 'ar') {
            if (this.state.arType != true) {
                document.getElementById('AR').style.color = 'green';
                arType = true;
                this.setState({arType:true});
            } else {
                document.getElementById('AR').style.color = '';
                arType = false;
                this.setState({arType:false});
            }
        }  else if (key === 'vr') {
            if (this.state.vrType != true) {
                document.getElementById('VR').style.color = 'green';
                vrType = true;
                this.setState({vrType:true});
            } else {
                document.getElementById('VR').style.color = '';
                vrType = false;
                this.setState({vrType:false});
            }

        } else if (key === '360') {

            if (this.state.three60Type != true) {
                document.getElementById('three60').style.color = 'green';
                three60Type = true;
                this.setState({three60Type:true});
            } else {
                document.getElementById('three60').style.color = '';
                three60Type = false;
                this.setState({three60Type:false});
            }

        } 
         

        this.props.filterSelection({
            mobile:mobile,
            tablet:tablet,
            desktop:desktop,
            live:live,
            remixable:remixable,
            ai:aiType,
            ar:arType,
            vr:vrType,
            three60:three60Type
        });

    }
    render() {
        let that = this;
            return (
                <div>
                    {/* <div onClick={()=> {
                        if(this.state.isMenuVisible === false) {
                            this.setState({isMenuVisible:true});
                        } else {
                            this.setState({isMenuVisible:false});
                        }
                    }} style={{
                        position:'relative',
                        borderRadius:'6px',
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        fontSize:'14px',
                        fontFamily: "Source Sans Pro",
                        border:'1px solid rgb(221, 224, 235)',
                        height:'29px',
                        width:'128px',
                        border:'1px solid #DDE0EB',
                        fontWeight:'600',
                        backgroundColor:'#ffffff',
                        cursor:'pointer'
                    }}>
                        <p style={{fontSize:'1.4rem', color:'#80848C', fontWeight:650}}>Room Filters</p><span className="room-filters-down-arrow-3x"></span>
                </div> */}
                <div id="filtersMenu" style={{
                    display:this.state.isMenuVisible ? 'flex' : 'none', 
                    height:'139px', 
                    width:'300px', 
                    border:'0px solid rgb(221, 224, 235)', 
                    position:'absolute', 
                    zIndex:99999, 
                    top:'44px',
                    backgroundColor:'white',
                    flexDirection:'column'
                }}>
        
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <div style={{display:'flex',flexDirection:'column', border:'1px solid rgb(221, 224, 235)'}}>
                            {/* <div style={{flex:1, display:'flex',justifyContent:'center', alignItems:'center', fontSize:11, marginTop:5,marginBottom:5}}>TYPE OF EXPERIENCE</div>
                            <div style={{display:'flex', flex:1, flexDirection:'row', borderBottom:'1px solid rgb(221, 224, 235)'}}>
                            <div onClick={()=>{
                                this.selection('production')
                            }} id="production" style={{flex:1, borderRight:'1px solid rgb(221, 224, 235)', display:'flex', alignItems:'center', justifyContent:'center', height:30}}>Regular</div>
                            <div onClick={()=>{
                                this.selection('developmental')
                            }} id="developmental" style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center', height:30}}>Experimental</div>
                            </div> */}
                            <div style={{flex:1, display:'flex',justifyContent:'center', alignItems:'center', fontSize:11, marginTop:5,marginBottom:5}}>BEST VIEWED ONLY WITH</div>
                            <div style={{display:'flex', flex:1, flexDirection:'row', borderBottom:'1px solid rgb(221, 224, 235)'}}>
                                {/* <div onClick={()=> {
                                this.selection('all')
                                    }} id="AllFilter" style={{display:'flex', flex:1, alignItems:'center', borderRight:'1px solid rgb(221, 224, 235)', justifyContent:'center', height:30}}>All</div> */}
                                <div onClick={()=>{
                                    this.selection('mobile')
                                }} id="Mobile" style={{display:'flex', flex:1, alignItems:'center', borderRight:'1px solid rgb(221, 224, 235)', justifyContent:'center', height:30}}>Mobile</div>
                            <div onClick={()=>{
                                this.selection('tablet')
                            }} id="Tablet" style={{display:'flex', flex:1, alignItems:'center', borderRight:'1px solid rgb(221, 224, 235)', justifyContent:'center', height:30}}>Tablet</div>
                            <div onClick={()=>{
                                this.selection('desktop')
                            }} id="Desktop" style={{display:'flex', flex:1, alignItems:'center', borderRight:'1px solid rgb(221, 224, 235)', justifyContent:'center', height:30}}>Desktop</div>                    </div>
                            <div style={{flex:1, display:'flex',justifyContent:'center', alignItems:'center', fontSize:11, marginTop:5,marginBottom:5}}>SHOW ONLY IF</div>
                            <div style={{display:'flex', flex:1, flexDirection:'row', borderBottom:'1px solid rgb(221, 224, 235)'}}>
                                <div onClick={()=>{
                                    this.selection('liveYes')
                                }} id="liveYes" style={{display:'flex', flex:1, borderRight:'1px solid rgb(221, 224, 235)',alignItems:'center',justifyContent:'center', height:30}}>Live</div>

                                <div onClick={()=>{
                                    this.selection('remixableYes')
                                }} id="remixableYes" style={{display:'flex', flex:1, borderRight:'1px solid rgb(221, 224, 235)',alignItems:'center',justifyContent:'center', height:30}}>Remixable</div>
                                                               <div onClick={()=>{
                                    this.selection('aiYes')
                                }} id="AIYes" style={{display:'flex', flex:1, borderRight:'1px solid rgb(221, 224, 235)',alignItems:'center',justifyContent:'center', height:30}}>AI</div>
                                {/* <div onClick={()=>{
                                    this.selection('liveNo')
                                }} id="liveNo" style={{display:'flex', flex:1, borderRight:'1px solid rgb(221, 224, 235)',alignItems:'center',justifyContent:'center', height:30}}>No</div> */}
                                {/* <div onClick={()=>{
                                    this.selection('liveIDontCare')
                                }} id="liveIDontCare" style={{display:'flex', flex:1, alignItems:'center',justifyContent:'center', height:30}}>I don't care</div> */}
                            </div>
                            {/* <div style={{flex:1, display:'flex',justifyContent:'center', alignItems:'center', fontSize:11, marginTop:5,marginBottom:5}}>REMIXABLE</div> */}
                            {/* <div style={{display:'flex', flex:1, flexDirection:'row', borderBottom:'1px solid rgb(221, 224, 235)'}}> */}

                                {/* <div onClick={()=>{
                                    this.selection('remixableNo')
                                }} id="remixableNo" style={{display:'flex', flex:1, borderRight:'1px solid rgb(221, 224, 235)',alignItems:'center',justifyContent:'center', height:30}}>No</div> */}
                                {/* <div onClick={()=>{
                                    this.selection('remixIDontCare')
                                }} id="remixIDontCare" style={{display:'flex', flex:1, alignItems:'center',justifyContent:'center', height:30}}>I don't care</div> */}
                            {/* </div> */}
                            {/* <div style={{flex:1, display:'flex',justifyContent:'center', alignItems:'center', fontSize:11, marginTop:5,marginBottom:5}}>Artificial Intelligence</div> */}
                            {/* <div style={{display:'flex', flex:1, flexDirection:'row', borderBottom:'1px solid rgb(221, 224, 235)'}}>
 
                                <div onClick={()=>{
                                    this.selection('aiNo')
                                }} id="AINo" style={{display:'flex', flex:1, borderRight:'1px solid rgb(221, 224, 235)',alignItems:'center',justifyContent:'center', height:30}}>No</div>
                                <div onClick={()=>{
                                    this.selection('aiIdontCare')
                                }} id="AIIDontCare" style={{display:'flex', flex:1, alignItems:'center',justifyContent:'center', height:30}}>I don't care</div>
                            </div> */}
                            {/* <div style={{flex:1, display:'flex',justifyContent:'center', alignItems:'center', fontSize:11, marginTop:5,marginBottom:5}}>OTHER</div> */}
                            <div style={{display:'flex', flex:1, flexDirection:'row', borderBottom:'1px solid rgb(221, 224, 235)'}}>
                                <div onClick={()=> {
                                    this.selection('ar')
                                }} id="AR" style={{display:'flex', flex:1, borderRight:'1px solid rgb(221, 224, 235)',alignItems:'center',justifyContent:'center', height:30}}>AR</div>
                                <div onClick={()=>{
                                    this.selection('vr')
                                }} id="VR" style={{display:'flex', flex:1, borderRight:'1px solid rgb(221, 224, 235)',alignItems:'center',justifyContent:'center', height:30}}>VR</div>
                                <div onClick={()=>{
                                    this.selection('360')
                                }} id="three60" style={{display:'flex', flex:1, borderRight:'1px solid rgb(221, 224, 235)', alignItems:'center',justifyContent:'center', height:30}}>360</div>

                                {/* <div onClick={()=>{
                                    this.selection('otherIDontCare')
                                }} id="otherIDontCare" style={{display:'flex', flex:2, alignItems:'center',justifyContent:'center', height:30}}>I don't care</div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

const mapDispatchToProps = (dispatch) => ({
    filterSelection: (selections) => dispatch(roomsFiltersTwo(selections)),
});
                    
const ConnectedRoomsFilters = connect(undefined, mapDispatchToProps)(RoomFilters)
                    
export default ConnectedRoomsFilters;
                    


