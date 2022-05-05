import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Mr30searchPage } from './mr30search.page';

const routes: Routes = [
  {
    path: '',
    component: Mr30searchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Mr30searchPageRoutingModule {}
