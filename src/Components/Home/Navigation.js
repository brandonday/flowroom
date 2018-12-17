import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { roomsFiltersOne } from '../../actions/filters';


//maybe utilize state here? and make a class component?
 class Nav extends Component {
    constructor() {
        super();
        this.state = {

        }
        this.selection = this.selection.bind(this)
    }
    componentDidMount() {
    }
    selection(key) {
        console.log('key', key)
        this.props.filterSelection({[key]:true});
        if(key === 'all') {
            document.getElementById('allMain').style.borderBottom = '2px solid #30B852';
            document.getElementById('allMain').style.color = '#30B852';
            document.getElementById('allMain').style.paddingBottom = '5px';
            document.getElementById('allMain').style.fontWeight = 'bold';
            
            document.getElementById('popular').style.borderBottom = '';
            document.getElementById('popular').style.color = '#979AA1'; 
            document.getElementById('popular').style.paddingBottom = '';
            document.getElementById('popular').style.fontWeight = '';

            document.getElementById('picked').style.color = '#979AA1';
            document.getElementById('picked').style.paddingBottom = '';
            document.getElementById('picked').style.fontWeight = '';

            document.getElementById('random').style.borderBottom = '';
            document.getElementById('random').style.color = '#979AA1';
            document.getElementById('random').style.paddingBottom = '';
            document.getElementById('random').style.fontWeight = '';

            document.getElementById('recent').style.borderBottom = '';
            document.getElementById('recent').style.color = '#979AA1';
            document.getElementById('recent').style.paddingBottom = '';
            document.getElementById('recent').style.fontWeight = '';

            document.getElementById('myrooms').style.borderBottom = '';
            document.getElementById('myrooms').style.color = '#979AA1';
            document.getElementById('myrooms').style.paddingBottom = '';
            document.getElementById('myrooms').style.fontWeight = '';

            document.getElementById('favorited').style.borderBottom = '';
            document.getElementById('favorited').style.color = '#979AA1';
            document.getElementById('favorited').style.paddingBottom = '';
            document.getElementById('favorited').style.fontWeight = '';

            document.getElementById('followers').style.borderBottom = '';
            document.getElementById('followers').style.color = '#979AA1';
            document.getElementById('followers').style.paddingBottom = '';
            document.getElementById('followers').style.fontWeight = '';
            
            document.getElementById('following').style.borderBottom = '';
            document.getElementById('following').style.color = '#979AA1';
            document.getElementById('following').style.paddingBottom = '';
            document.getElementById('following').style.fontWeight = '';
        } else if ( key === 'popular') {
            document.getElementById('allMain').style.borderBottom = '';
            document.getElementById('allMain').style.color = '#979AA1';
            document.getElementById('allMain').style.paddingBottom = '';
            document.getElementById('allMain').style.fontWeight = '';

            document.getElementById('popular').style.borderBottom = '2px solid #30B852';
            document.getElementById('popular').style.color = '#30B852';
            document.getElementById('popular').style.paddingBottom = '5px';
            document.getElementById('popular').style.fontWeight = 'bold';

            document.getElementById('picked').style.borderBottom = '';
            document.getElementById('picked').style.color = '#979AA1';
            document.getElementById('picked').style.paddingBottom = '';
            document.getElementById('picked').style.fontWeight = '';

            document.getElementById('random').style.borderBottom = '';
            document.getElementById('random').style.color = '#979AA1';
            document.getElementById('random').style.paddingBottom = '';
            document.getElementById('random').style.fontWeight = '';

            document.getElementById('recent').style.borderBottom = '';
            document.getElementById('recent').style.color = '#979AA1';
            document.getElementById('recent').style.paddingBottom = '';
            document.getElementById('recent').style.fontWeight = '';

            document.getElementById('myrooms').style.borderBottom = '';
            document.getElementById('myrooms').style.color = '#979AA1';
            document.getElementById('myrooms').style.paddingBottom = '';
            document.getElementById('myrooms').style.fontWeight = '';

            document.getElementById('favorited').style.borderBottom = '';
            document.getElementById('favorited').style.color = '#979AA1';
            document.getElementById('favorited').style.paddingBottom = '';
            document.getElementById('favorited').style.fontWeight = '';

            document.getElementById('followers').style.borderBottom = '';
            document.getElementById('followers').style.color = '#979AA1';
            document.getElementById('followers').style.paddingBottom = '';
            document.getElementById('followers').style.fontWeight = '';
            
            document.getElementById('following').style.borderBottom = '';
            document.getElementById('following').style.color = '#979AA1';
            document.getElementById('following').style.paddingBottom = '';
            document.getElementById('following').style.fontWeight = '';
        } else if (key === 'picked') {
            document.getElementById('allMain').style.borderBottom = '';
            document.getElementById('allMain').style.color = '#979AA1';
            document.getElementById('allMain').style.paddingBottom = '';
            document.getElementById('allMain').style.fontWeight = '';

           document.getElementById('popular').style.borderBottom = '';
            document.getElementById('popular').style.color = '#979AA1';
            document.getElementById('popular').style.paddingBottom = '';
            document.getElementById('popular').style.fontWeight = '';

            document.getElementById('picked').style.borderBottom = '2px solid #30B852';
            document.getElementById('picked').style.color = '#30B852';
            document.getElementById('picked').style.paddingBottom = '5px';
            document.getElementById('picked').style.fontWeight = 'bold';

            document.getElementById('random').style.borderBottom = '';
            document.getElementById('random').style.color = '#979AA1';
            document.getElementById('random').style.paddingBottom = '';
            document.getElementById('random').style.fontWeight = '';

            document.getElementById('recent').style.borderBottom = '';
            document.getElementById('recent').style.color = '#979AA1';
            document.getElementById('recent').style.paddingBottom = '';
            document.getElementById('recent').style.fontWeight = '';

            document.getElementById('myrooms').style.borderBottom = '';
            document.getElementById('myrooms').style.color = '#979AA1';
            document.getElementById('myrooms').style.paddingBottom = '';
            document.getElementById('myrooms').style.fontWeight = '';

            document.getElementById('favorited').style.borderBottom = '';
            document.getElementById('favorited').style.color = '#979AA1';
            document.getElementById('favorited').style.paddingBottom = '';
            document.getElementById('favorited').style.fontWeight = '';

            document.getElementById('followers').style.borderBottom = '';
            document.getElementById('followers').style.color = '#979AA1';
            document.getElementById('followers').style.paddingBottom = '';
            document.getElementById('followers').style.fontWeight = '';
            
            document.getElementById('following').style.borderBottom = '';
            document.getElementById('following').style.color = '#979AA1';
            document.getElementById('following').style.paddingBottom = '';
            document.getElementById('following').style.fontWeight = '';

        } else if (key === 'random') {
            document.getElementById('allMain').style.borderBottom = '';
            document.getElementById('allMain').style.color = '#979AA1';
            document.getElementById('allMain').style.paddingBottom = '';
            document.getElementById('allMain').style.fontWeight = '';

            document.getElementById('popular').style.borderBottom = '';
            document.getElementById('popular').style.color = '#979AA1';
            document.getElementById('popular').style.paddingBottom = '';
            document.getElementById('popular').style.fontWeight = '';

            document.getElementById('picked').style.borderBottom = '';
            document.getElementById('picked').style.color = '#979AA1';
            document.getElementById('picked').style.paddingBottom = '';
            document.getElementById('picked').style.fontWeight = '';

            document.getElementById('random').style.borderBottom = '2px solid #30B852';
            document.getElementById('random').style.color = '#30B852';
            document.getElementById('random').style.paddingBottom = '5px';
            document.getElementById('random').style.fontWeight = 'bold';

            document.getElementById('recent').style.borderBottom = '';
            document.getElementById('recent').style.color = '#979AA1';
            document.getElementById('recent').style.paddingBottom = '';
            document.getElementById('recent').style.fontWeight = '';

            document.getElementById('myrooms').style.borderBottom = '';
            document.getElementById('myrooms').style.color = '#979AA1';
            document.getElementById('myrooms').style.paddingBottom = '';
            document.getElementById('myrooms').style.fontWeight = '';

            document.getElementById('favorited').style.borderBottom = '';
            document.getElementById('favorited').style.color = '#979AA1';
            document.getElementById('favorited').style.paddingBottom = '';
            document.getElementById('favorited').style.fontWeight = '';

            document.getElementById('followers').style.borderBottom = '';
            document.getElementById('followers').style.color = '#979AA1';
            document.getElementById('followers').style.paddingBottom = '';
            document.getElementById('followers').style.fontWeight = '';
            
            document.getElementById('following').style.borderBottom = '';
            document.getElementById('following').style.color = '#979AA1';
            document.getElementById('following').style.paddingBottom = '';
            document.getElementById('following').style.fontWeight = '';
        } else if (key === 'recent') {
            document.getElementById('allMain').style.borderBottom = '';
            document.getElementById('allMain').style.color = '#979AA1';
            document.getElementById('allMain').style.paddingBottom = '';
            document.getElementById('allMain').style.fontWeight = '';

            document.getElementById('popular').style.borderBottom = '';
            document.getElementById('popular').style.color = '#979AA1';
            document.getElementById('popular').style.paddingBottom = '';
            document.getElementById('popular').style.fontWeight = '';

            document.getElementById('picked').style.borderBottom = '';
            document.getElementById('picked').style.color = '#979AA1';
            document.getElementById('picked').style.paddingBottom = '';
            document.getElementById('picked').style.fontWeight = '';

            
            document.getElementById('random').style.borderBottom = '';
            document.getElementById('random').style.color = '#979AA1';
            document.getElementById('random').style.paddingBottom = '';
            document.getElementById('random').style.fontWeight = '';

            document.getElementById('recent').style.borderBottom = '2px solid #30B852';
            document.getElementById('recent').style.color = '#30B852';
            document.getElementById('recent').style.paddingBottom = '5px';
            document.getElementById('recent').style.fontWeight = 'bold';

            document.getElementById('myrooms').style.borderBottom = '';
            document.getElementById('myrooms').style.color = '#979AA1';
            document.getElementById('myrooms').style.paddingBottom = '';
            document.getElementById('myrooms').style.fontWeight = '';

            document.getElementById('favorited').style.borderBottom = '';
            document.getElementById('favorited').style.color = '#979AA1';
            document.getElementById('favorited').style.paddingBottom = '';
            document.getElementById('favorited').style.fontWeight = '';

            document.getElementById('followers').style.borderBottom = '';
            document.getElementById('followers').style.color = '#979AA1';
            document.getElementById('followers').style.paddingBottom = '';
            document.getElementById('followers').style.fontWeight = '';
            
            document.getElementById('following').style.borderBottom = '';
            document.getElementById('following').style.color = '#979AA1';
            document.getElementById('following').style.paddingBottom = '';
            document.getElementById('following').style.fontWeight = '';
        } else if (key === 'myrooms') {
            document.getElementById('allMain').style.borderBottom = '';
            document.getElementById('allMain').style.color = '#979AA1';
            document.getElementById('allMain').style.paddingBottom = '';
            document.getElementById('allMain').style.fontWeight = '';

            document.getElementById('popular').style.borderBottom = '';
            document.getElementById('popular').style.color = '#979AA1';
            document.getElementById('popular').style.paddingBottom = '';
            document.getElementById('popular').style.fontWeight = '';

            document.getElementById('picked').style.borderBottom = '';
            document.getElementById('picked').style.color = '#979AA1';
            document.getElementById('picked').style.paddingBottom = '';
            document.getElementById('picked').style.fontWeight = '';

            document.getElementById('random').style.borderBottom = '';
            document.getElementById('random').style.color = '#979AA1';
            document.getElementById('random').style.paddingBottom = '';
            document.getElementById('random').style.fontWeight = '';

            document.getElementById('recent').style.borderBottom = '';
            document.getElementById('recent').style.color = '#979AA1';
            document.getElementById('recent').style.paddingBottom = '';
            document.getElementById('recent').style.fontWeight = '';

            document.getElementById('myrooms').style.borderBottom = '2px solid #30B852';
            document.getElementById('myrooms').style.color = '#30B852';
            document.getElementById('myrooms').style.paddingBottom = '5px';
            document.getElementById('myrooms').style.fontWeight = 'bold';

            document.getElementById('favorited').style.borderBottom = '';
            document.getElementById('favorited').style.color = '#979AA1';
            document.getElementById('favorited').style.paddingBottom = '';
            document.getElementById('favorited').style.fontWeight = '';

            document.getElementById('followers').style.borderBottom = '';
            document.getElementById('followers').style.color = '#979AA1';
            document.getElementById('followers').style.paddingBottom = '';
            document.getElementById('followers').style.fontWeight = '';

            document.getElementById('following').style.borderBottom = '';
            document.getElementById('following').style.color = '#979AA1';
            document.getElementById('following').style.paddingBottom = '';
            document.getElementById('following').style.fontWeight = '';
        } else if (key === 'favorited') {
            document.getElementById('allMain').style.borderBottom = '';
            document.getElementById('allMain').style.color = '#979AA1';
            document.getElementById('allMain').style.paddingBottom = '';
            document.getElementById('allMain').style.fontWeight = '';

            document.getElementById('popular').style.borderBottom = '';
            document.getElementById('popular').style.color = '#979AA1';
            document.getElementById('popular').style.paddingBottom = '';
            document.getElementById('popular').style.fontWeight = '';

            document.getElementById('picked').style.borderBottom = '';
            document.getElementById('picked').style.color = '#979AA1';
            document.getElementById('picked').style.paddingBottom = '';
            document.getElementById('picked').style.fontWeight = '';

            document.getElementById('random').style.borderBottom = '';
            document.getElementById('random').style.color = '#979AA1';
            document.getElementById('random').style.paddingBottom = '';
            document.getElementById('random').style.fontWeight = '';

            document.getElementById('recent').style.borderBottom = '';
            document.getElementById('recent').style.color = '#979AA1';
            document.getElementById('recent').style.paddingBottom = '';
            document.getElementById('recent').style.fontWeight = '';

            document.getElementById('myrooms').style.borderBottom = '';
            document.getElementById('myrooms').style.color = '#979AA1';
            document.getElementById('myrooms').style.paddingBottom = '';
            document.getElementById('myrooms').style.fontWeight = '';

            document.getElementById('favorited').style.borderBottom = '2px solid #30B852';
            document.getElementById('favorited').style.color = '#30B852';
            document.getElementById('favorited').style.paddingBottom = '5px';
            document.getElementById('favorited').style.fontWeight = 'bold';

            document.getElementById('followers').style.borderBottom = '';
            document.getElementById('followers').style.color = '#979AA1';
            document.getElementById('followers').style.paddingBottom = '';
            document.getElementById('followers').style.fontWeight = '';

            
            document.getElementById('following').style.borderBottom = '';
            document.getElementById('following').style.color = '#979AA1';
            document.getElementById('following').style.paddingBottom = '';
            document.getElementById('following').style.fontWeight = '';
        } else if (key === 'followers') {
            document.getElementById('allMain').style.borderBottom = '';
            document.getElementById('allMain').style.color = '#979AA1';
            document.getElementById('allMain').style.paddingBottom = '';
            document.getElementById('allMain').style.fontWeight = '';

            document.getElementById('popular').style.borderBottom = '';
            document.getElementById('popular').style.color = '#979AA1';
            document.getElementById('popular').style.paddingBottom = '';
            document.getElementById('popular').style.fontWeight = '';

            document.getElementById('picked').style.borderBottom = '';
            document.getElementById('picked').style.color = '#979AA1';
            document.getElementById('picked').style.paddingBottom = '';
            document.getElementById('picked').style.fontWeight = '';

            document.getElementById('random').style.borderBottom = '';
            document.getElementById('random').style.color = '#979AA1';
            document.getElementById('random').style.paddingBottom = '';
            document.getElementById('random').style.fontWeight = '';

            document.getElementById('recent').style.borderBottom = '';
            document.getElementById('recent').style.color = '#979AA1';
            document.getElementById('recent').style.paddingBottom = '';
            document.getElementById('recent').style.fontWeight = '';

            document.getElementById('myrooms').style.borderBottom = '';
            document.getElementById('myrooms').style.color = '#979AA1';
            document.getElementById('myrooms').style.paddingBottom = '';
            document.getElementById('myrooms').style.fontWeight = '';

            document.getElementById('allMain').style.borderBottom = '';
            document.getElementById('allMain').style.color = '#979AA1';
            document.getElementById('allMain').style.paddingBottom = '';
            document.getElementById('allMain').style.fontWeight = '';

            document.getElementById('popular').style.borderBottom = '';
            document.getElementById('popular').style.color = '#979AA1';
            document.getElementById('popular').style.paddingBottom = '';
            document.getElementById('popular').style.fontWeight = '';

            document.getElementById('picked').style.borderBottom = '';
            document.getElementById('picked').style.color = '#979AA1';
            document.getElementById('picked').style.paddingBottom = '';
            document.getElementById('picked').style.fontWeight = '';

            document.getElementById('random').style.borderBottom = '';
            document.getElementById('random').style.color = '#979AA1';
            document.getElementById('random').style.paddingBottom = '';
            document.getElementById('random').style.fontWeight = '';

            document.getElementById('recent').style.borderBottom = '';
            document.getElementById('recent').style.color = '#979AA1';
            document.getElementById('recent').style.paddingBottom = '';
            document.getElementById('recent').style.fontWeight = '';

            document.getElementById('favorited').style.borderBottom = '';
            document.getElementById('favorited').style.color = '#979AA1';
            document.getElementById('favorited').style.paddingBottom = '';
            document.getElementById('favorited').style.fontWeight = '';

            document.getElementById('followers').style.borderBottom = '2px solid #30B852';
            document.getElementById('followers').style.color = '#30B852';
            document.getElementById('followers').style.paddingBottom = '5px';
            document.getElementById('followers').style.fontWeight = 'bold';

            document.getElementById('following').style.borderBottom = '';
            document.getElementById('following').style.color = '#979AA1';
            document.getElementById('following').style.paddingBottom = '';
            document.getElementById('following').style.fontWeight = '';

        } else if (key === 'following') {
            document.getElementById('allMain').style.borderBottom = '';
            document.getElementById('allMain').style.color = '#979AA1';
            document.getElementById('allMain').style.paddingBottom = '';
            document.getElementById('allMain').style.fontWeight = '';

            document.getElementById('popular').style.borderBottom = '';
            document.getElementById('popular').style.color = '#979AA1';
            document.getElementById('popular').style.paddingBottom = '';
            document.getElementById('popular').style.fontWeight = '';

            document.getElementById('picked').style.borderBottom = '';
            document.getElementById('picked').style.color = '#979AA1';
            document.getElementById('picked').style.paddingBottom = '';
            document.getElementById('picked').style.fontWeight = '';

            document.getElementById('random').style.borderBottom = '';
            document.getElementById('random').style.color = '#979AA1';
            document.getElementById('random').style.paddingBottom = '';
            document.getElementById('random').style.fontWeight = '';

            document.getElementById('recent').style.borderBottom = '';
            document.getElementById('recent').style.color = '#979AA1';
            document.getElementById('recent').style.paddingBottom = '';
            document.getElementById('recent').style.fontWeight = '';

            document.getElementById('myrooms').style.borderBottom = '';
            document.getElementById('myrooms').style.color = '#979AA1';
            document.getElementById('myrooms').style.paddingBottom = '';
            document.getElementById('myrooms').style.fontWeight = '';

            document.getElementById('allMain').style.borderBottom = '';
            document.getElementById('allMain').style.color = '#979AA1';
            document.getElementById('allMain').style.paddingBottom = '';
            document.getElementById('allMain').style.fontWeight = '';

            document.getElementById('popular').style.borderBottom = '';
            document.getElementById('popular').style.color = '#979AA1';
            document.getElementById('popular').style.paddingBottom = '';
            document.getElementById('popular').style.fontWeight = '';

            document.getElementById('picked').style.borderBottom = '';
            document.getElementById('picked').style.color = '#979AA1';
            document.getElementById('picked').style.paddingBottom = '';
            document.getElementById('picked').style.fontWeight = '';

            document.getElementById('random').style.borderBottom = '';
            document.getElementById('random').style.color = '#979AA1';
            document.getElementById('random').style.paddingBottom = '';
            document.getElementById('random').style.fontWeight = '';

            document.getElementById('recent').style.borderBottom = '';
            document.getElementById('recent').style.color = '#979AA1';
            document.getElementById('recent').style.paddingBottom = '';
            document.getElementById('recent').style.fontWeight = '';

            document.getElementById('favorited').style.borderBottom = '';
            document.getElementById('favorited').style.color = '#979AA1';
            document.getElementById('favorited').style.paddingBottom = '';
            document.getElementById('favorited').style.fontWeight = '';

            document.getElementById('followers').style.borderBottom = '';
            document.getElementById('followers').style.color = '#979AA1';
            document.getElementById('followers').style.paddingBottom = '';
            document.getElementById('followers').style.fontWeight = '';

            document.getElementById('following').style.borderBottom = '2px solid #30B852';
            document.getElementById('following').style.color = '#30B852';
            document.getElementById('following').style.paddingBottom = '5px';
            document.getElementById('following').style.fontWeight = 'bold';
        }


    }
    render() {
        return (
            <div>
                <nav className="main-nav">
                    <ul>
                        <li id="allMain" onClick={()=> {
                            this.selection('all')
                            }} style={{ textDecoration: 'none', color:'#979AA1' }}  activeClassName="is-active">All</li>   
                        <li id="popular" onClick={()=>{
                            this.selection('popular');
                            
                        }} style={{ textDecoration: 'none', color:'#979AA1' }} >Popular</li>
                        <li id="picked" onClick={()=>{
                            this.selection('picked')
                        }} style={{ textDecoration: 'none', color:'#979AA1' }} >Picked</li>   
                        <li id="random" onClick={()=>{
                            this.selection('random')
                        }} style={{ textDecoration: 'none', color:'#979AA1' }} >Random</li>   
                        <li id="recent" onClick={()=>{
                            this.selection('recent')
                        }} style={{ textDecoration: 'none', color:'#979AA1' }} >Recent</li>
                        <li id="myrooms" onClick={()=>{
                            this.selection('myrooms')
                        }} style={{ textDecoration: 'none', color:'#979AA1' }} >My Rooms</li> 
                        <li id="favorited" onClick={()=>{
                            this.selection('favorited')
                        }} style={{ textDecoration: 'none', color:'#979AA1' }} >Favorited</li> 
                        <li id="followers" onClick={()=>{
                            this.selection('followers')
                        }} style={{ textDecoration: 'none', color:'#979AA1' }} >Followers</li> 
                         <li id="following" onClick={()=>{
                            this.selection('following')
                        }} style={{ textDecoration: 'none', color:'#979AA1' }} >Following</li> 
                    </ul>
                </nav>
            </div>
            )

        }

}

const mapDispatchToProps = (dispatch) => ({
    filterSelection: (selections) => dispatch(roomsFiltersOne(selections)),
});

const ConnectedNav = connect(undefined, mapDispatchToProps)(Nav)

export default ConnectedNav;
