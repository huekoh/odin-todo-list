// add handler functions

export const addHandlerAddTask = (handler) => {
  const createTaskBtn = document.querySelector(".create-task");
  createTaskBtn.addEventListener("click", showTaskForm);

  // receive form inputs and return in to handler
  const form = document.querySelector("#task-form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskData = {
      id: Date.now(),
      title: document.getElementById("task-title").value,
      description: document.getElementById("task-description").value,
      dueDate: document.getElementById("task-due-date").value,
      project: document.getElementById("task-project").value,
      priority: document.getElementById("task-priority").value,
      completed: 0,
    };

    handler(taskData);
    hideTaskForm();
    form.reset();
  });

  const closeFormBtn = document.querySelector(".btn-cancel");
  closeFormBtn.addEventListener("click", hideTaskForm);
};

export const addHandlerChangeTaskStatus = (handler) => {
  const taskList = document.getElementById("task-cards");
  taskList.addEventListener("change", (e) => {
    if (e.target.classList.contains("task-completion")) {
      const taskId = e.target.parentElement.id;
      handler(taskId);
    }
  });
};

export const addHandlerChangeInbox = (handler) => {
  const menu = document.getElementById("menu");
  menu.addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-button")) {
      const newInboxState = e.target.id;
      console.log(newInboxState);
      handler(newInboxState);
    }
  });
};

// DOM manipulation/creation functions

export const createTaskComponent = (item) => {
  const newTaskCard = document.createElement("div");
  newTaskCard.id = item.id;
  newTaskCard.classList.add("task-card");

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.name = "task-completion";
  checkBox.classList.add("task-completion");

  const taskCardInfo = document.createElement("div");
  taskCardInfo.classList.add("task-card-info");

  if (item.completed) {
    checkBox.checked = true;
    taskCardInfo.classList.add("completed");
  }

  const title = document.createElement("h4");
  title.innerText = item.title;

  const description = document.createElement("p");
  description.innerText = item.description;

  const dueDate = document.createElement("p");
  dueDate.innerText = item.dueDate;

  taskCardInfo.append(title, description, dueDate);
  newTaskCard.append(checkBox, taskCardInfo);

  return newTaskCard;
};

export const updateTaskStatus = (taskId, isCompleted) => {
  const taskCard = document.getElementById(taskId);
  if (!taskCard) {
    return;
  }

  const checkBox = taskCard.querySelector(".task-completion");
  const taskInfo = taskCard.querySelector(".task-card-info");

  checkBox.checked = isCompleted;

  if (isCompleted) {
    taskInfo.classList.add("completed");
  } else {
    taskInfo.classList.remove("completed");
  }
};

export const renderOneTask = (task) => {
  const taskList = document.getElementById("task-cards");
  const newTask = createTaskComponent(task);
  taskList.appendChild(newTask);
};

export const renderTasks = (tasks) => {
  console.log(
    "printing from view module before card is rendered with task details"
  );
  const taskList = document.getElementById("task-cards");
  taskList.innerHTML = "";

  for (const item of tasks) {
    const newTask = createTaskComponent(item);
    taskList.appendChild(newTask);
  }
};

export const updateInboxStatus = (inboxStatus) => {
  const inboxHeader = document.getElementById("inbox-header");
  if (inboxStatus == "all") {
    inboxHeader.innerHTML = "All Tasks";
  }
  if (inboxStatus == "today") {
    inboxHeader.innerHTML = "Today";
  }
  if (inboxStatus == "completed") {
    inboxHeader.innerHTML = "Completed";
  }
};

const showTaskForm = () => {
  const form = document.getElementById("form-container");
  form.style.display = "flex";
};

const hideTaskForm = () => {
  const form = document.getElementById("form-container");
  form.style.display = "none";
};
