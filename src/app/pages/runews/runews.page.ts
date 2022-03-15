import { RunewsService } from './../../services/runews/runews.service';

import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RuNews } from '../../services/runews';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-runews',
  templateUrl: './runews.page.html',
  styleUrls: ['./runews.page.scss'],
})
export class RunewsPage implements OnInit {

  ruNewsResult:RuNews;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ruNewsService: RunewsService,
    private navCtrl: NavController
  ) {
    this.ruNewsService.RuNews.subscribe(data => this.ruNewsResult = data);
  }
  
  ngOnInit() {
    this.getNews();
  }
  
  ionViewWillEnter() {
    // this.getNews();
  }
  
  getNews() {
    console.log("call api...")
    this.ruNewsService.getRunews().subscribe(data => {
      data => this.ruNewsResult = data;
    });
  }
}
