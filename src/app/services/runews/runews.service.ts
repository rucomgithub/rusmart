import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RuNews } from '../runews';
import { Observable, throwError ,BehaviorSubject} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RunewsService {
  // API path
  base_path_cat2 = 'http://appsapi.ru.ac.th/NewsRu/NewsJson?c_id=1';
  
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
  private runewsSubject= new BehaviorSubject<RuNews>([]);

  public get RuNews(){
    return this.runewsSubject.asObservable();
  }

  constructor(private http: HttpClient) {
    console.log(this.runewsSubject)
  }

  // getRunewsCat2():Observable<any>{
  //   let url = 'http://appsapi.ru.ac.th/NewsRu/NewsJson?c_id=2';
  //   let req = this.http.get(url)
  //     .map(res => {
  //       return res.json();
  //     });
  // }
  getRunews(): Observable<RuNews> {

    
    return this.http
    .get('http://appsapi.ru.ac.th/NewsRu/NewsJsonRusmart?c_id=1')
    .pipe(
      map((res: RuNews) => {
         //console.log(JSON.stringify(res))
         //this.runewsSubject.next(res);
        // console.log(this.runewsSubject);
        localStorage.setItem('runews',JSON.stringify(res))
        this.setRuNews();
        return res ;
      })
    );
 
  }

  setRuNews(){
   // let stoRuNews = JSON.parse(localStorage.getItem('runews'))
    let tempRuNews = JSON.parse(localStorage.getItem('runews'))
    this.runewsSubject.next(tempRuNews)
    // console.log(tempRuNews)
    }


}
