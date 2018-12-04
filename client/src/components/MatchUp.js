import React from 'react';

class MatchUp extends React.Component{
    render(){
        return(
            <div>
               {this.props.showBtns === false ? (<button onClick={this.props.setPerson}>Match Up</button>) 
               : (<button onClick={this.props.setPerson}>Re-Match</button>)}
            </div>
            

            
        )
    }
}

export default MatchUp;