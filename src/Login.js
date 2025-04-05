import React, { useState, Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import { Link } from "react-router-dom";
import firebase, { firestore } from 'firebase';
import app from './index'

class Login extends Component
{
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { email: '' , password: ''};

    

  }

  handleChange(e) {
    this.setState({ [e.target.name] : e.target.value});
  }


  login(e) {
    e.preventDefault();
    app.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
      console.log("error");
    });

  }

  signup(e){
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) =>{
    }).catch((error) =>{
      console.log("error")
    });

  }

  render()
  {


    return (
      <div className="Login">
      <nav className = "navbar">
        <div className = "logo">
          <h4>Logo</h4>
        </div>
        <ul className = "nav-links">
            <li>
                <Link className = "Cont"  to="/home">Acasa</Link>
            </li>
            <li>
              <Link className = "Cont" to ="/despre">Despre</Link>
            </li>
        </ul>
      </nav>
      <form>
        <div class = "form-group">
          <label for = "exampleInputEmail1">Email</label>
          <input value = {this.state.email} onChange = {this.handleChange} type = "email" name = "email" class = "form-control" placeholder = "email"/>
        </div>
        <div className = "form-group">
          <label for = "exampleInputPasswordl">Password</label>
          <input value = {this.state.password} onChange = {this.handleChange} type = "password" name = "password" class = "form-control" placeholder = "password"/>
        </div>
        <button type = "submit" onClick = {this.login}>Login</button>
        <button onClick = {this.signup}>Signup</button>
      </form>

    </div>
  );
}
}

export default Login;