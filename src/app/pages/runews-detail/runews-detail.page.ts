import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { LoadingController } from '@ionic/angular';

import { filter, map, tap } from 'rxjs/operators';
import { RuNews } from '../../services/runews';
import { RunewsService } from '../../services/runews/runews.service';

@Component({
  selector: 'app-runews-detail',
  templateUrl: './runews-detail.page.html',
  styleUrls: ['./runews-detail.page.scss'],
})
export class RunewsDetailPage implements OnInit {
  runewsDetail: RuNews;
  url: string = "http://www3.ru.ac.th/RuNews/images/filesnews/";
  urlImage: string = "http://www3.ru.ac.th/RuNews/images/News/";
  id: string;
  runews: RuNews = {
    id: '',
    category_id: '',
    title: '',
    photo_header: '',
    detail: '',
    photo_content: '',
    file_detail: '',
    file_detail2: '',
    file_detail3: '',
    file_comment: '',
    file_comment2: '',
    file_comment3: '',
    hit: '',
    date_receive: '',
    date_post: '',
    date_expire: '',
    status: '',
    priority: '',
  };
  constructor(
    private route: ActivatedRoute,
    private runewsService: RunewsService,
    private inAppBrowser: InAppBrowser,
    private loadingCtrl:LoadingController
  ) {

    this.runewsService.RuNews.subscribe((res: any) => {
      console.log("res",res)
      let data = res.filter(news => this.route.snapshot.paramMap.get('id') == news.id )
      console.log("data",data)
      this.runews = data;
      this.runewsService.updateHitDetail(data[0].id)
    })

  }

  ngOnInit() {

  }
  ionViewWillEnter() {
    // this.runewsService.setRuNews();
  }

  openLink1(file: String) {
    const options: InAppBrowserOptions = {
      zoom: 'yes'
    }
    const browser = this.inAppBrowser.create(this.url + file, '_system', options);
  }



}
