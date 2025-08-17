import "./styles.css";
import { createTodo } from "./toDo-template.js";
import { todos } from "./toDo-template.js";
import { createNewNote } from "./toDo-template.js";

const hamburgerMenuBtn = document.querySelector(".hamburger");
const containerLeft = document.querySelector(".container-left");
const containerRight = document.querySelector(".container-right");
const addToDoBtn = document.querySelector(".add-toDo-btn");

hamburgerMenuBtn.addEventListener("click", () => {
  containerLeft.classList.toggle("active");
});

addToDoBtn.addEventListener("click", () => {
  const toDoCard = createTodo(false);
  renderTodo(toDoCard);
});

containerRight.addEventListener("click", (e) => {
  const todo = e.target.closest(".todo"); 
  
  if (todo) {
    const title = todo.querySelector("input[data-title-id]");
    const titleID = title.dataset.titleId;
    const clickedToDo = createTodo(true, titleID);

    const titleInput = clickedToDo.querySelector("#title");
    const notesContainer = clickedToDo.querySelector(".new-notes-container");

    const retrievedTodos = todos.getTodos();
    for (const obj of retrievedTodos) {
      if (obj.ID == titleID) {
        titleInput.value = obj.title;
        fillNotes(notesContainer, obj.notes);
      }
    }
    renderTodo(clickedToDo);
  }
});

function fillNotes(notesContainer, notes) {
  notesContainer.innerHTML = "";
  notes.forEach((note) => {
    const newNote = createNewNote();
    newNote.value = note;
    notesContainer.appendChild(newNote);
  });
}

function renderTodo(todo) {
  containerRight.appendChild(todo);
}

