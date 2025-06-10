export class toDo {
  constructor(title, note, dueDate, priority, project) {
    this.title = title;
    this.note = note;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checkList = checkList;
    this.project = project;
    this.ID = crypto.randomUUID();
  }


}