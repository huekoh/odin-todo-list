import * as storage from "./utils/storage.js";

export const state = {
  tasks: [],
  inboxState: "all",
};

export const restoreModel = () => {
  state.tasks = storage.loadTasksFromStorage();
  state.inboxState = storage.loadInboxStateFromStorage();
};

export const clearAllTasks = () => {
  state.tasks = [];
  storage.clearStorage();
};

export const retrieveAllTasksData = () => {
  return state.tasks;
};

export const retrieveTodayTasksData = () => {
  const today = new Date();
  const localFormattedDate = today.toISOString().split("T")[0];

  const todayTasks = state.tasks.filter(
    (task) => task.dueDate === localFormattedDate
  );

  return todayTasks;
};

export const retrieveCompletedTasksData = () => {
  const completedTasks = state.tasks.filter((task) => task.completed === 1);
  return completedTasks;
};

export const addTask = (taskData) => {
  state.tasks.push(taskData);
  storage.clearStorage();
  storage.saveTasksToStorage(state.tasks);
};

export const updateTaskStatus = (taskId) => {
  const taskToUpdate = state.tasks.find((task) => task.id === taskId);
  if (taskToUpdate) {
    taskToUpdate.completed = taskToUpdate.completed === 0 ? 1 : 0;
    storage.saveTasksToStorage(state.tasks);
  }
  return taskToUpdate;
};

export const updateInboxState = (newInboxState) => {
  const oldInboxState = state.inboxState;
  state.inboxState = newInboxState;
  storage.saveInboxStateToStorage(newInboxState);
  return oldInboxState !== newInboxState;
};

export const retrieveInboxState = () => {
  return state.inboxState;
};
