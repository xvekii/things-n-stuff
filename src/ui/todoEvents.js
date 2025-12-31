import { renderTodos, renderSavedProjects } from "../toDo-template.js";
import { hideError, emptyInput, showTodoBtn, toggleInert, isActive } from "../utils/uiUtils.js";
import { bindProjectEvents } from "./projectEvents.js"; 
import { saveToLS } from "../services/storageService.js";
import { createTodo, todos, hamburgerMenuBtn } from "../toDo-template.js";
import { formatForUser } from "../utils/dateUtils.js";
import { fillNotes } from "../utils/noteUtils.js";
import { mainContainer } from "../index.js";
import { PRIORITY_LEVELS } from "../utils/priorityUtils.js";
import { setPriority } from "../utils/renderUtils.js";

export function bindTodoEvents(todoCard, refs, todos, projects, existingID) {
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
    newReminderContainer,
  } = refs;

  const { LOW_LVL, NORMAL_LVL, MEDIUM_LVL, HIGH_LVL } = PRIORITY_LEVELS;

  deleteBtn.addEventListener("click", () => {
    const containerRight = document.querySelector(".container-right");
    const title = todoCard.querySelector("input[data-title-id]");
    const titleID = title.dataset.titleId;

    todoCard.remove();
    
    toggleInert(hamburgerMenuBtn);
    toggleInert(containerRight);
    
    const currentTodos = todos.getTodos();

    currentTodos.forEach((todo, index) => {
      if (titleID === todo.ID) {
        currentTodos.splice(index, 1);
      }
    });
    saveToLS("lsTodos", todos.getTodos());
    renderTodos({ existingID, deleting: true });
    showTodoBtn(document.querySelector(".add-toDo-btn")); 
  });

  priorityBtn.addEventListener("click", () => {
    newPriorityContainer.classList.toggle("visible");
    toggleInert(newBtnContainer);
    if (isActive(newReminderContainer)) {
      toggleInert(newReminderContainer);
    }
  });

  newPriorityBtnContainer.addEventListener("click", (e) => {
    const clickedBtn = e.target;

    if (clickedBtn.classList.contains("low")) {
      setPriority(newPriorityCircle, LOW_LVL);
    }

    if (clickedBtn.classList.contains("normal")) {
      setPriority(newPriorityCircle, NORMAL_LVL);
    }

    if (clickedBtn.classList.contains("medium")) {
      setPriority(newPriorityCircle, MEDIUM_LVL);
    }

    if (clickedBtn.classList.contains("high")) {
      setPriority(newPriorityCircle, HIGH_LVL);
    }
  });

  newPriorityContainer.addEventListener("click", (e) => {
    const clickedBtn = e.target;

    if (clickedBtn.classList.contains("close-priority-btn")) {
      newPriorityContainer.classList.remove("visible");
      toggleInert(newBtnContainer);
      if (isActive(newReminderContainer)) {
        toggleInert(newReminderContainer);
      }
    }
  });

  projectBtn.addEventListener("click", () => {
    hideError(newProjectInput, newProjectInputErrorMsg);
    emptyInput(newProjectInput);
    newProjectContainer.classList.toggle("visible");
    toggleInert(newBtnContainer);
    if (isActive(newReminderContainer)) {
      toggleInert(newReminderContainer);
    }

    if (newProjectContainer.classList.contains("visible")) {
      renderSavedProjects(newProjectListContainer, projects, todos, existingID);

      bindProjectEvents(
        { newProjectContainer, newProjectListContainer, newBtnContainer, newReminderContainer },
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
    const titleID = title.dataset.titleId;
    if (!titleID) return;

    const savedTodoCard = createTodo(titleID);
    populateTodoCard(savedTodoCard, titleID);
    mainContainer.appendChild(savedTodoCard);
  });
}

function populateTodoCard(todoCard, todoId) {
  const retrievedTodo = todos.getTodos().find(obj => obj.ID === todoId);
  if (!retrievedTodo) return;

  const priorityCircle = todoCard.querySelector(".priority-circle");
  const titleInput = todoCard.querySelector(".title-text");
  const notesContainer = todoCard.querySelector(".new-notes-container");
  const reminderContainer = todoCard.querySelector(".reminder-container");
  const reminderSpan = todoCard.querySelector(".reminder-txt-span");

  setPriority(priorityCircle, retrievedTodo.priority);
  titleInput.value = retrievedTodo.title;
  fillNotes(notesContainer, retrievedTodo.notes);

  if (retrievedTodo.dueDate) {
    reminderSpan.textContent = formatForUser(retrievedTodo.dueDate);
    reminderContainer.classList.add("active");
  } else {
    reminderSpan.textContent = "";
    reminderContainer.classList.remove("active");
  }
}