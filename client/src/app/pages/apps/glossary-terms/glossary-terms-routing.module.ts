import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlossaryTermsComponent } from './glossary-terms.component';

const routes: Routes = [
  {
    path: '',
    component: GlossaryTermsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlossaryTermsRoutingModule {
}
