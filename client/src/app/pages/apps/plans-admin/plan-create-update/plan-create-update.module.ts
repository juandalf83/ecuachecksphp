import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { ScrollbarModule } from 'src/@fury/shared/scrollbar/scrollbar.module';
import { PlanCreateUpdateComponent } from './plan-create-update.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    ScrollbarModule,
    
  ],
  declarations: [PlanCreateUpdateComponent],
  exports: [PlanCreateUpdateComponent]
})
export class PlanCreateUpdateModule {
}
