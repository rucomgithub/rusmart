import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-mr30',
  templateUrl: './mr30.page.html',
  styleUrls: ['./mr30.page.scss'],
})
export class Mr30Page implements OnInit {
  safeUrl:any;
  constructor(private domSanit: DomSanitizer) {
    this.safeUrl = this.getSafeUrl() ;
  }

  getSafeUrl(){
    return this.domSanit.bypassSecurityTrustResourceUrl("https://beta-e-service.ru.ac.th/") ;
  }

  ngOnInit(): void {
    this.safeUrl = this.getSafeUrl() ;
  }

  ionViewWillEnter(){
    this.safeUrl = this.getSafeUrl() ;
  }

}
