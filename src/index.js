import "./styles.css";
import { createTodo } from "./toDo-template.js";
import { todos } from "./toDo-template.js";

const hamburgerMenuBtn = document.querySelector(".hamburger");
const containerLeft = document.querySelector(".container-left");
const containerRight = document.querySelector(".container-right");
const addToDoBtn = document.querySelector(".add-toDo-btn");

hamburgerMenuBtn.addEventListener("click", () => {
  containerLeft.classList.toggle("active");
});

addToDoBtn.addEventListener("click", () => {
  const toDoCard = createTodo();
  renderTodo(toDoCard);
});

containerRight.addEventListener("click", (e) => {
  const todo = e.target.closest(".todo"); 
  
  if (todo) {
    const title = todo.querySelector("input[data-title-id]");
    const titleID = title.dataset.titleId;
    console.log(titleID);

    const clickedToDo = createTodo();
    const titleInput = clickedToDo.querySelector("#title");
    // Get title from AllTodos with titleID
    const retrievedTodos = todos.getTodos();
    console.log(retrievedTodos);
    
    for (const obj of retrievedTodos) {
      if (obj.ID == titleID) {
        titleInput.value = obj.title;
      }
    }

    renderTodo(clickedToDo);
  }
});

function renderTodo(todo) {
  containerRight.appendChild(todo);
}

