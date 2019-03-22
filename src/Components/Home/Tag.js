import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

class Tag extends Component {
    render() {
        return (
            <div>
                  <div style={{
                                     
                                     border:'1px solid',
                                     borderColor:this.props.tagColor,
                                     borderRadius:12,
                                     fontSize:13,
                                     padding:'0 11px',
                                     display:'flex',
                                     justifyContent:'center',
                                     alignItems:'center',
                                     marginRight:9
                                 }}>
                                     <p style={{color:this.props.tagColor}}>{this.props.tag}</p>
                                 </div>
            </div>
        )
    }
}

export default Tag