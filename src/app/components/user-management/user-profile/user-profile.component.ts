import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import $ from 'jquery';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user-services/user.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  profileDetails: Observable<User[]> | undefined;
  user: User = new User();
  msg = ' ';
  currRole = '';
  loggedUser = '';
  temp = false;

  constructor(private _service: UserService, private _router: Router) { }

  ngOnInit(): void {
    const loggedUser = sessionStorage.getItem('loggedUser');
    const role = sessionStorage.getItem('ROLE');
    
    if (loggedUser && role) {
      this.loggedUser = loggedUser;
      this.currRole = role; // Assign the role directly
    }
  
  
    // Clear password input
    $("#profilecard").show();
    $("#profileform").hide();
    this.getProfileDetails();
  }

  editProfile() {
    $("#profilecard").hide();
    $("#profileform").show();
  }

  getProfileDetails() {
    this._service.getProfileDetails(this.loggedUser).subscribe(
      (data: User[]) => { // Ensure data is of type User[]
        this.profileDetails = of(data); // Convert data to an observable using of() operator
        if (data && data.length > 0) {
          this.user = data[0];
          this.user.password = '';
        }
      },
      (error) => {
        console.error('Error fetching profile details:', error);
      }
    );
  }
  
  updateUserProfile() {
    this._service.updateUserProfile(this.loggedUser, this.user).subscribe(
      data => {
        this.msg = "Vous devez authentifier encore une autre fois !!!";
        $(".editbtn").hide();
        $("#message").show();
        this.temp = true;
        $("#profilecard").show();
        $("#profileform").hide();
        setTimeout(() => {
          sessionStorage.clear();
          this._router.navigate(['/welcome']);
        }, 6000);
      },
      error => {
        console.log("Profile Updation Failed");
        console.log(error);
        this.msg = "Profile Updation Failed !!!";
      }
    )

  }
}
