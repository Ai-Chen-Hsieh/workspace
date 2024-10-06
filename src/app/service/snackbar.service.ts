import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

const matSnackbarDefaultConfig: MatSnackBarConfig = {
  verticalPosition:'top',
  horizontalPosition: 'right',
  duration: 4000
};

@Injectable({
  providedIn: 'root'
})

export class SnackbarService {

  constructor(private snackbar: MatSnackBar) { }
  
  show(message: string, type: string[]): void {
    this.snackbar.open(
      message, 
      'x',
      {...matSnackbarDefaultConfig, panelClass: [...type]}
    )
  }

  error(message: string): void {
    this.show(message, ["mat-mdc-snack-bar-container", "error"]);
  }

  success(message: string): void {
    this.show(message, ["mat-mdc-snack-bar-container", "success"])
  }
  
}