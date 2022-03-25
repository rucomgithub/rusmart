import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

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
  ) {
    this.getNewsDetails(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {

  }
  ionViewWillEnter() {

  }

  getNewsDetails(newsId: string) {
    console.log('ID ' + newsId);
    // this.id = newsId;
    return this.runewsService.RuNews.pipe(
      map((news: any) => news.filter(news => news.id === newsId))
    )
      .subscribe(data => {
        this.runews = data;
        this.runewsService.updateHitDetail(newsId)
      }
      )
  }





  openLink1(file: String) {
    console.log(file)
    const options: InAppBrowserOptions = {
      zoom: 'yes'
    }
    // console.log(this.url+file_detail);
    // Opening a URL and returning an InAppBrowserObject
    const browser = this.inAppBrowser.create(this.url + file, '_system', options);
  }



}
