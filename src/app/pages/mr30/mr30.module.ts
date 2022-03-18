import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Mr30PageRoutingModule } from './mr30-routing.module';

import { Mr30Page } from './mr30.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Mr30PageRoutingModule
  ],
  declarations: [Mr30Page]
})
export class Mr30PageModule {}
