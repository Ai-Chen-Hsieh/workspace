import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material/material';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private builder: FormBuilder, private route: Router) {
   
  }
  ngOnInit(): void {
   this.loginform = this.builder.group({
      username: this.builder.control('', Validators.required),
      password: this.builder.control('', Validators.required)
    })
  }

  loginform: any;

  Proceedlogin(){
    this.route.navigateByUrl('home')
  }
  resetlogin(){}
}
