import { Component } from '@angular/core';

import { PopoverController } from '@ionic/angular';

import { PopoverPage } from '../about-popover/about-popover';
import { GoogleAuthService } from '../../services/google/google-auth.service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  styleUrls: ['./about.scss'],
})
export class AboutPage {
  location = 'madison';
  conferenceDate = '2047-05-17';
  accessToken: string = "";
  stdCode: string = "";
  // url_mlearning = 'http://10.6.6.96/mls2018rubram/site/loginforapp';
  // url_mlearning_redirect = 'http://10.6.6.96/mls2018rubram/showsubject';
  url_mlearning = 'https://m-learning.ru.ac.th/site/loginforapp';
  url_mlearning_redirect = 'https://m-learning.ru.ac.th/ShowSubject';
  url_eservice_grade_release='https://beta-e-service.ru.ac.th/index.php';
  //------ set url images ---------------------
  urlSrcMenuImg2 = 'https://sevkn.ru.ac.th/rusmart/rusmart-images/about/sub2.png';
  urlSrcMenuImg3 = 'https://sevkn.ru.ac.th/rusmart/rusmart-images/about/sub3.png';
  urlSrcMenuImg4 = 'https://sevkn.ru.ac.th/rusmart/rusmart-images/about/sub4.png';
  urlSrcMenuImg5 = 'https://sevkn.ru.ac.th/rusmart/rusmart-images/about/sub5.png';
  urlSrcMenuImg6 = 'https://sevkn.ru.ac.th/rusmart/rusmart-images/about/sub6.png';
  urlSrcMenuImg7 = 'https://sevkn.ru.ac.th/rusmart/rusmart-images/about/i2.png';
  urlSrcMenuImg8 = 'https://sevkn.ru.ac.th/rusmart/rusmart-images/about/i3.png';
  urlSrcMenuImg9 = 'https://sevkn.ru.ac.th/rusmart/rusmart-images/about/i4.png';
  urlSrcMenuImg10 = 'https://sevkn.ru.ac.th/rusmart/rusmart-images/about/i5.png';
  urlSrcMenuImg11 = 'https://sevkn.ru.ac.th/rusmart/rusmart-images/about/sub2.png';
  urlSrcMenuImg12 = 'https://sevkn.ru.ac.th/rusmart/rusmart-images/about/sub2.png';
  
  urlSrcArrowImg = 'https://sevkn.ru.ac.th/rusmart/rusmart-images/about/arrow-1.png';

  //-------------------------------------------


  selectOptions = {
    header: 'Select a Location'
  };
  setColor: string;
  constructor(public popoverCtrl: PopoverController,    public googleAuthService:GoogleAuthService) {

    this.setColor = 'blue';
    this.accessToken = localStorage.getItem("accessToken");
    this.stdCode = localStorage.getItem("stdCode");
    console.log(this.accessToken);
   }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event
    });
    await popover.present();
  }

  MLearning() {
    window.open(this.url_mlearning+"?token="+this.accessToken+"&url="+this.url_mlearning_redirect+"&std_code="+this.stdCode, "_system", "location=yes");
  }
  eServiceGradeRelease() {
    window.open(this.url_eservice_grade_release+"?r=site/loginForApp&token="+this.accessToken+"&url=gradeRelease&std_code="+this.stdCode, "_system", "location=yes");
  }
  gradeAll(){
    window.open(this.url_eservice_grade_release+"?r=site/loginForApp&token="+this.accessToken+"&url=gradeAll&std_code="+this.stdCode, "_system", "location=yes");
  }
  regisRu24(){
    window.open(this.url_eservice_grade_release+"?r=site/loginForApp&token="+this.accessToken+"&url=regisRu24&std_code="+this.stdCode, "_system", "location=yes");
  }
  examSchedule(){
    window.open(this.url_eservice_grade_release+"?r=site/loginForApp&token="+this.accessToken+"&url=examSchedule&std_code="+this.stdCode, "_system", "location=yes");
  }
  regisRu24Intro(){
    window.open(this.url_eservice_grade_release+"?r=site/loginForApp&token="+this.accessToken+"&url=regisRu24Intro&std_code="+this.stdCode, "_system", "location=yes");
  }
  mobile(){
    window.open(this.url_eservice_grade_release+"?r=site/loginForApp&token="+this.accessToken+"&url=mobile&std_code="+this.stdCode, "_system", "location=yes");
  }  
  signOut(){
    console.log("signout")
    this.googleAuthService.signOut().subscribe();
  }
}
