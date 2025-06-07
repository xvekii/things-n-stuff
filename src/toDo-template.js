const TITLE = "Title";
const NOTE = "Write a note";

export function showInitialTodo() {
  const newTodoCard = document.createElement("div");
  const newTitle = document.createElement("p");
  const newNote = document.createElement("p");
  
  newTodoCard.classList.add("todo");
  newTitle.classList.add("placeholder", "title");
  newNote.classList.add("placeholder");
  
  newTitle.textContent = TITLE;
  newNote.textContent = NOTE;

  newTodoCard.appendChild(newTitle);
  newTodoCard.appendChild(newNote);

  return newTodoCard;
}