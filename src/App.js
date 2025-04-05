import React, { Component} from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import './App.css';
import firebase from 'firebase';
import Login from './Login';
import app from ".";
import Post from './Post';
import base64 from 'react-native-base64';
import Logo from './Logo.png';
import image1 from './Images/download.jpg';
import image2 from './Images/yes.jpg';
import image3 from './Images/image3.jpg';
import image4 from './Images/image4.jpg';
import image5 from './Images/gard-lemn-Exclusiv.jpg';
import image6 from './Images/Image6.jpg';
import placeHolder from './Images/700x500.png';
import LogoBottom from './Images/FAST_JOBS_logo.png';



class App extends Component
{
  constructor(props){
    super(props)
    this.state = { posts: [], show: false, user: {}, image : 'null', specialPosts: [], show2: false}
    this.logout = this.logout.bind(this);
    
  }
  
  componentDidMount(){
    
    
    const db = firebase.firestore();
    db.collection('special-posts').get().then( snapshot => {
      const specialPosts = []
      snapshot.forEach( doc => {
        const specialData = doc.data()
        specialPosts.push(specialData)
      })
      this.setState({specialPosts : specialPosts})
    })
    .catch(() => console.log("err"))

    db.collection('posts').get().then ( snapshot => {
      const posts = []
      snapshot.forEach( doc => {
        const data = doc.data()
        posts.push(data)
        
      })
      this.setState({posts : posts})
    })
    .catch(() => console.log("err"))
    
  }
  showModal = () => {    
     
    this.setState({ show: true });
    
  };
  

  hideModal = () => {
    this.setState ({ show : false})

  };
  
  showModal1 = () => {

    this.setState({show2 : true})

  };

  hideModal1 = () => {

    this.setState({show2 : false});

  }

  logout() {
    firebase.auth().signOut();
    
  }
  
  
  render(){
    
    
    return(
      <div className = "Main">  
      <body>  
          <nav>
            <div className = "logo">
              <img src = {Logo}></img> 
            </div>
            <ul className = "navlink">
                <ul>
                    <Link className = "Cont"  to="/home">Acasa</Link>
                </ul>
                <ul>
                    <Link className = "Cont" to ="/signin">Logare</Link>
                </ul>
                <ul>
                  <Link className = "Cont" to ="/MyProfile">Profilul meu</Link>
                </ul>
                <ul>
                  <Link className = "Cont" onClick = {this.logout}>Logout</Link>
                </ul>
            </ul>
          </nav>
         
      </body>
        <Link class="button" to = "/post">Adauga Anunturi</Link> 
        <h2 className = "text1">Anunturi Promovate</h2>
         <section className = "section1">
         {
          this.state.posts &&
           this.state.posts.map((posts) => {
             return (
              <ul className = "Post-poz"> 
               <ul>
                 <img src = {posts.imageUrl} height = "150px" width = "200px"></img>
               </ul>
               <ul>
               <button onClick = {this.showModal} className = "post">{posts.name}</button>
                    <Modal className = "Modal"  isOpen = {this.state.show} onRequestClose={this.hideModal}>
                      <img src = {posts.imageUrl} width = "700px" height = "500px"></img>
                      <span className = "PostInfo">
                              <h2>{posts.name}</h2>
                              <p>Locatie:  {posts.location}</p>
                              <p>Descriere:  {posts.description}</p>
                      </span>        
                    </Modal>
               </ul>
            </ul>
                      )
                    })
                  }       
       
        </section>
        <h2 className = "text2">Anunturi populare</h2>
         <section className = "section2">
          <ul>
            {
              this.state.specialPosts && 
              this.state.specialPosts.map((specialPosts) => {
              return(
                  <span className = "position">
              <ul>
                <img src = {specialPosts.imageUrl} alt = "special post" height = "150px" width = "200px"></img>
              </ul>   
              <ul>
                <button onClick = {this.showModal1} className = "post">{specialPosts.name}</button>
                <Modal className = "Modal"  isOpen = {this.state.show2} onRequestClose={this.hideModal1}>
                      <img src = {placeHolder} alt = "Vizualizezi o postare speciala" height = "500px" width = "700px"></img>
                      <span className = "PostInfo">
                              <h2>{specialPosts.name}</h2>
                              <p>{specialPosts.name}</p>
                              <p>{specialPosts.description}</p>
                      </span>        
                </Modal>
              </ul>
            </span>
                )
              })
            }

            <span className = "position">
            <ul>
                <img src = {image1} height = "150px" width = "200px"></img>
            </ul>   
            <ul>
                <button className = "post">Tund Iarba</button>
            </ul>
            </span>
            <span  className = "position">
             <ul>
                <img src = {image2} height = "150px" width = "200px"></img>
            </ul>   
            <ul>
                <button className = "post">Babysitter</button>
            </ul>
            </span>
            <span className = "position">
            <ul>
                <img src = {image3} height = "150px" width = "200px"></img>
            </ul>   
            <ul>
                <button className = "post">Ajut in gradina</button>
            </ul>
            </span>
            <span className = "position">
            <ul>
                <img src = {image6} height = "150px" width = "200px"></img>
            </ul>   
            <ul>
                <button className = "post">Spal Masina</button>
            </ul>
            </span>
            <span className = "position">
            <ul>
                <img src = {image5} height = "150px" width = "200px"></img>
            </ul>   
            <ul>
                <button className = "post">Vopsesc gard</button>
            </ul>
            </span>
            <span className = "position">
            <ul>
                <img src = {image4} height = "150px" width = "200px"></img>
            </ul>   
            <ul>
                <button className = "post">Tund Iarba</button>
            </ul>
            </span>
            
          </ul>
          

         </section>
         <section className = "section3">
           <span>
              <img src = {LogoBottom} height = "150px" className = "LogoBottom"></img> 
           </span>
            
           
        </section>
      </div>
      
      );
          
    }  
  }
  export default App;
    
    