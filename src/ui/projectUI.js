import projectFolderImgLight from "../assets/images/project-folder-lighter.svg";
import { createProjectListItem, markSelectedProject, checkExistingProject } from "../utils/projectUtils.js";
import { projects } from "../projects.js";

const navUL = document.querySelector(".nav-ul");
const projectBtnsLI = document.createElement("li");

export function renderSavedProjects(newProjectListContainer, projects, todos, existingID) {
  // Get the projects from Projects and renderTodos, add ID to attr
  newProjectListContainer.replaceChildren();
  if (projects.arr === 0) return;

  projects.arr.forEach(project => {
    const newProjectRow = createProjectListItem(project);
    // if existingID, get project name if there is one, mark selected
    const currentTodo = todos.getTodos().find(obj => obj.ID === existingID);
    
    // revise
    // If rendered upon opening and there's a saved todo
    let selectedProjectID;
    if (currentTodo && !projects.tempID) {
      selectedProjectID = checkExistingProject(currentTodo);
      if (selectedProjectID === project.ID) {
        markSelectedProject(newProjectRow);
      }   
    // If yet unsaved todo
    } else if (projects.tempID) {
      if (project.ID === projects.tempID) {
        markSelectedProject(newProjectRow);
      }
    }
    newProjectListContainer.appendChild(newProjectRow);
  });
}

export function createNavProjBtn(project = null) {
  const newProjectBtn = document.createElement("button");
  const newProjectBtnImg = document.createElement("img");
  
  const projName = project ? project.name : "New project";
  
  if (project) {
    newProjectBtn.setAttribute("data-proj-id", `${project.ID}`);
  }

  newProjectBtnImg.src = projectFolderImgLight;
  newProjectBtnImg.alt = "Project icon";
  newProjectBtn.type = "button";
  newProjectBtn.classList.add("project-name");
  
  newProjectBtn.appendChild(newProjectBtnImg);
  newProjectBtn.appendChild(document.createTextNode(`${projName}`));

  return newProjectBtn;
}

export function updateNavProjects() {
  projectBtnsLI.replaceChildren();
  projects.arr.forEach(project => {
    const projBtn = createNavProjBtn(project);
    projectBtnsLI.appendChild(projBtn);
  });
  if (!navUL.contains(projectBtnsLI)) {
    navUL.appendChild(projectBtnsLI);
  }
}

export function toggleProjectContainer(container, projID) {
  if (projID != null && projID !== "") {
    container.setAttribute("data-proj-view-id", `${projID}`);
  } else {
    delete container.dataset.projViewId;
  }
}