import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RunewsPageRoutingModule } from './runews-routing.module';

import { RunewsPage } from './runews.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RunewsPageRoutingModule
  ],
  declarations: [RunewsPage]
})
export class RunewsPageModule {}
