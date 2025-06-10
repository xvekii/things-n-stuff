import { Todo } from "./Todo.js";
import deleteTodoImg from "./assets/images/delete.svg";
import dueDateImg from "./assets/images/due-date.svg";
import priorityImg from "./assets/images/priority-flag.svg";
import projectFolderImg from "./assets/images/project-folder.svg";
import saveTodoImg from "./assets/images/save.svg";
import savedTodoImg from "./assets/images/saved.svg";
const TITLE = "Title";
const NOTE = "Write a note";

export function createTodo() {
  const newTodoCard = document.createElement("div");
  const newTitle = document.createElement("input");
  const newNotesContainer = document.createElement("div");
  const newBtnContainer = document.createElement("div");

  newTitle.setAttribute("type", "text");
  newTitle.setAttribute("class", "title-text");
  newTitle.setAttribute("id", "title");
  newTitle.setAttribute("name", "title");
  newTitle.setAttribute("placeholder", "Title");
  newTitle.setAttribute("autocomplete", "off");
  newTitle.setAttribute("maxlength", "25");

  newTitle.classList.add("title", "no-border");
  newTitle.contentEditable = "true";
  newTitle.textContent = TITLE;
  newNotesContainer.classList.add("new-notes-container");

  newTodoCard.classList.add("todo-template-popup");
  newBtnContainer.classList.add("todo-btn-container");

  // Add images to buttons
  const deleteBtn = document.createElement("button");
  const dueDateBtn = document.createElement("button");
  const priorityBtn = document.createElement("button");
  const projectBtn = document.createElement("button");
  const saveBtn = document.createElement("button");

  deleteBtn.classList.add("todo-btn");
  dueDateBtn.classList.add("todo-btn");
  priorityBtn.classList.add("todo-btn");
  projectBtn.classList.add("todo-btn");
  saveBtn.classList.add("todo-btn");

  newBtnContainer.appendChild(deleteBtn);
  newBtnContainer.appendChild(dueDateBtn);
  newBtnContainer.appendChild(priorityBtn);
  newBtnContainer.appendChild(projectBtn);
  newBtnContainer.appendChild(saveBtn);

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
  newTodoCard.appendChild(newBtnContainer);

  const newNote = createNewNote();
  newNotesContainer.appendChild(newNote);

  saveBtn.addEventListener("click", () => {
    newTodoCard.classList.remove("todo-template-popup");
    newTodoCard.classList.add("todo");
    getTodoInput(newNotesContainer, newTodoCard);
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
      }
    }
  });

  function appendExtraNote(prevNote, extraNote) {
    prevNote.after(extraNote);
  }

  function removePlaceholder(extraNote) {
    extraNote.removeAttribute("placeholder");
  }

  return newTodoCard;
}

function getTodoInput(notesContainer, todo) {
  const title = todo.querySelector("#title").value;
  const notesValues = [...notesContainer.querySelectorAll(".note-text")].map(input => input.value.trim());
  console.log(title);
  console.log(notesValues);
}

function createNewNote() {
  const newNote = document.createElement("input");

  newNote.setAttribute("type", "text");
  newNote.setAttribute("class", "note-text");
  newNote.setAttribute("id", "note");
  newNote.setAttribute("name", "note");
  newNote.setAttribute("placeholder", "Write a note...");
  newNote.setAttribute("autocomplete", "off");

  newNote.contentEditable = "true";
  newNote.textContent = NOTE;
  newNote.classList.add("note", "no-border");

  return newNote;
}

function checkNoteLength(textLength) {
  if (textLength == 20) {
    return true;
  }
}