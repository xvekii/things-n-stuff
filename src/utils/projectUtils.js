import { createDiv, createInput, createBtn } from "../helpers.js";
import projectFolderImgLight from "../assets/images/project-folder-lighter.svg";
import editPencilLighter from "../assets/images/edit-pencil-lighter.svg";
import checkLighter from "../assets/images/check-lighter.svg";
import deleteLighter from "../assets/images/delete-lighter.svg";


export function validateProjectName(name, projects) {
  if (!name) {
    return { valid: false, error: "Name cannot be empty" };
  }

  if (projects.checkDuplicateName(name)) {
    return { valid: false, error: "This name already exists" };
  }

  return { valid: true, error: "" };
}

export function createProjectListItem(project) {
  const projectItemWrapper = createDiv({
    classes: ["project-item-wrapper"],
  });

  // Folder/trash btn + initial folder img, changes to delete
  const deleteProjectItemBtn = createBtn({
    classes: ["todo-btn", "delete-project-item-btn"],
    attrs: { type: "button", },
    imgSrc: projectFolderImgLight,
    imgClass: "delete-project-item-img",
    imgAlt: "Delete project item",
  });

  // Project item input
  const projectItemInput = createInput({
    classes: ["project-item-input"],
    attrs: {
      "data-title-id": `${project.ID}`,
      "aria-label": "project item input",
      type: "text",
      name: "project item input",
      autocomplete: "off",
      spellcheck: "false",
      maxlength: "20",
      readonly: "true",
    }
  });
  
  // Btn pencil/save
  const editProjectItemBtn = createBtn({
    classes: ["todo-btn", "edit-project-item-btn"],
    attrs: { type: "button", },
    imgSrc: editPencilLighter,
    imgClass: "edit-project-item-img",
    imgAlt: "Edit project item",
  });

  projectItemInput.value = project.name;

  // Append buttons and input to project item wrapper (row)
  projectItemWrapper.appendChild(deleteProjectItemBtn);
  projectItemWrapper.appendChild(projectItemInput);
  projectItemWrapper.appendChild(editProjectItemBtn);

  return projectItemWrapper;
}

export function checkExistingProject(todo) {
  return todo.projectID ? todo.projectID : null;
}

export function markSelectedProject(target) {
  target.classList.add("selected-project");
}

export function toggleDeleteProjBtn(delProjBtn) {
  delProjBtn.classList.toggle("active");
}

// Switch btn imgs - project folder / delete project; edit / check 
export function switchEditingMode(input, editImgEl, deleteImgEl) {
  if (!input.hasAttribute("readonly")) {
    editImgEl.src = checkLighter;
    deleteImgEl.src = deleteLighter;
  } else {
    editImgEl.src = editPencilLighter;
    deleteImgEl.src = projectFolderImgLight;
  }
}