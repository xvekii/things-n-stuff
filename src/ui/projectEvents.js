import { Project } from "../Project.js";
import {
  validateProjectName,
  createProjectListItem,
  toggleDeleteProjBtn,
  switchEditingMode,
} from "../utils/projectUtils.js";
import { createSpan } from "../helpers.js";
import { showError, hideError, removeProjError, emptyInput, toggleInert, isActive, showTodoBtn } from "../utils/uiUtils.js";
import { createProjectContainerUI } from "./projectContainerUI.js";
import { 
  addToDoBtn,
  renderSavedProjects,
  todos,
  renderTodos,
  hamburgerMenuBtn,
} from "../toDo-template.js";
import { projects } from "../projects.js";
import { updateNavProjects, toggleProjectContainer } from "./projectUI.js";
import { updateCurrentLocation, toggleMenu, showProjsAsCurrLocation } from "./navEvents.js";
import { saveToLS } from "../services/storageService.js";
import { containerRight, mainContainer } from "../index.js";

export function bindProjectSidebarEvents({ containerLeft, containerRight }) {
  const nav = document.querySelector(".nav-ul");
  containerLeft.addEventListener("click", (e) => {
    const target = e.target;

    if (target.closest(".edit-projects-btn") || target.closest(".add-new-project-btn")) {
      toggleInert(hamburgerMenuBtn);
      toggleInert(containerRight);
      renderProjectWindow(mainContainer);
      toggleMenu(containerLeft);
    }

    if (target.closest(".notes-btn")) {
      toggleInert(containerRight);
      showTodoBtn(addToDoBtn);
      delete containerRight.dataset.projViewId;
      const notesBtn = target.closest(".notes-btn");
      updateCurrentLocation(nav, notesBtn);
      toggleMenu(containerLeft);
      renderTodos({ showAll: true });
    }

    const projBtn = target.closest("[data-proj-id]");
    if (projBtn) {
      const clickedProjBtnId = projBtn.dataset.projId;
      toggleInert(containerRight);
      showTodoBtn(addToDoBtn);
      toggleMenu(containerLeft);
      updateCurrentLocation(nav, projBtn);
      toggleProjectContainer(containerRight, clickedProjBtnId);
      renderTodos({ projID: clickedProjBtnId });
    }

    if (target.closest(".my-projects-btn")) {
      toggleInert(containerRight);
      showTodoBtn(addToDoBtn);
      const projectsBtn = target.closest(".my-projects-btn");
      const clickedAllProjectsBtnId = "allProjects";
      toggleProjectContainer(containerRight, clickedAllProjectsBtnId);
      updateCurrentLocation(nav, projectsBtn);
      toggleMenu(containerLeft);
      renderTodos({ showProjs: true });
    }
  });
}

