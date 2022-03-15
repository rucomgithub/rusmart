import { Component, OnInit, OnDestroy } from '@angular/core';
import { RunewsService } from './../../services/runews/runews.service';
import { Subscription } from 'rxjs';
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
    private ruNewsService: RunewsService
  ) {

  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.getData();
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
