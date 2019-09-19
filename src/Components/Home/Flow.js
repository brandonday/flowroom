import React, { Component } from 'react';

 class Flow extends Component {  
     constructor(){
         super();
         this.state = {

                isRemixable:false,
      
                
         }
     }
     componentDidMount() {
    


}

     render() {
        return (
            <div style={{height:'100%', width:'100%'}}>
                  <div id="full_wrap" style={{height:'100%',width:'100%',border:'none',background:'transparent'}}> 
                            <iframe id="output_frame" className="output_frame" src={`/full/${this.props.shortID}`} style={{position:'relative'}}></iframe>
                            <iframe id="overlay_output_frame" className="overlay_output_frame" src="" style={{position:'absolute',display:'none'}}></iframe>
                        </div>
            </div>
        )
     }
 }
export default Flow;


