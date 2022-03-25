import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { RuNews } from '../runews';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RunewsService {

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
  private runewsSubject = new BehaviorSubject<RuNews>(this.runews);

  public get RuNews() {
    return this.runewsSubject.asObservable();
  }

  constructor(private http: HttpClient) {
    this.setRuNews();
  }

  getRunews(): Observable<RuNews> {

    return this.http
      .get(`${environment.base_path_cat2}`)
      .pipe(
        map((res: RuNews) => {
          localStorage.setItem('runews', JSON.stringify(res))
          return res;
        })
      );

  }


  setRuNews() {
    this.runewsSubject.next(JSON.parse(localStorage.getItem('runews')));
  }

  updateHitDetail(id: string) {
    console.log('updateHitDetail', id);
    const runewsDetailParams = {
      'id': id.toString()
    }
    return this.http.get<RuNews>(`${environment.runewsUpdateDetailHit}`, { params: runewsDetailParams }).subscribe();

  }



}
