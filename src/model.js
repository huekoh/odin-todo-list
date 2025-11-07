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
