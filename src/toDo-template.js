const TITLE = "Title";
const NOTE = "Write a note";

export function showInitialTodo() {
  const newTodoCard = document.createElement("div");
  const newTitle = document.createElement("input");
  const newNote = document.createElement("input");

  newTitle.setAttribute("type", "text");
  newTitle.setAttribute("id", "title");
  newTitle.setAttribute("name", "title");
  newTitle.setAttribute("placeholder", "Title");
  newTitle.setAttribute("autocomplete", "off");

  newNote.setAttribute("type", "text");
  newNote.setAttribute("id", "note");
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

  return newTodoCard;
}