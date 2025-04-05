import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import AppFront from './AppFront';
import Login from './Login.js';
import * as firebase from 'firebase';
import Post from "./Post";
import SignUp from "./SignUp";
import SignIn from './SignIn';
import ForgotPassword from './ForgotPassword';
import MyProfile from './MyProfile';


var firebaseConfig = {
  apiKey: "AIzaSyBb1RhTJkwP6nt4J_pnArcVaSyyFMIdHpA",
  authDomain: "fastjobs-c944b.firebaseapp.com",
  databaseURL: "https://fastjobs-c944b.firebaseio.com",
  projectId: "fastjobs-c944b",
  storageBucket: "fastjobs-c944b.appspot.com",
  messagingSenderId: "959336269911",
  appId: "1:959336269911:web:685c95f7d358b550543b12",
  measurementId: "G-F7V55V2LLY"
};
const fire = firebase.initializeApp(firebaseConfig);
export default fire;



export const auth = firebase.auth();
export const firestore = firebase.fire
const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  firebase.auth().signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

firebase.analytics();





const routing = (
  <Router>
    <div>
      <Route path= "/post" component= {Post}/>
      <Route path = "/signin" component = {SignIn}/>
      <Route path=  "/signup" component={SignUp}/>
      <Route path = "/home" component = {AppFront}/>
      <Route path = "/forgotpassword" component = {ForgotPassword}/>
      <Route path = "/myprofile" component = {MyProfile}/>
      
      
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))

serviceWorker.unregister();

