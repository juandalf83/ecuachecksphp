import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansAdminComponent } from './plans-admin.component';

const routes: Routes = [
  {
    path: '',
    component: PlansAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlansAdminRoutingModule {
}
