import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import $ from 'jquery';
import { LoginComponent } from '../../login/login.component';
import { User } from '../../../models/user';
import { RegistrationService } from '../../../services/user-services/registration.service';
import { Professor } from '../../../models/professor';


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, ReactiveFormsModule, LoginComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  user = new User();
  professor = new Professor();
  msg = ' ';

  constructor(private registrationService: RegistrationService, private router: Router) { }

  ngOnInit(): void {
    this.hideUnhideRegister();
  }

  hideUnhideRegister() {
    $(".nav1").addClass("highlight1")
    $("#home-tab").click(function () {
      $("#profile").hide();
      $("#home").show();
      $(".nav1").addClass("highlight1")
      $(".nav2").removeClass("highlight2")
    });
    $("#profile-tab").click(function () {
      $("#home").hide();
      $("#profile").show();
      $(".nav2").addClass("highlight2")
      $(".nav1").removeClass("highlight1")
    });

  }
  registerUser() {
    const role: string[] = ['USER'];
    this.user.status = 'En Attente'
    this.user.roles = role;
    this.registrationService.registerUserFromRemote(this.user).subscribe(
      () => {
        console.log("Registration Success");
        sessionStorage.setItem("username", this.user.username);
        sessionStorage.setItem("gender", this.user.gender);
        this.router.navigate(['/registrationsuccess']);
      },
      error => {
        console.log("Registration Failed");
        console.log(error.error);
        this.msg = "User with " + this.user.email + " already exists !!!";
      }
    )
  }



  registerProfessor() {
    const role: string[] = ['TRAINER'];
    this.user.status = 'En Attente'
    this.professor.roles = role;
    this.professor.profession = 'Formateur';
    this.registrationService.registerProfessorFromRemote(this.professor).subscribe(
      () => {
        console.log("Registration Success");
        sessionStorage.setItem("usernamer", this.professor.username);
        sessionStorage.setItem("genre", this.professor.gender);
        this.router.navigate(['/registrationsuccess']);
      },
      error => {
        console.log("Registration Failed");
        console.log(error.error);
        this.msg = "Professor with " + this.professor.email + " already exists !!!";
      }
    )
  }


}
