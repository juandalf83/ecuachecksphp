import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MassiveQueriesComponent } from './massive-queries.component';

const routes: Routes = [
  {
    path: '',
    component: MassiveQueriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MassiveQueriesRoutingModule {
}
