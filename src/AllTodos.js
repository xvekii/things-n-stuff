export class AllTodos {
  constructor() {
    this.todosArr = [];
  }

  addTodo(todo) {
    this.todosArr.push(todo);
  }

  getTodos() {
    return this.todosArr;
  }
  
  // Add check for existing todo
  // Upon editing an existing todo, check its place in todosArr
  // Add method for removing a todo (186, template)
}