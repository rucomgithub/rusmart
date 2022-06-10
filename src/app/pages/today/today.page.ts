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
        // console.log(strHour+""+strMinute)
        //let datetimeStr = strHour+":"+strMinute;
        let datetimeStr = strHour+""+strMinute;
        let diffTime = 4600;
        let hourMR30
        let minMR30;
        let hourNow = strHour
        let minNow = strMinute
        //this.startTimerEx(diffTime)
        var newarr = str.split("-"); 
        
        var diffHour ;
        var diffMin;
        if(dateTime >=newarr[0] && dateTime <=newarr[1]) {
          hourMR30 = newarr[1].substring(0,2)
          minMR30 = newarr[1].substring(2)
          minMR30 = minMR30 
          const dateN = parseInt(datetimeStr) ;
          const dateE = parseInt(newarr[1]);
           diffHour = parseInt(hourMR30) -parseInt(hourNow) ;
           diffMin =  (minMR30 -minNow) / (60 * 1000) ;
          // let test=parseInt(datetimeStr) -newarr[1]
          console.log("เวลา",diffHour,diffMin)

          
          const ddd = new Date(newarr[1]);
          const dnow = new Date();
          const total = ddd.getTime()-dnow.getTime()
          // console.log(ddd,dnow,total)
          // console.log(total/(1000 * 3600 * 24) )
          let diffDays = total/(1000 * 3600 * 24)

          //ปัจจุบัน
          var a = strHour+":"+strMinute
          var b = this.toDate(a,"h:m")

          console.log("wut=>",b);
          //ตาม มร30
          hourMR30 = newarr[1].substring(0,2)
          minMR30 = newarr[1].substring(2)
          console.log("Mr30=>",hourMR30+":"+minMR30)
          var bMr30 = this.toDate(hourMR30+":"+minMR30,"h:m")
          console.log("bMr30=>",bMr30)
          let x1 = new Date(bMr30) ;
          let x2 = new Date(b) ;
          //let mydiff=  Math.abs(x1.getTime() - x2.getTime()) / (1000 * 60) % 60;
          const hours = Math.abs(x1.getTime() - x2.getTime()) / (1000 * 60 * 60) % 24;
          const minutes = Math.abs(x1.getTime() - x2.getTime()) / (1000 * 60) % 60;
          const seconds = Math.abs(x1.getTime() - x2.getTime()) / (1000) % 60; 
          let diffTimes;
          //console.log(this.msToTime(x1.getTime() - x2.getTime() ))
          if(Math.floor(hours)==0 && Math.floor(minutes)==0 && Math.floor(seconds)==0){
            diffTimes = ""
            console.log("เหลืออีก",seconds)           
          }else if(hours < 1 ){
            diffTimes = minutes.toFixed()+" นาที. "
            console.log("เหลืออีก",minutes,seconds)
          }else{
            diffTimes = Math.floor(hours) +" ชม. "+minutes.toFixed()+" นาที."
            console.log("เหลืออีก",hours,minutes,seconds)
          }
          
          //console.log(hours,minutes,seconds)     
          return diffTimes.toString();
          //return test.toString()

        }
         return '';
}
msToTime(ms) {
  let seconds = (ms / 1000).toFixed(1);
  let minutes = (ms / (1000 * 60)).toFixed(1);
  let hours = (ms / (1000 * 60 * 60)).toFixed(1);
  let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
  if (parseInt(seconds)  < 60) {
    return seconds + " Sec";
  }
  else if (parseInt(minutes) < 60) {
    return minutes + " Min";
  }
  else if (parseInt(hours) < 24) {
    return hours + " Hrs";
  }
  else {
    return days + " Days"
  }
  
}

toDate(dStr,format) {
  var now = new Date();
  if (format == "h:m") {
     now.setHours(dStr.substr(0,dStr.indexOf(":")));
     now.setMinutes(dStr.substr(dStr.indexOf(":")+1));
     now.setSeconds(0);
     return now;
  }else 
    return "Invalid Format";
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
  if(dateTime >=newarr[0] && dateTime < newarr[1]) {
    return 'กำลังบรรยาย'
  }else if(dateTime <=newarr[0]){
    return 'วิชาถัดไป'
  }else if(dateTime >=newarr[1]){
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
