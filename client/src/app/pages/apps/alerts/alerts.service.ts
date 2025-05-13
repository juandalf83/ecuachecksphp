import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmAlertComponent } from './confirm-alert.component';

@Injectable()
export class AlertService {

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {
  }

  infoMessage(message: string, callback: any = '') {
    this.messageAlert(message, 'info-alert', callback);
  }

  dangerMessage(message: string, callback: any = '') {
    this.messageAlert(message, 'danger-alert', callback);
  }

  warningMessage(message: string, callback: any = '') {
    this.messageAlert(message, 'warning-alert', callback);
  }

  messageAlert(message: string, css: string, callback: any){
    this.snackBar.open(message, 'Cerrar',{
        duration: 1000000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: [css],
    }).afterDismissed().subscribe(callback);
  }
  
  notificationAlert(message: string){
    this.snackBar.open(message, 'Cerrar',{
        duration: 9000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['general-alert']
    });
  }
  
  confirm(message: string) {
    return this.dialog.open(ConfirmAlertComponent,{
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: { top: "10px" },
      data :{
        message : message
      }
    });
  }
}
