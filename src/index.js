import "./styles.css";
import { createTodo } from "./toDo-template.js";
import { todos } from "./toDo-template.js";
import { createNewNote } from "./toDo-template.js";
import { removePlaceholder } from "./toDo-template.js";
import { addPlaceholder } from "./toDo-template.js";

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
  const clickedTodo = e.target.closest(".todo"); 
  
  if (clickedTodo) {
    const title = clickedTodo.querySelector("p[data-title-id]");
    const titleID = title.dataset.titleId;
    
    const toDoTemplatePopup = createTodo(true, titleID);
    console.log(toDoTemplatePopup);

    const titleInput = toDoTemplatePopup.querySelector(".title-text");
    const notesContainer = toDoTemplatePopup.querySelector(".new-notes-container");
    // Add dueDate

    const retrievedTodos = todos.getTodos();
    for (const obj of retrievedTodos) {
      if (obj.ID == titleID) {
        titleInput.value = obj.title;
        fillNotes(notesContainer, obj.notes);
        // Add dueDate
      }
    }
    renderTodo(toDoTemplatePopup);
  }
});

function fillNotes(notesContainer, notes) {
  notesContainer.innerHTML = "";
  notes.forEach((note, index) => {
    const newNote = createNewNote();
    newNote.value = note;
    
    if (index === 0 && note === "" && notes.length === 1) {
      addPlaceholder(newNote);
    } else {
      removePlaceholder(newNote);
    }
    
    notesContainer.appendChild(newNote);
  });
}

function renderTodo(todo) {
  containerRight.appendChild(todo);
}

