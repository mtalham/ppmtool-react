import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import PropTypes from "prop-types";
import { editProject, getProject } from "../../actions/ProjectActions";
import { validate, dateFormat, renderField } from "./ProjectUtils";

const UpdateProject = ({
  getProject,
  history,
  match,
  handleSubmit,
  editProject
}) => {
  const { id } = match.params;
  React.useEffect(() => {
    getProject(id, history);
  }, [getProject, id, history]);

  const handleOnSubmit = values => {
    editProject(values, history);
  };

  return (
    <div className="project">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h5 className="display-4 text-center">Update Project form</h5>
            <hr />
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <div className="form-group">
                <Field
                  type="text"
                  name="projectName"
                  component={renderField}
                  label="Project Name"
                />
              </div>
              <div className="form-group">
                <Field
                  type="text"
                  name="projectIdentifier"
                  label="Unique Project ID"
                  component={renderField}
                  disabled
                />
              </div>
              <div className="form-group">
                <Field
                  name="description"
                  type="text"
                  label="Project Description"
                  component={renderField}
                />
              </div>
              <h6>Start Date</h6>
              <div className="form-group">
                <Field
                  type="date"
                  name="startDate"
                  component="input"
                  className="form-control form-control-lg"
                />
              </div>
              <h6>Estimated End Date</h6>
              <div className="form-group">
                <Field
                  type="date"
                  name="endDate"
                  component="input"
                  className="form-control form-control-lg"
                />
              </div>
              <input type="submit" className="btn btn-primary btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

UpdateProject.propTypes = {
  getProject: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  initialValues: {
    projectName: state.project.project.projectName,
    projectIdentifier: state.project.project.projectIdentifier,
    description: state.project.project.description,
    startDate: dateFormat(state.project.project.startDate),
    endDate: dateFormat(state.project.project.endDate)
  },
  project: state.project.project
});

const withReduxForm = reduxForm({
  form: "updateProject",
  enableReinitialize: true,
  validate
})(UpdateProject);

const withConnect = connect(
  mapStateToProps,
  { getProject, editProject }
);

export default withConnect(withReduxForm);

// export default connect(
//   mapStateToProps,
//   { getProject }
// )(
//   reduxForm({
//     form: "updateProject",
//     enableReinitialize: true
//   })(UpdateProject)
// );
