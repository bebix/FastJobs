import React, { useState, useMemo, Component } from "react";
import { Link } from "react-router-dom";
import { Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import './Post.css';
import * as firebase from 'firebase';
import storage from './index';
import Logo from './Logo.png';



class Post extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
        name : "",
        description: "",
        location: "",
        image: null,
        url : ""

    };
    this.handleChange_name = this.handleChange_name.bind(this);
    this.handleChange_description = this.handleChange_description.bind(this);
    this.handleChange_location = this.handleChange_location.bind(this);
    this.handleChange_image = this.handleChange_image.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleUpload_post = this.handleUpload_post.bind(this);

  }


  handleChange_name(event){
    this.setState({name : event.target.value});
  }
  handleChange_description(event){
    this.setState({description: event.target.value});
    
  }
  handleChange_location(event){
    
    this.setState({location: event.target.value});
  }
  
  handleChange_image = e =>{
    if(e.target.files[0]){
      const image = e.target.files[0];
      this.setState(() => ({ image }));
      console.log(image.name);
      
    }
    
  }
  handleUpload = () =>{
    const image = this.state.image;
    const Task = firebase.storage().ref(`images/${image.name}`).put(image);
    Task.on('state_changed', (snapshot) => {
    },
    (error) => {
      console.log("error");
    }, () => {
      firebase.storage().ref('images').child(image.name).getDownloadURL().then(url => {
        this.setState(() => ({url}));
        firebase.firestore().collection('posts').add({
          name: this.state.name,
          description: this.state.description,
          location: this.state.location,
          imageUrl: this.state.url
      
        })
      })
    });
    
    console.log('Uploaded')
    
    
  }
  
  handleUpload_post(event){
    
    event.preventDefault();
    console.log('A name was submitted: ' + this.state.name);
    console.log('A location was submitted: ' + this.state.location);
    console.log('A description was submitted: ' + this.state.description);
  

    
  }

  
  render() {
    
    
    return(    
      <div>
    <div>
      <nav className = "navbar">
      <div className = "FastJobs">
        <img src = {Logo}/>
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
    </div>
    <section className = "sectionName" onSubmit = {this.handleUpload_post}>
    <form>
    <ul>
      <textarea  placeholder = "Nume" value = {this.state.name} onChange = {this.handleChange_name}/>
    </ul>
    <ul>
      <textarea placeholder = "Descriere"  value = {this.state.description} onChange = {this.handleChange_description}/>
    </ul>
    <ul>
      <textarea placeholder = "Locatie"  value = {this.state.location} onChange = {this.handleChange_location}/>
    </ul>
    <ul> 
    <div className = "Upload">
      <input type = "file" onChange = {this.handleChange_image}/>
    </div>
    </ul>

      <button onClick = {this.handleUpload} className = "addpost">ADAUGA ANUNT</button>
    </form>
    </section>   
    </div>
    )
    
  }
}
export default Post;


