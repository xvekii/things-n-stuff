export function toggleDateTimeContainerVisibility(container) {
  container.classList.toggle("visible");
}

export function clearDateInput(dateInput) {
  dateInput.value = "";
}

export function removeReminderSpan(reminderSpan, reminderContainer) {
  reminderSpan.textContent = "";
  reminderContainer.classList.remove("active");
}

export function showError(input, errorMsg, message) {
  input.style.borderColor = "red";
  errorMsg.textContent = message;
  errorMsg.style.visibility = "visible";
}

export function hideError(input, errorMsg) {
  input.style.borderColor = "";
  errorMsg.style.visibility = "hidden";  
}

export function removeProjError(input, errorSpan) {
  input.style.borderColor = "";
  if (errorSpan && errorSpan.parentNode) errorSpan.parentNode.removeChild(errorSpan); 
}

export function emptyInput(input) {
  input.value = "";
}

export function showTodoBtn(btn) {
  btn.style.display = "flex";
}

export function hideTodoBtn(btn) {
  btn.style.display = "none";
}

export function toggleInert(el) {
  if (!el) {
    console.warn("toggleInert: element is null or undefined");
    return;
  }
  
  if (isInert(el)) {
    el.removeAttribute("inert");
  } else {  
    el.inert = true;
  }
}

function isInert(el) {
  if (!el) return false;
  return el.hasAttribute("inert") ? true : false;
}