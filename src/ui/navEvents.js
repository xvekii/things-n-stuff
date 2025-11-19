import { updateNavProjects } from "./projectUI.js";
import { containerRight } from "../index.js";
import { toggleInert } from "../utils/uiUtils.js";
import { addToDoBtn, hamburgerMenuBtn } from "../toDo-template.js";

const closeMainMenuBtn = document.querySelector(".close-main-menu-btn");
const showCurrProjName = document.querySelector(".show-proj-name-span");
showCurrProjName.textContent = "Notes";

export function bindNavEvents({ containerLeft }) {
  hamburgerMenuBtn.addEventListener("click", () => {
    toggleInert(containerRight);
    toggleInert(addToDoBtn);
    toggleMenu(containerLeft);
  
    if (containerLeft.classList.contains("active")) {
      updateNavProjects(containerRight);
    }
  });

  closeMainMenuBtn.addEventListener("click", () => {
    toggleInert(containerRight);
    toggleInert(addToDoBtn);
    toggleMenu(containerLeft);
  });
}

export function updateCurrentLocation(nav, clickedBtn) {
  const allMenuBtns = nav.querySelectorAll(".main-menu-btn");
  allMenuBtns.forEach(btn => btn.classList.toggle("selected-menu-btn", btn === clickedBtn)); 
  showCurrProjName.textContent = clickedBtn ? clickedBtn.textContent.trim() : "";
}

export function showProjsAsCurrLocation() {
  showCurrProjName.textContent = "Projects";
}

export function toggleMenu(containerLeft) {
  containerLeft.classList.toggle("active");
}
