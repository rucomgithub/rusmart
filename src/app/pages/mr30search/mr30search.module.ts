import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Mr30searchPageRoutingModule } from './mr30search-routing.module';

import { Mr30searchPage } from './mr30search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Mr30searchPageRoutingModule
  ],
  declarations: [Mr30searchPage]
})
export class Mr30searchPageModule {}
