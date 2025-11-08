import "./styles.css";
import { bindProjectSidebarEvents } from "./ui/projectEvents.js";
import { loadLocalStorage } from "./services/storageService.js";
import { bindNavEvents } from "./ui/navEvents.js";
import { bindSavedTodoEvents } from "./ui/todoEvents.js";

export const containerRight = document.querySelector(".container-right");
export const containerLeft = document.querySelector(".container-left");
export const mainContainer = document.querySelector(".main-container");

const editProjectsContainer = document.createElement("div");
editProjectsContainer.classList.add("toggle-project", "edit-projects-container");

function init() {
  loadLocalStorage();
  bindNavEvents({ containerLeft }); 
  bindProjectSidebarEvents({ containerLeft, containerRight });
  bindSavedTodoEvents({ containerRight });
}

init();