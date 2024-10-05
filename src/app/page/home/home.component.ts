import { Route, RouterModule } from '@angular/router';

import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material/material';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoListComponent } from '../../components/todo-list/todo-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, RouterModule, TodoListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  menulist = [
    {
      icon: 'home',
      menu: 'home'
    },
    {
      icon: 'person',
      menu: 'user'
    }
  ]
}
