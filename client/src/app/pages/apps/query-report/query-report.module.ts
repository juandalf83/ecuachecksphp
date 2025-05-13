import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { QueryReportRoutingModule } from './query-report-routing.module';
import { QueryReportComponent } from './query-report.component';
import { HeaderPlanModule } from 'src/app/components/header-plan/header-plan.module';
import { TableResponsiveModule } from 'src/app/components/table-responsive/table-responsive.module';
import { TableJudicialModule } from 'src/app/components/table-judicial/table-judicial.module';

@NgModule({
  imports: [
    CommonModule,
    QueryReportRoutingModule,
    FormsModule,
    MaterialModule,

    // Core
    ListModule,
    BreadcrumbsModule,
    HeaderPlanModule,
    TableResponsiveModule,
    TableJudicialModule
  ],
  declarations: [QueryReportComponent],
  exports: [QueryReportComponent]
})
export class QueryReportModule {
}
