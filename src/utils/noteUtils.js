import { createTextarea } from "../helpers";

let noteIdCounter = 0;

export function createNewNote() {
  noteIdCounter += 1;
  
  const newNote = createTextarea({
    classes: ["note", "note-text", "no-border"],
    attrs: {
      id: `note-${noteIdCounter}`,
      name: "note",
      cols: "12",
      rows: "1",
      wrap: "hard",
      maxlength: "580",
      placeholder: "Write a note...",
      autocomplete: "off",
      autocorrect: "off",
      spellcheck: "false",
    }
  });

  return newNote;
}

export function resizeNote(note) {
  requestAnimationFrame(() => {
    note.style.height = "auto";
    note.style.height = note.scrollHeight + "px";
  });
}

export function fillNotes(notesContainer, notes) {
  notesContainer.innerHTML = "";
  notes.forEach((note, index) => {
    const newNote = createNewNote();
    newNote.value = note;
    resizeNote(newNote);
    
    if (index === 0 && note === "" && notes.length === 1) {
      addPlaceholder(newNote);
    } else {
      removePlaceholder(newNote);
    }
    
    notesContainer.appendChild(newNote);
  });
}

export function addPlaceholder(note) {
  note.setAttribute("placeholder", "Write a note...");
} 

export function removePlaceholder(note) {
  note.removeAttribute("placeholder");
}

export function placeCaretAtStart(el) {
  el.setSelectionRange(0, 0);
}

export function appendExtraNote(prevNote, extraNote) {
    prevNote.after(extraNote);
    focusNote(extraNote);
  }

export function focusNote(note) {
  note.focus();
}
