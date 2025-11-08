import { createDiv, createInput, createSpan } from "../helpers.js";
import { formatForUser } from "./dateUtils.js";
import dueDateBell from "../assets/images/due-date-bell.svg";
 
export function makeRenderTodos(containerRight, todos) {
  function setTitle(titleEl, titleVal) {
    titleEl.value = titleVal;
  }

  function setPriority(priorityEl, priorityVal) {
    priorityEl.style.backgroundColor = priorityVal;
  }

  function setReminder(reminderEl, reminderVal) {
    reminderEl.textContent = reminderVal;
  }

  // Render saved todos
  // Refactor with several smaller functions
  return function renderTodos(params) {
    params = params || {};
    const { 
      existingID = null, 
      deleting = null, 
      projID = null,
      showAll = null,
      showProjs = null 
    } = params;
    
    containerRight.replaceChildren();
    let tempTodos;

    const allTodos = todos.getTodos();

    if (projID && !showAll) {
      tempTodos = allTodos.filter(todo => todo.projectID === projID);
    } else if (showAll) {
      tempTodos = allTodos;
    } else if (showProjs || containerRight.dataset.projViewId === "allProjects") {
      tempTodos = allTodos.filter(todo => 
        todo.projectID !== null && todo.projectID !== "");
    } else if (containerRight.dataset.projViewId) {
      const containerProjView = containerRight.dataset.projViewId;
      tempTodos = allTodos.filter(todo => 
        todo !== null && todo.projectID === containerProjView);
    } else if (!containerRight.dataset.projViewId) {
      tempTodos = allTodos;
    } else {
      tempTodos = allTodos;
    }
    
    const retrievedTodos = tempTodos;
    
    retrievedTodos.forEach((todo, idx) => {
      const newTodoCard = createDiv({
        classes: ["todo"],
      });
      
      const newPriority = createSpan({
        classes: ["priority-circle"],
      });
      
      const newTitle = createInput({
        classes: ["title", "title-text", "todo-no-edit", "no-border"],
        attrs: { 
          "data-title-id": `${todo.ID}`,
          name: "title",
          placeholder: "Title",
          contenteditable: "false",
          readonly: "true",
        }
      });

      const newReminderWrapper = createDiv({
        classes: ["todo-reminder-wrapper"],
      }); 
      
      const newReminderContent = createDiv({
        classes: ["todo-reminder-content"],
      }); 

      const newReminderImgSpan = createSpan({
        classes: ["todo-reminder-img-span"],
        imgClass: "todo-reminder-img",
        imgSrc: dueDateBell,
      }); 
      
      const newReminderTxtSpan = createSpan({
        classes: ["todo-reminder-txt-span"],
      }); 

      // Revise
      if (todo.ID === existingID && !(showAll || showProjs || projID)) {
        newTodoCard.classList.add("todo-saved");
      } else if (!existingID && idx === retrievedTodos.length - 1 && !deleting && !(showAll || showProjs || projID)) {
        newTodoCard.classList.add("todo-saved");
      } 
      
      if (todo.priority) {
        setPriority(newPriority, todo.priority);
      }
      
      if (todo.title) {
        setTitle(newTitle, todo.title);
      } 

      if (todo.dueDate) {
        setReminder(newReminderTxtSpan, formatForUser(todo.dueDate));
        newReminderContent.append(newReminderImgSpan, newReminderTxtSpan);
        newReminderWrapper.append(newReminderContent);
      }
      
      newTodoCard.append(newPriority, newTitle, newReminderWrapper);
      containerRight.appendChild(newTodoCard);
    });
  }
}