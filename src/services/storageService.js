

function storageAvailable(type) {
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

if (storageAvailable("localStorage")) {
  storeTodo();
} else {
  console.log("localStorage unavailable");
}

export function storeTodo() {

}

// Add check in main if populated

// export function deleteTodo() {
// }

// export function storeProjects() {
// }

// export function deleteProjects() {
// }

// export function loadLocalStorage() {
  // if unavailable, make sure app doesn't crash
// }