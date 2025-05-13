import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { MyAccountRoutingModule } from './my-account-routing.module';
import { MyAccountComponent } from './my-account.component';
import { HeaderPlanModule } from 'src/app/components/header-plan/header-plan.module';

@NgModule({
  imports: [
    CommonModule,
    MyAccountRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HeaderPlanModule
  ],
  declarations: [MyAccountComponent]
})
export class MyAccountModule {
}
