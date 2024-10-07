import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../shared/material/material';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private _snackBar = inject(SnackbarService);
  private _builder = inject(FormBuilder);
  private _route = inject(Router);

  loginform!: FormGroup;
  
  ngOnInit(): void {
   this.loginform = this._builder.group({
      username: this._builder.control('', Validators.required),
      password: this._builder.control('', Validators.required)
    })
  }

  login(){
    if(this.loginform.invalid){
      this._snackBar.error('login Error!! please check your username and password')
      return
    } else {
      this._snackBar.success('login Success!!')
    }
    
    this._route.navigateByUrl('home')
  }
}
