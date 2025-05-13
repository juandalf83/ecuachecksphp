import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoTutorialsComponent } from './video-tutorials.component';

const routes: Routes = [
  {
    path: '',
    component: VideoTutorialsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoTutorialsRoutingModule {
}
