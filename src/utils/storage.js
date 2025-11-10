const STORAGE_KEY_TASKS = "todo_tasks";
const STORAGE_KEY_INBOX_STATE = "inbox_state";

export const loadTasksFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_TASKS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load tasks data from local storage", error);
  }
};

export const saveTasksToStorage = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks to local storage", error);
  }
};

export const loadInboxStateFromStorage = () => {
  try {
    const state = localStorage.getItem(STORAGE_KEY_INBOX_STATE);
    return state ? JSON.parse(state) : "all";
  } catch (error) {
    console.error("Failed to load inbox state from local storage", error);
  }
};

export const saveInboxStateToStorage = (data) => {
  console.log(data);
  try {
    localStorage.setItem(STORAGE_KEY_INBOX_STATE, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save inbox state to local storage", error);
  }
};

export const clearStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY_TASKS);
  } catch (error) {
    console.error("Failed to clear tasks from local storage", error);
  }
};
