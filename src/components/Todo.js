import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// use UseSelector to retrieve data from reducer
//and useDispatch to send data to reducer
import { TODO } from "../reducers/actions";
//import TODO action to dispatch it when we need to

const Post = () => {
  const SignIn = useSelector((state) => state.SignIn);
  //we retrieve SignIn state
  const mytodo = useSelector((state) => state.TODO);
  //we retrieve mytodo state
  const dispatch = useDispatch();
  // initialize dispatch package

  const navigate = useNavigate();
  // get url of website from .env file
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  //get token from signIn reducer
  const token = SignIn.token;

  const getPosts = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/posts`, {
        // headers to send token to authenticate the user so we access the controller
        headers: { Authorization: `bearer ${token}` },
      });
      //after getting data from backend, dispatch TODO action and perform save the result on payload in reducer
      dispatch(TODO(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  const del = async (id) => {
    try {
      const result = await axios.delete(`${BASE_URL}/post/${id}`, {
        // headers to send token to authenticate the user so we access the controller
        headers: { Authorization: `bearer ${token}` },
      });
      // make sure to render my data in getPosts()
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const newTodo = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.post(
        `${BASE_URL}/post`,
        // send the description in body to our databse theough backend endpoint
        {
          desc: e.target.todo.value,
        },
        // headers to send token to authenticate the user so we access the controller
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
      // to make the input empty after submitting, we set its value to empty string
      e.target.todo.value = "";
      // make sure to render my data in getPosts()
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // first load of the page, make sure to render my data in getPosts()
    getPosts();
  }, []);

  return (
    <div className="todo">
      <h1>Todos:</h1>
      {/* createTodo form when submitted excute newTodo function */}
      <form onSubmit={newTodo} className="new">
        <p>New todo:</p>
        <input type="text" name="todo" />
        <button type="submit">Add</button>
      </form>
      {/* loop through all todos for  user and print them in details */}
      {mytodo.length &&
        mytodo.map((item) => {
          return (
            <div key={item._id}>
              <h2 style={{ display: "inline" }}>{item.desc}</h2>
              <button onClick={() => del(item._id)}>x</button>
              <br />
            </div>
          );
        })}

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

export default Post;
