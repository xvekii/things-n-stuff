// Create div, span, input, heading, btn + img
export const createDiv = ({ classes }) => {
  const div = document.createElement("div");
  div.classList.add(...classes);
  
  return div;
}

export const createSpan = ({ classes }) => {
  const span = document.createElement("span");
  span.classList.add(...classes);
  
  return span;
}

export const createInput = ({ classes, attrs }) => {
  const titleInput = document.createElement("input");
  titleInput.classList.add(...classes);

  Object.entries(attrs).forEach(([key, value]) => {
    titleInput.setAttribute(key, value);
  });
 
  return titleInput;
}

export const createHeading = ({ classes, headLvl, text }) => {
  const heading = document.createElement(headLvl);
  heading.classList.add(...classes);
  heading.textContent = text;

  return heading;
}

export const createBtn = ({ classes, attrs, imgSrc, imgClass, imgAlt, text }) => {
  const button = document.createElement("button");
  button.classList.add(...classes);
  
  if (imgSrc) {
    const image = document.createElement("img");
    if (imgClass) {
      image.classList.add(imgClass);
    }
    image.src = imgSrc;
    image.alt = imgAlt;
    button.appendChild(image);
  }
  
  if (text) {
    button.textContent = text;
  }

  Object.entries(attrs).forEach(([key, value]) => {
    button.setAttribute(key, value);
  });
  
  return button;
}