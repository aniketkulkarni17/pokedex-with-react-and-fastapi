import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  var redirectToSignUp = () => {
    navigate("/signup");
  };

  const getEmailAddress = (event) => {
    setEmail(event.target.value);
  };

  const getPassword = (event) => {
    setPassword(event.target.value);
  };

  const validateEmail = () => {
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email.match(pattern)) return true;
    return false;
  };

  const submitUserLoginData = () => {
    if (!validateEmail()) {
      var emailField = document.getElementById("emailid");
      emailField.style.border = "1 px solid red";
    } else if (password == "") {
      var passwordField = document.getElementById("pwd");
      passwordField.style.border = "1 px solid red";
    } else {
      let userInfo = {
        email: email,
        password: password,
      };
      const request = new XMLHttpRequest();
      request.open("POST", `/processLoginInfo/${JSON.stringify(userInfo)}`);
      request.onload = () => {
        const response = request.responseText;
        console.log("Recieved: ", response);
        if (response == "false") {
          window.alert("Invalid username or password");
        } else {
          navigate("/pokedex");
        }
      };
      request.send();
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={(event) => event.preventDefault()}>
        <div className="mb-3">
          <h2>Welcome to Pokedex</h2>
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="emailid"
            aria-describedby="emailHelp"
            onChange={getEmailAddress}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="pwd"
            onChange={getPassword}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={submitUserLoginData}
        >
          Submit
        </button>
      </form>
      <div id="emailHelp" className="form-text">
        Don't have an account?{" "}
        <button className="sign-up-btn" onClick={redirectToSignUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Login;
