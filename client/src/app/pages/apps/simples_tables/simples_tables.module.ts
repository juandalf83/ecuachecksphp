import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../../../@fury/shared/list/list.module';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { SimplesTablesRoutingModule } from './simples_tables-routing.module';
import { SimplesTablesComponent } from './simples_tables.component';
import { SimplesTablesCreateUpdateModule } from './simples_tables-create-update/simples_tables-create-update.module';

@NgModule({
  imports: [
    CommonModule,
    SimplesTablesRoutingModule,
    FormsModule,
    MaterialModule,

    // Core
    ListModule,
    SimplesTablesCreateUpdateModule,
    BreadcrumbsModule
  ],
  declarations: [SimplesTablesComponent],
  exports: [SimplesTablesComponent]
})
export class SimplesTablesModule {
}
