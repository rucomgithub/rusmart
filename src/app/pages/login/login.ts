import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';

import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Storage } from '@ionic/storage';

// import '@codetrix-studio/capacitor-google-auth';
// import { Plugins } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';

//import { Storage } from '@capacitor/storage';
import { NavController } from '@ionic/angular';
import { GoogleAuthService } from '../../services/google/google-auth.service';
import { GoogleAuthResponse } from '../../services/google/googleAuth';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  googleUser: GoogleAuthResponse;
  login: UserOptions = { username: '', password: '' };
  submitted = false;
  userInfo = null;
  token : string;
  resTu:string;
  constructor(private googleAuthService: GoogleAuthService,
    private router: Router, public storage: Storage,
    private navCtrl: NavController) {

  }
  ionViewDidEnter(){
    GoogleAuth.initialize();
    this.storage.get('ion_did_tutorial').then(res => {
      if(res === true){
        alert("true");
        this.storage.get('idToken').then(idToken =>{
          alert(idToken);
          this.token = idToken;
          this.storage.get('isAuth').then(isAuth =>{
            alert(isAuth);
          })
        });
      }
      this.resTu=res;

    });
    // this.googleAuthService.getAccessToken().subscribe(idToken=>{
    //   console.log('idToken ionViewDidEnter=>',idToken);
    //   this.token = idToken;
    // });
  }
  async googleSignup() {
      this.googleUser = await GoogleAuth.signIn() as any;
      this.userInfo = this.googleUser;
      const idToken = this.googleUser.authentication.idToken;
      const stdCode = this.googleUser.email.substring(0, 10);
      //alert (idToken);
      //alert(this.googleUser);

      this.googleAuthService.googleAuth(idToken, stdCode).subscribe(response => {
        //console.log(response.accessToken);
        // alert(response.)
        //this.navCtrl.navigateRoot('/app/tabs/profile');
        //this.router.navigateByUrl('/app/tabs/profile', { replaceUrl: true });
        //this.router.navigate(['/app/tabs/profile']);
        //return true;
        // alert(localStorage.getItem('stdCode'));
        // if(localStorage.getItem('stdCode')){
        //   alert('5555');
        // }
      });
  }

  goToHome(){
    this.navCtrl.navigateBack('/app/tabs/home');
  }
  goToProfile(){
    this.router.navigate(['/app/tabs/profile']);
  }
}

