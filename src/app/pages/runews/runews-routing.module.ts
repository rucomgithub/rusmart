import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RunewsPage } from './runews.page';

const routes: Routes = [
  {
    path: '',
    component: RunewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RunewsPageRoutingModule {}
