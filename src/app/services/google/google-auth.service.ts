

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Storage } from '@capacitor/storage';อย่าได้เปิด
//import { Storage } from '@ionic/storage';
import { Storage } from '@ionic/storage';
import { Observable, throwError,BehaviorSubject,from } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { Token } from '../student';



@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  public currentUser: Observable<Token>;
  private currentUserSubject: BehaviorSubject<Token>;


  token: Token = {
    accessToken: '',
    isAuth: false,
  };

  constructor(private http: HttpClient, private storage: Storage) {

    this.currentUserSubject = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('isAuth')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  googleAuth(idToken: string, stdCode: string): Observable<Token> {

    const playLoad = {
      'std_code': stdCode
    };
    this.setGoogleIdToken(idToken);
    this.setStudentCode(stdCode);
    return this.http.post<Token>(`${environment.googleAuth}`, playLoad).pipe(
      tap(res => {
        console.log('google auth',res);
        this.setAccessToken(res.accessToken);
        this.setIsAuthenticated(res.isAuth);
        this.currentUserSubject.next(res);
      }),
      catchError(err => {
        alert(err.status+'  '+err.message+'  '+err.headers);
        return throwError(err);
      })
    );

  }
  setGoogleIdToken(idToken: string){
    this.storage.set('idToken', idToken);
  }
  getGoogleIdToken() {
    return from(this.storage.get('idToken'));
  }

  private setStudentCode(stdCode: string){
    this.storage.set('stdCode', stdCode);
  }
  getStudentCode() {
    return from(this.storage.get('stdCode'));
  }

  setAccessToken(accessToken: string) {
    this.storage.set('accessToken', accessToken);
  }
  getAccessToken() {
    return from(this.storage.get('accessToken'));
  }

  setIsAuthenticated(isAuth: boolean) {
    this.storage.set('isAuth',isAuth);
  }

  getIsAuthenticated() {
    return from(this.storage.get('isAuth'));
  }

  revokeGoogleIdToken() {
    localStorage.removeItem('idToken');
  }

  revokeStudentCode() {
    localStorage.removeItem('stdCode');
  }

  revokeAccessToken() {
    localStorage.removeItem('accessToken');
  }

  revokeIsAuthenticated() {
    localStorage.removeItem('isAuth');
  }

  signOut() {
    this.revokeGoogleIdToken();
    this.revokeStudentCode();
    this.revokeIsAuthenticated();
    this.revokeAccessToken();
    this.currentUserSubject.next(null);
    //window.location.reload();
    //this.router.navigate(['/runews']);
  }
}
