import { Component } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';
import { ActivatedRoute } from '@angular/router';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-session-detail',
  styleUrls: ['./session-detail.scss'],
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  session: any;
  isFavorite = false;
  defaultHref = '';

  constructor(
    private dataProvider: ConferenceData,
    private userProvider: UserData,
    private route: ActivatedRoute
  ) { }

  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      if (data && data.schedule && data.schedule[0] && data.schedule[0].groups) {
        const sessionId = this.route.snapshot.paramMap.get('sessionId');
        // console.log('sessionId=>',sessionId)
        //const sessionId = '11';    
        // if(localStorage.getItem("favorites") !== null){
        //   for (const idFavorites of JSON.parse(localStorage.getItem("favorites"))) {
        //     if(idFavorites && idFavorites.id === sessionId){
        //       //console.log('0000',idFavorites.id);
        //       this.session = idFavorites;
        //       console.log(idFavorites);
        //       this.isFavorite = this.userProvider.hasFavorite(
        //         this.session.name
        //       );
        //       break;
        //     }
        //   }
        // }
        
        for (const group of data.schedule[0].groups) {
          if (group && group.sessions) {
            for (const session of group.sessions) {
              if (session && session.id === sessionId) {
                this.session = session;
                this.isFavorite = this.userProvider.hasFavorite(
                  this.session.name
                );

                break;
              }
            }
          }
        }
      }
    });
  }

  ionViewDidEnter() {
    this.defaultHref = `/app/tabs/schedule`;
  }

  sessionClick(item: string) {
    console.log('Clicked', item);
  }

  toggleFavorite() {
    if (this.userProvider.hasFavorite(this.session.name)) {
      this.userProvider.removeFavorite(this.session.name);
      this.userProvider.removeFavoriteLocalStroage(this.session.id);
      this.isFavorite = false;
    } else {
      console.log('toggleFavorite');
      //console.log('this.session',this.session);
      this.userProvider.addFavorite(this.session.name);
      this.userProvider.addFavoriteLocalStroage(this.session);
      this.isFavorite = true;
    }
  }

  shareSession() {
    console.log('Clicked share session');
  }
}
