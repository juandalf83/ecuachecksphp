import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FuryCardModule } from '../../../../@fury/shared/card/card.module';
import { HighlightModule } from '../../../../@fury/shared/highlightjs/highlight.module';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../../../@fury/shared/list/list.module';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { QueryRoutingModule } from './query-routing.module';
import { QueryComponent } from './query.component';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';
import { HeaderPlanModule } from 'src/app/components/header-plan/header-plan.module';
// import { ProgressSpinnerModule } from 'src/app/components/progress-spinner/progress-spinner.module';

import { FormComponent } from './form/form.component';
import { ResultsComponent } from './results/results.component';

@NgModule({
  imports: [
    CommonModule,
    QueryRoutingModule,
    MaterialModule,
    FurySharedModule,
    ReactiveFormsModule,
    FormsModule,

    // Core
    ListModule,
    HighlightModule,
    FuryCardModule,
    BreadcrumbsModule,
    HeaderPlanModule,
    // ProgressSpinnerModule
  ],
  declarations: [QueryComponent, FormComponent, ResultsComponent],
  exports: [QueryComponent]
})
export class QueryModule {
}
