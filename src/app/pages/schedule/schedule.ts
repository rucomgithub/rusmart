import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList, IonRouterOutlet, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';

import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';
import { ThisReceiver } from '@angular/compiler';



@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
  styleUrls: ['./schedule.scss'],
})
export class SchedulePage implements OnInit {
  // Gets a reference to the list element
  @ViewChild('scheduleList', { static: true }) scheduleList: IonList;

  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  groupsFilter: any = [];
  groupsNow : any = [];
  // shownSessionsFav: any = [];
  groupsFav: any = [];
  confDate: string;
  showSearchbar: boolean;

  constructor(
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public user: UserData,
    public config: Config
  ) { }

  ngOnInit() {
    // this.updateSchedule();

    // this.ios = this.config.get('mode') === 'ios';

  }

  ionViewWillEnter() {
    this.updateSchedule();

    this.ios = this.config.get('mode') === 'ios';

  }

  async updateSchedule() {

   
    const loading = await this.loadingCtrl.create({
      message: `กำลังโหลด...`,
    });
    await loading.present();
    this.groupsFav = JSON.parse(localStorage.getItem("favorites"));
    // Close any open sliding items when the schedule updates
    if (this.scheduleList) {
      console.log('this.scheduleList');
      this.scheduleList.closeSlidingItems();
    }

    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      // console.log('updateSchedule=>',data);
      // console.log('segment value=>',this.segment);
      // console.log('data.shownSessions=>',data.shownSessions);
      //this.shownSessions = data.shownSessions;
      //this.groups = data.groups;
      localStorage.setItem("groups", JSON.stringify(data.groups));
      localStorage.setItem("shownSessions", JSON.stringify(data.shownSessions));
      this.groups =JSON.parse(localStorage.getItem("groups"));
      this.groupsFilter=JSON.parse(localStorage.getItem("groups"));
      //สำหรับทดสอบ
      //this.groupsFilter=JSON.parse('[{"time":"2022-05-02","sessions":[{"name":"รับสมัครนักศึกษาใหม่ส่วนกลางทาง Internet (ผู้ใช้สิทธ์เทียบโอนหน่วยกิต และผู้ไม่ใช้สิทธ์เทียบโอนหน่วยกิต) ได้ที่ www.iregis2.ru.ac.th","timeStart":"2022-05-02","timeEnd":"2022-07-03","location":"","tracks":["Ionic"],"id":"19","speakers":[],"hide":false}],"hide":false},{"time":"2022-05-02","sessions":[{"name":"Download ใบสมัครและระเบียบการรับสมัครนักศึกษาใหม่ได้ที่ www.ru.ac.th,www.iregis2.ru.ac.th,www.iregis.ru.ac.th","timeStart":"2022-05-02","timeEnd":"2022-07-03","location":"","tracks":["Ionic"],"id":"20","speakers":[],"hide":false}],"hide":false},{"time":"2022-05-02","sessions":[{"name":"รับสมัครนักศึกษาใหม่ส่วนกลางทางไปรษณีย์ (เฉพาะผู้ที่ไม่ใช้สิทธ์เทียบโอนหน่วยกิต)","timeStart":"2022-06-01","timeEnd":"2022-07-20","location":"","tracks":["Ionic"],"id":"21","speakers":[],"hide":false}],"hide":false},{"time":"2022-05-10","sessions":[{"name":"บรรยายในชั้นเรียน","timeStart":"2022-05-10","timeEnd":"2022-05-06","location":"","tracks":["Ionic"],"id":"15","speakers":[],"hide":false}],"hide":false}]')
      
      this.groupsNow=[];
      this.groupsFilter.forEach((currentValue, index) => {
        if(currentValue != null) {
              const today = new Date();
              //const substrToday = new Date();
              //console.log('substring',substrToday.toISOString().split('T')[0]);
              let textday = today.toISOString().split('T')[0];
              //let textday='2022-07-10';
              // console.log(d,m,y);
              const day: any = today.toLocaleString('en-CA', { timeZone: 'UTC' });
              //console.log('day'+day);
              let tempNow=currentValue.sessions.filter(item => textday >= item.timeStart && textday <= item.timeEnd);
              //console.log(tempNow);
              if(tempNow != null && tempNow.length >0){
                tempNow.forEach((item, index) => {
                  this.groupsNow.push(item) ;
                });
              }
                       
        }
      });
      console.log(this.groupsNow);
      this.shownSessions = JSON.parse(localStorage.getItem("shownSessions"));
      //console.log('groupslocal=>',this.groups);
      //console.log('shownSessionslocal=>',this.shownSessions);
      loading.dismiss();
    },err =>{
      loading.dismiss();
    }
    );
  }
  // getCalendarEventToday(): Observable<Calendar[]> {
  //   return this.http.get<Calendar[]>('https://calendar.ru.ac.th/CalendarCenter/ScheduleCenter')
  //     .pipe(
  //       map((calendars: Calendar[]) => {
  //         const today = new Date();
  //         const day: any = today.toLocaleString('en-CA', { timeZone: 'UTC' });
  //         console.log(day);
  //         const textday = day.split(',')[0];
  //         console.log(textday);
  //         return calendars.filter(item => textday >= item.start_date && textday <= item.end_date);
  //       })
  //     );
  // }
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
      // this.removeFavorite(slidingItem, sessionData, 'Favorite already added');
            
      const toast = await this.toastCtrl.create({
        header: `เลือก ${sessionData.name} ซ้ำ`,
        duration: 2000,
        position: 'bottom',
        color: 'danger',
        buttons: [
          {
            text: "ปิด",
            role: "ยกเลิก",
            
          },
        ],
      });
      await toast.present();
    } else {
      console.log('addFavorite Slide')
      // Add as a favorite
      this.user.addFavorite(sessionData.name);

      // Close the open item
      slidingItem.close();

      // Create a toast
      const toast = await this.toastCtrl.create({
        header: `เลือกลงรายการโปรด ${sessionData.name} `,
        color: 'success',
        duration: 2000,
        buttons: [{
          text: 'ปิด',
          role: 'ยกเลิก'
        }]
      });

      // Present the toast at the bottom of the page
      await toast.present();
    }

  }

  async removeFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any, title: string) {
    const alert = await this.alertCtrl.create({
      // header: title,
      header: 'ลบรายการโปรด',
      message: 'ต้องการลบออกจากรายการโปรดหรือไม่?',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'ลบ',
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
}
