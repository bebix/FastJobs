import React, { useContext } from "react";
import { Router } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import UserProvider from "./UserProvider";
import MyProfile from "./MyProfile";
import { UserContext } from "./UserProvider";
import ForgotPassword from "./ForgotPassword";
function Application() {
    const user = useContext(UserContext);
    return (
          user ?
          <MyProfile />
        :
          <Router>
            <SignUp path="signUp" />
            <SignIn path="/" />
            <ForgotPassword path = "forgotpassword" />
          </Router>
        
    );
  }

export default Application;