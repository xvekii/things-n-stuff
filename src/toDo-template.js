import { Todo } from "./Todo.js";
import { AllTodos } from "./AllTodos.js";
import { Project } from "./Project.js";
import { projects } from "./projects.js";
import { format, formatISO, parseISO } from "date-fns";

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
import saveLighter from "./assets/images/save-lighter.svg";
import selectedFolder from "./assets/images/selected-folder.svg";
const containerRight = document.querySelector(".container-right");
const addToDoBtn = document.querySelector(".add-toDo-btn");
const navUL = document.querySelector(".nav-ul");
const todos = new AllTodos();

function createTodo(existingID = null) {
  const newTodoCard = document.createElement("div");
  const newPriorityCircle = document.createElement("span");
  const newTitle = document.createElement("input");
  const newNotesContainer = document.createElement("div");
  const newBtnContainer = document.createElement("div");
  const newReminderContainer = document.createElement("div");
  const newReminderSpan = document.createElement("span");
  const newPriorityContainer = document.createElement("div");
  const newPriorityTitle = document.createElement("h5");
  const newPriorityBtnContainer = document.createElement("div");

  const newProjectContainer = document.createElement("div");
  const newProjectTitle = document.createElement("h5");
  const newProjectListContainer = document.createElement("div");
  const newProjectInputContainer = document.createElement("div");
  const newProjectInputWrapper = document.createElement("div");
  const newProjectInputErrorMsg = document.createElement("span");
  const newProjectInput = document.createElement("input");
  const newProjectBtnContainer = document.createElement("div");

  const newDateTimeContainer = document.createElement("div");
  const newDateInput = document.createElement("input");
  const dataTitleID = existingID ? existingID : "temp1";
  const LOW = "#FFFFFF";
  const NORMAL = "#06D6A0";
  const MEDIUM = "#FFD166";
  const HIGH = "#EF476F";

  newTitle.setAttribute("type", "text");
  newTitle.setAttribute("class", "title-text");
  newTitle.setAttribute("data-title-id", `${dataTitleID}`);
  newTitle.setAttribute("name", "title");
  newTitle.setAttribute("placeholder", "Title");
  newTitle.setAttribute("autocomplete", "off");
  newTitle.setAttribute("spellcheck", "false");
  newTitle.setAttribute("maxlength", "24");
  newDateInput.setAttribute("type", "datetime-local");
  newProjectInput.setAttribute("type", "text");
  newProjectInput.setAttribute("class", "project-input");
  newProjectInput.setAttribute("name", "new project input");
  newProjectInput.setAttribute("placeholder", "New project name");
  newProjectInput.setAttribute("aria-label", "New project name");
  newProjectInput.setAttribute("autocomplete", "off");
  newProjectInput.setAttribute("spellcheck", "false");
  newProjectInput.setAttribute("maxlength", "20");
  
  newTitle.classList.add("title", "no-border");
  newTitle.contentEditable = "true";
  newPriorityCircle.classList.add("priority-circle");
  newNotesContainer.classList.add("new-notes-container");
  newReminderContainer.classList.add("reminder-container");
  newReminderSpan.classList.add("reminder-span");
  newPriorityContainer.classList.add("toggle-priority");
  newPriorityTitle.classList.add("priority-title");
  newPriorityBtnContainer.classList.add("priority-btn-container");
 
  newProjectContainer.classList.add("toggle-project", "project-container");
  newProjectTitle.classList.add("project-title"); 
  newProjectListContainer.classList.add("project-list-container");
  newProjectInputContainer.classList.add("project-input-container");
  newProjectInputWrapper.classList.add("project-input-wrapper");
  newProjectInputErrorMsg.classList.add("project-input-error");
  newProjectBtnContainer.classList.add("project-btn-container"); 
  newDateTimeContainer.classList.add("toggle-datetime");

  newTodoCard.classList.add("todo-template-popup");
  newBtnContainer.classList.add("todo-btn-container");

  const removeReminderBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  const closeDateTimeBtn = document.createElement("button");
  const dueDateBtn = document.createElement("button");
  const priorityBtn = document.createElement("button");
  const closePriorityBtn = document.createElement("button");
  const projectBtn = document.createElement("button");
  const addProjectBtn = document.createElement("button");
  const saveProjectBtn = document.createElement("button");
  const saveBtn = document.createElement("button");

  closeDateTimeBtn.classList.add("close-datetime-btn");
  closeDateTimeBtn.textContent = "Close";
  closeDateTimeBtn.type = "button";

  removeReminderBtn.classList.add("remove-reminder-btn");
  removeReminderBtn.type = "button";
  deleteBtn.classList.add("todo-btn", "delete-btn");
  deleteBtn.type = "button";
  dueDateBtn.classList.add("todo-btn");
  dueDateBtn.type = "button";
  priorityBtn.classList.add("todo-btn");
  priorityBtn.type = "button";
  closePriorityBtn.classList.add("todo-btn", "close-priority-btn");
  closePriorityBtn.textContent = "Close";
  closePriorityBtn.type = "button";
  newPriorityTitle.textContent = "Select priority:";
  newProjectTitle.textContent = "Add to a project:"
  projectBtn.classList.add("todo-btn", "project-btn");
  projectBtn.type = "button";
  addProjectBtn.classList.add("todo-btn", "add-project-btn");
  addProjectBtn.type = "button";
  saveProjectBtn.classList.add("todo-btn", "save-project-btn");
  saveProjectBtn.type = "button";
  saveProjectBtn.textContent = "Save";
  saveBtn.classList.add("todo-btn");
  saveBtn.type = "button";

  const priorityLowBtn = document.createElement("button");
  const priorityNormalBtn = document.createElement("button");
  const priorityMediumBtn = document.createElement("button");
  const priorityHighBtn = document.createElement("button");

  priorityLowBtn.classList.add("priority-btn", "low");
  priorityLowBtn.type = "button";
  priorityNormalBtn.classList.add("priority-btn", "normal");
  priorityNormalBtn.type = "button";
  priorityMediumBtn.classList.add("priority-btn", "medium");
  priorityMediumBtn.type = "button";
  priorityHighBtn.classList.add("priority-btn", "high");
  priorityHighBtn.type = "button";

  priorityLowBtn.textContent = "Low";
  priorityNormalBtn.textContent = "Normal";
  priorityMediumBtn.textContent = "Medium";
  priorityHighBtn.textContent = "High"; 

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

  const removeReminderImg = document.createElement("img");
  removeReminderImg.classList.add("remove-reminder-img");
  removeReminderImg.src = closeReminderImg;
  removeReminderImg.alt = "Remove reminder";
  removeReminderBtn.appendChild(removeReminderImg);

  const deleteBtnImg = document.createElement("img");
  deleteBtnImg.src = deleteTodoImg;
  deleteBtnImg.alt = "Delete todo";
  deleteBtn.appendChild(deleteBtnImg);

  const dateBtnImg = document.createElement("img");
  dateBtnImg.src = dueDateImg;
  dateBtnImg.alt = "Set due date";
  dueDateBtn.appendChild(dateBtnImg);
  
  const priorityBtnImg = document.createElement("img");
  priorityBtnImg.src = priorityImg;
  priorityBtnImg.alt = "Set priority";
  priorityBtn.appendChild(priorityBtnImg);

  const projectBtnImg = document.createElement("img");
  projectBtnImg.src = projectFolderImg;
  projectBtnImg.alt = "Add to project";
  projectBtn.appendChild(projectBtnImg);

  const addProjectBtnImg = document.createElement("img");
  addProjectBtnImg.src = addProjectImg;
  addProjectBtnImg.alt = "Add project";
  addProjectBtn.appendChild(addProjectBtnImg);

  const saveBtnImg = document.createElement("img");
  saveBtnImg.src = saveTodoImg;
  saveBtnImg.alt = "Save";
  saveBtn.appendChild(saveBtnImg);

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

  // navUL.addEventListener("click", (e) => {
  //   const target = e.target;

  // });

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
        target.closest(".delete-project-item-btn")) {
        
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
    });
  }

  // Mark the passed target
  function markSelectedProject(target) {
    target.classList.add("selected-project");
  }

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
    
    // New Project class w project class - proj. name, create ID, rename()
    // New Projects module w Projects class (store all in array)
    
    // If existingID and input, save it on the existing todos.project
    // If no existingID, save the project name upon save/getTodoInput
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
    const projectItemWrapper = document.createElement("div");
    projectItemWrapper.classList.add("project-item-wrapper");

    // Folder/trash btn + initial folder img, changes to delete
    const deleteProjectItemBtn = document.createElement("button");
    deleteProjectItemBtn.classList.add("todo-btn", "delete-project-item-btn");
    deleteProjectItemBtn.type = "button";

    const deleteProjectItemBtnImg = document.createElement("img");
    deleteProjectItemBtnImg.classList.add("delete-project-item-img");
    deleteProjectItemBtnImg.src = projectFolderImgLight;
    deleteProjectItemBtnImg.alt = "Delete project item";

    // Project item input
    const projectItemInput = document.createElement("input");
    projectItemInput.setAttribute("type", "text");
    projectItemInput.setAttribute("class", "project-item-input");
    projectItemInput.setAttribute("data-title-id", `${project.ID}`);
    projectItemInput.setAttribute("name", "project item input");
    projectItemInput.setAttribute("aria-label", "project item input");
    projectItemInput.setAttribute("autocomplete", "off");
    projectItemInput.setAttribute("spellcheck", "false");
    projectItemInput.setAttribute("maxlength", "20");
    projectItemInput.setAttribute("readonly", true);
    
    // Btn pencil/save
    const editProjectItemBtn = document.createElement("button");
    editProjectItemBtn.classList.add("todo-btn", "edit-project-item-btn");
    editProjectItemBtn.type = "button";

    const editProjectItemBtnImg = document.createElement("img");
    editProjectItemBtnImg.classList.add("edit-project-item-img");
    editProjectItemBtnImg.src = editPencilLighter;
    editProjectItemBtnImg.alt = "Edit project item";

    // Append images to their buttons
    deleteProjectItemBtn.appendChild(deleteProjectItemBtnImg);
    editProjectItemBtn.appendChild(editProjectItemBtnImg);
    
    // Transfer project input value into the list item input
    // Create a new instance of Project, push to Projects
    // Check for existing name 
    projectItemInput.value = project.name;

    // Append buttons and input to project item wrapper (row)
    projectItemWrapper.appendChild(deleteProjectItemBtn);
    projectItemWrapper.appendChild(projectItemInput);
    projectItemWrapper.appendChild(editProjectItemBtn);

    return projectItemWrapper;
  }
  // saveProjectBtn - save the project ID to 
  // add deleteProject - 
  
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

