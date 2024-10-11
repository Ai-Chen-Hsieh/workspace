import { LoginService } from './../../service/login.service';
import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../shared/material/material';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  private loginService = inject(LoginService);

  loginform!: FormGroup;
  showPassword = false;
  
  ngOnInit(): void {
    this.loginform = this._builder.nonNullable.group({
      username: this._builder.control('', Validators.required),
      password: this._builder.control('', Validators.required)
    })
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login(){
    if(this.loginform.invalid){
      this._snackBar.error('Invalid Username or Password');
      return
    } 

    this.loginService.login(this.loginform.value)
    .subscribe({
      next: (res) => console.log('res', res),
      error: (err) => console.error('Error:', err)
    });  
    
  }
}
