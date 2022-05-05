import { Component, OnInit,ViewChild } from '@angular/core';

import { PopoverController } from '@ionic/angular';

import { PopoverPage } from '../about-popover/about-popover';
import { Router } from '@angular/router';
import { AlertController, IonList, IonRouterOutlet, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';

import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';

import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface Session {
  name: string;
  timeStart: string;
  timeEnd: string;
  location: string;
  tracks: string[];
  id: string;
}

export interface Group {
  time: string;
  sessions: Session[];
}

export interface Schedule {
  date: string;
  groups: Group[];
}

export interface Calendar {
  schedule: Schedule[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('scheduleList', { static: true }) scheduleList: IonList;

  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  showSearchbar: boolean;
  location = 'madison';
  conferenceDate = '2047-05-17';
  userInfo = null;
  dateTime;
  textTime;
  colorbullet = "red";
  calendarList;
  selectOptions = {
    header: 'Select a Location'
  };
  colortime;

  constructor(public popoverCtrl: PopoverController,    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public user: UserData,
    public config: Config,
    public http:HttpClient) {
      GoogleAuth.initialize();
     }

  ngOnInit() {
    this.updateSchedule();
    this.checktime();
    this.ios = this.config.get('mode') === 'ios';
  //  this.callCalendar();

  }

  randomcolor(){
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
  
  callCalendar(){
    console.log("call")
    this.getCalendarEventToday().subscribe(data=>{
      console.log("sub",data)
      this.calendarList = data
    })
  }

  getCalendarEventToday(): Observable<Calendar[]> {
    return this.http.get<Calendar[]>('https://calendar.ru.ac.th/CalendarCenter/ScheduleCenter')
      .pipe(
        map((calendars: Calendar[]) => {
          const today = new Date();
          const day: any = today.toLocaleString('en-CA', { timeZone: 'UTC' });
          console.log(day);
          const textday = day.split(',')[0];
          console.log(textday);
          console.log(calendars);
          return calendars.filter(()=>{});//textday >= item.start_date && textday <= item.end_date);
        })
      );
  }

  checktime(){
    this.dateTime = new Date().getHours();
    if(this.dateTime >= 8 && this.dateTime <= 9){
      this.textTime = 'ตอนเช้า'
      this.colortime ='detail-pallate-morning'
   }  else if(this.dateTime >= 10  && this.dateTime <= 12){
      this.textTime = 'ยามสาย'
      this.colortime ='detail-pallate-daylight'
    }else if(this.dateTime >= 13  && this.dateTime <= 16){
      this.textTime = 'ช่วงบ่าย'
      this.colortime ='detail-pallate-afternoon'
    }else if(this.dateTime >= 17  && this.dateTime <= 19){
      this.textTime = 'ยามเย็น'
      this.colortime ='detail-pallate-evening'
    }else if(this.dateTime >= 20  && this.dateTime <=7) {
      this.textTime = 'ตอนดึก'
      this.colortime ='detail-pallate-night'
   }else{
      this.textTime = 'ตอนดึก'
      this.colortime ='detail-pallate-night'
    }
  }

  updateSchedule() {
    // Close any open sliding items when the schedule updates
    if (this.scheduleList) {
      this.scheduleList.closeSlidingItems();
    }

    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
  }
  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event
    });
    await popover.present();
  }

  async presentFilter() {
    const modal = await this.modalCtrl.create({
      component: ScheduleFilterPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: { excludedTracks: this.excludeTracks }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.excludeTracks = data;
      this.updateSchedule();
    }
  }

  async addFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any) {
    if (this.user.hasFavorite(sessionData.name)) {
      // Prompt to remove favorite
      this.removeFavorite(slidingItem, sessionData, 'Favorite already added');
    } else {
      // Add as a favorite
      this.user.addFavorite(sessionData.name);

      // Close the open item
      slidingItem.close();

      // Create a toast
      const toast = await this.toastCtrl.create({
        header: `${sessionData.name} was successfully added as a favorite.`,
        duration: 3000,
        buttons: [{
          text: 'Close',
          role: 'cancel'
        }]
      });

      // Present the toast at the bottom of the page
      await toast.present();
    }

  }

  async removeFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any, title: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: 'Would you like to remove this session from your favorites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            // they want to remove this session from their favorites
            this.user.removeFavorite(sessionData.name);
            this.updateSchedule();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    await alert.present();
  }

  async openSocial(network: string, fab: HTMLIonFabElement) {
    const loading = await this.loadingCtrl.create({
      message: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    await loading.present();
    await loading.onWillDismiss();
    fab.close();
  }
  async googleSignup() {
    //const googleUser = await Plugins.GoogleAuth.signIn(null) as any;
    const googleUser = await GoogleAuth.signIn() as any;
    console.log('my user: ', googleUser);
    this.userInfo = googleUser;
  }



}
