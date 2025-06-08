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
  newTitle.setAttribute("name", "title");
  newTitle.setAttribute("placeholder", "Title");
  newTitle.setAttribute("autocomplete", "off");
  newTitle.setAttribute("maxlength", "25");

  newTitle.classList.add("title", "no-border");
  newTitle.contentEditable = "true";
  newTitle.textContent = TITLE;
  newNotesContainer.classList.add("new-notes-container");

  newTodoCard.classList.add("todo");
  newBtnContainer.classList.add("todo-btn-container");

  // Add images to buttons
  const deleteBtn = document.createElement("button");
  const dueDateBtn = document.createElement("button");
  const priorityBtn = document.createElement("button");
  const projectBtn = document.createElement("button");
  const saveBtn = document.createElement("button");

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

  newTodoCard.addEventListener("input", (e) => {
    if (e.target.tagName === "INPUT" && e.target.classList.contains("note")) {
      const target = e.target;
      const inputTextlength = target.value.length;
      const check = checkNoteLength(inputTextlength);

      if (check) {
        const extraNote = createNewNote();
        newNotesContainer.appendChild(extraNote);
        extraNote.focus();
      }
    }
  });
  return newTodoCard;
}

function createNewNote() {
  const newNote = document.createElement("input");

  newNote.setAttribute("type", "text");
  newNote.setAttribute("class", "note-text");
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