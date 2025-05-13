import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { GlossaryTermsRoutingModule } from './glossary-terms-routing.module';
import { GlossaryTermsComponent } from './glossary-terms.component';
import { HeaderPlanModule } from 'src/app/components/header-plan/header-plan.module';

@NgModule({
  imports: [
    CommonModule,
    GlossaryTermsRoutingModule,
    FormsModule,
    MaterialModule,

    // Core
    ListModule,
    BreadcrumbsModule,
    HeaderPlanModule
  ],
  declarations: [GlossaryTermsComponent],
  exports: [GlossaryTermsComponent]
})
export class GlossaryTermsModule {
}
