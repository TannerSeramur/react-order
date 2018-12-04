import React from 'react';

class MatchUp extends React.Component{
    render(){
        return(
            <button onClick={this.props.setPerson}>Match Up</button>
        )
    }
}

export default MatchUp;