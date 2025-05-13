import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { SimplesTablesCreateUpdateComponent } from './simples_tables-create-update.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule
  ],
  declarations: [SimplesTablesCreateUpdateComponent],
  exports: [SimplesTablesCreateUpdateComponent]
})
export class SimplesTablesCreateUpdateModule {
}
