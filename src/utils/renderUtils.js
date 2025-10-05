import { createDiv, createInput, createSpan } from "../helpers.js";
 
export function makeRenderTodos(containerRight, todos) {
  function setTitle(titleEl, titleVal) {
    titleEl.value = titleVal;
  }

  function setPriority(priorityEl, priorityVal) {
    priorityEl.style.backgroundColor = priorityVal;
  }

  // Render saved todos
  // Refactor with several smaller functions
  return function renderTodos(params) {
    params = params || {};
    const { existingID = null, deleting = null, projID = null } = params;
    
    containerRight.replaceChildren();
    let tempTodos;

    const allTodos = todos.getTodos();

    if (projID) {
      tempTodos = allTodos.filter(todo => todo.projectID === projID);
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
        }
      });

      // Revise
      if (todo.ID === existingID) {
        newTodoCard.classList.add("todo-saved");
      } else if (!existingID && idx === retrievedTodos.length - 1 && !deleting) {
        newTodoCard.classList.add("todo-saved");
      } 
      
      if (todo.priority) {
        setPriority(newPriority, todo.priority);
      }
      
      if (todo.title) {
        setTitle(newTitle, todo.title);
      } 
      
      newTodoCard.appendChild(newPriority);
      newTodoCard.appendChild(newTitle);
      containerRight.appendChild(newTodoCard);
    });
  }
}