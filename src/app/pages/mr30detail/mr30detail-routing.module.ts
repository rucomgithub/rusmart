import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Mr30detailPage } from './mr30detail.page';

const routes: Routes = [
  {
    path: '',
    component: Mr30detailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Mr30detailPageRoutingModule {}
