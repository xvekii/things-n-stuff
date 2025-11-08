import { updateNavProjects } from "./projectUI.js";
import { containerRight } from "../index.js";
import { toggleInert } from "../utils/uiUtils.js";
import { addToDoBtn } from "../toDo-template.js";

const showCurrProjName = document.querySelector(".show-proj-name-span");
showCurrProjName.textContent = "Notes";

export function bindNavEvents({ containerLeft }) {
  const hamburgerMenuBtn = document.querySelector(".hamburger");

  hamburgerMenuBtn.addEventListener("click", () => {
    toggleInert(containerRight);
    toggleInert(addToDoBtn);
    toggleMenu(containerLeft);
  
    if (containerLeft.classList.contains("active")) {
      updateNavProjects();
    }
  });
}

export function updateCurrentLocation(btn) {
  showCurrProjName.textContent = btn ? btn.textContent.trim() : "";
}

export function toggleMenu(containerLeft) {
  containerLeft.classList.toggle("active");
}
