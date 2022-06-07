import { Component, OnInit,ViewChild } from '@angular/core';
import { IonList, LoadingController } from '@ionic/angular';
import { Rec } from '../../services/mr30search/mr30search';
import { IonAccordionGroup } from '@ionic/angular';

@Component({
  selector: 'app-today',
  templateUrl: './today.page.html',
  styleUrls: ['./today.page.scss'],
})

export class TodayPage implements OnInit {
  @ViewChild(IonAccordionGroup, { static: true }) 
  urlSrcMenuImg3 = 'https://sevkn.ru.ac.th/rusmart/rusmart-images/about/sub3.png';
  accordionGroup: IonAccordionGroup;
  expirationCounter: string;
  timeLeft: number = 60;
  interval;
  scheduleList: IonList;
  ios: boolean;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  groupsFilter: any = [];
  groupsNow : any = [];
  groupsFav: any = [];
  confDate: string;
  showSearchbar: boolean;
  mr30ArrNow: Rec[];
  mr30ArrFilter: Rec[];
  arrMR30:any=[]
  arrExam:any=[]
  nowday 
  sumMR30 : number = 0;
  sumSchedule;
  urlSrcArrowImg = 'https://sevkn.ru.ac.th/rusmart/rusmart-images/about/arrow-1.png';
  accessToken ;
  constructor(    public loadingCtrl: LoadingController,) { }

  ngOnInit() {

  }

  
  async ionViewWillEnter() {
    this.getSchedule();
    this.getMr30Now();
    this.nowday = new Date();  
    //this.startTimer();


  }

   getSchedule() {
      this.groupsFilter=JSON.parse(localStorage.getItem("groups"));   
      this.groupsNow=[];
      this.sumSchedule = 0;
      this.groupsFilter.forEach((currentValue, index) => {
        if(currentValue != null) {
              const today = new Date();
              // console.log('substring',today.toISOString());
              let textday = today.toISOString().split('T')[0];
             
              let tempNow=currentValue.sessions.filter(item => 
   
                   textday >= item.timeStart && textday <= item.timeEnd
           
              );
             
              if(tempNow != null && tempNow.length >0){
                tempNow.forEach((item, index) => {
                  const ddd = new Date(item.timeEnd);
                  const dnow = new Date(textday);
                  const total = ddd.getTime()-dnow.getTime()
  
                  console.log(total/(1000 * 3600 * 24) )
                  item.diffDays = total/(1000 * 3600 * 24)
                  return this.groupsNow.push(item) ;
                });
              }                   
        }
      });
      for(var i=0; i< this.groupsNow.length;i++){
        this.sumSchedule = this.sumSchedule +1
      }
      return this.sumSchedule;
    
  
  }


  async getMr30Now() {
    const loading = await this.loadingCtrl.create({
    message: `กำลังโหลด...`,
  });
 // await loading.present();
    this.mr30ArrNow=[];
    this.mr30ArrFilter =this.getmr30storage();
    let days = new Date().getDay();
    this.arrMR30=[];
    this.sumMR30 = 0;
    if(this.mr30ArrFilter != null){
      this.mr30ArrFilter.filter(item => {
        if(item.day_code==days.toString()){
          item.time_period_text  = this.subPeriod(item.time_period)
          item.study_now = this.getTime(item.time_period)
          item.now_text = this.getText(item.time_period)
          this.getTime(item.time_period);
          this.arrMR30.push(item)
        //  loading.dismiss();
        }
      });
 
    }


   // loading.dismiss();
    for(var i=0; i< this.arrMR30.length;i++){
      this.sumMR30 = this.sumMR30 +1
    }

    this.arrMR30.sort((a,b)=> a.time_period.localeCompare(b.time_period));
    console.log(this.arrMR30)
    return this.sumMR30;

}


subPeriod(str){
        var newarr = str.split("-"); 
        return newarr[0]+"\n"+newarr[1];
}

getDateTime(){
  
}
getTime(str){
        let nowHours = new Date().getHours();
        let strHour
       // let d = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Bangkok"})); 
        let nowMinutes = new Date().getMinutes();
        let strMinute
        if (nowHours < 10) {
          strHour = "0" + nowHours;
        }else if(nowHours >= 10) {
          strHour = nowHours;
        }
        if (nowMinutes < 10) {
          strMinute = "0" + nowMinutes;
        }else if(nowMinutes >= 10) {
          strMinute = nowMinutes;
        }
       // console.log(d)
        let dateTime = strHour+""+strMinute;
        console.log(strHour+""+strMinute)
        let datetimeStr = strHour+":"+strMinute;
        let diffTime = 4600;
        //this.startTimerEx(diffTime)
        var newarr = str.split("-"); 
        if(dateTime >=newarr[0] && dateTime <=newarr[1]) {
          return datetimeStr
        }
         return '';
}

getText(str){
  let nowHours = new Date().getHours();
  let strHour
 // let d = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Bangkok"})); 
  let nowMinutes = new Date().getMinutes();
  let strMinute
  if (nowHours < 10) {
    strHour = "0" + nowHours;
  }else if(nowHours >= 10) {
    strHour = nowHours;
  }
  if (nowMinutes < 10) {
    strMinute = "0" + nowMinutes;
  }else if(nowMinutes >= 10) {
    strMinute = nowMinutes;
  }
 // console.log(d)
  let dateTime = strHour+""+strMinute;
  console.log(strHour+""+strMinute)
  let datetimeStr = strHour+":"+strMinute;
  let diffTime = 4600;
  //this.startTimerEx(diffTime)
  var newarr = str.split("-"); 
  if(dateTime >=newarr[0] && dateTime <=newarr[1]) {
    return 'กำลังบรรยาย'
  }else if(dateTime <=newarr[0]){
    return 'วิชาถัดไป'
  }else if(dateTime >newarr[1]){
    return 'หมดคาบ'
  }
   return '';
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

startTimerEx(secsToStart:number): void {
  var start: number = secsToStart;
  var h: number;
  var m: number;
  var s: number;
  var temp: number;
  var timer: any = setInterval(() =>
  {
      h = Math.floor(start / 60 / 60)
      // remove the hours
      temp = start - h * 60 * 60;
      m = Math.floor(temp / 60);
      // remove the minuets
      temp = temp - m * 60;
      // what left is the seconds
      s = temp;

      // add leading zeros for aesthetics
      var hour = h < 10 ? "0" + h : h;
      var minute = m < 10 ? "0" + m : m;
      var second = s < 10 ? "0" + s : s;

      this.expirationCounter = hour + ":" + minute + ":" + second;

      if (start <= 0) {
          // Time elapsed
          clearInterval(timer);
          this.expirationCounter = "Expired";
          // Make here changes in gui when time elapsed
          //....
      }
      start--;
  }, 1000)
}






}
