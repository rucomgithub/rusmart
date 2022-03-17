import { Component, OnInit, OnDestroy } from '@angular/core';
import { RunewsService } from './../../services/runews/runews.service';
import { Subscription } from 'rxjs';
import { RuNews } from '../../services/runews';
import { Storage } from '@ionic/storage';

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
    private storage: Storage
  ) {
    this.storage.set('news-store', 'news');
  }

  ngOnInit() {
    this.getData();
  }

  ionViewWillEnter() {
    this.storage.get('news-store').then(res => {
      console.log('news-store' + res);
    });
  }

  getData() {
    this.runewsSub = this.ruNewsService.fetchRunews().subscribe(
      (res: RuNews[]) => {
        this.ruNewsResult = res;
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
