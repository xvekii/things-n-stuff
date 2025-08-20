import { Todo } from "./Todo.js";
import { AllTodos } from "./AllTodos.js";
import deleteTodoImg from "./assets/images/delete.svg";
import dueDateImg from "./assets/images/due-date.svg";
import priorityImg from "./assets/images/priority-flag.svg";
import projectFolderImg from "./assets/images/project-folder.svg";
import saveTodoImg from "./assets/images/save.svg";
import savedTodoImg from "./assets/images/saved.svg";
const containerRight = document.querySelector(".container-right");
const addToDoBtn = document.querySelector(".add-toDo-btn");
const todos = new AllTodos();

function createTodo(isExistingTodo, existingID = null) {
  const newTodoCard = document.createElement("div");
  const newTitle = document.createElement("input");
  const newNotesContainer = document.createElement("div");
  const newBtnContainer = document.createElement("div");
  const newReminderContainer = document.createElement("div");
  const newPriorityContainer = document.createElement("div");
  const newPriorityTitle = document.createElement("h5");
  const newPriorityBtnContainer = document.createElement("div");
  const newDateTimeContainer = document.createElement("div");
  const newDateInput = document.createElement("input");
  const dataTitleID = existingID ? existingID : "temp1";

  newTitle.setAttribute("type", "text");
  newTitle.setAttribute("class", "title-text");
  newTitle.setAttribute("data-title-id", `${dataTitleID}`);
  newTitle.setAttribute("name", "title");
  newTitle.setAttribute("placeholder", "Title");
  newTitle.setAttribute("autocomplete", "off");
  newTitle.setAttribute("maxlength", "25");
  newDateInput.setAttribute("type", "datetime-local");
  
  newTitle.classList.add("title", "no-border");
  newTitle.contentEditable = "true";
  newNotesContainer.classList.add("new-notes-container");
  newReminderContainer.classList.add("reminder-container");
  newPriorityContainer.classList.add("toggle-priority");
  newPriorityTitle.classList.add("priority-title");
  newPriorityBtnContainer.classList.add("priority-btn-container");
  newDateTimeContainer.classList.add("toggle-datetime");

  newTodoCard.classList.add("todo-template-popup");
  newBtnContainer.classList.add("todo-btn-container");

  const closeDateTimeBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  const dueDateBtn = document.createElement("button");
  const priorityBtn = document.createElement("button");
  const projectBtn = document.createElement("button");
  const saveBtn = document.createElement("button");

  closeDateTimeBtn.classList.add("close-datetime-btn");
  closeDateTimeBtn.textContent = "Close";
  deleteBtn.classList.add("todo-btn", "delete-btn");
  dueDateBtn.classList.add("todo-btn");
  priorityBtn.classList.add("todo-btn");
  newPriorityTitle.textContent = "Select priority:";
  projectBtn.classList.add("todo-btn");
  saveBtn.classList.add("todo-btn");

  const priorityLowBtn = document.createElement("button");
  const priorityNormalBtn = document.createElement("button");
  const priorityMediumBtn = document.createElement("button");
  const priorityHighBtn = document.createElement("button");

  priorityLowBtn.classList.add("priority-btn", "low");
  priorityNormalBtn.classList.add("priority-btn", "normal");
  priorityMediumBtn.classList.add("priority-btn", "medium");
  priorityHighBtn.classList.add("priority-btn", "high");

  priorityLowBtn.textContent = "Low";
  priorityNormalBtn.textContent = "Normal";
  priorityMediumBtn.textContent = "Medium";
  priorityHighBtn.textContent = "High"; 

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
  newPriorityBtnContainer.appendChild(priorityLowBtn);
  newPriorityBtnContainer.appendChild(priorityNormalBtn);
  newPriorityBtnContainer.appendChild(priorityMediumBtn);
  newPriorityBtnContainer.appendChild(priorityHighBtn);
  
  newBtnContainer.appendChild(newPriorityContainer);

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
  
  const saveBtnImg = document.createElement("img");
  saveBtnImg.src = saveTodoImg;
  saveBtnImg.alt = "Save";
  saveBtn.appendChild(saveBtnImg);

  newTodoCard.appendChild(newTitle);
  newTodoCard.appendChild(newNotesContainer);
  newTodoCard.appendChild(newReminderContainer);
  newTodoCard.appendChild(newBtnContainer);

  const newNote = createNewNote();
  newNotesContainer.appendChild(newNote);

  function appendExtraNote(prevNote, extraNote) {
    prevNote.after(extraNote);
  }

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
    renderTodos();
    showTodoBtn(); 
  });

  priorityBtn.addEventListener("click", () => {
    newPriorityContainer.classList.toggle("visible");
  });

  saveBtn.addEventListener("click", () => {
    getTodoInput(newTitle, newNotesContainer, newDateInput, isExistingTodo, existingID);
    renderTodos();  
    showTodoBtn();  
  });

  dueDateBtn.addEventListener("click", () => {
    newDateTimeContainer.classList.toggle("visible");

  });

  closeDateTimeBtn.addEventListener("click", () => {
    newDateTimeContainer.classList.toggle("visible");
  });

  newTitle.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const firstNote = newNotesContainer.firstElementChild;
      firstNote.focus();
    }
  });

  newNotesContainer.addEventListener("input", (e) => {
    if (e.target.tagName === "INPUT" && e.target.classList.contains("note")) {
      const target = e.target;
      const inputTextlength = target.value.length;
      const check = checkNoteLength(inputTextlength);

      if (check) {
        const extraNote = createNewNote();
        removePlaceholder(extraNote);
        appendExtraNote(target, extraNote);
        extraNote.focus();
      }
    }
  });

  newNotesContainer.addEventListener("keydown", (e) => {
    const target = e.target;
    if (
      target.tagName === "INPUT" &&
      target.classList.contains("note") &&
      e.key === "Enter"
    ) {
      const firstNote = newNotesContainer.firstElementChild;
      removePlaceholder(firstNote);
      const extraNote = createNewNote();
      removePlaceholder(extraNote);
      appendExtraNote(target, extraNote);
      extraNote.focus();
    }
  });

  newNotesContainer.addEventListener("keydown", (e) => {
    const input = e.target;

    if (e.key === "Backspace" && input.value === "") {
      const note = input.closest(".note");
      const notes = Array.from(newNotesContainer.children);
      const index = notes.indexOf(note);

      if (index > 0) {
        note.remove();
        const previous = notes[index - 1];
        if (previous) {
          previous.focus();
        }
      } else if (newNotesContainer.firstElementChild.value === "") {
        note.setAttribute("placeholder", "Write a note...");
      }
    }
  });

  hideTodoBtn();
  return newTodoCard;
}

