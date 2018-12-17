import React from 'react'
import {connect} from 'react-redux'

function Photo(props) {
    const post = props.post
    return (
        <figure className="figure">
            <img className="photo" src={post.imageLink} alt={post.description}/>
            <figCaption><p>{post.description}</p></figCaption>
            <div className="button-container">
                <button className="remove-button" onClick={()=> {
                    props.onRemovePhoto(post)
                }}>Remove</button>
            </div>
        </figure>
    )
    
}



export default Photo;