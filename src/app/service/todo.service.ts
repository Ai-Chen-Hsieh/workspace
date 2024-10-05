import { computed, Injectable, signal } from "@angular/core";
import { TaskFilterStatus } from "../type/todo.type";
import { Task } from "../model/todo.model";

@Injectable({
  providedIn: 'root'
})

export class TodoService {  
  constructor() { } 

  allTodoSignal = signal(this.getTodoList());
  statusSignal = signal(TaskFilterStatus.All);

  getTodoList() {
    return [
      {name: 'Child task 1', id:1, completed: false},
      {name: 'Child task 2', id:2, completed: false},
      {name: 'Child task 3', id:3, completed: false},
    ]
  };

  completedLeft = computed(() => {
    return this.allTodoSignal().filter(t => !t.completed).length
  });


  changeFilterStatus(status: TaskFilterStatus) {
    this.statusSignal.set(status);
  }

  update(completed: boolean, index?: number) {
    this.allTodoSignal.update(task => {
      if (index === undefined) {
        task?.forEach((t:any) => (t.completed = completed));
      } else {
        task![index].completed = completed;
      }
      return [...task];
    });
  };

  addTodo(todo:string){
    this.allTodoSignal.update((task) => {
      return [
        ...task,
        {
          name: todo,
          completed: false,
          id: Math.floor(Math.random() * 1000000)
        }
      ]
    })
  }

  deleteTodo(id: number) {
    this.allTodoSignal.update((todos) => todos.filter((todo) => todo.id !== id));
  }

  editTodo(id: number, name: string) {
    this.allTodoSignal.update((todos) => todos.map((todo) => todo.id === id ? {...todo, name} : todo));
  }

}