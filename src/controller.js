import "./styles/global.css";
import * as model from "./model.js";
import * as view from "./view.js";

const init = () => {
  // restore all persisted data in local storage
  model.restoreModel();
  const allTasks = model.retrieveAllTasksData();
  view.renderTasks(allTasks);

  // set up event handlers
  view.addHandlerAddTask(controlAddTask);
  view.addHandlerChangeTaskStatus(controlChangeTaskStatus);
  view.addHandlerChangeInbox(controlChangeInbox);
};

const controlAddTask = (taskData) => {
  model.addTask(taskData);
  view.renderOneTask(taskData);
};

const controlChangeTaskStatus = (taskId) => {
  const updatedTask = model.updateTaskStatus(parseInt(taskId));
  view.updateTaskStatus(taskId, updatedTask.completed) === 1;
};

const controlChangeInbox = (newInboxState) => {
  const hasChanged = model.updateInboxState(newInboxState); // the update also checks if there was any change
  if (!hasChanged) {
    return;
  }

  let tasks = [];
  if (newInboxState === "all") {
    tasks = model.retrieveAllTasksData();
  }
  if (newInboxState === "today") {
    tasks = model.retrieveTodayTasksData();
  }
  if (newInboxState === "completed") {
    tasks = model.retrieveCompletedTasksData();
  }

  view.renderTasks(tasks);
  view.updateInboxStatus(newInboxState);
};

init();
