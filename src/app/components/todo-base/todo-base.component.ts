import { MaterialModule } from './../../shared/material/material';
import { Component, computed, inject, signal } from '@angular/core';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListBoardComponent } from './todo-list-board/todo-list-board.component';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TodoService } from '../../service/todo.service';
import { UserSharedService } from '../../shared.signal/user.shared';
import { Router } from '@angular/router';
import { TaskFilterStatus } from '../../type/todo.type';

@Component({
  selector: 'app-todo-base',
  standalone: true,
  imports: [CommonModule, MaterialModule, MatButtonToggleModule, TodoListComponent, TodoListBoardComponent],
  templateUrl: './todo-base.component.html',
  styleUrl: './todo-base.component.scss'
})
export class TodoBaseComponent {
  isDragBoardMode = false;
  TaskFilterStatus = TaskFilterStatus;
  todoService = inject(TodoService);
  userSharedService = inject(UserSharedService);
  router = inject(Router);

  toggleViewMode($event: any) {
    const toggleValue = $event.value;
    this.isDragBoardMode = toggleValue === 'board';
  }

  add(value: string, $event:any) {
    if(value.trim().length === 0) {
      return
    }

    this.todoService.addTodo(value);
    $event.value = '';
  }


}
