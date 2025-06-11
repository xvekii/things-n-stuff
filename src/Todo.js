export class Todo {
  constructor(title, notes, dueDate) {
    this.title = title;
    this.notes = notes;
    this.dueDate = dueDate;
    // this.priority = priority;
    // this.project = project;
    this.ID = crypto.randomUUID();
  }

  // addTodo(title, notes) {
  //   
  // }

}

// constructor(title, notes, dueDate, priority, project)