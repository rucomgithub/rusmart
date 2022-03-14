import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { RuNews } from '../../services/runews';
import { RunewsService } from '../../services/runews/runews.service';

@Component({
  selector: 'app-runews-detail',
  templateUrl: './runews-detail.page.html',
  styleUrls: ['./runews-detail.page.scss'],
})
export class RunewsDetailPage implements OnInit, OnDestroy {

  id: string;
  arrNews: RuNews[];
  news: RuNews;
  private runewsSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private runewsService: RunewsService,
    private navCtrl: NavController,
    public loadingController: LoadingController,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getData();
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
            this.navCtrl.navigateForward(`/tabs/home`);
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

  async getData() {
    const loading = await this.loadingController.create({
      message: `รอสักครู่`,
      duration: 5000
    });

    await loading.present();

    this.runewsSub = this.runewsService.runews.subscribe(
      res => {
        this.arrNews = res.filter(item => item.id === this.id);
        this.news = this.arrNews[0];
        loading.dismiss();
      },
      err => {
        loading.dismiss();
        this.presentAlert(err.status);
        this.navCtrl.navigateForward(`/tabs/home`);
      },
      () => {
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
