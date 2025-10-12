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
import { loadLocalStorage } from "./services/storageService.js";

export const containerRight = document.querySelector(".container-right");
const containerLeft = document.querySelector(".container-left");
const hamburgerMenuBtn = document.querySelector(".hamburger");
const addToDoBtn = document.querySelector(".add-toDo-btn");
const navUL = document.querySelector(".nav-ul");
const projectBtnsLI = document.createElement("li");
const editProjectsContainer = document.createElement("div");
editProjectsContainer.classList.add("toggle-project", "edit-projects-container");
const showCurrProjName = document.querySelector(".show-proj-name-span");
showCurrProjName.textContent = "Notes";

loadLocalStorage();

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

  if (target.closest(".notes-btn")) {
    delete containerRight.dataset.projViewId;
    const notesBtn = target;
    updateCurrentLocation(notesBtn);
    toggleMenu();
    renderTodos({ showAll: true });
  }

  const projBtn = target.closest("[data-proj-id]");
  if (projBtn) {
    const clickedProjBtnId = projBtn.dataset.projId;
    toggleMenu();
    updateCurrentLocation(projBtn);
    toggleProjectContainer(containerRight, clickedProjBtnId);
    renderTodos({ projID: clickedProjBtnId });
  }

  if (target.closest(".my-projects-btn")) {
    const projectsBtn = target;
    updateCurrentLocation(projectsBtn);
    toggleMenu();
    renderTodos({ showProjs: true });
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

function toggleProjectContainer(container, projID) {
  if (projID != null && projID !== "") {
    container.setAttribute("data-proj-view-id", `${projID}`);
  } else {
    delete container.dataset.projViewId;
  }
}

function createNavProjBtn(project = null) {
  const newProjectBtn = document.createElement("button");
  const newProjectBtnImg = document.createElement("img");
  
  const projName = project ? project.name : "New project";
  
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
    const reminderSpan = toDoTemplatePopup.querySelector(".reminder-txt-span");

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

function updateCurrentLocation(btn) {
  if (btn) {
    const btnTxt = btn.textContent.trim();
    showCurrProjName.textContent = btnTxt;
  } else {
    showCurrProjName.textContent = "";
  }
}

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

