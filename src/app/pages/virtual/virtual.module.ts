import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VirtualPageRoutingModule } from './virtual-routing.module';

import { VirtualPage } from './virtual.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VirtualPageRoutingModule
  ],
  declarations: [VirtualPage]
})
export class VirtualPageModule {}
