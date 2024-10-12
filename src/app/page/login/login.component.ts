import { UserSharedService } from './../../shared.signal/user.shared';
import { LoginService } from './../../service/login.service';
import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../shared/material/material';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SnackbarService } from '../../service/snackbar.service';
import { Router } from '@angular/router';
import { userInfo } from '../../model/user.model';
import { catchError, throwError } from 'rxjs';

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
  private _router = inject(Router);
  private loginService = inject(LoginService);
  private UserSharedService = inject(UserSharedService);

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

    this.loginService.login(this.loginform.getRawValue()).pipe(
      catchError((err) => {
        this._snackBar.error('Invalid Username or Password');
        return throwError(() => new Error(err.error.message));
      })
    ).subscribe((res) => {
      const data = res as userInfo;
      localStorage.setItem('token', data.accessToken);
      this.UserSharedService.userSignal.set(data);
      this._router.navigate(['page']);
    });  
  }
}
