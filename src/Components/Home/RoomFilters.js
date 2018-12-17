import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { roomsFiltersOne} from '../../actions/filters';
import { roomsFiltersTwo } from '../../actions/roomsFilters';
import { SizeMe } from 'react-sizeme';

//maybe utilize state here? and make a class component?
class RoomFilters extends Component {
    constructor() {
        super();
        this.state = {
            isMenuVisible:false,
            keyToColor:''
        }
        this.selection = this.selection.bind(this)
    }
    componentDidMount() {

    }
    selection(key) {
        if(key === 'production') {
            document.getElementById('developmental').style.color = '';
            document.getElementById('production').style.color = 'green';
            this.props.filterSelection({[key]:true});
        } else if(key === 'developmental') {
            document.getElementById('production').style.color = '';
            document.getElementById('developmental').style.color = 'green';
            this.props.filterSelection({[key]:true});
        } else if (key === 'all') {
            document.getElementById('All').style.color = 'green';
            document.getElementById('Mobile').style.color = '';
            document.getElementById('Tablet').style.color = '';
            document.getElementById('Desktop').style.color = '';
            this.props.filterSelection({[key]:true});
        } else if (key === 'mobile') {
            document.getElementById('All').style.color = '';
            document.getElementById('Mobile').style.color = 'green';
            document.getElementById('Tablet').style.color = '';
            document.getElementById('Desktop').style.color = '';
            this.props.filterSelection({[key]:true});
        } else if (key === 'tablet') {
            document.getElementById('All').style.color = '';
            document.getElementById('Mobile').style.color = '';
            document.getElementById('Tablet').style.color = 'green';
            document.getElementById('Desktop').style.color = '';
            this.props.filterSelection({[key]:true});
        } else if (key === 'desktop') {
            document.getElementById('All').style.color = '';
            document.getElementById('Mobile').style.color = '';
            document.getElementById('Tablet').style.color = '';
            document.getElementById('Desktop').style.color = 'green';
            this.props.filterSelection({[key]:true});
        } else if (key === 'liveYes') {
            document.getElementById('liveYes').style.color = 'green';
            document.getElementById('liveNo').style.color = '';
            document.getElementById('liveIDontCare').style.color = '';
            this.props.filterSelection({[key]:true});
         } else if (key === 'liveNo') {
            document.getElementById('liveYes').style.color = '';
            document.getElementById('liveNo').style.color = 'green';
            document.getElementById('liveIDontCare').style.color = '';
            this.props.filterSelection({[key]:true});
        } else if (key === 'liveIDontCare') {
            document.getElementById('liveYes').style.color = '';
            document.getElementById('liveNo').style.color = '';
            document.getElementById('liveIDontCare').style.color = 'green';
            this.props.filterSelection({[key]:true});
        } else if (key === 'remixableYes') {
            document.getElementById('remixableYes').style.color = 'green';
            document.getElementById('remixableNo').style.color = '';
            document.getElementById('remixIDontCare').style.color = '';
            this.props.filterSelection({[key]:true});
        } else if (key === 'remixableNo') {
            document.getElementById('remixableYes').style.color = '';
            document.getElementById('remixableNo').style.color = 'green';
            document.getElementById('remixIDontCare').style.color = '';
            this.props.filterSelection({[key]:true});
        } else if (key === 'remixIDontCare') {
            document.getElementById('remixableYes').style.color = '';
            document.getElementById('remixableNo').style.color = '';
            document.getElementById('remixIDontCare').style.color = 'green';
            this.props.filterSelection({[key]:true});
        } else if (key === 'aiYes') {
            document.getElementById('AIYes').style.color = 'green';
            document.getElementById('AINo').style.color = '';
            document.getElementById('AIIDontCare').style.color = '';
            this.props.filterSelection({[key]:true});
        } else if (key === 'aiNo') {
            document.getElementById('AIYes').style.color = '';
            document.getElementById('AINo').style.color = 'green';
            document.getElementById('AIIDontCare').style.color = '';
            this.props.filterSelection({[key]:true});
        } else if (key === 'aiIdontCare') {
            document.getElementById('AIYes').style.color = '';
            document.getElementById('AINo').style.color = '';
            document.getElementById('AIIDontCare').style.color = 'green';
            this.props.filterSelection({[key]:true});
        }  else if (key === 'ar') {
            document.getElementById('AR').style.color = 'green';
            document.getElementById('VR').style.color = '';
            document.getElementById('three60').style.color = '';
            document.getElementById('otherIDontCare').style.color = '';
            this.props.filterSelection({[key]:true});
        }  else if (key === 'vr') {
            document.getElementById('AR').style.color = '';
            document.getElementById('VR').style.color = 'green';
            document.getElementById('three60').style.color = '';
            document.getElementById('otherIDontCare').style.color = '';
            this.props.filterSelection({[key]:true});

        } else if (key === '360') {
            document.getElementById('AR').style.color = '';
            document.getElementById('VR').style.color = '';
            document.getElementById('three60').style.color = 'green';
            document.getElementById('otherIDontCare').style.color = '';
            this.props.filterSelection({[key]:true});
        } else if (key === 'otherIDontCare') {
            document.getElementById('otherIDontCare').style.color = 'green';
            document.getElementById('VR').style.color = '';
            document.getElementById('three60').style.color = '';
            this.props.filterSelection({[key]:true});
        } else {
            this.props.filterSelection({[key]:true});
            document.getElementById(key).style.color = 'green'
        }
         
         
        //
        // this.setState({keyToColor:key});
        // if(this.state.keyToColor != null) {
        // }
        // this.setState({keyToColor:''});
    }
    render() {
        let that = this;
    
        return  (
            <div>
                <div onClick={()=> {
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
            </div>
            <div style={{
                display:this.state.isMenuVisible ? 'flex' : 'none', 
                height:'320px', 
                width:'300px', 
                border:'0px solid rgb(221, 224, 235)', 
                position:'absolute', 
                zIndex:99999, 
                right:70,
                top:'44px',
                backgroundColor:'white',
                flexDirection:'column'
            }}>
                <div style={{display:'flex', flexDirection:'column'}}>
                    <div style={{display:'flex',flexDirection:'column', border:'1px solid rgb(221, 224, 235)'}}>
                        <div style={{flex:1, display:'flex',justifyContent:'center', alignItems:'center', fontSize:11, marginTop:5,marginBottom:5}}>TYPE OF EXPERIENCE</div>
                        <div style={{display:'flex', flex:1, flexDirection:'row', borderBottom:'1px solid rgb(221, 224, 235)'}}>
                            <div onClick={()=>{
                                this.selection('production')
                            }} id="production" style={{flex:1, borderRight:'1px solid rgb(221, 224, 235)', display:'flex', alignItems:'center', justifyContent:'center', height:30}}>Regular</div>
                            <div onClick={()=>{
                                this.selection('developmental')
                            }} id="developmental" style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center', height:30}}>Experimental</div>
                        </div>
                        <div style={{flex:1, display:'flex',justifyContent:'center', alignItems:'center', fontSize:11, marginTop:5,marginBottom:5}}>BEST VIEWED WITH</div>
                        <div style={{display:'flex', flex:1, flexDirection:'row', borderBottom:'1px solid rgb(221, 224, 235)'}}>
                            <div onClick={()=> {
                                this.selection('all')
                                }} id="All" style={{display:'flex', flex:1, alignItems:'center', borderRight:'1px solid rgb(221, 224, 235)', justifyContent:'center', height:30}}>All</div>
                            <div onClick={()=>{
                                this.selection('mobile')
                            }} id="Mobile" style={{display:'flex', flex:1, alignItems:'center', borderRight:'1px solid rgb(221, 224, 235)', justifyContent:'center', height:30}}>Mobile</div>
                            <div onClick={()=>{
                                this.selection('tablet')
                            }} id="Tablet" style={{display:'flex', flex:1, alignItems:'center', borderRight:'1px solid rgb(221, 224, 235)', justifyContent:'center', height:30}}>Tablet</div>
                            <div onClick={()=>{
                                this.selection('desktop')
                            }} id="Desktop" style={{display:'flex', flex:1, alignItems:'center', borderRight:'1px solid rgb(221, 224, 235)', justifyContent:'center', height:30}}>Desktop</div>                    </div>
                            <div style={{flex:1, display:'flex',justifyContent:'center', alignItems:'center', fontSize:11, marginTop:5,marginBottom:5}}>LIVE</div>
                            <div style={{display:'flex', flex:1, flexDirection:'row', borderBottom:'1px solid rgb(221, 224, 235)'}}>
                                <div onClick={()=>{
                                    this.selection('liveYes')
                                }} id="liveYes" style={{display:'flex', flex:1, borderRight:'1px solid rgb(221, 224, 235)',alignItems:'center',justifyContent:'center', height:30}}>Yes</div>
                                <div onClick={()=>{
                                    this.selection('liveNo')
                                }} id="liveNo" style={{display:'flex', flex:1, borderRight:'1px solid rgb(221, 224, 235)',alignItems:'center',justifyContent:'center', height:30}}>No</div>
                                <div onClick={()=>{
                                    this.selection('liveIDontCare')
                                }} id="liveIDontCare" style={{display:'flex', flex:1, alignItems:'center',justifyContent:'center', height:30}}>I don't care</div>
                            </div>
                            <div style={{flex:1, display:'flex',justifyContent:'center', alignItems:'center', fontSize:11, marginTop:5,marginBottom:5}}>REMIXABLE</div>
                            <div style={{display:'flex', flex:1, flexDirection:'row', borderBottom:'1px solid rgb(221, 224, 235)'}}>
                                <div onClick={()=>{
                                    this.selection('remixableYes')
                                }} id="remixableYes" style={{display:'flex', flex:1, borderRight:'1px solid rgb(221, 224, 235)',alignItems:'center',justifyContent:'center', height:30}}>Yes</div>
                                <div onClick={()=>{
                                    this.selection('remixableNo')
                                }} id="remixableNo" style={{display:'flex', flex:1, borderRight:'1px solid rgb(221, 224, 235)',alignItems:'center',justifyContent:'center', height:30}}>No</div>
                                <div onClick={()=>{
                                    this.selection('remixIDontCare')
                                }} id="remixIDontCare" style={{display:'flex', flex:1, alignItems:'center',justifyContent:'center', height:30}}>I don't care</div>
                            </div>
                            <div style={{flex:1, display:'flex',justifyContent:'center', alignItems:'center', fontSize:11, marginTop:5,marginBottom:5}}>Artificial Intelligence</div>
                            <div style={{display:'flex', flex:1, flexDirection:'row', borderBottom:'1px solid rgb(221, 224, 235)'}}>
                                <div onClick={()=>{
                                    this.selection('aiYes')
                                }} id="AIYes" style={{display:'flex', flex:1, borderRight:'1px solid rgb(221, 224, 235)',alignItems:'center',justifyContent:'center', height:30}}>Yes</div>
                                <div onClick={()=>{
                                    this.selection('aiNo')
                                }} id="AINo" style={{display:'flex', flex:1, borderRight:'1px solid rgb(221, 224, 235)',alignItems:'center',justifyContent:'center', height:30}}>No</div>
                                <div onClick={()=>{
                                    this.selection('aiIdontCare')
                                }} id="AIIDontCare" style={{display:'flex', flex:1, alignItems:'center',justifyContent:'center', height:30}}>I don't care</div>
                            </div>
                            <div style={{flex:1, display:'flex',justifyContent:'center', alignItems:'center', fontSize:11, marginTop:5,marginBottom:5}}>OTHER</div>
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

                                <div onClick={()=>{
                                    this.selection('otherIDontCare')
                                }} id="otherIDontCare" style={{display:'flex', flex:2, alignItems:'center',justifyContent:'center', height:30}}>I don't care</div>
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
                    


