import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FuryCardModule } from '../../../../@fury/shared/card/card.module';
import { HighlightModule } from '../../../../@fury/shared/highlightjs/highlight.module';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../../../@fury/shared/list/list.module';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { ConstructionRoutingModule } from './construction-routing.module';
import { ConstructionComponent } from './construction.component';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';

@NgModule({
  imports: [
    CommonModule,
    ConstructionRoutingModule,
    MaterialModule,
    FurySharedModule,
    ReactiveFormsModule,
    FormsModule,

    // Core
    ListModule,
    HighlightModule,
    FuryCardModule,
    BreadcrumbsModule,
  ],
  declarations: [ConstructionComponent],
  exports: [ConstructionComponent]
})
export class ConstructionModule {
}
