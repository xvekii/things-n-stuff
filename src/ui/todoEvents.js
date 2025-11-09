import { renderTodos, renderSavedProjects } from "../toDo-template.js";
import { hideError, emptyInput, showTodoBtn, toggleInert } from "../utils/uiUtils.js";
import { bindProjectEvents } from "./projectEvents.js"; 
import { saveToLS } from "../services/storageService.js";
import { createTodo, todos, hamburgerMenuBtn } from "../toDo-template.js";
import { formatDateTime, formatForUser } from "../utils/dateUtils.js";
import { fillNotes } from "../utils/noteUtils.js";
import { mainContainer } from "../index.js";

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
    newBtnContainer, 
  } = refs;

  const LOW = "#FFFFFF";
  const NORMAL = "#06D6A0";
  const MEDIUM = "#FFD166";
  const HIGH = "#EF476F";

  // Revise - add method to AllTodos for removing

  deleteBtn.addEventListener("click", () => {
    const containerRight = document.querySelector(".container-right");
    const todoCard = deleteBtn.closest(".todo-template-popup"); 
    const title = todoCard.querySelector("input[data-title-id]");
    const titleID = title.dataset.titleId;

    todoCard.remove();
    
    toggleInert(hamburgerMenuBtn);
    toggleInert(containerRight);
    
    // Revise
    const currentTodos = todos.getTodos();
    // Revise - removing function
    currentTodos.forEach((todo, index) => {
      if (titleID === todo.ID) {
        currentTodos.splice(index, 1);
      }
    });
    saveToLS("lsTodos", todos.getTodos());
    renderTodos({ existingID, deleting: true });
    // Revise - import from index?
    showTodoBtn(document.querySelector(".add-toDo-btn")); 
  });

  priorityBtn.addEventListener("click", () => {
    newPriorityContainer.classList.toggle("visible");
    toggleInert(newBtnContainer);
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
      toggleInert(newBtnContainer);
    }
  });

  projectBtn.addEventListener("click", () => {
    hideError(newProjectInput, newProjectInputErrorMsg);
    emptyInput(newProjectInput);
    newProjectContainer.classList.toggle("visible");
    toggleInert(newBtnContainer);

    if (newProjectContainer.classList.contains("visible")) {
      renderSavedProjects(newProjectListContainer, projects, todos, existingID);

      bindProjectEvents(
        { newProjectContainer, newProjectListContainer, newBtnContainer },
        projects,
        todos,
        existingID,
      );
    }
  });
}

// Add new todo / open todo-template-popup
export function bindSavedTodoEvents({ containerRight }) {
  const addToDoBtn = document.querySelector(".add-toDo-btn");
  addToDoBtn.addEventListener("click", () => {
    const toDoCard = createTodo();
    mainContainer.appendChild(toDoCard);
    
    toggleInert(hamburgerMenuBtn);
    toggleInert(containerRight);
  });

  // Open clicked todo
  containerRight.addEventListener("click", (e) => {
    const clickedTodo = e.target.closest(".todo");
    if (!clickedTodo) return;
    
    toggleInert(hamburgerMenuBtn);
    toggleInert(containerRight);

    const title = clickedTodo.querySelector("input[data-title-id]");
    const titleID = title?.dataset.titleId;
    if (!titleID) return;

    const savedTodoCard = createTodo(titleID);
    buildTodoCard(savedTodoCard, titleID);
    mainContainer.appendChild(savedTodoCard);
  });
}

function buildTodoCard(todoCard, todoId) {
  const retrievedTodo = todos.getTodos().find(obj => obj.ID === todoId);
  if (!retrievedTodo) return;

  const priorityCircle = todoCard.querySelector(".priority-circle");
  const titleInput = todoCard.querySelector(".title-text");
  const notesContainer = todoCard.querySelector(".new-notes-container");
  const reminderContainer = todoCard.querySelector(".reminder-container");
  const reminderSpan = todoCard.querySelector(".reminder-txt-span");

  priorityCircle.style.backgroundColor = retrievedTodo.priority;
  titleInput.value = retrievedTodo.title;
  fillNotes(notesContainer, retrievedTodo.notes);

  if (retrievedTodo.dueDate) {
    const formattedDateTime = formatDateTime(retrievedTodo.dueDate);
    reminderSpan.textContent = formatForUser(formattedDateTime);
    reminderContainer.classList.add("active");
  } else {
    reminderSpan.textContent = "";
    reminderContainer.classList.remove("active");
  }
}