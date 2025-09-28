import { Todo } from "./Todo.js";
import { AllTodos } from "./AllTodos.js";
import { Project } from "./Project.js";
import { projects } from "./projects.js";
import {
  getDueDate,
  formatDateTime,
  formatForUser,
} from "./utils/dateUtils.js";
import {
  createNewNote,
  resizeNote,
  addPlaceholder,
  removePlaceholder,
  placeCaretAtStart,
} from "./utils/noteUtils.js";
import { createTodoUI } from "./ui/todoUI.js";
import { bindTodoEvents } from "./ui/todoEvents.js";
import { makeRenderTodos } from "./utils/renderUtils.js";
import {
  createDiv, 
  createInput, 
  createSpan, 
  createBtn,
} from "./helpers.js";

import projectFolderImgLight from "./assets/images/project-folder-lighter.svg";
import savedTodoImg from "./assets/images/saved.svg";
import deleteLighter from "./assets/images/delete-lighter.svg";
import editPencilLighter from "./assets/images/edit-pencil-lighter.svg";
import checkLighter from "./assets/images/check-lighter.svg";
import saveLighter from "./assets/images/save-lighter.svg";
import selectedFolder from "./assets/images/selected-folder.svg";
import { bindTodoEvents } from "./ui/todoEvents.js";

const containerRight = document.querySelector(".container-right");
const addToDoBtn = document.querySelector(".add-toDo-btn");
const navUL = document.querySelector(".nav-ul");
const todos = new AllTodos();
const renderTodos = makeRenderTodos(containerRight, todos);

