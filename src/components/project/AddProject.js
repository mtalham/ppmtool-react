import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import PropTypes from "prop-types";
import { createProject } from "../../actions/ProjectActions";
import { validate, renderField } from "./ProjectUtils";

const AddProject = ({ createProject, history, handleSubmit, errors }) => {
  const onSubmit = values => {
    createProject(values, history);
  };

  return (
    <div>
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Create Project form</h5>
              <hr />
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <Field
                    name="projectName"
                    component={renderField}
                    type="text"
                    label="Project name"
                  />
                </div>
                <div className="form-group">
                  <Field
                    name="projectIdentifier"
                    component={renderField}
                    type="text"
                    label="Unique Project Id"
                  />
                  {errors.length > 0 && (
                    <div className="alert-danger">{errors}</div>
                  )}
                </div>

                <div className="form-group">
                  <Field
                    name="description"
                    component={renderField}
                    type="text"
                    label="Project description"
                  />
                </div>

                <h6>Start Date</h6>
                <div className="form-group">
                  <Field
                    name="startDate"
                    component="input"
                    type="date"
                    className="form-control form-control-lg"
                  />
                </div>

                <h6>Estimated End Date</h6>
                <div className="form-group">
                  <Field
                    name="endDate"
                    component="input"
                    type="date"
                    className="form-control form-control-lg"
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const withReduxForms = reduxForm({ form: "createProject", validate });

AddProject.prototypes = {
  createProject: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

const withConnect = connect(
  mapStateToProps,
  { createProject }
)(AddProject);

export default withReduxForms(withConnect);
