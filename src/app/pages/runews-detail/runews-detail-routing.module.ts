import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RunewsDetailPage } from './runews-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RunewsDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RunewsDetailPageRoutingModule {}