function checkNoteLength(textLength) {
  if (textLength == 20) {
    return true;
  }
}

function getTodoInput(title, notesContainer, newDateInput, isExistingTodo, existingID) {
  const titleValue = title.value;
  const notes = [...notesContainer.querySelectorAll(".note-text")].map(input => input.value.trim());
  
  const dueDate = newDateInput.value;
  const date = new Date(dueDate);

  let formattedDate = "";
  if (dueDate && !isNaN(date)) {
    const userLocale = navigator.language;
    formattedDate = new Intl.DateTimeFormat(userLocale, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  }

  if (isExistingTodo === false) {
    const newTodo = new Todo(titleValue, notes, formattedDate);
    console.log(formattedDate);
    todos.addTodo(newTodo);

  } else if (existingID) {
    const retrievedTodos = todos.getTodos();
    for (const obj of retrievedTodos) {
      if (obj.ID == existingID) {
        obj.title = titleValue;
        obj.notes = notes;
      }
    }
  }
}

let noteIdCounter = 0;

function createNewNote() {
  noteIdCounter += 1;
  const newNote = document.createElement("input");

  newNote.setAttribute("type", "text");
  newNote.setAttribute("class", "note-text");
  newNote.setAttribute("id", `note-${noteIdCounter}`);
  newNote.setAttribute("name", "note");
  newNote.setAttribute("placeholder", "Write a note...");
  newNote.setAttribute("autocomplete", "off");

  newNote.contentEditable = "true";
  newNote.classList.add("note", "no-border");

  return newNote;
}

function renderTodos() {
  containerRight.replaceChildren();

  const retrievedTodos = todos.getTodos();
  retrievedTodos.forEach((todo, idx) => {
    const newTodoCard = document.createElement("div");
    const newPriority = document.createElement("span");
    const newTitle = document.createElement("p");

    newTitle.setAttribute("class", "title-text");
    newTitle.setAttribute("data-title-id", `${todo.ID}`);

    newPriority.classList.add("priority-circle");
    newTitle.classList.add("title", "no-border");
    newTodoCard.classList.add("todo");

    newTitle.textContent = todo.title;
    
    newTodoCard.appendChild(newPriority);
    newTodoCard.appendChild(newTitle);
    
    if (todo.notes && todo.notes.length > 0) {
      for (let i = 0; i < Math.min(3, todo.notes.length); i++) {
        const newNote = document.createElement("p");
        newNote.textContent = todo.notes[i];
        newNote.setAttribute("class", "todo-note");
        newTodoCard.appendChild(newNote);
      }
    }

    if (idx == todos.todosArr.length - 1) {
      newTodoCard.classList.add("todo-saved");
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
  
function removePlaceholder(note) {
  note.removeAttribute("placeholder");
}

function addPlaceholder(note) {
  note.setAttribute("placeholder", "Write a note...");
}

  
export { todos, createTodo, createNewNote, removePlaceholder, addPlaceholder };