import { Component, computed, inject } from '@angular/core';
import {
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { TodoService } from '../../../service/todo.service';


@Component({
  selector: 'app-todo-list-board',
  standalone: true,
  imports: [CdkDropList, CdkDrag],
  templateUrl: './todo-list-board.component.html',
  styleUrl: './todo-list-board.component.scss'
})
export class TodoListBoardComponent {
  todosService = inject(TodoService);

  todo = computed(() => this.todosService.allTodoSignal().filter((todo) => !todo.completed))
  doneTodo = computed(() => this.todosService.allTodoSignal().filter((todo) => todo.completed))

    drop(event: any, type: string) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const isCompleted = type === 'done' ? true : false;
      const itemId = event.item.element.nativeElement.id;

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.todosService.dragUpdate(isCompleted, itemId)
    }
  }

}
