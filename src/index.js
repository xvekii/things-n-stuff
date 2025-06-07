import "./styles.css";
import { showInitialTodo } from "./toDo-template.js"
const hamburgerMenuBtn = document.querySelector(".hamburger");
const containerLeft = document.querySelector(".container-left");
const containerRight = document.querySelector(".container-right");
const addToDoBtn = document.querySelector(".add-toDo-btn");

hamburgerMenuBtn.addEventListener("click", () => {
  containerLeft.classList.toggle("active");
});

addToDoBtn.addEventListener("click", () => {
  const toDoCard = showInitialTodo();
  containerRight.appendChild(toDoCard);
});

class toDo {
  constructor(title, note, dueDate, priority, checkList, project) {
    this.title = title;
    this.note = note;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checkList = checkList;
    this.project = project;
    this.ID = crypto.randomUUID();
  }


}

