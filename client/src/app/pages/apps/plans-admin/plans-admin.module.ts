import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { PlansAdminRoutingModule } from './plans-admin-routing.module';
import { PlansAdminComponent } from './plans-admin.component';
import { HeaderPlanModule } from 'src/app/components/header-plan/header-plan.module';
import { PlanCreateUpdateModule } from './plan-create-update/plan-create-update.module';

@NgModule({
  imports: [
    CommonModule,
    PlansAdminRoutingModule,
    FormsModule,
    MaterialModule,

    // Core
    ListModule,
    BreadcrumbsModule,
    HeaderPlanModule,
    PlanCreateUpdateModule
  ],
  declarations: [PlansAdminComponent],
  exports: [PlansAdminComponent]
})
export class PlansAdminModule {
}
