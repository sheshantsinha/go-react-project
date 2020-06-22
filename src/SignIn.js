import React, { useState } from "react";
import { Auth } from "aws-amplify";
//import FormElement from "./FormElement";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = (e) => {
    e.preventDefault();
    Auth.signIn({
      username: email,
      password,
    })
      .then((session) => {
        setEmail("");
        setPassword("");
        console.log(session);
        alert('success')
        const tokens = {
            accessToken: session.signInUserSession.accessToken.jwtToken,
            idToken: session.signInUserSession.idToken.jwtToken,
            refreshToken: session.signInUserSession.refreshToken.token
          };
          localStorage.setItem('tokens', JSON.stringify(tokens))
          //console.log(tokens)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="form second-form">
      <form>
          <input
            id="sign-in-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <input
            id="sign-in-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>
      </form>
    </div>
  );
};
export default SignIn;