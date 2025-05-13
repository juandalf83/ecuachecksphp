import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from './companies.component';
import { CompaniesCreateUpdateModule } from './companies-create-update/companies-create-update.module';
import { HeaderPlanModule } from 'src/app/components/header-plan/header-plan.module';

@NgModule({
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    FormsModule,
    MaterialModule,

    // Core
    ListModule,
    CompaniesCreateUpdateModule,
    BreadcrumbsModule,
    HeaderPlanModule
  ],
  declarations: [CompaniesComponent],
  exports: [CompaniesComponent]
})
export class CompaniesModule {
}
