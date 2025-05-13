import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { ScrollbarModule } from 'src/@fury/shared/scrollbar/scrollbar.module';
import { UserCreateUpdateComponent } from './user-create-update.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    ScrollbarModule,
    
  ],
  declarations: [UserCreateUpdateComponent],
  exports: [UserCreateUpdateComponent]
})
export class UserCreateUpdateModule {
}
