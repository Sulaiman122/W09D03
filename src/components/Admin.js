import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// use UseSelector to retrieve data from reducer
//and useDispatch to send data to reducer
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  //we retrieve SignIn state
  const SignIn = useSelector((state) => state.SignIn);
  // get Base Url of axios link from .env file
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  //get token from signIn reducer
  const token = SignIn.token;
  // states to save data from backend
  const [Alldata, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);

  const getPosts = async () => {
    try {
      //get all admin todos (only damin)
      const myData = await axios.get(`${BASE_URL}/posts`, {
        // headers to send token to authenticate the user so we access the controller
        headers: { Authorization: `bearer ${token}` },
      });
      // get all data of all users
      const Alldata = await axios.get(`${BASE_URL}/posts/admin`, {
        headers: { Authorization: `bearer ${token}` },
      });
      //get all users that have registered to the website
      const Users = await axios.get(`${BASE_URL}/users`, {
        headers: { Authorization: `bearer ${token}` },
      });
      //set these result on useState,, it could be done from the reducer as well
      setData(myData.data);
      setAllData(Alldata.data);
      setUsers(Users.data);
    } catch (error) {
      // in case of error print me the error
      console.log(error);
    }
  };

  const del = async (id) => {
    try {
      const result = await axios.delete(`${BASE_URL}/post/${id}`, {
        headers: { Authorization: `bearer ${token}` },
      });
      // after performing delete we need to call getPost() to rerender our data
      getPosts();
    } catch (error) {
      // in case of error print me the error
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const result = await axios.delete(`${BASE_URL}/users/${id}`, {
        headers: { Authorization: `bearer ${token}` },
      });
      // after performing delete we need to call getPost() to rerender our data
      getPosts();
    } catch (error) {
      // in case of error print me the error
      console.log(error);
    }
  };

  const newTodo = async (e) => {
    try {
      // prevend default to tell the from to not refresh the page
      e.preventDefault();
      const result = await axios.post(
        `${BASE_URL}/post`,
        {
          desc: e.target.todo.value,
        },
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
      // to make the input empty after submitting, we set its value to empty string
      e.target.todo.value = "";
      // after performing addition we need to call getPost() to rerender our data
      getPosts();
    } catch (error) {
      // in case of error print me the error
      console.log(error);
    }
  };

  useEffect(() => {
    // first load of the page, make sure to render my data in getPosts()
    getPosts();
  }, []);

  return (
    <div className="admin">
      <div className="left">
        <h1>All People Todos:</h1>
        {/* loop through all todos for all users */}
        {Alldata.map((item) => {
          return (
            <div key={item._id}>
              <hr />
              <h2 style={{ display: "inline" }}>{item.desc}</h2>
              <p style={{ display: "inline" }}>By: {item.user.email}</p>
              <button onClick={() => del(item._id)}>x</button>
              <br />
            </div>
          );
        })}
      </div>

      <div className="center">
        <h1>My Todos:</h1>
        <form onSubmit={newTodo}>
          <p>New todo:</p>
          <input type="text" name="todo" />
          <button type="submit">Add</button>
        </form>
        {/* loop through all todos for current user(the admin) */}
        {data.map((item) => {
          return (
            <div key={item._id}>
              <hr />
              <h2 style={{ display: "inline" }}>{item.desc}</h2>
              <button onClick={() => del(item._id)}>x</button>
              <br />
            </div>
          );
        })}
      </div>

      <div className="right">
        <h1>Users:</h1>
        {/* loop through all users */}
        {users.map((item) => {
          return (
            <div key={item._id}>
              <p style={{ display: "inline" }}>Username:</p>
              <h3 style={{ display: "inline" }}>{item.username}</h3>
              <br />
              <p style={{ display: "inline" }}>Email:</p>
              <h3 style={{ display: "inline" }}>{item.email}</h3>
              <br />
              <p style={{ display: "inline" }}>Password:</p>
              <h6 style={{ display: "inline" }}>{item.password}</h6>
              <br />
              <p style={{ display: "inline" }}>Role:</p>
              <h6 style={{ display: "inline" }}>{item.role}</h6>
              <br />
              <p style={{ display: "inline" }}>Deleted:</p>
              <h3 style={{ display: "inline" }}>
                {item.isDeleted ? (
                  <p style={{ display: "inline" }}>Yes</p>
                ) : (
                  <p style={{ display: "inline" }}>No</p>
                )}
              </h3>
              <button onClick={() => deleteUser(item._id)}>Delete User</button>
              <br />
              <br />
            </div>
          );
        })}
      </div>

      <button
      // button to navigate back
        onClick={() => {
          navigate("/");
        }}
      >
        Back
      </button>
    </div>
  );
};

export default Admin;
