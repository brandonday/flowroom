import React, { Component } from 'react';
import { connect } from 'react-redux';
import { communitiesFilter } from '../../actions/communitiesFilter';
import { firebase } from '../firebase/firebase';


let communities = [];

class Communities extends Component {
    constructor() {
        super();
        this.state = {
            lastcom:'',
            width:0,
            height:0
        }
    }

    componentDidMount() {

        let database = firebase.database();
        let that = this;
        database.ref('Communities').orderByChild('date').limitToFirst(10).once('value').then((snapshot) => {
        if(communities.length < 10) {
            snapshot.forEach((childSnapShot) => {
                if (communities.indexOf({community:childSnapShot.val().community})==-1)  {
                    communities.push({
                        id:childSnapShot.key,
                        date:childSnapShot.val().date,
                        shortTitle:childSnapShot.val().shortTitle,
                        sidebarText:childSnapShot.val().SideBarText,
                        community:childSnapShot.val().community,
                        ...childSnapShot
                    });
                }


            });
        }

            let lastcom = communities.length;
            console.log('last room', communities[lastcom - 1])
            //this.setState({lastcom:lastcom});

           //communities = [];

           //alert(communities)
        });

    }

    selectCommunity = (i) => {
        let elID = i;
        document.getElementById(elID).className = 'selected';
        let classElements = document.getElementsByClassName('selected');
        console.log(classElements)
        for(i = 0; i < classElements.length; i++) {
            if(elID != classElements[i].id) {
                classElements[i].className = '';
            }
        }
        this.props.filterSelection({communitySelected:elID});
    }
    onResize() {

    }
    render() {
        return(
<div></div>
            // <div className="communities-wrap">
            // <div className="communities-nav-wrap">

            //         <nav className="communities">
            //             <div style={{fontSize:'13px',
            //                 fontWeight:'bold',
            //                 width:'86px',
            //                 borderRight:'1px solid #979AA1',
            //                 height:'20px',
            //                 /* justify-content: center; */
            //                 alignItems:'center',
            //                 display:'flex',
            //                 left:'0px',
            //                 position:'relative',
            //                 paddingRight:15
            //             }}>Communities</div>
            //             <div id="com-list" className="communities-list">
            //             <span id="All" className="selected" onClick={()=>{this.selectCommunity('All')}}  style={{ textDecoration: 'none', fontSize:13, fontWeight:600, marginRight:12,whiteSpace:'nowrap'}}>All</span>
            //                 {
            //                     communities.map((i) => {
            //                         return (<span id={i.community} onClick={()=>{this.selectCommunity(i.community)}}  style={{ textDecoration: 'none', fontSize:13, fontWeight:600, marginRight:12,whiteSpace:'nowrap'}}>{i.community}</span>)
            //                     })
            //                 }
            //             </div>
            //         </nav>
            //         <div className="communities-view-more" style={{fontWeight:'bold'}}>View More...</div>
            //     </div>

            // </div>
        )
     }
}


const mapDispatchToProps = (dispatch) => ({
    filterSelection: (selection) => dispatch(communitiesFilter(selection)),
});

const ConnectedCommunities = connect(undefined, mapDispatchToProps)(Communities)

export default ConnectedCommunities;
