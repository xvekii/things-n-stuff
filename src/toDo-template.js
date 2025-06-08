const TITLE = "Title";
const NOTE = "Write a note";

export function createTodo() {
  const newTodoCard = document.createElement("div");
  const newTitle = document.createElement("input");
  const newNote = document.createElement("input");

  const newBtnContainer = document.createElement("div");
  newBtnContainer.classList.add("todo-btn-container");

  newTitle.setAttribute("type", "text");
  newTitle.setAttribute("class", "title-text");
  newTitle.setAttribute("name", "title");
  newTitle.setAttribute("placeholder", "Title");
  newTitle.setAttribute("autocomplete", "off");

  newNote.setAttribute("type", "text");
  newNote.setAttribute("class", "note-text");
  newNote.setAttribute("name", "note");
  newNote.setAttribute("placeholder", "Write a note...");
  newNote.setAttribute("autocomplete", "off");
  
  newTodoCard.classList.add("todo");
  newTitle.classList.add("title", "no-border");
  newNote.classList.add("note", "no-border");

  newTitle.contentEditable = "true";
  newNote.contentEditable = "true";
  
  newTitle.textContent = TITLE;
  newNote.textContent = NOTE;

  newTodoCard.appendChild(newTitle);
  newTodoCard.appendChild(newNote);
  newTodoCard.appendChild(newBtnContainer);

  newNote.addEventListener("input", (e) => {
    const target = e.target;
    const inputTextlength = target.value.length;

    if (inputTextlength == 20) {
      const extraNote = document.createElement("input");
      extraNote.setAttribute("type", "text");
      extraNote.setAttribute("class", "note-text");
      extraNote.setAttribute("name", "note");
      extraNote.setAttribute("autocomplete", "off");
      extraNote.classList.add("note", "no-border");
      extraNote.contentEditable = "true";
      newTodoCard.appendChild(extraNote);
      extraNote.focus();
    }
  });
  return newTodoCard;
}