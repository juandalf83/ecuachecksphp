import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { MassiveQueriesRoutingModule } from './massive-queries-routing.module';
import { MassiveQueriesComponent } from './massive-queries.component';
import { HeaderPlanModule } from 'src/app/components/header-plan/header-plan.module';

@NgModule({
  imports: [
    CommonModule,
    MassiveQueriesRoutingModule,
    FormsModule,
    MaterialModule,

    // Core
    ListModule,
    BreadcrumbsModule,
    HeaderPlanModule
  ],
  declarations: [MassiveQueriesComponent],
  exports: [MassiveQueriesComponent]
})
export class MassiveQueriesModule {
}
