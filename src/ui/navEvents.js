import { updateNavProjects } from "./projectUI.js";

const showCurrProjName = document.querySelector(".show-proj-name-span");
showCurrProjName.textContent = "Notes";

export function bindNavEvents({ containerLeft }) {
  const hamburgerMenuBtn = document.querySelector(".hamburger");

  hamburgerMenuBtn.addEventListener("click", () => {
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
