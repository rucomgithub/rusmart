import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rec } from '../../services/mr30search/mr30search';
import {
  AlertController,
  IonList,
  IonRouterOutlet,
  ModalController,
  ToastController,
} from "@ionic/angular";

@Component({
  selector: 'app-mr30detail',
  templateUrl: './mr30detail.page.html',
  styleUrls: ['./mr30detail.page.scss'],
})
export class Mr30detailPage {

  mr30Arr: Rec;
  mr30ArrTemp: Rec;
  isFavorite = false;
  groupsFav: any = [];
  constructor(private activatedRoute: ActivatedRoute,    public toastCtrl: ToastController,) { }

  ionViewWillEnter() {
    let mr30local = this.getmr30storage();
    this.activatedRoute.params.subscribe(params => {
      this.mr30ArrTemp = JSON.parse(params['id']);
      console.log(this.mr30ArrTemp.id);

      for (const session of mr30local) {
        if (session && session.id === this.mr30ArrTemp.id) {
          this.isFavorite = true;
          break;
        }
      }

      });
  }
  async toggleFavorite(mr30Arr) {
    let mr30local = this.getmr30storage();
  
    if (mr30local.filter((item) => item.id === mr30Arr.id).length == 0) {
      
      mr30local.push(mr30Arr);
      localStorage.setItem("mr30", JSON.stringify(mr30local));
      const toast = await this.toastCtrl.create({
        header: `เลือกวิชา ${mr30Arr.course_no} ลงแล้วรายการโปรด`,
        duration: 3000,
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
      this.isFavorite = true;
    } else {
      this.groupsFav = this.getmr30storage();
      // index = this.groupsFav.findIndex(item => item.id == index)
      this.groupsFav.forEach( (item, index) => {
        if(item.id === mr30Arr.id) 
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
      this.isFavorite = false;

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
