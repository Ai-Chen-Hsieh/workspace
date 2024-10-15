import { computed, Injectable, signal } from "@angular/core";
import { TaskFilterStatus } from "../type/todo.type";
import { Task } from "../model/todo.model";

@Injectable({
  providedIn: 'root'
})

export class TodoService {  
  allTodoSignal = signal(this.getTodoList());
  statusSignal = signal(TaskFilterStatus.All);

  getTodoList() {
    return [
      {name: 'Child task 1', id:1, completed: false, order: 1},
      {name: 'Child task 2', id:2, completed: false , order: 2},
      {name: 'Child task 3', id:3, completed: false , order: 3},
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

  dragUpdate(completed: boolean, id?: number, orderId?: number) {
    this.allTodoSignal.update(task => {
      task.forEach((t:Task) => {
        if(t.id == id){
          t.completed = completed;
        }
      })
      return [...task]
    });
  }

  addTodo(todo:string){
    this.allTodoSignal.update((task) => {
      return [
        ...task,
        {
          name: todo,
          completed: false,
          id: Math.floor(Math.random() * 1000000),
          order: task.length
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