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
  }
  async googleSignup() {
      this.googleUser = await GoogleAuth.signIn() as any;
      this.userInfo = this.googleUser;
      const idToken = this.googleUser.authentication.idToken;
      const stdCode = this.googleUser.email.substring(0, 10);
      localStorage.setItem('imageUrl',this.userInfo.imageUrl)
      console.log( this.userInfo.imageUrl)

      this.googleAuthService.googleAuth(idToken, stdCode).subscribe(response => {
        this.router.navigate(['/app/tabs/profile']);
      });
  }

  goToHome(){
    this.navCtrl.navigateBack('/app/tabs/home');
  }
  goToProfile(){
    this.router.navigate(['/app/tabs/profile']);
  }
}

