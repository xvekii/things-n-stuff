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
  createDiv, 
  createInput, 
  createTextarea,
  createSpan, 
  createHeading,
  createBtn,
} from "./helpers.js";

import closeReminderImg from "./assets/images/closeX.svg";
import deleteTodoImg from "./assets/images/delete.svg";
import dueDateImg from "./assets/images/due-date.svg";
import priorityImg from "./assets/images/priority-flag.svg";
import projectFolderImg from "./assets/images/project-folder.svg";
import projectFolderImgLight from "./assets/images/project-folder-lighter.svg";
import addProjectImg from "./assets/images/add-project.svg";
import saveTodoImg from "./assets/images/save.svg";
import savedTodoImg from "./assets/images/saved.svg";
import deleteLighter from "./assets/images/delete-lighter.svg";
import editPencilLighter from "./assets/images/edit-pencil-lighter.svg";
import checkLighter from "./assets/images/check-lighter.svg";
import saveLighter from "./assets/images/save-lighter.svg";
import selectedFolder from "./assets/images/selected-folder.svg";

const containerRight = document.querySelector(".container-right");
const addToDoBtn = document.querySelector(".add-toDo-btn");
const navUL = document.querySelector(".nav-ul");
const todos = new AllTodos();
const LOW = "#FFFFFF";
const NORMAL = "#06D6A0";
const MEDIUM = "#FFD166";
const HIGH = "#EF476F";


