export const renderTasks = (tasks) => {
  console.log(
    "printing from view module before card is rendered with task details"
  );
  console.log(tasks);
  const taskList = document.getElementById("task-cards");
  taskList.innerHTML = "";
  for (const item of tasks) {
    const newTaskCard = document.createElement("div");
    newTaskCard.classList.add("task-card");

    const title = document.createElement("h4");
    title.innerText = item.title;

    const description = document.createElement("p");
    description.innerText = item.description;

    const dueDate = document.createElement("p");
    dueDate.innerText = item.dueDate;

    newTaskCard.append(title, description, dueDate);

    taskList.appendChild(newTaskCard);
  }
};

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
    };

    handler(taskData);
    hideTaskForm();
    form.reset();
  });

  const closeFormBtn = document.querySelector(".btn-cancel");
  closeFormBtn.addEventListener("click", hideTaskForm);
};

const showTaskForm = () => {
  const form = document.getElementById("form-container");
  form.style.display = "flex";
};

const hideTaskForm = () => {
  const form = document.getElementById("form-container");
  form.style.display = "none";
};