function renderProjectWindow(mainContainer) {
  const { 
    newProjectContainer, 
    newProjectListContainer, 
    newProjectInput, 
    newProjectInputErrorMsg, 
    addProjectBtn, 
    closeProjectBtn 
  } = createProjectContainerUI(true);
  
  mainContainer.appendChild(newProjectContainer);
  newProjectContainer.classList.add("visible", "edit-projects-container");

  // Render existing projects
  renderSavedProjects(newProjectListContainer, projects, todos, null);

  toggleInert(containerRight);

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

export function bindProjectEvents(elements, projects, todos, existingID, noMark = false) {
  const { 
    newProjectContainer, 
    newProjectListContainer, 
    newBtnContainer,
    newReminderContainer,
  } = elements;

  if (newProjectContainer.dataset.boundProjectEvents === "true") return;
  newProjectContainer.dataset.boundProjectEvents = "true";

  newProjectContainer.addEventListener("click", (e) => {
    const target = e.target;

    // Temporarily store the selected project ID
    if (target.closest(".close-project-btn")) {
      const selectedInput = newProjectListContainer.querySelector(
      ".project-item-wrapper.selected-project .project-item-input"
      );
      const selectedID = selectedInput ? selectedInput.dataset.titleId : null;

      showTodoBtn(addToDoBtn);
      
      projects.tempID = selectedID || null;
      newProjectContainer.classList.remove("visible");

      if (newBtnContainer) {
        toggleInert(newBtnContainer);
      }

      if (newReminderContainer && isActive(newReminderContainer)) {
        toggleInert(newReminderContainer);
      }
    } 

    if (target.matches("input.project-item-input[readonly]") ||
      target.closest(".delete-project-item-btn:not(.active)")) {
      
      // Get the wrapper row
      const wrapper = target.closest(".project-item-wrapper");
      if (!wrapper) return;

      // Deselect the project
      if (wrapper.classList.contains("selected-project")) {
        wrapper.classList.remove("selected-project");
        projects.tempID = null;
        // Remove projectID from the existing todo 
        if (existingID) {
          const currentTodo = todos.getTodo(existingID);
          if (!currentTodo) return;

          currentTodo.projectID = null;
          projects.tempID = null;
        }
      } else {
        // Remove "selected-project" from all unselected
        // Mark selected project item (row)
         if (!noMark) {
          const allWrappers = newProjectListContainer.querySelectorAll(".project-item-wrapper");
          allWrappers.forEach(w => w.classList.toggle("selected-project", w === wrapper));
        }
        
        const closestInput = wrapper.querySelector(".project-item-input");
        const closestInputID = closestInput ? closestInput.dataset.titleId : null;
        
        wrapper.focus();

        if (closestInputID) {
          projects.tempID = closestInputID;
        }
      }
    } 

    // Project name editing mode
    if (target.closest(".edit-project-item-btn")) {
      const editBtn = target.closest(".edit-project-item-btn");
      const editImg = editBtn.querySelector(".edit-project-item-img");
      
      // If edit clicked, get closest input's ID
      const closestWrapper = target.closest(".project-item-wrapper");
      const closestInput = closestWrapper.querySelector("input.project-item-input");
      const closestInputID = closestInput.dataset.titleId;
      const deleteProjBtn = closestWrapper.querySelector(".delete-project-item-btn");
      const deleteProjImg = deleteProjBtn.querySelector(".delete-project-item-img");
      
      // Switch editing mode
      if (closestInput.hasAttribute("readonly")) {
        closestInput.dataset.originalValue = closestInput.value.trim();
        closestInput.removeAttribute("readonly");
        switchEditingMode(closestInput, editImg, deleteProjImg);
        toggleDeleteProjBtn(deleteProjBtn);
        closestInput.focus();
      } else {
        const newValue = closestInput.value.trim();
        const originalValue = closestInput.dataset.originalValue;
        
        // Reuse existing error span if present; create only if missing
        const existingErr = closestWrapper.previousElementSibling;
        const hasExistingErr = existingErr && existingErr.classList.contains("error-span");
        const errSpan = hasExistingErr ? existingErr : createSpan({ classes: ["error-span"] });
        
        // If unchanged, just exit edit mode without validation/update
        if (newValue === originalValue) {
          closestInput.classList.remove("error");
          const currentErr = closestWrapper.previousElementSibling;
          if (currentErr && currentErr.classList.contains("error-span")) {
            removeProjError(closestInput, currentErr);
          }
          closestInput.setAttribute("readonly", "true");
          delete closestInput.dataset.originalValue;
          switchEditingMode(closestInput, editImg, deleteProjImg);
          toggleDeleteProjBtn(deleteProjBtn);
          return;
        }

        // Basic validation (empty + duplicate via validateProjectName)
        const { valid, error } = validateProjectName(newValue, projects);
        if (!valid) {
          closestInput.classList.add("error");
          if (!hasExistingErr) closestWrapper.before(errSpan);
          showError(closestInput, errSpan, error);
          return;
        } else {
          const currentErr = closestWrapper.previousElementSibling;
          if (currentErr && currentErr.classList.contains("error-span")) {
            removeProjError(closestInput, currentErr);
          }
          closestInput.classList.remove("error");
        }
        
        // Apply update; projects.updateName handles duplicates and unchanged
        const updateMsg = projects.updateName(newValue, closestInputID);
        if (updateMsg) {
          // Duplicate name case
          closestInput.classList.add("error");
          if (!hasExistingErr) closestWrapper.before(errSpan);
          showError(closestInput, errSpan, updateMsg);
          return;
        }

        // Success: finalize edit
        closestInput.classList.remove("error");
        closestInput.setAttribute("readonly", "true");
        delete closestInput.dataset.originalValue;
        const currentErr = closestWrapper.previousElementSibling;
        if (currentErr && currentErr.classList.contains("error-span")) {
          removeProjError(closestInput, currentErr);
        }
        saveToLS("lsProjects", projects.arr);
        switchEditingMode(closestInput, editImg, deleteProjImg);
        toggleDeleteProjBtn(deleteProjBtn);
      }        
    } 

    if (target.closest(".delete-project-item-btn.active")) {
      const closestWrapper = target.closest(".project-item-wrapper");
      if (!closestWrapper) return;

      const closestInput = closestWrapper.querySelector(".project-item-input");
      const closestInputID = closestInput ? closestInput.dataset.titleId : null;
      
      // Delete and render all project item wrappers
      if (closestInput) {
        projects.deleteProject(closestInputID);
        
        const deletedProjTodos = todos.getTodosByProjID(closestInputID);
        if (deletedProjTodos && deletedProjTodos.length > 0) {
          deletedProjTodos.forEach(todo => todo.clearProjID());
        }
        saveToLS("lsProjects", projects.arr);
        saveToLS("lsTodos", todos.todosArr); 
        renderSavedProjects(newProjectListContainer, projects, todos, existingID);
        checkIfDeletedProj(closestInputID);
      }
    }
  });
}

// Show Projects window if project deleted while in deleted project window
function checkIfDeletedProj(deletedProjID) {
  if (containerRight.dataset.projViewId === deletedProjID) {
    const allProjectsID = "allProjects";
    toggleProjectContainer(containerRight, allProjectsID);
    showProjsAsCurrLocation();
    renderTodos({ showProjs: true });
  }
}

export function bindProjectManagerEvents(elements, projects, todos, updateCallback, noMark = false) {
  const { 
    newProjectContainer, 
    newProjectListContainer, 
    newProjectInput, 
    newProjectInputErrorMsg, 
    addProjectBtn, 
    closeProjectBtn 
  } = elements;

  // Bind basic project interactions
  bindProjectEvents({ newProjectContainer, newProjectListContainer }, 
    projects, 
    todos, 
    null, 
    noMark
  );

  newProjectInput.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && newProjectInput.value === "") {
      hideError(newProjectInput, newProjectInputErrorMsg);
    }
  });

  newProjectInput.addEventListener("input", () => {
    const inputName = newProjectInput.value.trim();
    const { valid, error } = validateProjectName(inputName, projects);
    
    if (!valid) {
      showError(newProjectInput, newProjectInputErrorMsg, error);
    } else {
      hideError(newProjectInput, newProjectInputErrorMsg); 
    }
  });

  addProjectBtn.addEventListener("click", () => {
    const inputName = newProjectInput.value.trim();
    const { valid, error } = validateProjectName(inputName, projects);
    
    if (!valid) {
      showError(newProjectInput, newProjectInputErrorMsg, error);
      return;
    }
    hideError(newProjectInput, newProjectInputErrorMsg);
    
    const newProject = new Project(inputName);
    projects.addProject(newProject);
    saveToLS("lsProjects", projects.arr);
    emptyInput(newProjectInput);
    
    const projectRow = createProjectListItem(newProject);
    newProjectListContainer.prepend(projectRow);
    
    // Update Nav Projects
    if (updateCallback) {
      updateCallback();
    }
  });

  closeProjectBtn.addEventListener("click", () => {
    newProjectContainer.classList.remove("visible");

    toggleInert(hamburgerMenuBtn);
    toggleInert(containerRight);
    
    // Update Nav Projects
    if (updateCallback) {
      updateCallback();
    }
  });
}