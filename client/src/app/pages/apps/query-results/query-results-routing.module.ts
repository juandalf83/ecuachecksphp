import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueryResultsComponent } from './query-results.component';

const routes: Routes = [
  {
    path: '',
    component: QueryResultsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueryResultsRoutingModule {
}
