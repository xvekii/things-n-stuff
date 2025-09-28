import { renderTodos } from "../toDo-template.js";
import { renderSavedProjects } from "../toDo-template.js";

export function bindTodoEvents(todoCard, refs, todos, projects, existingID) {
  const {
        newPriorityCircle,
        newTitle,
        newNotesContainer,
        newDateTimeContainer,
        newDateInput,
        newPriorityContainer,
        newPriorityBtnContainer,
        newReminderContainer,
        newReminderSpan,
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
        saveProjectBtn,
        saveBtn,
      } = refs;

      const LOW = "#FFFFFF";
      const NORMAL = "#06D6A0";
      const MEDIUM = "#FFD166";
      const HIGH = "#EF476F";

      // Revise - add method to AllTodos for removing


  function toggleDeleteProjBtn(delProjBtn) {
    delProjBtn.classList.toggle("active");
  }

  // Switch btn imgs - project folder / delete project; edit / check 
  function switchEditingMode(input, editImgEl, deleteImgEl) {
    if (!input.hasAttribute("readonly")) {
      editImgEl.src = checkLighter;
      deleteImgEl.src = deleteLighter;
    } else {
      editImgEl.src = editPencilLighter;
      deleteImgEl.src = projectFolderImgLight;
    }
  }
      
  deleteBtn.addEventListener("click", () => {
    const todoCard = deleteBtn.closest(".todo-template-popup"); 
    const title = todoCard.querySelector("input[data-title-id]");
    const titleID = title.dataset.titleId;
    const currentTodos = todos.getTodos();
    
    currentTodos.forEach((todo, index) => {
      if (titleID === todo.ID) {
        currentTodos.splice(index, 1);
      }
    });
    renderTodos(existingID, true);
    showTodoBtn(); 
  });

  priorityBtn.addEventListener("click", () => {
    newPriorityContainer.classList.toggle("visible");
  });

  newPriorityBtnContainer.addEventListener("click", (e) => {
    const clickedBtn = e.target;

    if (clickedBtn.classList.contains("low")) {
      newPriorityCircle.style.backgroundColor = LOW;
    }

    if (clickedBtn.classList.contains("normal")) {
      newPriorityCircle.style.backgroundColor = NORMAL;
    }

    if (clickedBtn.classList.contains("medium")) {
      newPriorityCircle.style.backgroundColor = MEDIUM;
    }

    if (clickedBtn.classList.contains("high")) {
      newPriorityCircle.style.backgroundColor = HIGH;
    }
  });

  // Add dedicated classList remove functions
  newPriorityContainer.addEventListener("click", (e) => {
    const clickedBtn = e.target;

    if (clickedBtn.classList.contains("close-priority-btn")) {
      newPriorityContainer.classList.remove("visible");
    }
  });

  projectBtn.addEventListener("click", () => {
    hideError();
    emptyInput();
    newProjectContainer.classList.toggle("visible");

    if (newProjectContainer.classList.contains("visible")) {
      renderSavedProjects();
    }
  });

   // Temporarily store currently selected project
    if (newProjectContainer) {
      newProjectContainer.addEventListener("click", (e) => {
        const target = e.target;
  
        // Temporarily store the selected project ID
        if (target.closest(".save-project-btn")) {
          const selectedInput = newProjectListContainer.querySelector(
          ".project-item-wrapper.selected-project .project-item-input"
          );
          const selectedID = selectedInput ? selectedInput.dataset.titleId : null;
          
          projects.tempID = selectedID || null;
          newProjectContainer.classList.toggle("visible");
        } 
  
        if (target.matches("input.project-item-input[readonly]") ||
          target.closest(".delete-project-item-btn:not(.active)")) {
          
          // Get the wrapper row
          const wrapper = target.closest(".project-item-wrapper");
          if (!wrapper) return;
  
          // Deselect the project
          if (wrapper.classList.contains("selected-project")) {
            wrapper.classList.remove("selected-project");
            projects.tempID = null;
            // Remove projectID from the existing todo 
            if (existingID) {
              const currentTodo = todos.getTodo(existingID);
              if (!currentTodo) return;
  
              currentTodo.projectID = null;
              projects.tempID = null;
            }
          // Get the closest input ID, go through the todo list by existingID and remove projID
          } else {
            // Remove "selected-project" from all unselected
            const allWrappers = newProjectListContainer.querySelectorAll(".project-item-wrapper");
            allWrappers.forEach(w => w.classList.toggle("selected-project", w === wrapper));
  
            // Mark selected project item (row)
            markSelectedProject(wrapper);
            
            const closestInput = wrapper.querySelector(".project-item-input");
            const closestInputID = closestInput ? closestInput.dataset.titleId : null;
            
            wrapper.focus();
  
            if (closestInputID) {
            projects.tempID = closestInputID;
            }
          }
        } 
  
        // Project name editing mode
        if (target.closest(".edit-project-item-btn")) {
          const editBtn = target.closest(".edit-project-item-btn");
          const editImg = editBtn.querySelector(".edit-project-item-img");
         
          // If edit clicked, get closest input's ID
          const closestWrapper = target.closest(".project-item-wrapper");
          const closestInput = closestWrapper.querySelector("input.project-item-input");
          const closestInputID = closestInput.dataset.titleId;
          const deleteProjBtn = closestWrapper.querySelector(".delete-project-item-btn");
          const deleteProjImg = deleteProjBtn.querySelector(".delete-project-item-img");
          
          // Switch editing mode
          if (closestInput.hasAttribute("readonly")) {
            closestInput.removeAttribute("readonly");
            switchEditingMode(closestInput, editImg, deleteProjImg);
            toggleDeleteProjBtn(deleteProjBtn);
            closestInput.focus();
          } else {
            const closestInputValue = closestInput.value.trim();
            if (!closestInputValue) {
              closestInput.classList.add("error");
              alert("Name cannot be empty");
            }
            
            const updateMsg = projects.updateName(closestInputValue, closestInputID);
      
            if (updateMsg) {
              closestInput.classList.add("error");
              alert(updateMsg);
            } else {
              closestInput.classList.remove("error");
              closestInput.setAttribute("readonly", "true");
              switchEditingMode(closestInput, editImg, deleteProjImg);
              toggleDeleteProjBtn(deleteProjBtn);
            }
          }        
        } 
  
        if (target.closest(".delete-project-item-btn.active")) {
          const closestWrapper = target.closest(".project-item-wrapper");
          if (!closestWrapper) return;
  
          const closestInput = closestWrapper.querySelector(".project-item-input");
          const closestInputID = closestInput ? closestInput.dataset.titleId : null;
          
          // Delete and render all project item wrappers
          if (closestInput) {
            projects.deleteProject(closestInputID);
            renderSavedProjects(newProjectListContainer, projects);
          }
        }
      });
    }

}