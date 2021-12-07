import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// use UseSelector to retrieve data from reducer
//and useDispatch to send data to reducer
import  {logIn} from '../reducers/actions'
//import logout action to dispatch it when we need to

const Login = () => {
  const SignIn = useSelector(state => state.SignIn)
    // initialize dispatch package
  const dispatch = useDispatch()
  console.log(SignIn.role);

  const navigate = useNavigate();
  // get url of website from .env file
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [err, setErr] = useState("");
  const login = async (e) => {
    try {
      // prevent default to tell form to not refresh the page when submitted
      e.preventDefault();
      const result = await axios.post(`${BASE_URL}/login`, {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      });
      // if log in is successful do the following
      if (result.data.token) {
        // send data to reducer through login action (payload has the token and the role)
        dispatch(logIn({token:result.data.token, role:result.data.result.role.role}));
        console.log('yoooo');
        // after login success, send the user to the correct path, depend on his role
        if (SignIn.role == "admin") {
          navigate("/");
        } else {
          navigate("/todo");
        }
      } else {
        setErr(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="formm">
      <h1>Login</h1>
      {/* login form when submitted excute login function */}
      <form onSubmit={login}>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" />
        <p>OR</p>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" />
        <button type="submit">Login</button>
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

export default Login;
