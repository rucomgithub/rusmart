import { Component } from '@angular/core';

import { PopoverController } from '@ionic/angular';

import { PopoverPage } from '../about-popover/about-popover';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  styleUrls: ['./about.scss'],
})
export class AboutPage {
  location = 'madison';
  conferenceDate = '2047-05-17';

  //------ set url images ---------------------
  urlSrcMenuImg2 = 'https://sevkn.ru.ac.th/rusmart/rusmart-images/about/sub2.png';
  urlSrcMenuImg3 = 'https://sevkn.ru.ac.th/rusmart/rusmart-images/about/sub3.png';
  urlSrcMenuImg4 = 'https://sevkn.ru.ac.th/rusmart/rusmart-images/about/sub4.png';
  urlSrcMenuImg5 = 'https://sevkn.ru.ac.th/rusmart/rusmart-images/about/sub5.png';
  urlSrcMenuImg6 = 'https://sevkn.ru.ac.th/rusmart/rusmart-images/about/sub6.png';
  urlSrcMenuImg7 = 'https://sevkn.ru.ac.th/rusmart/rusmart-images/about/sub2.png';
  urlSrcMenuImg8 = 'https://sevkn.ru.ac.th/rusmart/rusmart-images/about/sub2.png';
  urlSrcMenuImg9 = 'https://sevkn.ru.ac.th/rusmart/rusmart-images/about/sub2.png';
  urlSrcMenuImg10 = 'https://sevkn.ru.ac.th/rusmart/rusmart-images/about/sub2.png';
  urlSrcMenuImg11 = 'https://sevkn.ru.ac.th/rusmart/rusmart-images/about/sub2.png';
  urlSrcMenuImg12 = 'https://sevkn.ru.ac.th/rusmart/rusmart-images/about/sub2.png';
  
  urlSrcArrowImg = 'https://sevkn.ru.ac.th/rusmart/rusmart-images/about/arrow-1.png';

  //-------------------------------------------

  selectOptions = {
    header: 'Select a Location'
  };
  setColor: string;
  constructor(public popoverCtrl: PopoverController) {
    this.setColor = 'blue';
   }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event
    });
    await popover.present();
  }
}
