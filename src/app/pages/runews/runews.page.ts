import { Component, OnInit, OnDestroy } from '@angular/core';
import { RunewsService } from './../../services/runews/runews.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RuNews } from '../../services/runews';

@Component({
  selector: 'app-runews',
  templateUrl: './runews.page.html',
  styleUrls: ['./runews.page.scss'],
})
export class RunewsPage implements OnInit, OnDestroy {
  ruNewsResult: RuNews[];
  private runewsSub: Subscription;

  constructor(
    private ruNewsService: RunewsService,
    private navCtrl: NavController,
    public loadingController: LoadingController,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.getData();
  }

  ionViewWillEnter() {
  }

  async presentAlert(err: string) {
    let alert = await this.alertController.create({
      header: `Alert`,
      subHeader: `ข้อผิดพลาด`,
      message: `โปรดตรวจสอบการเชื่อมต่อ`,
      buttons: [
        {
          text: 'ตกลง',
          handler: data => {
            this.navCtrl.navigateForward(`/app/tabs/home`);
          }
        },
      ]
    });

    if (err) {
      alert = await this.alertController.create({
        header: `Alert`,
        subHeader: `ข้อผิดพลาด: ${err}`,
        message: `ไม่สามารถดึงข้อมูลทะเบียนประวัติได้.`,
        buttons: [`ตกลง`]
      });
    }

    await alert.present();
  }

  forceReload(refresher?) {
    this.getData(refresher.target);
  }

  async getData(refresher?) {
    const loading = await this.loadingController.create({
      message: `รอสักครู่`,
      duration: 5000
    });

    await loading.present();

    this.runewsSub = this.ruNewsService.fetchRunews().subscribe(
      res => {
        this.ruNewsResult = res;
        if (refresher) {
          refresher.complete();
        }
        loading.dismiss();
      },
      err => {
        console.log(err);
        if (refresher) {
          refresher.complete();
        }
        loading.dismiss();
        this.presentAlert(err.status);
        this.navCtrl.navigateForward(`/app/tabs/home`);
      },
      () => {
        if (refresher) {
          refresher.complete();
        }
        loading.dismiss();
      }
    );
  }

  ngOnDestroy() {
    if (this.runewsSub) {
      this.runewsSub.unsubscribe();
    }
  }

}
