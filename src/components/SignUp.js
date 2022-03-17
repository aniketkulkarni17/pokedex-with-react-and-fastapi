import React, { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [firstPassword, setFirstPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [emailID, setEmail] = useState("");
  let navigate = useNavigate();

  const getFirstPassword = (event) => {
    setFirstPassword(event.target.value);
  };

  const validateEmail = () => {
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (emailID.match(pattern)) return true;
    return false;
  };

  const getConfirmedPassword = (event) => {
    setConfirmedPassword(event.target.value);
  };

  const checkPasswordMatching = (event) => {
    if (firstPassword === confirmedPassword && validateEmail()) {
      sendUserInfo();
    } else {
      if (!validateEmail()) {
        var emailBox = document.getElementById("emailid");
        emailBox.style.border = "1 px solid red";
      }
      var confirmPasswordBox = document.getElementById("confirmPassword");
      confirmPasswordBox.style.border = "1px solid red";
    }
  };

  const getEmail = (event) => {
    setEmail(event.target.value);
  };

  const sendUserInfo = () => {
    let userInfo = {
      email: emailID,
      password: confirmedPassword,
    };
    const request = new XMLHttpRequest();
    request.open("POST", `/processUserInfo/${JSON.stringify(userInfo)}`);
    request.onload = () => {
      const response = request.responseText;
      console.log("Recieved: ", response);
      if (response == "false") {
        window.alert("User already exists");
        return;
      } else if (response == "true") {
        navigate("/");
      }
    };
    request.send();
  };

  return (
    <div>
      <div className="login-page">
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3">
            <h2>Welcome to Pokedex</h2>
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="emailid"
              onChange={getEmail}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="enterPassword"
              value={firstPassword}
              onChange={getFirstPassword}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmedPassword}
              onChange={getConfirmedPassword}
            />
          </div>
          <button
            type="submit"
            onClick={checkPasswordMatching}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
