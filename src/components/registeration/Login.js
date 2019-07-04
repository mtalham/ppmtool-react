import React, { useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { renderField } from "../project/ProjectUtils";
import { loginUser } from "../../actions/RegisterationAction";
import { loginValidation as validate } from "./UserValidation";

const Login = ({
  loginUser,
  history,
  usernameError,
  passwordError,
  handleSubmit,
  user
}) => {
  const onSubmit = values => {
    loginUser(values);
  };

  useEffect(() => {
    if (user && user.validToken) {
      history.push("/dashboard");
    }
  });

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <Field
                  type="email"
                  className="form-control form-control-lg"
                  label="Email Address"
                  name="username"
                  component={renderField}
                />
                {usernameError && usernameError.length > 0 && (
                  <div className="alert-danger">{usernameError}</div>
                )}
              </div>
              <div className="form-group">
                <Field
                  type="password"
                  className="form-control form-control-lg"
                  label="Password"
                  name="password"
                  component={renderField}
                />
                {passwordError && passwordError.length > 0 && (
                  <div className="alert-danger">{passwordError}</div>
                )}
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.loggedInUser,
  usernameError: state.errors.username,
  passwordError: state.errors.password
});

const withReduxForm = reduxForm({
  form: "loginForm",
  validate
});

const withConnect = connect(
  mapStateToProps,
  { loginUser }
)(Login);

export default withReduxForm(withConnect);
