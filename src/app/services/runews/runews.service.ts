import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RunewsService {
  // API path
  base_path_cat2 = 'http://appsapi.ru.ac.th/NewsRu/NewsJson?c_id=2';

  constructor(private http: HttpClient) {}

  // getRunewsCat2():Observable<any>{
  //   let url = 'http://appsapi.ru.ac.th/NewsRu/NewsJson?c_id=2';
  //   let req = this.http.get(url)
  //     .map(res => {
  //       return res.json();
  //     });
  // }
  getRunews(): Observable<any> {
    return this.http
    .get('http://appsapi.ru.ac.th/NewsRu/NewsJsonRusmart?c_id=1')
    .pipe(
      map((res: any) => {
        return res ;
      })
    );
  }
}
