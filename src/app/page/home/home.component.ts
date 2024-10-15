import { Router, RouterModule } from '@angular/router';

import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../shared/material/material';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoBaseComponent } from "../../components/todo-base/todo-base.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, RouterModule, TodoBaseComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  router = inject(Router);
  gotoPage(url:string){
    this.router.navigate([`page/${url}`]);
  }
}
