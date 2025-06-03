import "./styles.css";
const hamburgerMenuBtn = document.querySelector(".hamburger");
const containerLeft = document.querySelector(".container-left");

hamburgerMenuBtn.addEventListener("click", () => {
  containerLeft.classList.toggle("active");
});