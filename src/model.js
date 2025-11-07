import * as storage from "./utils/storage.js";

export const state = {
  tasks: [],
};

export const addTask = (taskData) => {
  state.tasks.push(taskData);
};
