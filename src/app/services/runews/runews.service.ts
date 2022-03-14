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

  private _RUNEWS = new BehaviorSubject<RuNews[]>([]);
  constructor(private http: HttpClient) {
  }

  get runews(): Observable<RuNews[]> {
    console.log(`call BehaviorSubject`);
    return this._RUNEWS.asObservable();
  }

  fetchRunews() {
    return this.http.get('http://appsapi.ru.ac.th/NewsRu/NewsJsonRusmart?c_id=1').pipe(
      map(resData => {
        console.log(`call api`);
        return resData;
      }),
      tap((runews: RuNews[]) => {
        localStorage.setItem('runews', JSON.stringify(runews));
        this._RUNEWS.next(runews);
      })
    );
  }

  // getUrl(studentcode: string): Observable<Student> {
  //   const response1 = this.http.get<{ Student }>(
  //     apiUrl + `/private/grad/student/` + studentcode
  //   );
  //   return forkJoin([response1]);
  // }


  // // getRunewsCat2():Observable<any>{
  // //   let url = 'http://appsapi.ru.ac.th/NewsRu/NewsJson?c_id=2';
  // //   let req = this.http.get(url)
  // //     .map(res => {
  // //       return res.json();
  // //     });
  // // }
  // getRunews(): Observable<RuNews> {
  //   return this.http
  //     .get('http://appsapi.ru.ac.th/NewsRu/NewsJsonRusmart?c_id=1')
  //     .pipe(
  //       map((res: RuNews) => {
  //         //console.log(JSON.stringify(res))
  //         //this.runewsSubject.next(res);
  //         // console.log(this.runewsSubject);
  //         localStorage.setItem('runews', JSON.stringify(res))
  //         this.setRuNews();
  //         return res;
  //       })
  //     );

  // }

  // setRuNews() {
  //   // let stoRuNews = JSON.parse(localStorage.getItem('runews'))
  //   let tempRuNews = JSON.parse(localStorage.getItem('runews'))
  //   this.runewsSubject.next(tempRuNews)
  //   // console.log(tempRuNews)
  // }


}
