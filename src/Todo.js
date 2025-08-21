export class Todo {
  constructor(priority, title, notes, dueDate) {
    this.title = title;
    this.notes = notes;
    this.dueDate = dueDate;
    this.priority = priority;
    // this.project = project;
    this.ID = crypto.randomUUID();
  }

  // editTodo(title, notes) {
  //   
  // }

}

// constructor(title, notes, dueDate, priority, project)