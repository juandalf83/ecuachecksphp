import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsClientComponent } from './reports-client.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsClientRoutingModule {
}
