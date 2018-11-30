import React from 'react';

class SantaList extends React.Component{
    render(){
        const {name, number} = this.props.details;
        return(
            <li className="single-santa">
                <h3 className="santa-name">{name}</h3>
                <h3 className="santa-number">{number}</h3>
            </li>
        )
    }

}

export default SantaList;