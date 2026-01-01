import {
  createDiv, createInput, createSpan, createHeading, createBtn,
} from "../helpers.js";
import addProjectImg from "../assets/images/add-project.svg";

export function createProjectContainerUI(addFromMenu = null) {
  const newProjectContainer = createDiv({ classes: ["project-container", "toggle-project"] });
  const newProjectBtnContainer = createDiv({ classes: ["project-btn-container"] });
  const todoProjectTitle = "Add to a project — click to select" ;
  const menuProjectTitle = "Edit projects" ;
  const projectTitleText = addFromMenu ? menuProjectTitle : todoProjectTitle;

  const newProjectTitle = createHeading({
    classes: ["project-title"],
    headLvl: "h5",
    text: projectTitleText,
  });
  
  const newProjectListContainer = createDiv({ classes: ["project-list-container"] });
  const newProjectInputContainer = createDiv({ classes: ["project-input-container"] });
  const newProjectInputWrapper = createDiv({ classes: ["project-input-wrapper"] });
  const newProjectInputErrorMsg = createSpan({ classes: ["project-input-error"] });

  const newProjectInput = createInput({
    classes: ["project-input"],
    attrs: {
      "aria-label": "New project name",
      name: "new project input",
      type: "text",
      placeholder: "New project name",
      autocomplete: "off",
      spellcheck: "false",
      maxlength: "20",
    },
  });

  const addProjectBtn = createBtn({
    classes: ["todo-btn", "add-project-btn"],
    attrs: { type: "button", },
    imgSrc: addProjectImg,
    imgClass: "add-project-btn-img",
    imgAlt: "Add project",
  });
  
  const closeProjectBtn = createBtn({
    classes: ["todo-btn", "close-project-btn"],
    attrs: { type: "button", },
    text: "Close",
  });

  newProjectContainer.append(newProjectTitle, newProjectListContainer, newProjectInputContainer);
  newProjectInputContainer.append(newProjectInputWrapper);
  newProjectInputWrapper.append(newProjectInputErrorMsg);
  newProjectInputWrapper.append(newProjectInput);
  newProjectInputContainer.append(addProjectBtn);
  newProjectBtnContainer.append(closeProjectBtn);
  newProjectContainer.append(newProjectBtnContainer);

  return {
    newProjectContainer,
    newProjectListContainer,
    newProjectInput,
    newProjectInputErrorMsg,
    addProjectBtn,
    closeProjectBtn, 
  };
}