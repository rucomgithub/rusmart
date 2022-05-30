import { Component, OnInit, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { Mr30searchService } from "../../services/mr30search/mr30search.service";
import { Mr30 } from "../../services/mr30search/mr30search";
import {
  AlertController,
  IonList,
  IonRouterOutlet,
  ModalController,
  ToastController,
} from "@ionic/angular";
import { ConferenceData } from "../../providers/conference-data";
import { ScheduleFilterPage } from "../schedule-filter/schedule-filter";
import { UserData } from "../../providers/user-data";
import { filter } from "rxjs/operators";
import { Rec } from "../../services/mr30search/mr30search";
import { connectListeners } from "@ionic/core/dist/types/utils/overlays";

@Component({
  selector: "app-mr30search",
  templateUrl: "./mr30search.page.html",
  styleUrls: ["./mr30search.page.scss"],
})
export class Mr30searchPage implements OnInit {
  @ViewChild("scheduleList", { static: true }) scheduleList: IonList;
  mr30Arr: Rec[];
  mr30ArrTemp: Mr30;
  mr30ArrLocal:Mr30;
  ios: boolean;
  dayIndex = 0;
  queryText = "";
  segment = "all";
  excludeTracks: any = [];
  shownSessions: any = [];
  shownSessionsMr30: boolean = true;
  groups: any = [];
  confDate: string;
  showSearchbar: boolean;
  groupsFav: Rec[] ;
  mr30LocalStorage: any=[];

  constructor(
    private mr30searchService: Mr30searchService,
    public confData: ConferenceData,
    public modalCtrl: ModalController,
    public routerOutlet: IonRouterOutlet,
    public user: UserData,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
  ) {}

  ngOnInit() {
    // this.updateSchedule();
    // this.getMr30();
  }
  ionViewWillEnter() {
    this.updateSchedule();
    this.getMr30();
  }

  filterMr30() {
    let groupsFav: Rec[] = JSON.parse(localStorage.getItem("mr30"))
    // console.log(mr30local);
    if(this.segment =='all'){
      console.log("all");
      // console.log(this.mr30Arr);
      console.log(this.mr30ArrTemp);
      this.mr30Arr = this.mr30ArrTemp.RECORD.filter(
        // recdata => recdata.course_no.indexOf(this.queryText.toUpperCase()) > -1
        (recdata) =>
          recdata.course_no.startsWith(this.queryText.toUpperCase().toString())
      );
      if (this.mr30Arr.length == 0) {
        console.log("ไม่พบรหัสวิชา... all");
      }
    }else {
      this.groupsFav = groupsFav.filter(rec=>rec.course_no.startsWith(this.queryText.toUpperCase().toString()));
    }
   
    
  }

  getMr30Local(){
    this.mr30LocalStorage = JSON.parse(localStorage.getItem("mr30"))
  }

  getMr30() {
    this.mr30searchService.getMr30().subscribe((mr30data) => {
      this.mr30ArrTemp = mr30data;
      this.mr30Arr = mr30data.RECORD;
    });
  }

  async removeFavMR30(key){
    this.groupsFav = JSON.parse(localStorage.getItem("mr30")) == null? [] : JSON.parse(localStorage.getItem("mr30"));
    // index = this.groupsFav.findIndex(item => item.id == index)
    this.groupsFav.forEach( (item, index) => {
      if(item.id === key) 
      this.groupsFav.splice(index,1);
    });
    localStorage.setItem("mr30", JSON.stringify(this.groupsFav));
    const toast = await this.toastCtrl.create({
      header: `ลบออกจากรายการโปรดสำเร็จ`,
      duration: 1000,
      position: 'bottom',
      buttons: [
        {
          text: "Close",
          role: "cancel",
          
        },
      ],
    });
    await toast.present();
    this.filterMr30();
  }

  updateSchedule() {
    
    console.log(this.segment)
    this.groupsFav = JSON.parse(localStorage.getItem("mr30"));
    // Close any open sliding items when the schedule updates
    if (this.scheduleList) {
      this.scheduleList.closeSlidingItems();
    }

    const checkMr30Fav = JSON.parse(localStorage.getItem("mr30")) == null? false : true;
    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      // console.log('updateSchedule=>',data);
      // console.log('segment value=>',this.segment);
      // console.log('data.shownSessions=>',data.shownSessions);
      //this.shownSessions = data.shownSessions;
      //this.groups = data.groups;
      localStorage.setItem("groups", JSON.stringify(data.groups));
      localStorage.setItem("shownSessions", JSON.stringify(data.shownSessions));
      localStorage.setItem("shownSessionsMr30", JSON.stringify(checkMr30Fav));
      this.groups =JSON.parse(localStorage.getItem("groups"));
      this.shownSessions = JSON.parse(localStorage.getItem("shownSessions"));
      this.shownSessionsMr30 = JSON.parse(localStorage.getItem("shownSessionsMr30"));
      // console.log('groupslocal=>',this.groups);
      // console.log('shownSessionslocal=>',this.shownSessions);
      // console.log('shownSessionsMr30=>',this.shownSessionsMr30);
     
    });
    
  }

  async presentFilter() {
    const modal = await this.modalCtrl.create({
      component: ScheduleFilterPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: { excludedTracks: this.excludeTracks },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.excludeTracks = data;
      this.updateSchedule();
    }
  }
  async addMR30Fav(mr30Arr) {
    let mr30local = JSON.parse(localStorage.getItem("mr30")) == null? [] : JSON.parse(localStorage.getItem("mr30"));
  
    if (mr30local.filter((item) => item.id === mr30Arr.id).length == 0) {
      
      mr30local.push(mr30Arr);
      localStorage.setItem("mr30", JSON.stringify(mr30local));
      const toast = await this.toastCtrl.create({
        header: `เลือกวิชา ${mr30Arr.course_no} ลงแล้วรายการโปรด`,
        duration: 1000,
        position: 'bottom',
        color: 'success',
        buttons: [
          {
            text: "Close",
            role: "cancel",
          },
        ],
      });
      await toast.present();
    } else {
      
      const toast = await this.toastCtrl.create({
        header: `เลือกวิชา ${mr30Arr.course_no} ซ้ำ`,
        duration: 1000,
        position: 'bottom',
        color: 'danger',
        buttons: [
          {
            text: "Close",
            role: "cancel",
            
          },
        ],
      });
      await toast.present();
    }
  }
  async addFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any) {
    if (this.user.hasFavorite(sessionData.name)) {
      // Prompt to remove favorite
      this.removeFavorite(slidingItem, sessionData, "Favorite already added");
    } else {
      // Add as a favorite
      this.user.addFavorite(sessionData.name);

      // Close the open item
      slidingItem.close();

      // Create a toast
      const toast = await this.toastCtrl.create({
        header: `${sessionData.name} was successfully added as a favorite.`,
        duration: 1000,
        buttons: [
          {
            text: "Close",
            role: "cancel",
          },
        ],
      });

      // Present the toast at the bottom of the page
      await toast.present();
    }
  }

  async removeFavorite(
    slidingItem: HTMLIonItemSlidingElement,
    sessionData: any,
    title: string
  ) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: "Would you like to remove this session from your favorites?",
      buttons: [
        {
          text: "Cancel",
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          },
        },
        {
          text: "Remove",
          handler: () => {
            // they want to remove this session from their favorites
            this.user.removeFavorite(sessionData.name);
            this.updateSchedule();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          },
        },
      ],
    });
    // now present the alert on top of all other content
    await alert.present();
  }
}
