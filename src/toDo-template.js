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