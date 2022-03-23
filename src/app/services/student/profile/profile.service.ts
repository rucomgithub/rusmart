import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Observable, throwError ,BehaviorSubject, of} from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';


import { environment } from '../../../../environments/environment';
import { GoogleAuthService } from '../../google/google-auth.service';
import { StudentProfile } from '../../student';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  public currentUser: Observable<StudentProfile>;
  private currentUserSubject: BehaviorSubject<StudentProfile>;
  studentProfile: StudentProfile;
  private user;
  constructor(private http: HttpClient,private googleAuthService :GoogleAuthService) {
    this.currentUserSubject = new BehaviorSubject<StudentProfile>(this.user);
    this.currentUser = this.currentUserSubject.asObservable();

   }

  fetchStudentProfile(): Observable<StudentProfile> {

  
    let  std_code = '' 
    return this.googleAuthService.getStudentCode().pipe(switchMap( stdcode => {
      std_code = stdcode;
      return this.http.get<StudentProfile>(`${environment.studentProfile}/${std_code}`);
    }))
   



  }


}