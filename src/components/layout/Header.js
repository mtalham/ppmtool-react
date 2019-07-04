import React from "react";
import { connect } from "react-redux";

import { logout } from "../../actions/RegisterationAction";
import AuthenticatedUser from "./AuthenticatedUser";
import UnauthenticatedUser from "./UnauthenticatedUser";

const Header = ({ loggedInUser, logout }) => {
  const { validToken, user } = loggedInUser;

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
      <div className="container">
        <h1 className="navbar-brand">Personal Project Management Tool</h1>
        {validToken && user ? (
          <AuthenticatedUser logout={logout} user={user} />
        ) : (
          <UnauthenticatedUser />
        )}
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  loggedInUser: state.loggedInUser
});

const withConnect = connect(
  mapStateToProps,
  { logout }
);

export default withConnect(Header);
