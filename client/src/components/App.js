import React from 'react';
import AddSanta from './AddSanta';
import SantaList from './SantaList';
import MatchUp from './MatchUp';
import Pairs from './Pairs';
import axios from 'axios';
import '../styles/index.css';

class App extends React.Component{
    state ={
        santas: {},
        nameList: [],
        showPairs: false,
        showBtns: false
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
            newState.nameList.push(this.state.santas[i].name);
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
        this.setState({showBtns: true});
        return this.setState();    
    }

      toggleShowPairs = () =>{
          this.setState({showPairs: !this.state.showPairs});
      }

      sendEmail = () => {
         alert('sending emails');
        axios.post('/sendEmail', {...this.state.santas})
         .then(res => {
             console.log(res);
             
         })
         .catch(error => {
             console.log(error);
             window.location.reload();
         })         
      }

    render(){
        return (
            <div className="main-container">
                <h1>Secret Santa Helper</h1>
                <div className="santa-container">
                    <AddSanta {...this.state} addSanta={this.addSanta}/>
                    
                    <div className='btns'>
                        {Object.keys(this.state.santas).length > 1 ?
                         ( <MatchUp {...this.state.santas} setPerson={this.setPerson}/>)
                         : null}

                        {this.state.showBtns === true ? 
                        (this.state.showPairs === false ? (<button onClick={this.toggleShowPairs}>Show Pair's</button>) : (<button onClick={this.toggleShowPairs}>Hide Pair's</button>))
                        : null }

                        {this.state.showBtns === true ? 
                        (<button onClick={this.sendEmail}>Send Email's</button>)
                        : null }
                    </div>
                    <ul className="santas">

                     {Object.keys(this.state.santas).length > 0 ? 
                    (<div className="table-head">
                        <h3>Santas:</h3>
                        {/* <h3>Email:</h3> */}
                    </div>)
                    : null }
                    {Object.keys(this.state.santas).map(key => (
                                <SantaList key={key} details={this.state.santas[key]} />
                            ))}
                    </ul>

                    {this.state.showPairs === true ? 
                    (<ul className="pairs">
                    <h3>----- Pair's Here -----</h3>
                    {Object.keys(this.state.santas).map(key => (
                                <Pairs key={key} details={this.state.santas[key]}/>
                            ))}
                    </ul> )
                    : null }
                </div>
            </div>
        )
    }
}

export default App;