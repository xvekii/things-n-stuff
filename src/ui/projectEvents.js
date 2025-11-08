import { Project } from "../Project.js";
import {
  validateProjectName,
  createProjectListItem,
  toggleDeleteProjBtn,
  switchEditingMode,
} from "../utils/projectUtils.js";
import { showError, hideError, emptyInput } from "../utils/uiUtils.js";

import { createProjectContainerUI } from "./projectContainerUI.js";
import { renderSavedProjects, todos } from "../toDo-template.js";
import { projects } from "../projects.js";
import { updateNavProjects, toggleProjectContainer } from "./projectUI.js";
import { updateCurrentLocation, toggleMenu } from "./navEvents.js";
import { renderTodos } from "../toDo-template.js";
import { saveToLS } from "../services/storageService.js";


export function bindProjectSidebarEvents({ containerLeft, containerRight }) {
  containerLeft.addEventListener("click", (e) => {
    const target = e.target;

    if (target.closest(".edit-projects-btn") || target.closest(".add-new-project-btn")) {
      renderProjectWindow(containerRight);
      toggleMenu(containerLeft);
    }

    if (target.closest(".notes-btn")) {
      delete containerRight.dataset.projViewId;
      const notesBtn = target;
      updateCurrentLocation(notesBtn);
      toggleMenu(containerLeft);
      renderTodos({ showAll: true });
    }

    const projBtn = target.closest("[data-proj-id]");
    if (projBtn) {
      const clickedProjBtnId = projBtn.dataset.projId;
      toggleMenu(containerLeft);
      updateCurrentLocation(projBtn);
      toggleProjectContainer(containerRight, clickedProjBtnId);
      renderTodos({ projID: clickedProjBtnId });
    }

    if (target.closest(".my-projects-btn")) {
      const projectsBtn = target;
      const clickedAllProjectsBtnId = "allProjects";
      toggleProjectContainer(containerRight, clickedAllProjectsBtnId);
      updateCurrentLocation(projectsBtn);
      toggleMenu(containerLeft);
      renderTodos({ showProjs: true });
    }
  });
}

function renderProjectWindow(containerRight) {
  const { 
    newProjectContainer, 
    newProjectListContainer, 
    newProjectInput, 
    newProjectInputErrorMsg, 
    addProjectBtn, 
    closeProjectBtn 
  } = createProjectContainerUI(true);
  
  containerRight.appendChild(newProjectContainer);
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

export function bindProjectEvents(elements, projects, todos, existingID, noMark = false) {
  const { 
    newProjectContainer, 
    newProjectListContainer, 
  } = elements;

    // Prevent multiple bindings on the same container
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
      
      projects.tempID = selectedID || null;
      newProjectContainer.classList.remove("visible");
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
      // Get the closest input ID, go through the todo list by existingID and remove projID
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
        closestInput.removeAttribute("readonly");
        switchEditingMode(closestInput, editImg, deleteProjImg);
        toggleDeleteProjBtn(deleteProjBtn);
        closestInput.focus();
      } else {
        const closestInputValue = closestInput.value.trim();
        if (!closestInputValue) {
          closestInput.classList.add("error");
          alert("Name cannot be empty");
        }
        
        const updateMsg = projects.updateName(closestInputValue, closestInputID);
  
        if (updateMsg) {
          closestInput.classList.add("error");
          alert(updateMsg);
        } else {
          closestInput.classList.remove("error");
          closestInput.setAttribute("readonly", "true");
          saveToLS("lsProjects", projects.arr);
          switchEditingMode(closestInput, editImg, deleteProjImg);
          toggleDeleteProjBtn(deleteProjBtn);
        }
      }        
    } 

    // Add LS
    if (target.closest(".delete-project-item-btn.active")) {
      const closestWrapper = target.closest(".project-item-wrapper");
      if (!closestWrapper) return;

      const closestInput = closestWrapper.querySelector(".project-item-input");
      const closestInputID = closestInput ? closestInput.dataset.titleId : null;
      
      // Delete and render all project item wrappers
      if (closestInput) {
        projects.deleteProject(closestInputID);
        saveToLS("lsProjects", projects.arr);
        renderSavedProjects(newProjectListContainer, projects, todos, existingID);
      }
    }
  });
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

  // Bind basic project interactions first
  bindProjectEvents({ newProjectContainer, newProjectListContainer }, projects, todos, null, noMark);

  // Add project creation functionality
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
    
    // Call the update callback if provided
    if (updateCallback) {
      updateCallback();
    }
  });

  closeProjectBtn.addEventListener("click", () => {
    newProjectContainer.classList.remove("visible");
    
    // Call the update callback if provided
    if (updateCallback) {
      updateCallback();
    }
  });
}