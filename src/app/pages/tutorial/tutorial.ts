import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { MenuController } from '@ionic/angular';

import { Storage } from '@ionic/storage';
import Swiper from 'swiper';

import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
  styleUrls: ['./tutorial.scss'],
})
export class TutorialPage {
  showSkip = true;
  private slides: Swiper;
  userInfo = null;
  constructor(
    public menu: MenuController,
    public router: Router,
    public storage: Storage,
    private cd: ChangeDetectorRef
  ) {
    GoogleAuth.initialize();
  }

  startApp() {
    this.router
      .navigateByUrl('/app/tabs/home', { replaceUrl: true })
      .then(() => this.storage.set('ion_did_tutorial', true));
  }

  setSwiperInstance(swiper: Swiper) {
    this.slides = swiper;
  }

  onSlideChangeStart() {
    this.showSkip = !this.slides.isEnd;
    this.cd.detectChanges();
  }

  ionViewWillEnter() {
    this.storage.get('ion_did_tutorial').then(res => {
      if (res === true) {
        this.router.navigateByUrl('/app/tabs/home', { replaceUrl: true });
      }
    });

    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
  async googleSignup() {
    //const googleUser = await Plugins.GoogleAuth.signIn(null) as any;
    const googleUser = await GoogleAuth.signIn() as any;
    console.log('my user: ', googleUser);
    this.userInfo = googleUser;
  }
}
