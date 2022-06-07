import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap,shareReplay, publish, refCount, share } from 'rxjs/operators';
import { Observable} from 'rxjs';
import {Mr30} from '../mr30search/mr30search'
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class Mr30searchService {
mr30show : Mr30 ={
  course_year: "",
  course_semester: "",
  RECORD: []
}
record={
  id: "",
  course_no: "",
  course_credit: "",
  course_study_datetime: "",
  course_room: "",
  course_examdate: "",
  course_comment: ""
}
  constructor(private http: HttpClient) {
    
  }

  getMr30() : Observable<Mr30>{
    const playLoad = {
      course_year: "2565",
      course_semester: "1",
    }

    
    

    return this.http.post<Mr30>(`${environment.mr30Search}`,playLoad).pipe(map(mr30show=>{
      return mr30show
    }),share())
  }

  


}