function createTodo(existingID = null) {
  const { root, refs } = createTodoUI(existingID);
  const { 
    newProjectListContainer, 
    newProjectContainer,
    newNotesContainer,
    newPriorityCircle,
    newTitle,
    newDateInput,
  } = refs;
  bindTodoEvents(root, refs, todos, projects, existingID);

  // Move to noteUtils?
  function appendExtraNote(prevNote, extraNote) {
    prevNote.after(extraNote);
    focusNote(extraNote);
  }

  function focusNote(note) {
    note.focus();
  }


  newProjectInput.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && newProjectInput.value === "") {
      hideError();
    }
  });

  newProjectInput.addEventListener("input", () => {
    const inputName = newProjectInput.value.trim();
    const { valid, error } = validateProjectName(inputName);
    
    if (!valid) {
      showError(error);
    } else {
      hideError(); 
    }
  });

  addProjectBtn.addEventListener("click", () => {
    const inputName = newProjectInput.value.trim();
    const { valid, error } = validateProjectName(inputName);
    
    if (!valid) {
      showError(error);
      return;
    }
    hideError();
    
    // Add new project
    const newProject = new Project(inputName);
    projects.addProject(newProject);
    emptyInput();
    
    const projectRow = createProjectListItem(newProject);
    newProjectListContainer.prepend(projectRow);
  });

  function validateProjectName(name) {
    if (!name) {
      return { valid: false, error: "Name cannot be empty" };
    }

    if (projects.checkDuplicateName(name)) {
      return { valid: false, error: "This name already exists" };
    }

    return { valid: true, error: "" };
  }

  function emptyInput() {
    newProjectInput.value = "";
  }

  function showError(msg) {
    newProjectInput.style.borderColor = "red";
    newProjectInputErrorMsg.textContent = msg;
    newProjectInputErrorMsg.style.visibility = "visible";
  }

  function hideError() {
    newProjectInput.style.borderColor = "";
    newProjectInputErrorMsg.style.visibility = "hidden";  
  }

  function createProjectListItem(project) {
    const projectItemWrapper = createDiv({
      classes: ["project-item-wrapper"],
    });

    // Folder/trash btn + initial folder img, changes to delete
    const deleteProjectItemBtn = createBtn({
      classes: ["todo-btn", "delete-project-item-btn"],
      attrs: { type: "button", },
      imgSrc: projectFolderImgLight,
      imgClass: "delete-project-item-img",
      imgAlt: "Delete project item",
    });

    // Project item input
    const projectItemInput = createInput({
      classes: ["project-item-input"],
      attrs: {
        "data-title-id": `${project.ID}`,
        "aria-label": "project item input",
        type: "text",
        name: "project item input",
        autocomplete: "off",
        spellcheck: "false",
        maxlength: "20",
        readonly: "true",
      }
    });
    
    // Btn pencil/save
    const editProjectItemBtn = createBtn({
      classes: ["todo-btn", "edit-project-item-btn"],
      attrs: { type: "button", },
      imgSrc: editPencilLighter,
      imgClass: "edit-project-item-img",
      imgAlt: "Edit project item",
    });

    projectItemInput.value = project.name;

    // Append buttons and input to project item wrapper (row)
    projectItemWrapper.appendChild(deleteProjectItemBtn);
    projectItemWrapper.appendChild(projectItemInput);
    projectItemWrapper.appendChild(editProjectItemBtn);

    return projectItemWrapper;
  }
  
  // Refactor with event delegation
  saveBtn.addEventListener("click", () => {
    getTodoInput(newPriorityCircle, newTitle, newNotesContainer, newDateInput, existingID);
    renderTodos(existingID); 
    projects.tempID = null; 
    showTodoBtn();  
  });

  dueDateBtn.addEventListener("click", () => {
    newDateTimeContainer.classList.toggle("visible");
  });

  closeDateTimeBtn.addEventListener("click", () => {
    newDateTimeContainer.classList.toggle("visible");
    const dateTime = getDueDate(newDateInput.value);
    
    if (dateTime) {
      const formattedDT = formatDateTime(dateTime)
      newReminderSpan.textContent = formatForUser(formattedDT);
      newReminderContainer.classList.add("active");
    } 
  });

  // Add removeReminderBtn and closeDateTimeBtn to clearReminder
  // Ask for notifications

  // Revise to add new 
  newTitle.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const firstNote = newNotesContainer.firstElementChild;
      e.preventDefault();
      e.stopPropagation(); 
      
      resizeNote(firstNote);
      firstNote.focus();
      placeCaretAtStart(firstNote);
    }
  });

  // Note resizing on input
  newNotesContainer.addEventListener("input", (e) => {
    const target = e.target;

    if (target.tagName === "TEXTAREA" && target.classList.contains("note")) {
      resizeNote(target);
    }
  });


  // Revise 
  newNotesContainer.addEventListener("keydown", (e) => {
    const targetNote = e.target;
    const prevNote = targetNote.previousElementSibling;
    const notes = Array.from(newNotesContainer.children);
    const index = notes.indexOf(targetNote);

    if (targetNote.tagName !== "TEXTAREA" || !targetNote.classList.contains("note")) {
      return;
    }

    // Append an extra note on enter
    if (e.key === "Enter") {
      e.preventDefault();
      removePlaceholder(targetNote);
      const extraNote = createNewNote();
      removePlaceholder(extraNote);
      
      // Add targetNote transferring to extraNote
      if (targetNote.value) {
        const targetNoteStartCaretPos = targetNote.selectionStart;
        extraNote.value = targetNote.value.slice(targetNoteStartCaretPos).trim();
        targetNote.value = targetNote.value.slice(0, targetNoteStartCaretPos);
        extraNote.setSelectionRange(0, 0);
      }
      appendExtraNote(targetNote, extraNote);
    }
    // Deleting a note   
    if (e.key === "Backspace" && index > 0) {
      if (prevNote && !targetNote.value) {
        removePlaceholder(newNotesContainer.firstElementChild);
        targetNote.remove();
        prevNote.focus();
        e.preventDefault();
      } else if (prevNote && targetNote.value && targetNote.selectionStart === 0) {
        const targetNoteValue = targetNote.value;
        targetNote.remove();
        e.preventDefault();
        prevNote.focus();
        prevNote.setSelectionRange(prevNote.value.length, prevNote.value.length);
        prevNote.value += targetNoteValue;
        
        const prevNoteLength = prevNote.value.length;
        const targetNoteLength = targetNoteValue.length;
        const caretPos = prevNoteLength - targetNoteLength;
        prevNote.setSelectionRange(caretPos, caretPos);
      } 
    } else if (e.key === "Backspace" && index === 0 && targetNote.value.trim() === "") {
      addPlaceholder(targetNote);
    }
  });
  
  newReminderContainer.addEventListener("click", (e) => {
    const removeBtn = e.target.closest(".remove-reminder-btn");

    if (removeBtn) {
      if (existingID) {
        const todoUpdate = todos.getTodos().find(obj => obj.ID === existingID);
        removeReminderSpan(newReminderSpan, newReminderContainer);
        if (!todoUpdate) return;

        if (todoUpdate.dueDate) {
          todoUpdate.dueDate = null;
          todoUpdate.clearReminder();
          removeReminderSpan(newReminderSpan, newReminderContainer);
        }
      } else {
        clearDateInput(newDateInput);
        removeReminderSpan(newReminderSpan, newReminderContainer);
      }
    } 
    
    if (newReminderContainer.classList.contains("active")) {
      toggleDateTimeContainerVisibility(newReminderContainer);
    }
  });

  hideTodoBtn();
  return root;
}

