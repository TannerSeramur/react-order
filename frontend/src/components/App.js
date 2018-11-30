import React from 'react';
import AddSanta from './AddSanta';
import SantaList from './SantaList';

class App extends React.Component{
    state ={
        santas: {}
    }
    addSanta = santa => {
        console.log('adding santa');
        const santas = {...this.state.santas};
        santas[`santa${Date.now()}`] = santa;
        this.setState({ santas });
    }
    render(){
        return (
            <div className="main-container">
                <AddSanta {...this.state} addSanta={this.addSanta}/>
                <ul className="santas">
                {Object.keys(this.state.santas).map(key => (
                            <SantaList 
                                key={key} 
                                details={this.state.santas[key]} 
                            />
                        ))}
                </ul>
            </div>
        )
    }

}

export default App;