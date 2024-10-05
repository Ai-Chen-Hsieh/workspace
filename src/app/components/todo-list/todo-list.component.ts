import { Component, computed, inject } from '@angular/core';
import { MaterialModule } from '../../shared/material/material';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../service/todo.service';
import { TaskFilterStatus } from '../../type/todo.type';

export interface Task {
  name: string;
  completed: boolean;
  subtasks?: Task[];
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule,MaterialModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent{

  constructor(private todoService: TodoService){}
  editingId: number | null = null;
  editingText: string = '';
  todosService = inject(TodoService);
  TaskFilterStatus = TaskFilterStatus;

  visibleTodos = computed(() => {
    const todos = this.todosService.allTodoSignal();
    const filter = this.todosService.statusSignal();

    if (filter === TaskFilterStatus.Active) {
      return todos.filter((todo) => !todo.completed);
    } else if (filter === TaskFilterStatus.Completed) {
      return todos.filter((todo) => todo.completed);
    }
    return todos;
  });

  update(completed: boolean, index?: number) {
    this.todoService.update(completed, index);
  }

  all(){}

  changeFilterStatus(status: TaskFilterStatus) {
    this.todoService.changeFilterStatus(status);
  }

  changeText(event:Event){
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
  }
  editTodo(id: number) {
    this.todoService.editTodo(id, this.editingText);
    this.editingId = null;
  }


  setEditingId(id: number | null) {
    this.editingId = id; 
  }


  add(value: string, $event:any) {
    if(value.trim().length === 0) {
      return
    }

    this.todoService.addTodo(value);
    $event.value = '';
  }

  deleteTodo(id: number) {  
    this.todoService.deleteTodo(id);
  }

}
