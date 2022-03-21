import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { RuNews } from '../../services/runews';
import { RunewsService } from '../../services/runews/runews.service';

@Component({
  selector: 'app-runews-detail',
  templateUrl: './runews-detail.page.html',
  styleUrls: ['./runews-detail.page.scss'],
})
export class RunewsDetailPage implements OnInit {

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
  ) {

    this.getNewsDetails(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() { }

  getNewsDetails(newsId: String) {
    console.log("call observer")
    return this.runewsService.RuNews.pipe(
      map((news: any) => news.filter(news => news.id === newsId)))
      .subscribe(data => this.runews = data)
  }

}
