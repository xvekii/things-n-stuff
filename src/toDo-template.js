import { todos } from "./AllTodos.js";
import { makeRenderTodos } from "./utils/renderUtils.js";
import { createTodoUI } from "./ui/todoUI.js";
import { bindTodoEvents } from "./ui/todoEvents.js";
import { bindTodoFormEvents } from "./ui/todoFormEvents.js";
import { hideTodoBtn } from "./utils/uiUtils.js";
import { renderSavedProjects } from "./ui/projectUI.js";
import { projects } from "./projects.js";

export const hamburgerMenuBtn = document.querySelector(".hamburger");
export const addToDoBtn = document.querySelector(".add-toDo-btn");
const containerRight = document.querySelector(".container-right");
const renderTodos = makeRenderTodos(containerRight, todos);

function createTodo(existingID = null) {
  const { root, refs } = createTodoUI(existingID);
  
  bindTodoEvents(refs, todos, projects, existingID);

  bindTodoFormEvents(refs, todos, projects, existingID, renderTodos);

  hideTodoBtn(addToDoBtn);
  return root;
}

export {
  todos, 
  createTodo,
  renderSavedProjects,
  renderTodos,
};