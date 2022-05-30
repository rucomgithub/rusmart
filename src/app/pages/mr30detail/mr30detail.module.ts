import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Mr30detailPageRoutingModule } from './mr30detail-routing.module';

import { Mr30detailPage } from './mr30detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Mr30detailPageRoutingModule
  ],
  declarations: [Mr30detailPage]
})
export class Mr30detailPageModule {}
