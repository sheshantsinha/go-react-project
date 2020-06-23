import React, { useEffect, Component } from "react";
import Amplify, {Auth } from "aws-amplify";
import logo from "./logo.svg";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => {
  useEffect(() => {
    Amplify.configure({
      Auth: {
        region: process.env.REACT_APP_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
      },
    });
    onLoad();
  });
  async function onLoad() {
    Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
    .then(user => alert('User already signed in'))
    .catch(err => console.log(err));
  };
  return (
    <div className="App">
      <SignUp />
      <SignIn />
    </div>
  );
};

export default App;