function getDueDate(newDateTimeInput) {
  if (!newDateTimeInput.trim()) return null;

  const parsedDateTime = parseISO(newDateTimeInput);
  return formatISO(parsedDateTime);
}

function formatDateTime(isoString) {
  const dateTime = parseISO(isoString);
  return format(dateTime, "MMM d, HH:mm");
}

function formatForUser(isoString) {
  const date = new Date(isoString);
  
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}


// Revise
let noteIdCounter = 0;

function createNewNote() {
  noteIdCounter += 1;
  const newNote = document.createElement("textarea");

  newNote.setAttribute("class", "note-text");
  newNote.setAttribute("cols", "12");
  newNote.setAttribute("rows", "1");
  newNote.setAttribute("wrap", "hard");
  newNote.setAttribute("maxlength", "580");
  newNote.setAttribute("id", `note-${noteIdCounter}`);
  newNote.setAttribute("name", "note");
  newNote.setAttribute("placeholder", "Write a note...");
  newNote.setAttribute("autocomplete", "off");
  newNote.setAttribute("autocorrect", "off");
  newNote.setAttribute("spellcheck", "false");
  newNote.classList.add("note", "no-border");

  return newNote;
}
// Render saved todos
// Refactor with several smaller functions
function renderTodos(existingID = null, deleting = null) {
  containerRight.replaceChildren();

  const retrievedTodos = todos.getTodos();
  retrievedTodos.forEach((todo, idx) => {
    const newTodoCard = document.createElement("div");
    const newPriority = document.createElement("span");
    const newTitle = document.createElement("input");

    newTitle.setAttribute("class", "title-text");
    newTitle.setAttribute("data-title-id", `${todo.ID}`);
    newTitle.setAttribute("name", "title");
    newTitle.setAttribute("placeholder", "Title");

    newPriority.classList.add("priority-circle");
    newTitle.classList.add("title", "no-border");
    newTitle.contentEditable = "false";
    newTodoCard.classList.add("todo");

    if (todo.ID === existingID) {
      newTodoCard.classList.add("todo-saved");
    } else if (!existingID && idx === retrievedTodos.length - 1 && !deleting) {
      newTodoCard.classList.add("todo-saved");
    } 
    
    if (todo.priority) {
      newPriority.style.backgroundColor = todo.priority;
    }
    
    if (todo.title) {
      newTitle.value = todo.title;
    } 
    
    newTodoCard.appendChild(newPriority);
    newTodoCard.appendChild(newTitle);
    
    // Add note
    // Revise the number of notes visible 
    if (todo.notes && todo.notes.length > 0) {
      for (let i = 0; i < Math.min(3, todo.notes.length); i++) {
        const newNote = document.createElement("textarea");
        newNote.textContent = todo.notes[i];
        
        newNote.setAttribute("wrap", "hard");
        newNote.setAttribute("class", "todo-note");
        newNote.setAttribute("name", "note");
        newNote.setAttribute("rows", "1");
        newNote.classList.add("note", "no-border");

        newTodoCard.appendChild(newNote);
        // Add date container
      }
    }
    containerRight.appendChild(newTodoCard);
  });
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
  formatDateTime,
  formatForUser,
};