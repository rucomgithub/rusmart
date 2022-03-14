import { RunewsService } from './../../services/runews/runews.service';

import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RuNews } from '../../services/runews';

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

    this.ruNewsService.RuNews.subscribe(data => console.table(data))

  }

  ngOnInit() {}


  ionViewWillEnter() {
    console.log('Enter');
    this.getNews();
  }

  getNews() {
    this.ruNewsService.getRunews().subscribe(
      (result) => {
        //console.log(result);
        this.ruNewsResult = result;
        //console.log(JSON.stringify(this.ruNewsResult ));
       // console.table(this.ruNewsResult );
      },
      (err) => {
        console.log('Something went wrong !'+err.message);
      }
    );
  }
}
