import React from 'react';
import AddSanta from './AddSanta';
import SantaList from './SantaList';
import MatchUp from './MatchUp';

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

    setPerson = () => {
        
        Object.keys(this.state.santas).map(i => {   
            const newState = {...this.state};
            newState.santas.person='tanner';
            return this.setState(newState);
        

        });
            console.log('setPerson');
        
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
                <MatchUp {...this.state.santas} setPerson={this.setPerson}/>
            </div>
        )
    }

}

export default App;