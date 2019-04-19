
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
    getSearchFromFilter(id) {
        switch(id) {
            case 'featured':
                return 'weight';
            case 'trending':
                return 'likes';
            case 'recent':
                return 'date';
            default: 
                return 'date';
        }
    }
    selection(id) {
        document.getElementById(id).className = 'selected';
       let getSelected = document.getElementsByClassName('selected');
      
       for(let i = 0; i < getSelected.length; i++) {
           if(getSelected[i].id !== id) {
              
               getSelected[i].className = '';
           } else {
            
              getSelected[i].className = 'selected';
           }
       }
       console.log('search filters :', this.getSearchFromFilter(id))
       
        this.props.filterSelection({filter:this.getSearchFromFilter(id)});
        

    }
    render() {
        return (
            <div>
               
                <nav className="main-nav">
                    <ul id="nav-lists">
                        <li id="featured" className="selected" onClick={()=>{
                           this.selection('featured');
                        }} style={{ textDecoration: 'none', color:'#979AA1' }} >Featured</li> 
                        <li id="trending" onClick={()=> {
                            this.selection('trending')
                            }} style={{ textDecoration: 'none', color:'#979AA1' }}  activeClassName="is-active">Trending</li>
                        <li id="recent" onClick={()=> {
                            this.selection('recent')
                            }} style={{ textDecoration: 'none', color:'#979AA1' }}  activeClassName="is-active">Recent</li> 
                              
                        {/* <li id="popular" onClick={()=>{
                            this.selection('popular');
                            
                        }} style={{ textDecoration: 'none', color:'#979AA1' }} >Popular</li> */}
                        
                        {/* <li id="random" onClick={()=>{
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
                        }} style={{ textDecoration: 'none', color:'#979AA1' }} >Following</li>   */}
                    </ul>
                     {/* <a href="" className="drop-down-arrow my-communities-down-3x"></a>  */}
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
