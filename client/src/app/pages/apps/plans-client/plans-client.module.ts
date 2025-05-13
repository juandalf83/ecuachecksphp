import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { PlansClientRoutingModule } from './plans-client-routing.module';
import { PlansClientComponent } from './plans-client.component';
import { HeaderPlanModule } from 'src/app/components/header-plan/header-plan.module';
import { NgxSliderModule } from 'ngx-slider-v2' 
import { PlanSelectComponent } from './plan-select/plan-select.component';

@NgModule({
  imports: [
    CommonModule,
    PlansClientRoutingModule,
    FormsModule,
    MaterialModule,

    // Core
    ListModule,
    BreadcrumbsModule,
    HeaderPlanModule,
    NgxSliderModule
  ],
  declarations: [PlansClientComponent, PlanSelectComponent],
  exports: [PlansClientComponent]
})
export class PlansClientModule {
}
