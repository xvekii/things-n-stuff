

export const createDiv = ({ classes }) => {
  const div = document.createElement("div");
  
  if (classes) {
    div.classList.add(...classes);
  }
  return div;
}

export const createSpan = ({ classes }) => {
  const span = document.createElement("span");

  if (classes) {
    span.classList.add(...classes);
  }
  return span;
}

export const createInput = ({ classes, attrs }) => {
  const titleInput = document.createElement("input");

  if (classes) {
    titleInput.classList.add(...classes);
  }

  Object.entries(attrs).forEach(([key, value]) => {
    titleInput.setAttribute(key, value);
  });
  return titleInput;
}



export const createHeading = ({ classes, headLvl, text }) => {
  const heading = document.createElement(headLvl);
  heading.textContent = text;

  if (classes) {
    heading.classList.add(...classes);
  }
  return heading;
}