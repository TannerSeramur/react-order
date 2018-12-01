import React from 'react';


class AddSanta extends React.Component {
  nameRef = React.createRef();
  emailRef = React.createRef();

  createSanta = event => {
    event.preventDefault();
    console.log(this.nameRef);
    
    const santa = {
      name: this.nameRef.current.value,
      email: this.emailRef.current.value,
      person: ''
    }
    this.props.addSanta(santa);
    event.currentTarget.reset();
  }


  render() {
    return (
      <div className="addSanta">
        <form className="addForm" onSubmit={this.createSanta}>
            <h1>Secret Santa</h1>
            <input name="name" type="text" ref={this.nameRef} placeholder="Enter Name"/>
            <input name="number" type="text" require="true" ref={this.emailRef} placeholder="Enter Email"/>
            <button type="submit">+</button>
        </form>
      </div>
    );
  }
}

export default AddSanta;
