import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class TabListCustomTabs extends Component {
    constructor(){
        super();
        this.state={
            tabIndex:0
        }
    }
    tabDetailsClicked() {
        document.getElementById('details').className = 'details-sel-3x'; 
        document.getElementById('details-text').className = 'details-text-selected';   
        
        document.getElementById('rooms').className = 'rooms-3x'; 
        document.getElementById('rooms-text').className = 'rooms-text';  

        document.getElementById('comments').className = 'comments-3x'; 
        document.getElementById('comments-text').className = 'comments-text'; 
    }
    tabRoomsClicked() {
        document.getElementById('rooms').className = 'rooms-sel-3x'; 
        document.getElementById('rooms-text').className = 'rooms-text-selected';    

        document.getElementById('details').className = 'details-3x'; 
        document.getElementById('details-text').className = 'details-text'; 

        document.getElementById('comments').className = 'comments-3x'; 
        document.getElementById('comments-text').className = 'comments-text'; 
    }
    tabCommentsClicked() {
        document.getElementById('comments').className = 'comments-sel-3x'; 
        document.getElementById('comments-text').className = 'comments-text-selected';    

        document.getElementById('rooms').className = 'rooms-3x'; 
        document.getElementById('rooms-text').className = 'rooms-text';    

        document.getElementById('details').className = 'details-3x'; 
        document.getElementById('details-text').className = 'details-text'; 
    }
    render() {
        return (
            <TabList>
                <div className="tabs-wrap">
                    <Tab onClick={this.tabDetailsClicked} className="tab-details-component">
                        <div className="tab-details-wrap">
                            <div id="details" className="details-sel-3x">
                            </div><p id="details-text" className="details-text-selected">Details</p>
                        </div>
                    </Tab>
                    <Tab onClick={this.tabRoomsClicked} className="tab-rooms-component">
                        <div>
                            <div className="tab-rooms-wrap">
                                <div id="rooms" className="rooms-3x">
                                </div><p id="rooms-text" className="rooms-text">Rooms</p>
                            </div>
                        </div>
                    </Tab>
                    <Tab onClick={this.tabCommentsClicked} className="tab-comments-component">
                        <div>
                            <div className="tabs-comments-wrap">
                                <div id="comments" className="comments-3x">
                                </div><p id="comments-text" className="comments-text">Comments</p>
                            </div>
                        </div>
                    </Tab>
                </div>
            </TabList>
        )
    }
}

export default TabListCustomTabs;