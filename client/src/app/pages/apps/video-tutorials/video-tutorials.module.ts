import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { VideoTutorialsRoutingModule } from './video-tutorials-routing.module';
import { VideoTutorialsComponent } from './video-tutorials.component';
import { HeaderPlanModule } from 'src/app/components/header-plan/header-plan.module';

@NgModule({
  imports: [
    CommonModule,
    VideoTutorialsRoutingModule,
    FormsModule,
    MaterialModule,

    // Core
    ListModule,
    BreadcrumbsModule,
    HeaderPlanModule
  ],
  declarations: [VideoTutorialsComponent],
  exports: [VideoTutorialsComponent]
})
export class VideoTutorialsModule {
}
