import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimplesTablesComponent } from './simples_tables.component';

const routes: Routes = [
  {
    path: '',
    component: SimplesTablesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimplesTablesRoutingModule {
}
