import React from 'react';
import AddSanta from './AddSanta';
import SantaList from './SantaList';
import MatchUp from './MatchUp';
import Pairs from './Pairs';
import axios from 'axios';

class App extends React.Component{
    state ={
        santas: {},
        nameList: [],
        showPairs: false
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
            console.log('new state here',newState);
            newState.nameList.push(this.state.santas[i].name);
            console.log('one state set');
            return this.setState(newState);
        });
        

        Object.keys(this.state.santas).map((i,index) => {   
            let newState = {...this.state};
            console.log(newState.nameList);

            let num = index === 0 ? this.state.nameList.length-1 : Math.floor(Math.random() * this.state.nameList.length);

            console.log('NUM HERE!!!!!!', num);
            console.log(this.state.nameList.length);

            while(this.state.nameList[num] === this.state.santas[i].name){
                console.log('num here', num);
                console.log('names are the same',this.state.nameList[num],this.state.santas[i].name);
                num = Math.floor(Math.random() * this.state.nameList.length);
                console.log('new ones',this.state.nameList[num],this.state.santas[i].name);
                
            }

            newState.santas[i].person = this.state.nameList[num];
            newState.nameList.splice(num,1);

            return this.setState(newState);
        });
        
        return this.setState();
         
        
      }

      toggleShowPairs = () =>{
          this.setState({showPairs: !this.state.showPairs});
      }

      sendEmail = () => {
         alert('sending emails');
        //  axios.post('/api/send-email', {...this.state.santas})
        axios.post('/sendEmail', {...this.state.santas})
         .then(res => {
             console.log(res);
         })
         .catch(error => {
             console.log(error);
         })
         
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

                <button onClick={this.toggleShowPairs}>Show Pair's</button>
                <button onClick={this.sendEmail}>Send</button>

                {this.state.showPairs === true ? 
                (<ul className="pairs">
                {Object.keys(this.state.santas).map(key => (
                            <Pairs key={key} details={this.state.santas[key]}/>
                        ))}
                </ul> )
                : null }

            </div>
        )
    }

}

export default App;