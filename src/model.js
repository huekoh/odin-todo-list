import * as storage from "./utils/storage.js";

export const state = {
  tasks: [],
};

export const restoreModel = () => {
  state.tasks = storage.loadFromStorage();
};

export const addTask = (taskData) => {
  state.tasks.push(taskData);
  storage.clearStorage();
  storage.saveToStorage(state.tasks);
};

export const changeTaskStatus = (taskId) => {
  const taskToUpdate = state.tasks.find((task) => task.id === taskId);
  if (taskToUpdate) {
    taskToUpdate.completed = taskToUpdate.completed === 0 ? 1 : 0;
    storage.saveToStorage(state.tasks);
  }
  return taskToUpdate;
};
