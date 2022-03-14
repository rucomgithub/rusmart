import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RuNews } from '../../services/runews';
import { RunewsService } from '../../services/runews/runews.service';

@Component({
  selector: 'app-runews-detail',
  templateUrl: './runews-detail.page.html',
  styleUrls: ['./runews-detail.page.scss'],
})
export class RunewsDetailPage implements OnInit {
    
  runews:RuNews={
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
    ) { }

  ngOnInit() {
    const newsid = this.route.snapshot.paramMap.get('id');
   // console.log(newsid);
    let runewsDetail=[]
    runewsDetail = JSON.parse(localStorage.getItem('runews'));
  //  console.log(runewsDetail.filter(item=>item.id == newsid))
  // console.log(typeof runewsDetail)
  this.runewsService.RuNews.subscribe((data: RuNews[]) => {
    let runews =[];
    runews.push(data);
    // data.filter(item=>item.id == newsid)
    // this.runews = data
    // let filterd = runews.filter(item=>item.id == newsid)
     console.log(data.filter(t => t.id == newsid))
    //console.log(filterd)
    }
    )}

}
