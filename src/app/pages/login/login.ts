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
import { NavController ,ToastController} from '@ionic/angular';
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
    private navCtrl: NavController,public toastCtrl: ToastController) {

  }
  ionViewDidEnter(){
    GoogleAuth.initialize();
  }
  async googleSignup() {
      console.log("something....")
      this.googleUser = await GoogleAuth.signIn() as any;
      this.userInfo = this.googleUser;
      const idToken = this.googleUser.authentication.idToken;
      const stdCode = this.googleUser.email.substring(0, 10);
      console.log(this.googleUser.email) 
      let splitted = this.googleUser.email.split("@");
      console.log(splitted)
      if(splitted[1]=='rumail.ru.ac.th' || this.userInfo =='undefined'){
        localStorage.setItem('imageUrl',this.userInfo.imageUrl)
        console.log( this.userInfo.imageUrl)
        
        this.googleAuthService.googleAuth(idToken, stdCode).subscribe(
          response => {
            this.router.navigate(['/app/tabs/profile']);
          },
          async err => { 

            if(err.status==422){
              // console.log('HTTP Error', err)
              //ตรวจสอบว่าอีเมล์เป็น digit หรือไม่ ถ้าไม่เป็นค่าจะแสดงเป็น NaN
              let message=''
              if (isNaN(Number(stdCode))){
                //ถ้าNaNจริงแสดงว่าเป็นเจ้าหน้าที่แสดงข้อความตามที่กำหนดใน message
                console.log('stdCodeNan=>',Number(stdCode))
                message = 'กรุณาตรวจสอบอีเมล์ ไม่สามารถใช้อีเมล์สำหรับบุคลากรได้'
              }else{
                //เข้ากรณีที่เป็นนักศึกษา
                const fac = ["01", "02", "03", "04", "05", "06", "07"];
                //5612740068 ทดสอบ
                let checkBachelor=stdCode.substring(2, 4);
                if(fac.indexOf(checkBachelor)>0){
                  //เป็นนักศึกษาปริญญาตรี
                  if(Number.isInteger(parseInt(stdCode))){
                    message = err.error.message
                  }
                }else{
                  //ไม่เป็นนักศึกษาปริญญาตรี
                  message = 'สำหรับนักศึกษาปริญญาตรีเท่านั้น'
                }
              }

              const toast = await this.toastCtrl.create({
                header: message,
                duration: 8000,
                position: 'bottom',
                color: 'danger',
                buttons: [
                  {
                    text: "Close",
                    role: "cancel",
                    
                  },
                ],
              });
              console.log(document.getElementById('login-google'))
              await toast.present();
              // ***ยังทำไม่ได้***
              // เมื่อทำการแสดง toast แล้ว ให้ปุ่มกด google login หายไปก่อนชั่วขณะ 

            }
          }
          );
          // await document.getElementById('login-google').classList.remove("disable-button-login");
          // await document.getElementById('login-google').classList.add("btn-google-signin");
          // await console.log(document.getElementById('login-google'))
          // await document.getElementById('login-google').classList.add("enable-button-login");
      }else{
        console.log('error email')
        const toast = await this.toastCtrl.create({
          header: 'สำหรับ @rumail.ru.ac.th เท่านั้น',
          duration: 8000,
          position: 'bottom',
          color: 'danger',
          buttons: [
            {
              text: "Close",
              role: "cancel",
              
            },
          ],
        });
        await toast.present();
      }
  }
  async googleSignupTest() {
    console.log("something....")
      //this.googleUser = await GoogleAuth.signIn() as any;
      // this.userInfo = this.googleUser;
      // const idToken = this.googleUser.authentication.idToken;
      // const stdCode = this.googleUser.email.substring(0, 10);
      // localStorage.setItem('imageUrl',this.userInfo.imageUrl)
      // console.log( this.userInfo.imageUrl)

      // this.googleAuthService.googleAuth(idToken, stdCode).subscribe(response => {
      //   this.router.navigate(['/app/tabs/profile']);
      // });
      this.googleAuthService.googleAuthTest("6299999991").subscribe(response => {
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

