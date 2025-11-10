import "./styles/global.css";
import * as model from "./model.js";
import * as view from "./view.js";

const init = () => {
  // restore all persisted data in local storage
  model.restoreModel();
  const newInboxState = model.retrieveInboxState();
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
  // render persisted data
  view.renderTasks(tasks);
  view.updateInboxStatus(newInboxState);

  // set up event handlers
  view.addHandlerAddTask(controlAddTask);
  view.addHandlerClearAllTasks(controlClearAllTasks);
  view.addHandlerChangeTaskStatus(controlChangeTaskStatus);
  view.addHandlerChangeInbox(controlChangeInbox);
  view.createAccessSettingsEvents();
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

const controlClearAllTasks = () => {
  model.clearAllTasks();
  view.renderTasks([]);
};

init();
