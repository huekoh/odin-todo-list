import "./styles/global.css";
import * as model from "./model.js";
import * as view from "./view.js";

const init = () => {
  //set up event handlers
  view.addHandlerAddTask(controlAddTask);
};

const controlAddTask = (taskData) => {
  model.addTask(taskData);
  view.renderTasks(model.state.tasks);
};

init();
