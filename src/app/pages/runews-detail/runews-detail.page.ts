import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-runews-detail',
  templateUrl: './runews-detail.page.html',
  styleUrls: ['./runews-detail.page.scss'],
})
export class RunewsDetailPage implements OnInit {
  
  constructor( private route: ActivatedRoute,) { }

  ngOnInit() {
    const newsid = this.route.snapshot.paramMap.get('id');
    console.log(newsid);
    let runewsDetail=[]
    runewsDetail = JSON.parse(localStorage.getItem('runews'));
    console.log(runewsDetail.filter(item=>item.id == newsid))
  }

}
