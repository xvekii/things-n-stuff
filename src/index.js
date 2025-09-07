import "./styles.css";
import projectFolderImgLight from "./assets/images/project-folder-lighter.svg";
import {
  createTodo,
  todos,
  createNewNote,
  resizeNote,
  removePlaceholder,
  addPlaceholder,
  formatDateTime,
  formatForUser,
} from "./toDo-template.js";

const hamburgerMenuBtn = document.querySelector(".hamburger");
const containerLeft = document.querySelector(".container-left");
const containerRight = document.querySelector(".container-right");
const addToDoBtn = document.querySelector(".add-toDo-btn");
const navUL = document.querySelector(".nav-ul");
const addNewProjectBtn = document.querySelector(".add-new-project-btn");

hamburgerMenuBtn.addEventListener("click", () => {
  containerLeft.classList.toggle("active");
});

// Revise
addToDoBtn.addEventListener("click", () => {
  const toDoCard = createTodo();
  renderTodo(toDoCard);
});

addNewProjectBtn.addEventListener("click", () => {
    const newLI = document.createElement("li");
    const newProjectBtn = document.createElement("button");
    const newProjectBtnImg = document.createElement("img");
    
    newProjectBtnImg.src = projectFolderImgLight;
    newProjectBtnImg.alt = "Project icon";
    newProjectBtn.type = "button";
    newProjectBtn.classList.add("project-name");
    
    newProjectBtn.appendChild(newProjectBtnImg);
    newProjectBtn.appendChild(document.createTextNode("New Project"));
    newLI.appendChild(newProjectBtn);

    navUL.appendChild(newLI);
  });

containerRight.addEventListener("click", (e) => {
  const clickedTodo = e.target.closest(".todo"); 
  
  if (clickedTodo) {
    // Revise
    const title = clickedTodo.querySelector("input[data-title-id]");
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

    if (retrievedTodo.dueDate) {
      // !!!
      const formattedDateTime = formatDateTime(retrievedTodo.dueDate)
      reminderSpan.textContent = formatForUser(formattedDateTime);
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

