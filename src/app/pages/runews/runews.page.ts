import { RunewsService } from './../../services/runews/runews.service';

import { HttpClient } from '@angular/common/http';
import { NavController,LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RuNews } from '../../services/runews';


@Component({
  selector: 'app-runews',
  templateUrl: './runews.page.html',
  styleUrls: ['./runews.page.scss'],
})
export class RunewsPage implements OnInit {

  ruNewsResult: RuNews;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ruNewsService: RunewsService,
    private navCtrl: NavController,
    private loadingCtrl:LoadingController
  ) {
    this.ruNewsService.RuNews.subscribe(data => this.ruNewsResult = data);
  }

  ngOnInit() {
    this.getNews();
  }

  ionViewWillEnter() {
     //this.getNews();
  }

  async getNews() {
    const loading = await this.loadingCtrl.create({
      message: `Loading News...`,
    });
    await loading.present();
    this.ruNewsService.getRunews().subscribe(data => {
      data => this.ruNewsResult = data;
       loading.dismiss();
    },err =>{
      console.log(err)
      loading.dismiss();
    }
    );
  }


}
