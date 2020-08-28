/** Todo Methods */

export function createTodo(todo) {
  // create a new todo and add it to the todo list
  // Todo object should include the following properties:
  // userId, id, title, completed
  let { todos } = this.state.jsonPlaceholderDB;
  let newTodoId = this.getNewId({ contentObj: "todo" });
  let newTodo = {
    userId: this.state.selectedUser.userId,
    title: todo.title,
    id: newTodoId,
    completed: false
  }
  todos.push(newTodo);
  this.updateDb(this.state.jsonPlaceholderDB);
}
export function completeTodo(id) {
  let { todos } = this.state.jsonPlaceholderDB;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todos[i].completed = true;
      break;
    }
  }
  this.updateDb(this.state.jsonPlaceholderDB)
}
