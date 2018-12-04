import React from 'react';

class Pairs extends React.Component{
    render(){
        const {name, person} = this.props.details;
        return(
            <h3>{name} is shopping for {person}</h3>
        )
    }
}

export default Pairs;