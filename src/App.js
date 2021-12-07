import "./App.css";
//import App.css for our style
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Todo from "./components/Todo";
import Admin from "./components/Admin";
//import all components and Routes package to control them

function App() {
  return (
    <div className="App">
      {/* Use Routes to define every path with its component */}
      {/* so when ever user click button to navigate to this path */}
      {/* react will render its component and leave previus component */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/todo" element={<Todo />} />
        <Route exact path="/admin" element={<Admin />} />
        {/* to handle wrong paths we define '*' for all other paths */}
        <Route path="*" element={<h1>wrong path boy</h1>} />
      </Routes>
    </div>
  );
}

export default App;
