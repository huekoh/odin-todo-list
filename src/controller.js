import "./styles/global.css";
import * as model from "./model.js";
import * as view from "./view.js";

const init = () => {
  // restore all persisted data in local storage
  model.restoreModel();
  view.renderAllTasks(model.state.tasks);

  // set up event handlers
  view.addHandlerAddTask(controlAddTask);
  view.addHandlerChangeTaskStatus(controlChangeTaskStatus);
};

const controlAddTask = (taskData) => {
  model.addTask(taskData);
  view.renderOneTask(taskData);
};

const controlChangeTaskStatus = (taskId) => {
  const updatedTask = model.changeTaskStatus(parseInt(taskId));
  view.updateTaskStatus(taskId, updatedTask.completed) === 1;
};

init();
