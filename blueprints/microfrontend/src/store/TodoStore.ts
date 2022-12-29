import { makeAutoObservable } from 'mobx';
import Todo from '../models/Todo';
import RootStore from './RootStore';

class TodoStore {
  todos: Todo[] = [];
  loading = false;
  rootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  load() {
    this.loading = true;
  }
}

export default TodoStore;
