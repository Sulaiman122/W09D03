import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  // get url of website from .env file
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [err, setErr] = useState("");

  const signup = async (e) => {
    try {
      // prevent default to tell form to not refresh the page when submitted
      e.preventDefault();
      const result = await axios.post(`${BASE_URL}/register`, {
        // send the body to our backend register endpoint
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
        role: "61a4eae86ad0c2fe2b45d0aa",
      });
      console.log(result.data);
      // if register is successful navigate to login page 
      if (result.data.email) {
        navigate("/login");
      } else {
        // if error set it to the useState and print it in the page
        setErr(result.data._message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="formm">
      <h1>Sign Up</h1>
      {/* signup form when submitted excute signup function */}
      <form onSubmit={signup}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" />
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" />
        <button type="submit">Sign up</button>
      </form>
      <p>{err}</p>
      <button
        // button for back when clicked go to home page
        onClick={() => {
          navigate("/");
        }}
      >
        Back
      </button>
    </div>
  );
};

export default SignUp;
