import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// BroswerRouter is essential to use Routes package so App must be wrapped with it
import { BrowserRouter } from "react-router-dom";
// store for reducer is like the Mall that full of states
import store from "./reducers";
// Provider is the component redux use to privde our App the reducers
import { Provider } from "react-redux";

ReactDOM.render(
  // Provder has a prop of the Reducers we imported
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
