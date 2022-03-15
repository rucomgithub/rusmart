import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';

import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

import '@codetrix-studio/capacitor-google-auth';
import { Plugins } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';

import { Storage } from '@capacitor/storage';
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

  constructor(
    private googleAuthService: GoogleAuthService, 
    private router: Router, 
    private navCtrl: NavController,

    )
     { 
  GoogleAuth.initialize();}
  async googleSignup() {
    this.googleUser = await Plugins.GoogleAuth.signIn(null) as any;
    const idToken = this.googleUser.authentication.idToken;
    const stdCode = this.googleUser.email.substring(0, 10);
    this.googleAuthService.googleAuth(idToken, stdCode).subscribe(response => {
    this.router.navigate(['/app/tabs/profile']);
    });
  }

  goToHome(){
    this.navCtrl.navigateBack('/app/tabs/home');
  }
}

