import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Responsive from 'react-responsive';


const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

const ShowMore = (props) => (
    <div>
        <Desktop>  
            <div id="show-more-area" className="show-more-area">
                <div className="show-more-box">
                    <div className="show-more-section">
                        <div id="cover-strip" className="cover-strip"></div>
                        <div id="show-more-button" className="show-more-button" onClick={props.clicked}>
                            <p className="showmore-text">{props.text}</p>
                        </div>
                        <div className="tags-wrap">
                            <div className="tag-img-wrap">
                                <div className="pricetag-3x"></div>
                            </div>
                            <div className="tags">
                                <p className="tags-text">
                                    {
                                        props.tags.map((tag)=>{return tag + ', '})
                                    }
                                </p>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>  
        </Desktop>
        <Tablet>  
            <div id="show-more-area" className="show-more-area">
                <div className="show-more-box">
                    <div className="show-more-section">
                        <div id="cover-strip" className="cover-strip"></div>
                        <div id="show-more-button" className="show-more-button" onClick={props.clicked}>
                            <p className="showmore-text">{props.text}</p>
                        </div>
                        <div className="tags-wrap">
                            <div className="tag-img-wrap">
                                <div className="pricetag-3x"></div>
                            </div>
                            <div className="tags">
                                <p className="tags-text">
                                    {
                                        props.tags.map((tag)=>{return tag + ', '})
                                    }
                                </p>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>  
        </Tablet> 
        <Mobile>  
            <div id="show-more-area" className="show-more-area">
                <div className="show-more-box-mobile">
                    <div className="show-more-section">
                        <div id="cover-strip" className="cover-strip"></div>
                            <div id="show-more-button" className="show-more-button" onClick={props.clicked}>
                                <p className="showmore-text">{props.text}</p>
                            </div>
                            <div className="tags-wrap-mobile">
                                <div className="tag-img-wrap-mobile">
                                <div className="pricetag-3x"></div>
                            </div>
                            <div className="tags">
                                <p className="tags-text">
                                    {
                                        props.tags.map((tag)=>{return tag + ', '})
                                    }
                                </p>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>  
        </Mobile> 
    </div>
)

export default ShowMore;