import { makeAutoObservable, reaction } from 'mobx';

class Todo {
  id: string | null = null; // Unique id of this Todo, immutable.
  completed = false;
  task = '';
  author: any = null; // Reference to an Author object (from the authorStore).
  store: any = null;
  autoSave = true; // Indicator for submitting changes in this Todo to the server.
  saveHandler: any = null; // Disposer of the side effect auto-saving this Todo (dispose).

  constructor(store: any, id = 'uuid.v4()') {
    makeAutoObservable(this, {
      id: false,
      store: false,
      autoSave: false,
      saveHandler: false,
      dispose: false,
    });
    this.store = store;
    this.id = id;

    this.saveHandler = reaction(
      () => this.asJson, // Observe everything that is used in the JSON.
      (json) => {
        // If autoSave is true, send JSON to the server.
        if (this.autoSave) {
          this.store.transportLayer.saveTodo(json);
        }
      }
    );
  }

  // Remove this Todo from the client and the server.
  delete() {
    this.store.transportLayer.deleteTodo(this.id);
    this.store.removeTodo(this);
  }

  get asJson() {
    return {
      id: this.id,
      completed: this.completed,
      task: this.task,
      authorId: this.author ? this.author.id : null,
    };
  }

  // Update this Todo with information from the server.
  updateFromJson(json: any) {
    this.autoSave = false; // Prevent sending of our changes back to the server.
    this.completed = json.completed;
    this.task = json.task;
    this.author = this.store.authorStore.resolveAuthor(json.authorId);
    this.autoSave = true;
  }

  // Clean up the observer.
  dispose() {
    this.saveHandler();
  }
}

export default Todo;
