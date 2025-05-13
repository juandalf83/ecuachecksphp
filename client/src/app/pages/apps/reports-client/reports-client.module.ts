import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { ReportsClientRoutingModule } from './reports-client-routing.module';
import { ReportsClientComponent } from './reports-client.component';
import { HeaderPlanModule } from 'src/app/components/header-plan/header-plan.module';

@NgModule({
  imports: [
    CommonModule,
    ReportsClientRoutingModule,
    FormsModule,
    MaterialModule,

    // Core
    ListModule,
    BreadcrumbsModule,
    HeaderPlanModule
  ],
  declarations: [ReportsClientComponent],
  exports: [ReportsClientComponent]
})
export class ReportsClientModule {
}
