import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { ScrollbarModule } from '../../../@fury/shared/scrollbar/scrollbar.module';
import { QuickpanelComponent } from './quickpanel.component';
import { UserCreateUpdateModule } from 'src/app/pages/apps/user/user-create-update/user-create-update.module';
import { CompaniesCreateUpdateModule } from 'src/app/pages/apps/companies/companies-create-update/companies-create-update.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ScrollbarModule,
    FuryCardModule,
    UserCreateUpdateModule,
    CompaniesCreateUpdateModule,
  ],
  declarations: [QuickpanelComponent],
  exports: [QuickpanelComponent]
})
export class QuickpanelModule {
}
