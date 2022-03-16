

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Storage } from '@capacitor/storage';อย่าได้เปิด
//import { Storage } from '@ionic/storage';
import { Storage } from '@ionic/storage';
import { Observable, throwError,BehaviorSubject } from 'rxjs';
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
    //this.setStudentCode(stdCode);
    // this.setWut(idToken);
    return this.http.post<Token>(`${environment.googleAuth}`, playLoad).pipe(
      tap(res => {
        // console.log('google auth');
        // this.setAccessToken(res.accessToken);
        // this.setIsAuthenticated(res.isAuth);
        // this.currentUserSubject.next(res);
      }),
      catchError(err => {
        return throwError(err);
      })
    );

  }
  setGoogleIdToken(idToken: string){
    console.log('setGoogleIdToken'+idToken);
    //this.storage.set('idToken', idToken);
    this.storage.set('idToken', idToken);
  }
  getGoogleIdToken() {
    // console.log('getGoogleIdToken'+value);
    // return this.storage.get('idToken').then((val) => {
    //   console.log('idToken', val);
    // });
  }
  /////
  // private async setStudentCode(stdCode: string){
  //   // console.log('setStudentCode'+stdCode);
  //   await Storage.set({
  //   key: 'stdCode',
  //   value: stdCode,
  //   });
  // }
  // async getStudentCode() {
  //   const {value} = await Storage.get({ key: 'stdCode' });
  //   // console.log('getStudentCode'+value);
  //   return value;
  // }
  // private async setWut(isAuth: string){
  //   await Storage.set({
  //   key: 'isAuthgetwut',
  //   value: isAuth,
  //   });
  // }
  // async getWut() {
  //   const {value} = await Storage.get({ key: 'isAuthgetwut' });
  //   console.log('isAuthgetwut'+value);
  //   return value;
  // }

  // setGoogleIdToken(idToken: string) {
  //   localStorage.setItem('idToken', idToken);
  // }
  // getGoogleIdToken() {
  //   return localStorage.getItem('idToken');
  // }



  // setStudentCode(stdCode: string) {
  //   localStorage.setItem('stdCode', stdCode);
  // }

  // getStudentCode(): string {
  //   return localStorage.getItem('stdCode');
  // }

  // setAccessToken(accessToken: string) {
  //   localStorage.setItem('accessToken', accessToken);
  // }
  // private async setAccessToken(accessToken: string){
  //   await Storage.set({
  //   key: 'accessToken',
  //   value: accessToken,
  //   });
  // }


  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  // setIsAuthenticated(isAuth: boolean) {
  //   localStorage.setItem('isAuth',  JSON.stringify(isAuth));
  // }

  // private async setIsAuthenticated(isAuth: boolean){
  //   await Storage.set({
  //   key: 'isAuth',
  //   value: JSON.stringify(isAuth),
  //   });
  // }
  // getIsAuthenticated(): boolean {
  //   return JSON.parse(localStorage.getItem('isAuth'));
  // }
  // async getIsAuthenticated() {

  //   const {value} = await Storage.get({ key: 'isAuth' });
  //   //console.log()
  //   return JSON.parse(value);
  // }

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
