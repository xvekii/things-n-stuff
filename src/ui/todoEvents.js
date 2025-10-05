import { renderTodos, renderSavedProjects } from "../toDo-template.js";
import { hideError, emptyInput, showTodoBtn } from "../utils/uiUtils.js";
import { bindProjectEvents } from "./projectEvents.js"; 

export function bindTodoEvents(refs, todos, projects, existingID) {
  const {
    newPriorityCircle,
    newPriorityContainer,
    newPriorityBtnContainer,
    newProjectContainer,
    newProjectListContainer, 
    newProjectInput, 
    newProjectInputErrorMsg,
    deleteBtn,
    priorityBtn,
    projectBtn, 
  } = refs;

  const LOW = "#FFFFFF";
  const NORMAL = "#06D6A0";
  const MEDIUM = "#FFD166";
  const HIGH = "#EF476F";

  // Revise - add method to AllTodos for removing

  deleteBtn.addEventListener("click", () => {
    const todoCard = deleteBtn.closest(".todo-template-popup"); 
    const title = todoCard.querySelector("input[data-title-id]");
    const titleID = title.dataset.titleId;
    // Revise
    const currentTodos = todos.getTodos();
    // Revise - removing function
    currentTodos.forEach((todo, index) => {
      if (titleID === todo.ID) {
        currentTodos.splice(index, 1);
      }
    });
    renderTodos(existingID, true);
    // Revise - import from index?
    showTodoBtn(document.querySelector(".add-toDo-btn")); 
  });

  priorityBtn.addEventListener("click", () => {
    newPriorityContainer.classList.toggle("visible");
    // Add block all other todo btns when opened
    // Reactivate other btns otherwise
  });

  newPriorityBtnContainer.addEventListener("click", (e) => {
    const clickedBtn = e.target;

    if (clickedBtn.classList.contains("low")) {
      newPriorityCircle.style.backgroundColor = LOW;
    }

    if (clickedBtn.classList.contains("normal")) {
      newPriorityCircle.style.backgroundColor = NORMAL;
    }

    if (clickedBtn.classList.contains("medium")) {
      newPriorityCircle.style.backgroundColor = MEDIUM;
    }

    if (clickedBtn.classList.contains("high")) {
      newPriorityCircle.style.backgroundColor = HIGH;
    }
  });

  // Add dedicated classList remove functions
  newPriorityContainer.addEventListener("click", (e) => {
    const clickedBtn = e.target;

    if (clickedBtn.classList.contains("close-priority-btn")) {
      newPriorityContainer.classList.remove("visible");
      // Reactivate other btns
    }
  });

  projectBtn.addEventListener("click", () => {
    hideError(newProjectInput, newProjectInputErrorMsg);
    emptyInput(newProjectInput);
    newProjectContainer.classList.toggle("visible");
    // Add block all other todo btns when opened, reactivate otherwise

    if (newProjectContainer.classList.contains("visible")) {
      renderSavedProjects(newProjectListContainer, projects, todos, existingID);

      bindProjectEvents(
        { newProjectContainer, newProjectListContainer },
        projects,
        todos,
        existingID,
      );
    }
  });
}