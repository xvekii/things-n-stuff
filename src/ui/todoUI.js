import {
  createDiv, 
  createInput, 
  createSpan, 
  createHeading,
  createBtn,
} from "../helpers.js";

import closeReminderImg from "../assets/images/closeX.svg";
import deleteTodoImg from "../assets/images/delete.svg";
import dueDateImg from "../assets/images/due-date.svg";
import priorityImg from "../assets/images/priority-flag.svg";
import projectFolderImg from "../assets/images/project-folder.svg";
import saveTodoImg from "../assets/images/save.svg";
import dueDateBell from "../assets/images/due-date-bell.svg";

import { createProjectContainerUI } from "./projectContainerUI.js";
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
  const newReminderContent = createDiv({ classes: ["reminder-content"] });
  const newReminderTxtSpan = createSpan({ classes: ["reminder-txt-span"] });

  const newReminderImgSpan = createSpan({
    classes: ["reminder-img-span"],
    imgClass: "reminder-img",
    imgSrc: dueDateBell,
  }); 
  
  const removeReminderBtn = createBtn({
    classes: ["remove-reminder-btn"],
    attrs: { type: "button" },
    imgSrc: closeReminderImg,
    imgClass: "remove-reminder-img",
    imgAlt: "Remove reminder",
  });
  newReminderContent.append(newReminderImgSpan, newReminderTxtSpan);
  newReminderContainer.append(newReminderContent, removeReminderBtn);

  const { 
    newProjectContainer,
    newProjectListContainer, 
    newProjectInput,
    newProjectInputErrorMsg,
    addProjectBtn,
    closeProjectBtn
  } = createProjectContainerUI();

  const newDateTimeContainer = createDiv({ classes: ["toggle-datetime"] });
  const newDateInput = createInput({ 
    classes: ["date-input"], 
    attrs: {
      type: "datetime-local",
    }, 
  });

  const closeDateTimeBtn = createBtn({
    classes: ["close-datetime-btn"],
    attrs: { type: "button" },
    text: "Close",
  });
  newDateTimeContainer.append(newDateInput, closeDateTimeBtn);

  const newBtnContainer = createDiv({ classes: ["todo-btn-container"] });

  const deleteBtn = createBtn({
    classes: ["todo-btn", "delete-btn"],
    attrs: { type: "button" },
    imgSrc: deleteTodoImg,
    imgClass: "delete-btn-img",
    imgAlt: "Delete todo",
  });
  
  const dueDateBtn = createBtn({
    classes: ["todo-btn", "due-date-btn"],
    attrs: { type: "button" },
    imgSrc: dueDateImg,
    imgClass: "due-date-btn-img",
    imgAlt: "Set due date",
  });
  
  const priorityBtn = createBtn({
    classes: ["todo-btn", "open-priority-btn"],
    attrs: { type: "button" },
    imgSrc: priorityImg,
    imgClass: "priority-btn-img",
    imgAlt: "Set priority",
  });
  
  const projectBtn = createBtn({
    classes: ["todo-btn", "project-btn"],
    attrs: { type: "button" },
    imgSrc: projectFolderImg,
    imgClass: "project-btn-img",
    imgAlt: "Add to project",
  });
  
  const saveBtn = createBtn({
    classes: ["todo-btn", "save-todo-btn"],
    attrs: { type: "button" },
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
    attrs: { type: "button" },
    text: "Low",
  });
  
  const priorityNormalBtn = createBtn({
    classes: ["priority-btn", "normal"],
    attrs: { type: "button" },
    text: "Normal",
  });
  
  const priorityMediumBtn = createBtn({
    classes: ["priority-btn", "medium"],
    attrs: { type: "button" },
    text: "Medium",
  });
  
  const priorityHighBtn = createBtn({
    classes: ["priority-btn", "high"],
    attrs: { type: "button" },
    text: "High",  
  });

  const closePriorityBtn = createBtn({
    classes: ["todo-btn", "close-priority-btn"],
    attrs: { type: "button" },
    text: "Close",
  });

  newPriorityBtnContainer.append(priorityLowBtn, priorityNormalBtn, priorityMediumBtn, priorityHighBtn);
  newPriorityContainer.append(newPriorityTitle, newPriorityBtnContainer, closePriorityBtn);

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
      newDateTimeContainer,
      newDateInput,
      newPriorityContainer,
      newPriorityBtnContainer,
      newReminderContainer,
      newReminderTxtSpan,
      removeReminderBtn, 
      newProjectContainer,
      newProjectListContainer, 
      newProjectInput,
      newProjectInputErrorMsg,
      newBtnContainer,
      deleteBtn,
      dueDateBtn,
      closeDateTimeBtn,
      priorityBtn,
      projectBtn,
      addProjectBtn,
      closeProjectBtn,
      saveBtn,
    }
  }
}