function createTodo(existingID = null) {
  const dataTitleID = existingID ? existingID : "temp1";
  const newTodoCard = createDiv({ classes: ["todo-template-popup"] });
  const newPriorityCircle = createSpan({ classes: ["priority-circle"] });
  
  const newTitle = createInput({
    classes: ["title", "title-text", "no-border"],
    attrs: {
      "data-title-id": `${dataTitleID}`,
      name: "title",
      type: "text",
      placeholder: "Title",
      autocomplete: "off",
      spellcheck: "false",
      maxlength: "24",
      contenteditable: "true",
    },
  });
  
  const newNotesContainer = createDiv({ classes: ["new-notes-container"] });
  const newBtnContainer = createDiv({ classes: ["todo-btn-container"] });
  const newReminderContainer = createDiv({ classes: ["reminder-container"] });
  const newReminderSpan = createSpan({ classes: ["reminder-span"] });
  const newPriorityContainer = createDiv({ classes: ["toggle-priority"]} );
  
  const newPriorityTitle = createHeading({
    classes: ["priority-title"], 
    headLvl: "h5",
    text: "Select priority:", 
  });
  
  const newPriorityBtnContainer = createDiv({ classes: ["priority-btn-container"] });
  const newProjectContainer = createDiv({ classes: ["project-container", "toggle-project"] });
  
  const newProjectTitle = createHeading({
    classes: ["project-title"],
    headLvl: "h5",
    text: "Add to a project:",
  });
  const newProjectListContainer = createDiv({ classes: ["project-list-container"] });
  const newProjectInputContainer = createDiv({ classes: ["project-input-container"] });
  const newProjectInputWrapper = createDiv({ classes: ["project-input-wrapper"] });
  const newProjectInputErrorMsg = createSpan({ classes: ["project-input-error"] });
  
  const newProjectInput = createInput({
    classes: ["project-input"],
    attrs: {
      "aria-label": "New project name",
      name: "new project input",
      type: "text",
      placeholder: "New project name",
      autocomplete: "off",
      spellcheck: "false",
      maxlength: "20",
    },
  });
  
  const newProjectBtnContainer = createDiv({ classes: ["project-btn-container"] });
  const newDateTimeContainer = createDiv({ classes: ["toggle-datetime"] });
  
  const newDateInput = createInput({ 
    classes: ["date-input"], 
    attrs: {
      type: "datetime-local",
    }, 
  });
 
  const removeReminderBtn = createBtn({
    classes: ["remove-reminder-btn"],
    attrs: { type: "button", },
    imgSrc: closeReminderImg,
    imgClass: "remove-reminder-img",
    imgAlt: "Remove reminder",
  });
  
  const deleteBtn = createBtn({
    classes: ["todo-btn", "delete-btn"],
    attrs: { type: "button", },
    imgSrc: deleteTodoImg,
    imgClass: "delete-btn-img",
    imgAlt: "Delete todo",
  });
  
  const closeDateTimeBtn = createBtn({
    classes: ["close-datetime-btn"],
    attrs: { type: "button", },
    text: "Close",
  });
  
  const dueDateBtn = createBtn({
    classes: ["todo-btn", "due-date-btn"],
    attrs: { type: "button", },
    imgSrc: dueDateImg,
    imgClass: "due-date-btn-img",
    imgAlt: "Set due date",
  });
  
  const priorityBtn = createBtn({
    classes: ["todo-btn", "open-priority-btn"],
    attrs: { type: "button", },
    imgSrc: priorityImg,
    imgClass: "priority-btn-img",
    imgAlt: "Set priority",
  });
  
  const closePriorityBtn = createBtn({
    classes: ["todo-btn", "close-priority-btn"],
    attrs: { type: "button", },
    text: "Close",
  });
  
  const projectBtn = createBtn({
    classes: ["todo-btn", "project-btn"],
    attrs: { type: "button", },
    imgSrc: projectFolderImg,
    imgClass: "project-btn-img",
    imgAlt: "Add to project",
  });
  
  const addProjectBtn = createBtn({
    classes: ["todo-btn", "add-project-btn"],
    attrs: { type: "button", },
    imgSrc: addProjectImg,
    imgClass: "add-project-btn-img",
    imgAlt: "Add project",
  });
  
  const saveProjectBtn = createBtn({
    classes: ["todo-btn", "save-project-btn"],
    attrs: { type: "button", },
    text: "Save",
  });
  
  const saveBtn = createBtn({
    classes: ["todo-btn", "save-todo-btn"],
    attrs: { type: "button", },
    imgSrc: saveTodoImg,
    imgClass: "save-todo-btn-img",
    imgAlt: "Save",
  });

  // Priority btns
  const priorityLowBtn = createBtn({
    classes: ["priority-btn", "low"],
    attrs: { type: "button", },
    text: "Low",
  });
  
  const priorityNormalBtn = createBtn({
    classes: ["priority-btn", "normal"],
    attrs: { type: "button", },
    text: "Normal",
  });
  
  const priorityMediumBtn = createBtn({
    classes: ["priority-btn", "medium"],
    attrs: { type: "button", },
    text: "Medium",
  });
  
  const priorityHighBtn = createBtn({
    classes: ["priority-btn", "high"],
    attrs: { type: "button", },
    text: "High",  
  });


  // Appending
  newReminderContainer.appendChild(newReminderSpan);
  newReminderContainer.appendChild(removeReminderBtn);

  newBtnContainer.appendChild(deleteBtn);
  newBtnContainer.appendChild(dueDateBtn);
  newBtnContainer.appendChild(priorityBtn);
  newBtnContainer.appendChild(projectBtn);
  newBtnContainer.appendChild(saveBtn);
  newBtnContainer.appendChild(newDateTimeContainer);
  
  newDateTimeContainer.appendChild(newDateInput);
  newDateTimeContainer.appendChild(closeDateTimeBtn);
  
  newPriorityContainer.appendChild(newPriorityTitle);
  newPriorityContainer.appendChild(newPriorityBtnContainer);
  newPriorityContainer.appendChild(closePriorityBtn);
  newPriorityBtnContainer.appendChild(priorityLowBtn);
  newPriorityBtnContainer.appendChild(priorityNormalBtn);
  newPriorityBtnContainer.appendChild(priorityMediumBtn);
  newPriorityBtnContainer.appendChild(priorityHighBtn);

  newBtnContainer.appendChild(newPriorityContainer);
  newBtnContainer.appendChild(newProjectContainer);
  
  newProjectContainer.appendChild(newProjectTitle);
  newProjectContainer.appendChild(newProjectListContainer);
  newProjectContainer.appendChild(newProjectInputContainer);
  newProjectInputContainer.appendChild(newProjectInputWrapper);
  newProjectInputWrapper.appendChild(newProjectInputErrorMsg);
  newProjectInputWrapper.appendChild(newProjectInput);
  newProjectInputContainer.appendChild(addProjectBtn);
  newProjectBtnContainer.appendChild(saveProjectBtn);
  newProjectContainer.appendChild(newProjectBtnContainer);

  newTodoCard.appendChild(newPriorityCircle);
  newTodoCard.appendChild(newTitle);
  newTodoCard.appendChild(newNotesContainer);
  newTodoCard.appendChild(newReminderContainer);
  newTodoCard.appendChild(newBtnContainer);

  const newNote = createNewNote();
  newNotesContainer.appendChild(newNote);

  function appendExtraNote(prevNote, extraNote) {
    prevNote.after(extraNote);
    focusNote(extraNote);
  }

  function focusNote(note) {
    note.focus();
  }

  // Revise - add method to AllTodos for removing

  deleteBtn.addEventListener("click", () => {
    const todoCard = deleteBtn.closest(".todo-template-popup"); 
    const title = todoCard.querySelector("input[data-title-id]");
    const titleID = title.dataset.titleId;
    const currentTodos = todos.getTodos();
    
    currentTodos.forEach((todo, index) => {
      if (titleID === todo.ID) {
        currentTodos.splice(index, 1);
      }
    });
    renderTodos(existingID, true);
    showTodoBtn(); 
  });

  priorityBtn.addEventListener("click", () => {
    newPriorityContainer.classList.toggle("visible");
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
    }
  });

  projectBtn.addEventListener("click", () => {
    hideError();
    emptyInput();
    newProjectContainer.classList.toggle("visible");

    if (newProjectContainer.classList.contains("visible")) {
      renderSavedProjects();
    }
  });

  // pass in newProjectListContainer
  function renderSavedProjects() {
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

  function checkExistingProject(todo) {
    return todo.projectID ? todo.projectID : null;
  }

  // Temporarily store currently selected project
  if (newProjectContainer) {
    newProjectContainer.addEventListener("click", (e) => {
      const target = e.target;

      // Temporarily store the selected project ID
      if (target.closest(".save-project-btn")) {
        const selectedInput = newProjectListContainer.querySelector(
        ".project-item-wrapper.selected-project .project-item-input"
        );
        const selectedID = selectedInput ? selectedInput.dataset.titleId : null;
        
        projects.tempID = selectedID || null;
        newProjectContainer.classList.toggle("visible");
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
          const allWrappers = newProjectListContainer.querySelectorAll(".project-item-wrapper");
          allWrappers.forEach(w => w.classList.toggle("selected-project", w === wrapper));

          // Mark selected project item (row)
          markSelectedProject(wrapper);
          
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
            switchEditingMode(closestInput, editImg, deleteProjImg);
            toggleDeleteProjBtn(deleteProjBtn);
          }
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
          renderSavedProjects();
        }
      }
    });
  }

  // Switch btn imgs - project folder / delete project; edit / check 
  function switchEditingMode(input, editImgEl, deleteImgEl) {
    if (!input.hasAttribute("readonly")) {
      editImgEl.src = checkLighter;
      deleteImgEl.src = deleteLighter;
    } else {
      editImgEl.src = editPencilLighter;
      deleteImgEl.src = projectFolderImgLight;
    }
  }

  function toggleDeleteProjBtn(delProjBtn) {
    delProjBtn.classList.toggle("active");
  }
  
  function markSelectedProject(target) {
    target.classList.add("selected-project");
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
        if (!todoUpdate) return;

        if (todoUpdate.dueDate) {
          todoUpdate.dueDate = null;
          todoUpdate.clearReminder();
          newReminderSpan.textContent = "";
          newReminderContainer.classList.remove("active");
        }
      } else {
        newDateInput.value = "";
        newReminderSpan.textContent = "";
        newReminderContainer.classList.remove("active");
      }
    } else if (newReminderContainer.classList.contains("active")) {
      newDateTimeContainer.classList.toggle("visible");
    }
  });

  hideTodoBtn();
  return newTodoCard;
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