function toggleDateTimeContainerVisibility(container) {
  container.classList.toggle("visible");
}

function clearDateInput(dateInput) {
  dateInput.value = "";
}

function removeReminderSpan(reminderSpan, reminderContainer) {
  reminderSpan.textContent = "";
  reminderContainer.classList.remove("active");
}


function checkExistingProject(todo) {
  return todo.projectID ? todo.projectID : null;
}

function markSelectedProject(target) {
    target.classList.add("selected-project");
  }

function renderSavedProjects(newProjectListContainer, projects) {
// Get the projects from Projects and renderTodos, add ID to attr
newProjectListContainer.replaceChildren();
if (projects.arr === 0) return;

  projects.arr.forEach(project => {
    const newProjectRow = createProjectListItem(project);
    // if existingID, get project name if there is one, mark selected
    const currentTodo = todos.getTodos().find(obj => obj.ID === existingID);
    
    // revise
    // If rendered upon opening and there's a saved todo
    let selectedProjectID;
    if (currentTodo && !projects.tempID) {
      selectedProjectID = checkExistingProject(currentTodo);
      if (selectedProjectID === project.ID) {
        markSelectedProject(newProjectRow);
      }   
    // If yet unsaved todo
    } else if (projects.tempID) {
      if (project.ID === projects.tempID) {
        markSelectedProject(newProjectRow);
      }
    }
    newProjectListContainer.appendChild(newProjectRow);
  });
}



function getTodoInput(newPriorityCircle, title, notesContainer, newDateInput, existingID) {
  // revise bgClr
  const priorityValue = getComputedStyle(newPriorityCircle).backgroundColor;
  const titleValue = title.value;
  const notes = [...notesContainer.querySelectorAll(".note-text")].map(input => input.value.trim());
  // Temporary project ID
  const projectID = projects.tempID;
  
  const reminderContainer = document.querySelector(".reminder-container");
  const reminderSpan = document.querySelector(".reminder-span");
  
  const dueDateISO = getDueDate(newDateInput.value);
  
  if (dueDateISO) {
    const formattedDateTime = formatDateTime(dueDateISO)
    reminderSpan.textContent = formatForUser(formattedDateTime);
  } else {
    reminderSpan.textContent = ""; 
    reminderContainer.classList.remove("active");
  }

  if (!existingID) {
    const newTodo = new Todo(priorityValue, titleValue, notes, dueDateISO, projectID);
    todos.addTodo(newTodo);
  } else {
    const todoUpdate = todos.getTodos().find(obj => obj.ID === existingID);
    if (!todoUpdate) return;

    todoUpdate.priority = priorityValue;
    todoUpdate.title = titleValue;
    todoUpdate.notes = notes;

    if (dueDateISO) {
      todoUpdate.dueDate = dueDateISO;
      todoUpdate.setReminder(dueDateISO, () => {
        alert(titleValue);
      });
    }

    if (projectID) {
      todoUpdate.projectID = projectID;
    }
  }
}

function showTodoBtn() {
  addToDoBtn.style.display = "flex";
}

function hideTodoBtn() {
  addToDoBtn.style.display = "none";
} 


export {
  todos, 
  createTodo,
  renderSavedProjects,
};