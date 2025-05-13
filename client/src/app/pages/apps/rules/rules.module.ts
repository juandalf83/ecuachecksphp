import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { RulesRoutingModule } from './rules-routing.module';
import { RulesComponent } from './rules.component';
import { HeaderPlanModule } from 'src/app/components/header-plan/header-plan.module';
import { TableRulesModule } from 'src/app/components/table-rules/table-rules.module';

@NgModule({
  imports: [
    CommonModule,
    RulesRoutingModule,
    FormsModule,
    MaterialModule,

    // Core
    ListModule,
    BreadcrumbsModule,
    HeaderPlanModule,
    TableRulesModule
  ],
  declarations: [RulesComponent],
  exports: [RulesComponent]
})
export class RulesModule {
}
