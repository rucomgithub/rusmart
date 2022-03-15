import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
    private runewsService: RunewsService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getData();
  }

  getData() {
    this.runewsSub = this.runewsService.runews.subscribe(
      res => {
        this.arrNews = res.filter(item => item.id === this.id);
        this.news = this.arrNews[0];
      },
      err => {
        console.log(err);
      },
      () => {
      }
    );
  }

  ngOnDestroy() {
    if (this.runewsSub) {
      this.runewsSub.unsubscribe();
    }
  }

}
