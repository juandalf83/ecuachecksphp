import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueryReportComponent } from './query-report.component';

const routes: Routes = [
  {
    path: '',
    component: QueryReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueryReportRoutingModule {
}
