import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansClientComponent } from './plans-client.component';

const routes: Routes = [
  {
    path: '',
    component: PlansClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlansClientRoutingModule {
}
