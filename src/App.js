import React, { useEffect} from "react";
import Amplify, {Auth } from "aws-amplify";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import "./App.css";
import PersonList from "./Table";
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
      <PersonList />
    </div>
  );
};

export default App;