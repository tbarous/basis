import TodoStore from './TodoStore';

class RootStore {
  todoStore: TodoStore;

  constructor() {
    this.todoStore = new TodoStore(this);
  }
}

export default RootStore;
