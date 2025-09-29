import { createProjectListItem, markSelectedProject, checkExistingProject } from "../utils/projectUtils.js";

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