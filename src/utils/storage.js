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
    console.error("Failed to save to local storage", error);
  }
};

export const clearStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY_TASKS);
  } catch (error) {
    console.error("Failed to clear local storage", error);
  }
};
