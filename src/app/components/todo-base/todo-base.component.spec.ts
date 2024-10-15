import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoBaseComponent } from './todo-base.component';

describe('TodoBaseComponent', () => {
  let component: TodoBaseComponent;
  let fixture: ComponentFixture<TodoBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
