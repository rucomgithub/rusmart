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
    let mr30local = JSON.parse(localStorage.getItem('mr30'))
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
    let mr30local = JSON.parse(localStorage.getItem("mr30")) == null? [] : JSON.parse(localStorage.getItem("mr30"));
  
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
      this.groupsFav = JSON.parse(localStorage.getItem("mr30")) == null? [] : JSON.parse(localStorage.getItem("mr30"));
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



}
