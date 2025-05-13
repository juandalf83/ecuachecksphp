import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmAlertComponent } from './confirm-alert.component';

@NgModule({
  imports: [
    MaterialModule,
    MatDialogModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  declarations: [ConfirmAlertComponent],
  exports: [ConfirmAlertComponent]
})
export class ConfirmAlertModule {
}
