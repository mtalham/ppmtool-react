import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import Header from "./components/layout/Header";
import Landing from "./components/layout/Landing";
import SignUp from "./components/registeration/SignUp";
import Login from "./components/registeration/Login";

import store from "./Store";
import PrivateRoutes from "./PrivateRoutes";
import { logout, setJWT } from "./actions/RegisterationAction";
import { SET_CURRENT_USER } from "./actions/Types";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const token = localStorage.jwt;
if (token) {
  setJWT(token);
  const decodedToken = jwt_decode(token);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decodedToken
  });
  const currentTime = Date.now() / 1000;
  console.log(decodedToken.exp, currentTime);
  if (decodedToken.exp < currentTime) {
    //handle Logout
    store.dispatch(logout());
    window.location.href = "/";
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <PrivateRoutes />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
