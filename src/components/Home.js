import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// use UseSelector to retrieve data from reducer
//and useDispatch to send data to reducer
import  {LogOut} from '../reducers/actions'
//import logout action to dispatch it when we need to

const Home = () => {
  // initialize dispatch package
  const dispatch = useDispatch()

  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const todos = () => {
    //function to check if user has logged in or is not loggedIn
    if (localStorage.getItem("token")) {
      navigate("/todo");
    } else {
      alert("you have to login first");
    }
  };
  const adminPage = () => {
    // same for admin page as well
    if (localStorage.getItem("token")) {
      navigate("/admin");
    } else {
      alert("you have to login first");
    }
  };
  useEffect(() => {
    // after loading page, check what user role do we have so we render the correct buttons
    if (localStorage.getItem("role") == "admin") {
      setRole("admin");
    }
    if (localStorage.getItem("token")) {
      //and check if he has logged in
      setLoggedIn(true);
    }
  }, []);
  return (
    <div className='home'>
      <h1>Home</h1>
      {/* if user has not logged in, show him login/signup buttons */}
      {!loggedIn ? (
        <>
          <button>
            <Link to="login" style={{ color: "black", textDecoration: "none" }}>
              Login
            </Link>
          </button>
          <button>
            <Link
              to="signUp"
              style={{ color: "black", textDecoration: "none" }}
            >
              Sign up
            </Link>
          </button>
          <button onClick={todos}>Todos</button>
        </>
      ) : (
        // or show him admin/logout buttons
        <>
          {role == "admin" ? (
            <>
              <button onClick={adminPage}>Admin Page</button>
            </>
          ) : (
            <>
              <button onClick={todos}>Todos</button>
            </>
          )}

          <button
          //if he click logout button, dispatch logout action and perform logout logic in reducer
            onClick={() => {
              dispatch(LogOut())
              setLoggedIn(false);
            }}
          >
            Log out
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
