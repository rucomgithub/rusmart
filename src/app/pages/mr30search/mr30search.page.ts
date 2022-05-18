import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import {Mr30searchService} from '../../services/mr30search/mr30search.service';
import {Mr30} from '../../services/mr30search/mr30search'
import { AlertController, IonList, IonRouterOutlet, ModalController, ToastController } from '@ionic/angular';
import { ConferenceData } from '../../providers/conference-data';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { UserData } from '../../providers/user-data';
import { filter } from 'rxjs/operators';
import { Rec }  from '../../services/mr30search/mr30search'

@Component({
  selector: 'app-mr30search',
  templateUrl: './mr30search.page.html',
  styleUrls: ['./mr30search.page.scss'],

})
export class Mr30searchPage implements OnInit {
  @ViewChild('scheduleList', { static: true }) scheduleList: IonList;
  mr30Arr : Rec[]
  mr30ArrTemp : Mr30
  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  showSearchbar: boolean;

  constructor(
    private mr30searchService:Mr30searchService, 
    public confData: ConferenceData,
    public modalCtrl: ModalController,
    public routerOutlet: IonRouterOutlet, 
    public user: UserData,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,) {

   }

  ngOnInit() {
    this.updateSchedule();
    this.getMr30();


  }



  filterMr30(){ 

    this.mr30Arr =  this.mr30ArrTemp.RECORD
    .filter(
      // recdata => recdata.course_no.indexOf(this.queryText.toUpperCase()) > -1
      recdata => recdata.course_no.startsWith(this.queryText.toUpperCase().toString())   
    );

    if(this.mr30Arr.length == 0) {
      console.log("ไม่พบรหัสวิชา...")
    }

    // this.mr30searchService.getMr30().subscribe(
    //   mr30data =>{
    //     console.log("text",this.queryText)
    //     this.mr30ArrTemp.RECORD =  mr30data.RECORD.filter(recdata =>recdata.course_no.indexOf(this.queryText.toUpperCase()) > -1    );
    //     console.log(this.mr30Arr.RECORD)        
    // })
  }

  getMr30(){
    this.mr30searchService.getMr30().subscribe(
      mr30data =>{
        this.mr30ArrTemp = mr30data   
        this.mr30Arr = mr30data.RECORD
        console.log(this.mr30ArrTemp)
        console.log(this.mr30Arr)
    })
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

}
