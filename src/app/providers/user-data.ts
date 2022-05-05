import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class UserData {
  favorites: string[] = [];
  favoritesStroage  = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public storage: Storage
  ) { }

  hasFavorite(sessionName: string): boolean {
    console.log('hasFavorite=>',sessionName);
    //console.log('hasFavoriteIndexOf',this.favorites.indexOf(sessionName));
    return (this.favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName: string): void {
    console.log('addFavorite=>',sessionName);
    this.favorites.push(sessionName);
    // console.log('favorites=>',this.favorites);
    // localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }
  //add funcion
  addFavoriteLocalStroage(session) {
    console.log('addFavoriteLocalStroage=>',session);
    this.favoritesStroage.push(session)
    localStorage.setItem("favorites", JSON.stringify(this.favoritesStroage));
  }
  removeFavorite(sessionName: string): void {
    const index = this.favorites.indexOf(sessionName);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
  }
  //add function
  removeFavoriteLocalStroage(sessionId: string) {
    console.log('removeFavoriteLocalStroage=>',sessionId);
    // console.log('data=>',typeof(this.favoritesStroage));
    // let a =this.favoritesStroage[0];
    // console.log(a.id)
    // for (var product of this.favoritesStroage) {
    //   console.log(product.name)
    // }
    for(let i=0; i<this.favoritesStroage.length; i++){
      //console.log('loopRemove=>'+this.favoritesStroage[i].id); //use i instead of 0
      if(sessionId == this.favoritesStroage[i].id){
          console.log('find index remove=>',sessionId);
          console.log('loopRemove=>'+this.favoritesStroage[i].id);
          this.favoritesStroage.splice(i, 1);
          localStorage.setItem("favorites", JSON.stringify(this.favoritesStroage));
      }
    }
  }
  login(username: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      return window.dispatchEvent(new CustomEvent('user:login'));
    });
  }

  signup(username: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      return window.dispatchEvent(new CustomEvent('user:signup'));
    });
  }

  logout(): Promise<any> {
    return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
      return this.storage.remove('username');
    }).then(() => {
      window.dispatchEvent(new CustomEvent('user:logout'));
    });
  }

  setUsername(username: string): Promise<any> {
    return this.storage.set('username', username);
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  }
}
