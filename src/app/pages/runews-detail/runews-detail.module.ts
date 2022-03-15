import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RunewsDetailPageRoutingModule } from './runews-detail-routing.module';

import { RunewsDetailPage } from './runews-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RunewsDetailPageRoutingModule
  ],
  declarations: [RunewsDetailPage]
})
export class RunewsDetailPageModule {}
