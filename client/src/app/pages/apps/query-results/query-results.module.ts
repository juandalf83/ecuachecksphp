import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { QueryResultsRoutingModule } from './query-results-routing.module';
import { QueryResultsComponent } from './query-results.component';
import { HeaderPlanModule } from 'src/app/components/header-plan/header-plan.module';
import { FilterResultModalModule } from './filter-result-modal/filter-result-modal.module';
import { JudicialProcessesModalModule } from './judicial-processes-modal/judicial-processes-modal.module';
import { TableResponsiveModule } from 'src/app/components/table-responsive/table-responsive.module';
import { TableJudicialModule } from 'src/app/components/table-judicial/table-judicial.module';

@NgModule({
  imports: [
    CommonModule,
    QueryResultsRoutingModule,
    FormsModule,
    MaterialModule,

    // Core
    ListModule,
    BreadcrumbsModule,
    HeaderPlanModule,
    FilterResultModalModule,
    JudicialProcessesModalModule,
    TableResponsiveModule,
    TableJudicialModule
  ],
  declarations: [QueryResultsComponent],
  exports: [QueryResultsComponent]
})
export class QueryResultsModule {
}
