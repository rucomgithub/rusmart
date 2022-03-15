import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, NEVER, Observable, Subject, Subscriber, Subscription } from 'rxjs';
import { catchError, distinctUntilChanged, map, shareReplay, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Token } from '../student';

export interface AppState{
  token : Token,
  studentCode :String
}


@Injectable({
  providedIn: 'root'
})
export class StoreService {
  state = new BehaviorSubject<AppState>({
   studentCode:'6299999991',
   token :{
    accessToken: '',
    isAuth: false,
   }
  })
  
  private loadTokenAction = new Subject<void>();
  private loadTokenSuccessAction = new Subject<Token>();
  private loadTokenErrorAction = new Subject<any[]>();

  token$ =  this.createSelector((state)=>state.token);
  studentCode$ = this.createSelector((state)=>state.studentCode);

  constructor(private http:HttpClient) { 

    this.createEffect(this.loadTokenAction.pipe(
      withLatestFrom(this.studentCode$),
      switchMap(([_,studentCode])=>{
        const playLoad = {
          'std_code':studentCode
        };
        console.log(studentCode);
        return this.http.post<Token>(`${environment.googleAuth}` ,playLoad)
        .pipe(
          catchError(err => {
            console.log(err);
            this.loadTokenErrorAction.next(err);
            return NEVER
          }),
          tap(respone =>{
            console.log("Action"+respone);
            return this.loadTokenSuccessAction.next(respone)
          })
        )
      }
      )));

    this.createEffect(this.loadTokenErrorAction.pipe(tap(err=>{
      console.log(err)
    })))

    this.createReduce(this.loadTokenSuccessAction,(state,token)=>{
      console.log("createReduce");
      state.token = token;
      return state;
    })

  }

  private createReduce<T>(
    action$: Observable<T>,
    accumulator: (state:AppState, action: T)=>AppState
  ){
    action$.subscribe((action)=>{
      console.log("createReduce");
      const state = { ...this.state.value }
      const newState = accumulator(state, action);
      this.state.next(newState);
    });
  }

  private createSelector<T>(selector:(state:AppState)=>T):Observable<T>{
    console.log("createSelector");
    return this.state.pipe(
      map(selector),
      distinctUntilChanged(),
      shareReplay(1)
    );
  }

  private createEffect<T>(effect$:Observable<T>):Subscription{
    return effect$.subscribe();
  }

  loadToken(){
    this.loadTokenAction.next();
  }


}
