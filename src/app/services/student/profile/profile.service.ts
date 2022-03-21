import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Observable, throwError ,BehaviorSubject, of} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


import { environment } from '../../../../environments/environment';
import { StudentProfile } from '../../student';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  public currentUser: Observable<StudentProfile>;
  private currentUserSubject: BehaviorSubject<StudentProfile>;
  studentProfile: StudentProfile;
  private user;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<StudentProfile>(this.user);
    this.currentUser = this.currentUserSubject.asObservable();
   }

  fetchStudentProfile(): Observable<StudentProfile> {

    const playLoad = {
      'std_code': localStorage.getItem('stdCode')
    };
    //console.log(playLoad);
    return this.http.post<StudentProfile>(`${environment.studentProfile}`, playLoad);


  }


}