// Revise
let noteIdCounter = 0;

function createNewNote() {
  noteIdCounter += 1;
  
  const newNote = createTextarea({
    classes: ["note", "note-text", "no-border"],
    attrs: {
      id: `note-${noteIdCounter}`,
      name: "note",
      cols: "12",
      rows: "1",
      wrap: "hard",
      maxlength: "580",
      placeholder: "Write a note...",
      autocomplete: "off",
      autocorrect: "off",
      spellcheck: "false",
    }
  });

  return newNote;
}
// Render saved todos
// Refactor with several smaller functions
function renderTodos(existingID = null, deleting = null) {
  containerRight.replaceChildren();

  const retrievedTodos = todos.getTodos();
  retrievedTodos.forEach((todo, idx) => {
    const newTodoCard = createDiv({
      classes: ["todo"],
    });
    const newPriority = createSpan({
      classes: ["priority-circle"],
    });
    const newTitle = createInput({
      classes: ["title", "title-text", "todo-no-edit", "no-border"],
      attrs: { 
        "data-title-id": `${todo.ID}`,
        name: "title",
        placeholder: "Title",
        contenteditable: "false",
      }
    });

    if (todo.ID === existingID) {
      newTodoCard.classList.add("todo-saved");
    } else if (!existingID && idx === retrievedTodos.length - 1 && !deleting) {
      newTodoCard.classList.add("todo-saved");
    } 
    
    if (todo.priority) {
      setPriority(newPriority, todo.priority);
    }
    
    if (todo.title) {
      setTitle(newTitle, todo.title);
    } 
    
    newTodoCard.appendChild(newPriority);
    newTodoCard.appendChild(newTitle);
    containerRight.appendChild(newTodoCard);
  });
}

function setTitle(titleEl, titleVal) {
  titleEl.value = titleVal;
}

function setPriority(priorityEl, priorityVal) {
  priorityEl.style.backgroundColor = priorityVal;
}

function showTodoBtn() {
  addToDoBtn.style.display = "flex";
}

function hideTodoBtn() {
  addToDoBtn.style.display = "none";
}

// Revise
function removePlaceholder(note) {
  note.removeAttribute("placeholder");
}

// Revise
function addPlaceholder(note) {
  note.setAttribute("placeholder", "Write a note...");
} 

function resizeNote(note) {
  requestAnimationFrame(() => {
    note.style.height = "auto";
    note.style.height = note.scrollHeight + "px";
  });
}

function placeCaretAtStart(el) {
  el.setSelectionRange(0, 0);
} 


export {
  todos, 
  createTodo,
  createNewNote, 
  removePlaceholder,
  addPlaceholder,
  resizeNote,
};