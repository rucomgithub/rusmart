import { Component, OnInit, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { Mr30searchService } from "../../services/mr30search/mr30search.service";
import { Mr30 } from "../../services/mr30search/mr30search";
import {
  AlertController,
  IonList,
  IonRouterOutlet,
  LoadingController,
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
  mr30ArrNow: Rec[];
  mr30ArrFilter: Rec[];
  sumMR30;
  accessToken = localStorage.getItem("accessToken");
  constructor(
    private mr30searchService: Mr30searchService,
    public confData: ConferenceData,
    public modalCtrl: ModalController,
    public routerOutlet: IonRouterOutlet,
    public user: UserData,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private loadingCtrl:LoadingController
  ) {}

  ngOnInit() {
    // this.updateSchedule();
    // this.getMr30();
  }
  ionViewWillEnter() {
    this.updateSchedule();
    //this.getMr30Now();
    this.getMr30();
  }

  pickDateColor(courseStudyDatetime : any ): string {
    var myDate = ["su","m","tu","w","th","f","s","t"];
    var filteredArray = (myDate, courseStudyDatetime) => {
      console.log("jjjjjjjjjj")
      console.log(courseStudyDatetime)
      console.log(myDate.filter(name => name.toLowerCase().search(courseStudyDatetime.toLowerCase()) !== -1))
      console.log("--------------------")
      return myDate.filter(name => name.toLowerCase().search(courseStudyDatetime.toLowerCase()) !== -1);
    };
    return "m";
  }

  filterMr30() {
    let groupsFav: Rec[] = this.getmr30storage();
    
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

  async getMr30() {
      const loading = await this.loadingCtrl.create({
      message: `กำลังโหลด...`,
    });
    await loading.present();
    this.mr30searchService.getMr30().subscribe((mr30data) => {
      this.mr30ArrTemp = mr30data;
      this.mr30Arr = mr30data.RECORD;
      loading.dismiss();
    }
    ,err =>{
      loading.dismiss();
    }
    );

  }

  async getMr30Now() {
    const loading = await this.loadingCtrl.create({
    message: `กำลังโหลด...`,
  });
  await loading.present();
  this.mr30searchService.getMr30().subscribe((mr30data) => {
    this.mr30ArrTemp = mr30data;


    this.mr30ArrNow=[];
    this.mr30ArrFilter = mr30data.RECORD;
    let textday='TH';
    let tempMr:any=[]
    this.mr30ArrFilter.filter(item => {
      // if(item.course_study_datetime.split(' ')[0]==textday){
      //   tempMr.push(item)
      // }

     // console.log( item.course_study_datetime.split(' ')[0]==textday);
    });
    console.log(tempMr)
    // this.mr30ArrFilter.forEach((currentValue, index) => {
    //   if(currentValue != null) {
    //         console.log('mr30',currentValue)
    //         console.log((currentValue.course_study_datetime).split(' ')[0])
    //         const today = new Date();
    //         const todayMr30 = new Date().getDay();
    //         console.log(todayMr30)
    //         //const substrToday = new Date();
    //         //console.log('substring',substrToday.toISOString().split('T')[0]);
    //         //let textday = today.toISOString().split('T')[0];
    //         let textday='TH';
    //         // console.log(d,m,y);
    //         const day: any = today.toLocaleString('en-CA', { timeZone: 'UTC' });
    //         //console.log('day'+day);
    //         let tempNow=currentValue.filter(item => textday >= item.timeStart && textday <= item.timeEnd);
    //         //console.log(tempNow);
    //         if(tempNow != null && tempNow.length >0){
    //           tempNow.forEach((item, index) => {
    //             this.mr30ArrNow.push(item) ;
    //           });
    //         }
                     
    //   }
    // });

    loading.dismiss();
  }
  ,err =>{
    loading.dismiss();
  }
  );

}


  async removeFavMR30(key){
    console.log(key)
    const alert = await this.alertCtrl.create({
      header: 'ลบรายการโปรด',
      message: "ต้องการลบ "+ key +" รายการโปรดหรือไม่?",
      buttons: [
        {
          text: "ยกเลิก",
          handler: () => {

          },
        },
        {
          text: "ลบ",
          handler:async () => {
                
    this.groupsFav = this.getmr30storage();
    // index = this.groupsFav.findIndex(item => item.id == index)
    this.groupsFav.forEach( (item, index) => {
      if(item.id === key) 
      this.groupsFav.splice(index,1);
    });
    this.setmr30storage(this.groupsFav);
    const toast = await this.toastCtrl.create({
      header: "ลบ "+ key +" ออกจากรายการโปรดสำเร็จ",
      duration: 2000,
      position: 'bottom',
      color:'danger',
      buttons: [
        {
          text: "ปิด",
          role: "ยกเลิก",
          
        },
      ],
    });
    await toast.present();
    this.filterMr30();
    this.countSum()
          },
        },
      ],
    });
    // now present the alert on top of all other content
 
    await alert.present();

  }
  countSum(){
    this.sumMR30 = 0;
    let sumfav = this.getmr30storage();
    if(sumfav != null){
      for(var i=0; i< sumfav.length;i++){
        this.sumMR30 = this.sumMR30 +1
      }
  
    }
    return this.sumMR30;
  }

  updateSchedule() {
    
    console.log(this.segment)
    this.groupsFav = this.getmr30storage();
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
    this.countSum();
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
    let stdcode =  localStorage.getItem("stdCode");
    let mr30local = this.getmr30storage();
  
    if (mr30local.filter((item) => item.id === mr30Arr.id).length == 0) {
      
      mr30local.push(mr30Arr);
      this.setmr30storage(mr30local);
      const toast = await this.toastCtrl.create({
        header: `เลือกวิชา ${mr30Arr.course_no} ลงแล้วรายการโปรด`,
        duration: 2000,
        position: 'bottom',
        color: 'success',
        buttons: [
          {
            text: "Close",
            role: "cancel",
          },
        ],
      });
      this.countSum();
      await toast.present();
    } else {
      
      const toast = await this.toastCtrl.create({
        header: `เลือกวิชา ${mr30Arr.course_no} ซ้ำ`,
        duration: 2000,
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

  getmr30storage(){
    let accessToken = localStorage.getItem("accessToken");
    let stdcode =  localStorage.getItem("stdCode");
    let mr30local 
    if(accessToken !=null){
      //login
       mr30local = JSON.parse(localStorage.getItem("mr30-"+stdcode)) == null? [] : JSON.parse(localStorage.getItem("mr30-"+stdcode));
    }else{
      //not login
       mr30local = JSON.parse(localStorage.getItem("mr30")) == null? [] : JSON.parse(localStorage.getItem("mr30"));
    }
    return mr30local
  }

  setmr30storage(mr30local){
    let accessToken = localStorage.getItem("accessToken");
    let stdcode =  localStorage.getItem("stdCode");
    if(accessToken !=null){
      localStorage.setItem("mr30-"+stdcode, JSON.stringify(mr30local));
    }else{
    localStorage.setItem("mr30", JSON.stringify(mr30local));
    }
  }


}

