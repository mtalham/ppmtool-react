import {
  DELETE_PROJECT_TASK,
  GET_BACKLOG,
  GET_PROJECT_TASK
} from "../actions/Types";

const initialState = {
  projectTasks: [],
  projectTask: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BACKLOG:
      return {
        ...state,
        projectTasks: action.payload
      };

    case GET_PROJECT_TASK:
      return {
        ...state,
        projectTask: action.payload
      };
    case DELETE_PROJECT_TASK:
      return {
        ...state,
        projectTasks: state.projectTasks.filter(
          pt => pt.projectSequence !== action.payload
        )
      };
    default:
      return state;
  }
}
