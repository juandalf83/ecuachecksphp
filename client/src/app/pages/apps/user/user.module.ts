import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserCreateUpdateModule } from './user-create-update/user-create-update.module';
import { HeaderPlanModule } from 'src/app/components/header-plan/header-plan.module';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    MaterialModule,

    // Core
    ListModule,
    UserCreateUpdateModule,
    BreadcrumbsModule,
    HeaderPlanModule
  ],
  declarations: [UserComponent],
  exports: [UserComponent]
})
export class UserModule {
}
