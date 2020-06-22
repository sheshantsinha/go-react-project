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
import Table from "./Table";

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
    .then(user => console.log(user, 'ok'))
    .catch(err => console.log(err));
  };
  return (
    <div className="App">
      <SignUp />
      <SignIn />
      <Router>
      <Link to="/table">Table</Link>
      <Switch>
          <Route path="/table">
            <Table />
          </Route>
       </Switch>
       </Router>
    </div>
  );
};

export default App;