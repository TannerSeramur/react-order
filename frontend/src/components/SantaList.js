import React from 'react';

class SantaList extends React.Component{
    render(){
        const {name, email} = this.props.details;
        return(
            <React.Fragment>
                <li className="single-santa">
                    <h3 className="santa-name">Name: {name} Email: {email}</h3>
                </li>
            </React.Fragment>

            
        )
    }

}

export default SantaList;