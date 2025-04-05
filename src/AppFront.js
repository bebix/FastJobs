import React, { Component} from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import './App.css';
import firebase from 'firebase';
import Login from './Login';
import app from ".";
import Post from './Post';
import App from './App';
import SignIn from "./SignIn";



class AppFront extends Component
{
  constructor(props){
    super(props)
    this.state = { user: {}}

  }
  
  componentDidMount(){  
    this.authListener();
  }

    authListener(){
      firebase.auth().onAuthStateChanged((user) => {
        console.log(user);
        if(user) {
          this.setState({ user });
          //localStorage.setItem('user', user.uid);
        } else {
          this.setState({ user : null})
          //localStorage.removeItem('user');

        }

      })
     }

      
    render()
    {
      return(
        
      <div className = "Main">  

        {this.state.user ? (<App />) : (<SignIn />)} 
      
      </div>
      );
      
    }
      

  }
  export default AppFront;
