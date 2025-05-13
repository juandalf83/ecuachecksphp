import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { IntroductionRoutingModule } from './introduction-routing.module';
import { IntroductionComponent } from './introduction.component';
import { FurySharedModule } from '../../../@fury/fury-shared.module';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';

@NgModule({
  imports: [
    CommonModule,
    IntroductionRoutingModule,
    MaterialModule,
    FurySharedModule,
    FormsModule,

    // Widgets
    FuryCardModule,
    ReactiveFormsModule,
  ],
  declarations: [IntroductionComponent],
  providers: []
})
export class IntroductionModule {
}
