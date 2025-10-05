import "./styles.css";
import projectFolderImgLight from "./assets/images/project-folder-lighter.svg";
import { projects } from "./projects.js";
import {
  createTodo,
  todos,
} from "./toDo-template.js";
import {
  formatDateTime,
  formatForUser,
} from "./utils/dateUtils.js";
import {
  createNewNote,
  resizeNote,
  addPlaceholder,
  removePlaceholder,
} from "./utils/noteUtils.js";
import { renderTodos, renderSavedProjects } from "./toDo-template.js";
import { bindProjectManagerEvents } from "./ui/projectEvents.js";
import { createProjectContainerUI } from "./ui/projectContainerUI.js";

const hamburgerMenuBtn = document.querySelector(".hamburger");
const containerLeft = document.querySelector(".container-left");
const containerRight = document.querySelector(".container-right");
const addToDoBtn = document.querySelector(".add-toDo-btn");
const navUL = document.querySelector(".nav-ul");
const projectBtnsLI = document.createElement("li");
const addNewProjectBtn = document.querySelector(".add-new-project-btn");
const editProjectsContainer = document.createElement("div");
editProjectsContainer.classList.add("toggle-project", "edit-projects-container");

hamburgerMenuBtn.addEventListener("click", () => {
  toggleMenu();
  
  if (containerLeft.classList.contains("active")) {
    updateNavProjects();
  }
});

// Revise
addToDoBtn.addEventListener("click", () => {
  const toDoCard = createTodo();
  renderTodo(toDoCard);
});

containerLeft.addEventListener("click", (e) => {
  const target = e.target;

  if (target.closest(".edit-projects-btn")) {
    renderProjectWindow();
  }

  if (target.closest(".add-new-project-btn")) {
    renderProjectWindow();
  }

  if (target.closest(".main-btn")) {
    toggleMenu();
    renderTodos();
  }

  const projBtn = target.closest("[data-proj-id]");
  if (projBtn) {
    const clickedProjBtnId = projBtn.dataset.projId;
    toggleMenu();
    renderTodos({ projID: clickedProjBtnId });
  }
});

function renderProjectWindow() {
  const { 
    newProjectContainer, 
    newProjectListContainer, 
    newProjectInput, 
    newProjectInputErrorMsg, 
    addProjectBtn, 
    closeProjectBtn 
  } = createProjectContainerUI(true);
  
  containerRight.appendChild(newProjectContainer);
  toggleMenu();
  newProjectContainer.classList.add("visible", "edit-projects-container");

  // Render existing projects
  renderSavedProjects(newProjectListContainer, projects, todos, null);

  // Bind project manager events with update callback
  bindProjectManagerEvents(
    {
      newProjectContainer,
      newProjectListContainer,
      newProjectInput,
      newProjectInputErrorMsg,
      addProjectBtn,
      closeProjectBtn
    },
    projects,
    todos,
    updateNavProjects,
    true,
  );
}

function createNavProjBtn(project = null) {
  const newProjectBtn = document.createElement("button");
  const newProjectBtnImg = document.createElement("img");
  
  const projName = project ? project.name : "New project";
  
  // If project
  if (project) {
    newProjectBtn.setAttribute("data-proj-id", `${project.ID}`);
  }

  newProjectBtnImg.src = projectFolderImgLight;
  newProjectBtnImg.alt = "Project icon";
  newProjectBtn.type = "button";
  newProjectBtn.classList.add("project-name");
  
  newProjectBtn.appendChild(newProjectBtnImg);
  newProjectBtn.appendChild(document.createTextNode(`${projName}`));

  return newProjectBtn;
}

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

function updateNavProjects() {
  projectBtnsLI.replaceChildren();
  projects.arr.forEach(project => {
    const projBtn = createNavProjBtn(project);
    projectBtnsLI.appendChild(projBtn);
  });
  if (!navUL.contains(projectBtnsLI)) {
    navUL.appendChild(projectBtnsLI);
  }
}

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

function toggleMenu() {
  containerLeft.classList.toggle("active");
}

function renderTodo(todo) {
  containerRight.appendChild(todo);
}

