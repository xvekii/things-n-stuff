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
  
  // Add check for existing todo
  // Upon editing an existing todo, check its place in todosArr
  // Add method for removing a todo (186, template)
}

export const todos = new AllTodos();