export class AllTodos {
  constructor() {
    this.todosArr = [];
  }

  set arr(value) {
    if (!Array.isArray(value)) {
      return;
    }
    this.todosArr = value;
  }

  addTodo(todo) {
    this.todosArr.push(todo);
  }

  getTodos() {
    return this.todosArr;
  }

  getTodo(todoID) {
    return this.getTodos().find(obj => obj.ID === todoID);
  }
  
  getTodosByProjID(prID) {
    return this.getTodos().filter(obj => obj.projectID === prID);
  }
}

export const todos = new AllTodos();