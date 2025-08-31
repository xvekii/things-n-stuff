import "./styles.css";
import { createTodo } from "./toDo-template.js";
import { todos } from "./toDo-template.js";
import { createNewNote } from "./toDo-template.js";
import { resizeNote } from "./toDo-template.js";
import { removePlaceholder } from "./toDo-template.js";
import { addPlaceholder } from "./toDo-template.js";
import { formatDateTime } from "./toDo-template.js";
// Revise and put the same ones together

const hamburgerMenuBtn = document.querySelector(".hamburger");
const containerLeft = document.querySelector(".container-left");
const containerRight = document.querySelector(".container-right");
const addToDoBtn = document.querySelector(".add-toDo-btn");

hamburgerMenuBtn.addEventListener("click", () => {
  containerLeft.classList.toggle("active");
});

// Revise
addToDoBtn.addEventListener("click", () => {
  const toDoCard = createTodo();
  renderTodo(toDoCard);
});

containerRight.addEventListener("click", (e) => {
  const clickedTodo = e.target.closest(".todo"); 
  
  if (clickedTodo) {
    // Revise
    const title = clickedTodo.querySelector("p[data-title-id]");
    const titleID = title.dataset.titleId;
    
    const toDoTemplatePopup = createTodo(titleID);

    const priorityCircle = toDoTemplatePopup.querySelector(".priority-circle");
    const titleInput = toDoTemplatePopup.querySelector(".title-text");
    const notesContainer = toDoTemplatePopup.querySelector(".new-notes-container");
    const reminderContainer = toDoTemplatePopup.querySelector(".reminder-container");
    const reminderSpan = toDoTemplatePopup.querySelector(".reminder-span");

    const retrievedTodo = todos.getTodos().find(obj => obj.ID === titleID);
    if (!retrievedTodo) return;

    priorityCircle.style.backgroundColor = retrievedTodo.priority;
    titleInput.value = retrievedTodo.title;
    fillNotes(notesContainer, retrievedTodo.notes);

    // Check if there's already a date
    if (retrievedTodo.dueDate) {
      reminderSpan.textContent = formatDateTime(retrievedTodo.dueDate);
      reminderContainer.classList.add("active");
    } else {
      reminderSpan.textContent = "";
      reminderContainer.classList.remove("active");
    }
  
    renderTodo(toDoTemplatePopup);
  }
});

// Revise
function fillNotes(notesContainer, notes) {
  notesContainer.innerHTML = "";
  notes.forEach((note, index) => {
    const newNote = createNewNote();
    newNote.value = note;
    resizeNote(newNote);
    
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

