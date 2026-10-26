const taskInput = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];
const incompleteTaskHolder = document.getElementById("incompleteTasks");
const completedTasksHolder = document.getElementById("completed-tasks");

const createElement = function (tagName, properties = {}) {
  return Object.assign(document.createElement(tagName), properties);
};

const createDeleteButton = function () {
  const button = createElement("button", { className: "delete" });
  const icon = createElement("img", { src: "./remove.svg" });
  button.appendChild(icon);
  return button;
};

const createNewTaskElement = function (taskString) {
  const listItem = createElement("li");
  const checkBox = createElement("input", { type: "checkbox" });
  const label = createElement("label", {
    innerText: taskString,
    className: "task",
  });
  const editInput = createElement("input", { type: "text", className: "task" });
  const editButton = createElement("button", {
    innerText: "Edit",
    className: "edit",
  });

  listItem.append(checkBox, label, editInput, editButton, createDeleteButton());
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem);

  taskInput.value = "";
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editButton = listItem.querySelector(".edit");
  const isEditMode = listItem.classList.contains("editMode");
  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const parentList = listItem.parentNode;
  parentList.removeChild(listItem);
};

const toggleTaskCompleted = function () {
  const listItem = this.parentNode;
  const targetList = this.checked ? completedTasksHolder : incompleteTaskHolder;

  targetList.appendChild(listItem);
};

addButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskListItem) {
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = toggleTaskCompleted;
};

const existingTasks = [
  ...incompleteTaskHolder.children,
  ...completedTasksHolder.children,
];

for (const task of existingTasks) {
  bindTaskEvents(task);
}
