import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {Mr30} from '../mr30search/mr30search'


@Injectable({
  providedIn: 'root'
})
export class Mr30searchService {
mr30show : Mr30 ={
  course_year: "",
  course_semester: "",
  rec: []
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
    return this.http.get<Mr30>('assets/data/mr30.json').pipe(map(mr30show=>{
      //console.log(mr30show)
      return mr30show
    }))
  }
}
