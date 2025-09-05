import { parseISO, differenceInMilliseconds, isAfter } from "date-fns";

export class Todo {
  constructor(priority, title, notes, dueDate) {
    this.title = title;
    this.notes = notes;
    this.dueDate = dueDate;
    this.priority = priority;
    // this.project = project;
    this.ID = crypto.randomUUID();
    this.reminderTimerId = null;
  
    this.setReminder(this.dueDate, () => {
      alert(this.title);
    });
  }

  setReminder(dueDate, reminderFn) {
    if (!dueDate) {
      if (this.reminderTimerId) {
        this.clearReminder();
      } 
      return;
    }

    if (this.reminderTimerId) {
    clearTimeout(this.reminderTimerId);
    }
    
    const reminderDateTime = parseISO(dueDate);
    const dateTimeNow = new Date(); 

    if (isAfter(reminderDateTime, dateTimeNow)) {
      const delay = differenceInMilliseconds(reminderDateTime, dateTimeNow);
      this.reminderTimerId = setTimeout(reminderFn, delay);
    }
  }

  // On change reminder, clear the old one
  clearReminder() {
    if (this.reminderTimerId) {
      clearTimeout(this.reminderTimerId);
      this.reminderTimerId = null;
    }
  }
}
