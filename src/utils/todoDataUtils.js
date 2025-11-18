import { saveToLS } from "../services/storageService.js";
import { Todo } from "../Todo.js";
import { getDueDate, formatDateTime, formatForUser } from "./dateUtils.js";

export function getTodoInput(newPriorityCircle, title, notesContainer, newDateInput, existingID, todos, projects) {
  const priorityValue = newPriorityCircle.dataset.priority;
  const titleValue = title.value;
  const notes = [...notesContainer.querySelectorAll(".note-text")].map(input => input.value.trim());
  // Temporary project ID
  const projectID = projects.tempID;
  
  const reminderContainer = document.querySelector(".reminder-container");
  const reminderSpan = document.querySelector(".reminder-txt-span");
  
  const dueDateISO = getDueDate(newDateInput.value);
  
  if (dueDateISO) {
    const formattedDateTime = formatDateTime(dueDateISO)
    reminderSpan.textContent = formatForUser(formattedDateTime);
  } else {
    reminderSpan.textContent = ""; 
    reminderContainer.classList.remove("active");
  }

  if (!existingID) {
    const newTodo = new Todo({ 
      priority: priorityValue,
      title: titleValue,
      notes,
      dueDate: dueDateISO,
      projectID, 
    });
    todos.addTodo(newTodo);
    
    saveToLS("lsTodos", todos.getTodos());
    saveToLS("lsProjects", projects.arr);
  } else {
    const todoUpdate = todos.getTodos().find(obj => obj.ID === existingID);
    if (!todoUpdate) return;

    todoUpdate.priority = priorityValue;
    todoUpdate.title = titleValue;
    todoUpdate.notes = notes;

    if (dueDateISO) {
      todoUpdate.dueDate = dueDateISO;
      todoUpdate.setReminder(dueDateISO, () => {
        alert(titleValue);
      });
    }

    if (projectID) {
      todoUpdate.projectID = projectID;
    }

    saveToLS("lsTodos", todos.getTodos());
    saveToLS("lsProjects", projects.arr);
  }
}
