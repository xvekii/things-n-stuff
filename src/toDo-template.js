import { Todo } from "./Todo.js";
import { AllTodos } from "./AllTodos.js";
import deleteTodoImg from "./assets/images/delete.svg";
import dueDateImg from "./assets/images/due-date.svg";
import priorityImg from "./assets/images/priority-flag.svg";
import checkboxImg from "./assets/images/checkbox.svg";
import textboxImg from "./assets/images/textbox.svg";
import projectFolderImg from "./assets/images/project-folder.svg";
import saveTodoImg from "./assets/images/save.svg";
import savedTodoImg from "./assets/images/saved.svg";
const containerRight = document.querySelector(".container-right");
const addToDoBtn = document.querySelector(".add-toDo-btn");
const todos = new AllTodos();

function createTodo(existingID = null) {
  const newTodoCard = document.createElement("div");
  const newPriorityCircle = document.createElement("span");
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
  let currentTodoStyle = setTodoStyle(existingID);
  console.log(currentTodoStyle);
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
  
  newTitle.classList.add("title", "no-border");
  newTitle.contentEditable = "true";
  newPriorityCircle.classList.add("priority-circle");
  newNotesContainer.classList.add("new-notes-container");
  newReminderContainer.classList.add("reminder-container");
  newPriorityContainer.classList.add("toggle-priority");
  newPriorityTitle.classList.add("priority-title");
  newPriorityBtnContainer.classList.add("priority-btn-container");
  newDateTimeContainer.classList.add("toggle-datetime");

  newTodoCard.classList.add("todo-template-popup");
  newBtnContainer.classList.add("todo-btn-container");

  const deleteBtn = document.createElement("button");
  const closeDateTimeBtn = document.createElement("button");
  const dueDateBtn = document.createElement("button");
  const priorityBtn = document.createElement("button");
  const closePriorityBtn = document.createElement("button");
  const toggleTodoStyleBtn = document.createElement("button");
  const projectBtn = document.createElement("button");
  const saveBtn = document.createElement("button");

  closeDateTimeBtn.classList.add("close-datetime-btn");
  closeDateTimeBtn.textContent = "Close";
  closeDateTimeBtn.type = "button";
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
  toggleTodoStyleBtn.classList.add("todo-btn", "toggle-todo-style-btn");
  toggleTodoStyleBtn.type = "button";
  projectBtn.classList.add("todo-btn");
  projectBtn.type = "button";
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

  newBtnContainer.appendChild(deleteBtn);
  newBtnContainer.appendChild(dueDateBtn);
  newBtnContainer.appendChild(priorityBtn);
  newBtnContainer.appendChild(toggleTodoStyleBtn);
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
  
  const toggleTodoStyleBtnImg = document.createElement("img");
  toggleTodoStyleBtnImg.src = currentTodoStyle === "text" ? checkboxImg : textboxImg;
  toggleTodoStyleBtnImg.alt = "Toggle todo style";
  toggleTodoStyleBtn.appendChild(toggleTodoStyleBtnImg);

  const projectBtnImg = document.createElement("img");
  projectBtnImg.src = projectFolderImg;
  projectBtnImg.alt = "Add to project";
  projectBtn.appendChild(projectBtnImg);
  
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

  function setTodoStyle(existingID) {
    let currentStyle;
    
    const retrievedTodos = todos.getTodos();
    if (existingID) {
      for (let todo of retrievedTodos) {
        if (todo.ID === existingID) {
          currentStyle = todo.currentStyle;
        }
      }
    } else {
      currentStyle = "text";
    }
    return currentStyle;
  }

  // Revise
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

  // Toggle text or checkbox todo style
  toggleTodoStyleBtn.addEventListener("click", () => {
    currentTodoStyle = currentTodoStyle === "text" ? "checkbox" : "text"; 
    toggleTodoStyleBtnImg.src =
      toggleTodoStyleBtnImg.src === textboxImg ? checkboxImg : textboxImg; 
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
  
  // Refactor with event delegation
  saveBtn.addEventListener("click", () => {
    getTodoInput(newPriorityCircle, newTitle, newNotesContainer, newDateInput, currentTodoStyle, existingID);
    renderTodos(existingID);  
    showTodoBtn();  
  });

  dueDateBtn.addEventListener("click", () => {
    newDateTimeContainer.classList.toggle("visible");
  });

  closeDateTimeBtn.addEventListener("click", () => {
    newDateTimeContainer.classList.toggle("visible");
  });

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

  // => if checkBoxNote, else act like textNote - add to conditional
  // Revise - if checkboxNote, if not empty and bp pressed focus up

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
  
  hideTodoBtn();
  return newTodoCard;
}

function getTodoInput(newPriorityCircle, title, notesContainer, newDateInput, currentTodoStyle, existingID) {
  const priorityValue = getComputedStyle(newPriorityCircle).backgroundColor;
  const titleValue = title.value;
  // Revise input/textarea
  const notes = [...notesContainer.querySelectorAll(".note-text")].map(input => input.value.trim());
  
  const dueDate = newDateInput.value;
  const style = currentTodoStyle;
  const date = new Date(dueDate);

  let formattedDate = "";
  if (dueDate && !isNaN(date)) {
    const userLocale = navigator.language;
    formattedDate = new Intl.DateTimeFormat(userLocale, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  }

  if (!existingID) {
    const newTodo = new Todo(priorityValue, titleValue, notes, formattedDate, style);
    console.log(formattedDate);
    console.log(style)
    todos.addTodo(newTodo);
  } else {
    const todoUpdate = todos.getTodos().find(obj => obj.ID === existingID);
    if (!todoUpdate) return;

    todoUpdate.priority = priorityValue;
    todoUpdate.title = titleValue;
    todoUpdate.notes = notes;
    todoUpdate.currentStyle = style;
    // Add due date
  }
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
    // If textNote, if checkboxNote
    if (todo.notes && todo.notes.length > 0) {
      for (let i = 0; i < Math.min(3, todo.notes.length); i++) {
        const newNote = document.createElement("textarea");
        newNote.textContent = todo.notes[i];
        
        newNote.setAttribute("wrap", "hard");
        newNote.setAttribute("class", "todo-note");
        newNote.setAttribute("name", "note");
        // If textNote 2-3, if checkboxNote, 1
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

// Revise
export { todos, createTodo, createNewNote, 
  removePlaceholder, addPlaceholder, resizeNote 
};