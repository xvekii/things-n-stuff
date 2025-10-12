import { Project } from "../Project.js";
import { createProjectListItem, validateProjectName } from "../utils/projectUtils.js";
import { getDueDate, formatDateTime, formatForUser, toDatetimeLocalString } from "../utils/dateUtils.js";
import { getTodoInput } from "../utils/todoDataUtils.js";
import { 
  toggleDateTimeContainerVisibility,
  removeReminderSpan,
  clearDateInput,
  showError,
  hideError,
  emptyInput,
  showTodoBtn 
} from "../utils/uiUtils.js";
import { 
  resizeNote,
  createNewNote,
  addPlaceholder,
  removePlaceholder,
  placeCaretAtStart,
  appendExtraNote 
} from "../utils/noteUtils.js";


export function bindTodoFormEvents(refs, todos, projects, existingID, renderTodos) {
  const { 
    newProjectListContainer, 
    newNotesContainer,
    newPriorityCircle,
    newTitle,
    newDateInput,
    newProjectInput,
    newProjectInputErrorMsg,
    addProjectBtn,
    newReminderSpan,
    newReminderContainer,
    newDateTimeContainer,
    closeDateTimeBtn,
    dueDateBtn,
    saveBtn
  } = refs;

  newProjectInput.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && newProjectInput.value === "") {
      hideError(newProjectInput, newProjectInputErrorMsg);
    }
  });

  newProjectInput.addEventListener("input", () => {
    const inputName = newProjectInput.value.trim();
    const { valid, error } = validateProjectName(inputName, projects);
    
    if (!valid) {
      showError(newProjectInput, newProjectInputErrorMsg, error);
    } else {
      hideError(newProjectInput, newProjectInputErrorMsg); 
    }
  });

  addProjectBtn.addEventListener("click", () => {
    const inputName = newProjectInput.value.trim();
    const { valid, error } = validateProjectName(inputName, projects);
    
    if (!valid) {
      showError(newProjectInput, newProjectInputErrorMsg, error);
      return;
    }
    hideError(newProjectInput, newProjectInputErrorMsg);
    
    // Add new project
    // Add LS
    const newProject = new Project(inputName);
    projects.addProject(newProject);
    emptyInput(newProjectInput);
    
    const projectRow = createProjectListItem(newProject);
    newProjectListContainer.prepend(projectRow);
  });

  saveBtn.addEventListener("click", () => {
    getTodoInput(newPriorityCircle, newTitle, newNotesContainer, newDateInput, existingID, todos, projects);
    renderTodos({ existingID }); 
    projects.tempID = null; 
    showTodoBtn(document.querySelector(".add-toDo-btn"));  
  });

  dueDateBtn.addEventListener("click", () => {
    const dateTimeNow = new Date();
    newDateInput.setAttribute("min", toDatetimeLocalString(dateTimeNow));
    newDateTimeContainer.classList.toggle("visible");
  });

  closeDateTimeBtn.addEventListener("click", () => {
    newDateTimeContainer.classList.toggle("visible");
    const dateTime = getDueDate(newDateInput.value);

    if (dateTime) {
      const formattedDT = formatDateTime(dateTime)
      newReminderSpan.textContent = formatForUser(formattedDT);
      newReminderContainer.classList.add("active");
    } 
  });

  // Add removeReminderBtn and closeDateTimeBtn to clearReminder
  // Ask for notifications

  // Revise to add new 
  newTitle.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const firstNote = newNotesContainer.firstElementChild;
      e.preventDefault();
      e.stopPropagation(); 
      
      resizeNote(firstNote);
      firstNote.focus();
      placeCaretAtStart(firstNote);
    }
  });

  // Note resizing on input
  newNotesContainer.addEventListener("input", (e) => {
    const target = e.target;

    if (target.tagName === "TEXTAREA" && target.classList.contains("note")) {
      resizeNote(target);
    }
  });

  // Revise 
  newNotesContainer.addEventListener("keydown", (e) => {
    const targetNote = e.target;
    const prevNote = targetNote.previousElementSibling;
    const notes = Array.from(newNotesContainer.children);
    const index = notes.indexOf(targetNote);

    if (targetNote.tagName !== "TEXTAREA" || !targetNote.classList.contains("note")) {
      return;
    }

    // Append an extra note on enter
    if (e.key === "Enter") {
      e.preventDefault();
      removePlaceholder(targetNote);
      const extraNote = createNewNote();
      removePlaceholder(extraNote);
      
      // Add targetNote transferring to extraNote
      if (targetNote.value) {
        const targetNoteStartCaretPos = targetNote.selectionStart;
        extraNote.value = targetNote.value.slice(targetNoteStartCaretPos).trim();
        targetNote.value = targetNote.value.slice(0, targetNoteStartCaretPos);
        extraNote.setSelectionRange(0, 0);
      }
      appendExtraNote(targetNote, extraNote);
    }
    // Deleting a note   
    if (e.key === "Backspace" && index > 0) {
      if (prevNote && !targetNote.value) {
        removePlaceholder(newNotesContainer.firstElementChild);
        targetNote.remove();
        prevNote.focus();
        e.preventDefault();
      } else if (prevNote && targetNote.value && targetNote.selectionStart === 0) {
        const targetNoteValue = targetNote.value;
        targetNote.remove();
        e.preventDefault();
        prevNote.focus();
        prevNote.setSelectionRange(prevNote.value.length, prevNote.value.length);
        prevNote.value += targetNoteValue;
        
        const prevNoteLength = prevNote.value.length;
        const targetNoteLength = targetNoteValue.length;
        const caretPos = prevNoteLength - targetNoteLength;
        prevNote.setSelectionRange(caretPos, caretPos);
      } 
    } else if (e.key === "Backspace" && index === 0 && targetNote.value.trim() === "") {
      addPlaceholder(targetNote);
    }
  });

  // Remove reminder
  newReminderContainer.addEventListener("click", (e) => {
    const removeBtn = e.target.closest(".remove-reminder-btn");

    // Add LS
    if (removeBtn) {
      if (existingID) {
        const todoUpdate = todos.getTodos().find(obj => obj.ID === existingID);
        removeReminderSpan(newReminderSpan, newReminderContainer);
        if (!todoUpdate) return;

        if (todoUpdate.dueDate) {
          todoUpdate.dueDate = null;
          todoUpdate.clearReminder();
          removeReminderSpan(newReminderSpan, newReminderContainer);
        }
      } else {
        clearDateInput(newDateInput);
        removeReminderSpan(newReminderSpan, newReminderContainer);
      }
    } 
    
    if (newReminderContainer.classList.contains("active")) {
      toggleDateTimeContainerVisibility(newReminderContainer);
    }
  });
}