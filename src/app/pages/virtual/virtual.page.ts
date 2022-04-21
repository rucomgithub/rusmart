import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/student/profile/profile.service';
import { StudentProfile, Token } from '../../services/student';
@Component({
  selector: 'app-virtual',
  templateUrl: './virtual.page.html',
  styleUrls: ['./virtual.page.scss'],
})
export class VirtualPage implements OnInit {
  studentProfile: StudentProfile;
  imageurl;
  constructor(   
     public profileService: ProfileService,
     
    ) { }

  ngOnInit() {
    this.fetchProfile()
    this.imageurl = localStorage.getItem('imageUrl')
  }
  fetchProfile(){
    this.profileService.fetchStudentProfile().subscribe(
      data =>{ this.studentProfile = data
       console.log(data)
      }
    )
  }

  flipcard(){}


}
