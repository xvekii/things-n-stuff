import { parseISO, differenceInMilliseconds, isAfter } from "date-fns";

export class Todo {
  constructor({ 
    priority,
    title,
    notes = [],
    dueDate = null,
    projectID = null,
    ID = crypto.randomUUID() 
  } = {}) {
    this.title = title;
    this.notes = notes;
    this.dueDate = dueDate;
    this.priority = priority;
    this.projectID = projectID;
    this.ID = ID;
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

  static fromJSON(obj) {
    const todo = new Todo({
      ID: obj.ID,
      priority: obj.priority, 
      title: obj.title,
      notes: obj.notes,
      dueDate: obj.dueDate,
      projectID: obj.projectID,
    });

     todo.reminderTimerId = null;
     todo.setReminder(obj.dueDate, () => {
      alert(todo.title);
    });
    
    return todo;
  }

  toJSON() {
    return {
      ID: this.ID,
      priority: this.priority,
      title: this.title,
      notes: this.notes,
      dueDate: this.dueDate,
      projectID: this.projectID,
    };
  }
}
