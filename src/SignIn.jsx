import React, {useState} from "react";
import { Link } from "react-router-dom";
import {auth, signInWithGoogle} from "./index"; 
import "./SignIn.css";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const signInWithEmailAndPasswordHandler = (event,email, password) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).catch(error => {
        setError("Eroare în a te înregistra cu email și parolă");
          console.error("Eroare în a te înregistra cu email și parolă", error);
        });
      };
      
      const onChangeHandler = (event) => {
          const {name, value} = event.currentTarget;
        
          if(name === 'userEmail') {
              setEmail(value);
          }
          else if(name === 'userPassword'){
            setPassword(value);
          }
      };
   

  return (
    <div className="mt-8">
        <nav>
        <div className = "logo">
          <h4>FastJobs</h4>
        </div>
        <ul className = "navlink">
            <ul>
                <Link className = "Cont"  to="/home">Acasa</Link>
            </ul>
            <ul>
                <Link className = "Cont" to ="/signin">Logare</Link>
            </ul>
            <ul>
              <Link className = "Cont" to ="/despre">Despre</Link>
            </ul>
            <ul>
              <Link className = "Cont" to ="/myprofile">Profilul meu</Link>
            </ul>
        </ul>
      </nav>
      <h1 className="p1">Sign In</h1>
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        {error !== null && <div className = "py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
        <form className="">
          <label  className="block">
            Email:
          </label>
          <input
            type="email"
            className="my-1 p-1 w-full"
            name="userEmail"
            value = {email}
            placeholder="Ex: xxxx123@gmail.com"
            id="userEmail"
            onChange = {(event) => onChangeHandler(event)}
          />
          <label  className="block">
            Parola:
          </label>
          <input
            type="password"
            className="mt-1 mb-3 p-1 w-full"
            name="userPassword"
            value = {password}
            placeholder="parola ta"
            id="userPassword"
            onChange = {(event) => onChangeHandler(event)}
          />
          <button className="SignInBtn" onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
            Sign in
          </button>
        </form>
        <p className="p1">or</p>
        <button
          className="googleBtn"
          onClick={() => {
            signInWithGoogle();
          }}
        >
          Sign in cu Google
        </button>
        <p className="p1">
          Nu ai un cont?{" "}
          <Link to="signUp" className="text-blue-500 hover:text-blue-600">
            Sign up aici
          </Link>{" "}
          <br />{" "}
          <Link to="/forgotpassword" className="forgotBtn">
            Ai uitat parola?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;