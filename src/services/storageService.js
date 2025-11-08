import { renderTodos } from "../toDo-template.js";
import { todos } from "../AllTodos.js";
import { Todo } from "../Todo.js";
import { Project } from "../Project.js";
import { projects } from "../projects.js";

export function storageAvailable(type) {
  let storage;
  
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      storage &&
      storage.length !== 0
    );
  }
}

export function saveToLS(key, value) {
  if (!key) return;

  let stringifiedValue;
  try {
    stringifiedValue = JSON.stringify(value);
  } catch (err) {
    console.error("saveToLS: stringify failed", err);
  }

  if (storageAvailable("localStorage")) {
    try {
      localStorage.setItem(key, stringifiedValue);
    } catch (err) {
      console.warn("saveToLS: localStorage.setItem failed, using memory fallback", err);
    }
  }
}

export function loadLocalStorage() {
  if (storageAvailable("localStorage")) {
    const storedTodos = localStorage.getItem("lsTodos");
    const storedProjs = localStorage.getItem("lsProjects");

    if (storedTodos) {
      try {
        const parsedTodos = JSON.parse(storedTodos);
        const parsedTodosArr = Array.isArray(parsedTodos) 
          ? parsedTodos.map(obj => Todo.fromJSON(obj))
          : [];
        todos.arr = parsedTodosArr;
      } catch (err) {
        console.error("loadLocalStorage: failed to parse todos", err);
      }
    }

    if (storedProjs) {
      try {
        const parsedProjs = JSON.parse(storedProjs);
        const parsedProjsArr = Array.isArray(parsedProjs)
          ? parsedProjs.map(obj => Project.fromJSON(obj))
          : [];
        projects.arr = parsedProjsArr;
      } catch (err) {
        console.error("loadLocalStorage: failed to parse projects", err);
      }
    }

  } else {
    console.log("Local storage unavailable");
    return false;
  }
  renderTodos({ showAll: true });
  console.log("Local storage loading successful");
  return true;
}