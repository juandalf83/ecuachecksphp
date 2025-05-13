import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { VerificationRoutingModule } from './verification-routing.module';
import { VerificationComponent } from './verification.component';

@NgModule({
  imports: [
    CommonModule,
    VerificationRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [VerificationComponent],
})
export class VerificationModule {
}
