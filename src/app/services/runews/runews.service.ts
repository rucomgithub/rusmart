import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RuNews } from '../runews';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RunewsService {

  private _RUNEWS: BehaviorSubject<RuNews[]>;
  constructor(private http: HttpClient) {
    this._RUNEWS = new BehaviorSubject<RuNews[]>(JSON.parse(localStorage.getItem('runews')));
  }

  get runews(): Observable<RuNews[]> {
    console.log(`call BehaviorSubject`);
    return this._RUNEWS.asObservable();
  }

  fetchRunews() {
    return this.http.get('http://appsapi.ru.ac.th/NewsRu/NewsJsonRusmart?c_id=1').pipe(
      map(resData => {
        console.log(`call api add localstorage.`);
        localStorage.setItem('runews', JSON.stringify(resData));
        return resData;
      }),
      tap((runews: RuNews[]) => {
        this._RUNEWS.next(runews);
      })
    );
  }

}
