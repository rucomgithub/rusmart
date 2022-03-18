import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Mr30Page } from './mr30.page';

const routes: Routes = [
  {
    path: '',
    component: Mr30Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Mr30PageRoutingModule {}
