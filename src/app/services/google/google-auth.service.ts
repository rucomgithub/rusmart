import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Observable, throwError, BehaviorSubject, NEVER, from } from 'rxjs';
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

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router
  ) {
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
        this.setAccessToken(res.accessToken);
        this.setIsAuthenticated(res.isAuth);
        this.currentUserSubject.next(res);
        return NEVER;
      }),
      catchError(err => {
        return throwError(err);
      })
    );

  }

  setAccessToken(accessToken: string) {
    // localStorage.setItem('accessToken', accessToken);
    console.log('setAccessToken' + accessToken);
    this.storage.set('accessToken', accessToken);
  }

  getAccessToken() {
    // return localStorage.getItem('accessToken');
    return from(this.storage.get('accessToken'));
  }

  setIsAuthenticated(isAuth: boolean) {
    // localStorage.setItem('isAuth', JSON.stringify(isAuth));
    this.storage.set('isAuth', isAuth);
  }

  getIsAuthenticated() {
    // return JSON.parse(localStorage.getItem('isAuth'));
    return from(this.storage.get('isAuth'));
  }

  setGoogleIdToken(idToken: string) {
    // localStorage.setItem('idToken', idToken);
    this.storage.set('idToken', idToken);
  }

  getGoogleIdToken() {
    // return localStorage.getItem('idToken');
    return from(this.storage.get('idToken'));
  }

  getUserId(): any {
    return new Promise(resolve => {
      this.storage.get('idToken').then(data => {
        resolve(data);
      });
    });
  }

  setStudentCode(stdCode: string) {
    // localStorage.setItem('stdCode', stdCode);
    this.storage.set('stdCode', stdCode);
  }

  getStudentCode() {
    // return localStorage.getItem('stdCode');
    from(this.storage.get('stdCode'));
  }

  revokeGoogleIdToken() {
    // localStorage.removeItem('idToken');
    this.storage.remove('idToken');
  }

  revokeStudentCode() {
    // localStorage.removeItem('stdCode');
    this.storage.remove('stdCode');
  }

  revokeAccessToken() {
    // localStorage.removeItem('accessToken');
    this.storage.remove('accessToken');
  }

  revokeIsAuthenticated() {
    // localStorage.removeItem('isAuth');
    this.storage.remove('isAuth');
  }

  async signOut() {
    await this.storage.clear();
    this.currentUserSubject.next(null);
    // window.location.reload();
    this.router.navigate(['/home']);
  }
}