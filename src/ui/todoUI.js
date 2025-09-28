import {
  createDiv, 
  createInput, 
  createSpan, 
  createHeading,
  createBtn,
} from "./helpers.js";

import closeReminderImg from "./assets/images/closeX.svg";
import deleteTodoImg from "./assets/images/delete.svg";
import dueDateImg from "./assets/images/due-date.svg";
import priorityImg from "./assets/images/priority-flag.svg";
import projectFolderImg from "./assets/images/project-folder.svg";
import addProjectImg from "./assets/images/add-project.svg";
import saveTodoImg from "./assets/images/save.svg";

import { createNewNote } from "../utils/noteUtils.js";

export function createTodoUI(existingID = null) {
  const dataTitleID = existingID || `temp-${crypto.randomUUID()}`;
  const newTodoCard = createDiv({ classes: ["todo-template-popup"] });
  const newPriorityCircle = createSpan({ classes: ["priority-circle"] });

  const newTitle = createInput({
    classes: ["title", "title-text", "no-border"],
    attrs: {
      "data-title-id": `${dataTitleID}`,
      name: "title",
      type: "text",
      placeholder: "Title",
      autocomplete: "off",
      spellcheck: "false",
      maxlength: "24",
      contenteditable: "true",
    },
  });

  const newNotesContainer = createDiv({ classes: ["new-notes-container"] });
  const newNote = createNewNote();
  newNotesContainer.appendChild(newNote);

  const newReminderContainer = createDiv({ classes: ["reminder-container"] });
  const newReminderSpan = createSpan({ classes: ["reminder-span"] });
  const removeReminderBtn = createBtn({
    classes: ["remove-reminder-btn"],
    attrs: { type: "button" },
    imgSrc: closeReminderImg,
    imgClass: "remove-reminder-img",
    imgAlt: "Remove reminder",
  });
  newReminderContainer.append(newReminderSpan, removeReminderBtn);

  const newProjectContainer = createDiv({ classes: ["project-container", "toggle-project"] });
  const newProjectBtnContainer = createDiv({ classes: ["project-btn-container"] });

  const newProjectTitle = createHeading({
    classes: ["project-title"],
    headLvl: "h5",
    text: "Add to a project:",
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

  const newDateTimeContainer = createDiv({ classes: ["toggle-datetime"] });
  const newDateInput = createInput({ 
    classes: ["date-input"], 
    attrs: {
      type: "datetime-local",
    }, 
  });

  const closeDateTimeBtn = createBtn({
    classes: ["close-datetime-btn"],
    attrs: { type: "button", },
    text: "Close",
  });
  newDateTimeContainer.append(newDateInput, closeDateTimeBtn);

  const newBtnContainer = createDiv({ classes: ["todo-btn-container"] });

  const deleteBtn = createBtn({
    classes: ["todo-btn", "delete-btn"],
    attrs: { type: "button", },
    imgSrc: deleteTodoImg,
    imgClass: "delete-btn-img",
    imgAlt: "Delete todo",
  });
  
  
  const dueDateBtn = createBtn({
    classes: ["todo-btn", "due-date-btn"],
    attrs: { type: "button", },
    imgSrc: dueDateImg,
    imgClass: "due-date-btn-img",
    imgAlt: "Set due date",
  });
  
  const priorityBtn = createBtn({
    classes: ["todo-btn", "open-priority-btn"],
    attrs: { type: "button", },
    imgSrc: priorityImg,
    imgClass: "priority-btn-img",
    imgAlt: "Set priority",
  });
  
  const projectBtn = createBtn({
    classes: ["todo-btn", "project-btn"],
    attrs: { type: "button", },
    imgSrc: projectFolderImg,
    imgClass: "project-btn-img",
    imgAlt: "Add to project",
  });
  
  const addProjectBtn = createBtn({
    classes: ["todo-btn", "add-project-btn"],
    attrs: { type: "button", },
    imgSrc: addProjectImg,
    imgClass: "add-project-btn-img",
    imgAlt: "Add project",
  });
  
  const saveProjectBtn = createBtn({
    classes: ["todo-btn", "save-project-btn"],
    attrs: { type: "button", },
    text: "Save",
  });
  
  const saveBtn = createBtn({
    classes: ["todo-btn", "save-todo-btn"],
    attrs: { type: "button", },
    imgSrc: saveTodoImg,
    imgClass: "save-todo-btn-img",
    imgAlt: "Save",
  });

  // Priority 
  const newPriorityContainer = createDiv({ classes: ["toggle-priority"]} );
  const newPriorityBtnContainer = createDiv({ classes: ["priority-btn-container"] });

  const newPriorityTitle = createHeading({
    classes: ["priority-title"], 
    headLvl: "h5",
    text: "Select priority:", 
  });

  const priorityLowBtn = createBtn({
    classes: ["priority-btn", "low"],
    attrs: { type: "button", },
    text: "Low",
  });
  
  const priorityNormalBtn = createBtn({
    classes: ["priority-btn", "normal"],
    attrs: { type: "button", },
    text: "Normal",
  });
  
  const priorityMediumBtn = createBtn({
    classes: ["priority-btn", "medium"],
    attrs: { type: "button", },
    text: "Medium",
  });
  
  const priorityHighBtn = createBtn({
    classes: ["priority-btn", "high"],
    attrs: { type: "button", },
    text: "High",  
  });

  const closePriorityBtn = createBtn({
    classes: ["todo-btn", "close-priority-btn"],
    attrs: { type: "button", },
    text: "Close",
  });

  newPriorityBtnContainer.append(priorityLowBtn, priorityNormalBtn, priorityMediumBtn, priorityHighBtn);
  newPriorityContainer.append(newPriorityTitle, newPriorityBtnContainer, closePriorityBtn);

  newProjectContainer.append(newProjectTitle, newProjectListContainer, newProjectInputContainer);
  newProjectInputContainer.append(newProjectInputWrapper);
  newProjectInputWrapper.append(newProjectInputErrorMsg);
  newProjectInputWrapper.append(newProjectInput);
  newProjectInputContainer.append(addProjectBtn);
  newProjectBtnContainer.append(saveProjectBtn);
  newProjectContainer.append(newProjectBtnContainer);

  newBtnContainer.append(deleteBtn, dueDateBtn, priorityBtn, 
    projectBtn, saveBtn, newDateTimeContainer, 
    newPriorityContainer, newProjectContainer
  );

  newTodoCard.append(newPriorityCircle, newTitle, newNotesContainer, 
    newReminderContainer, newBtnContainer
  );

  return {
    root: newTodoCard,
    refs: {
      newPriorityCircle,
      newTitle,
      newNotesContainer,
      newPriorityBtnContainer,
      newReminderContainer,
      newReminderSpan,
      removeReminderBtn, 
      newProjectContainer, 
      newProjectInput,
      newBtnContainer,
      deleteBtn,
      dueDateBtn,
      priorityBtn,
      projectBtn,
      addProjectBtn,
      saveProjectBtn,
      saveBtn,
    }
  }
}

