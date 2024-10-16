import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListBoardComponent } from './todo-list-board.component';

describe('TodoListBoardComponent', () => {
  let component: TodoListBoardComponent;
  let fixture: ComponentFixture<TodoListBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
