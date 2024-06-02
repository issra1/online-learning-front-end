import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import $ from 'jquery';
import { CommonModule } from '@angular/common';
import { Professor } from '../../models/professor';
import { User } from '../../models/user';
import { LoginService } from '../../services/security-service/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [RouterModule, FormsModule, CommonModule, ReactiveFormsModule],
  standalone: true
})
export class LoginComponent implements OnInit {

  user = new User();
  professor = new Professor();
  msg = "";
  adminEmail = "";
  adminPassword = "";
  currentSection = '';

  constructor(private _service: LoginService, private _router: Router) { }

  ngOnInit(): void {
    this.hideUnhideUserLoginForm();
  }

  hideUnhideUserLoginForm() {
    $(".admin-login-form").hide();
    $(".professor-login-form").hide();
    $("#userbtn").css("border", "0");
    $("#professorbtn").css("border-bottom", "1.5px solid rgb(6, 50, 53)").css("border-left", "1.5px solid rgb(6, 50, 53)").css("opacity", "0.3");;
    $("#adminbtn").css("border-bottom", "1.5px solid rgb(6, 50, 53)").css("opacity", "0.3");

    $(".userlogin").click(function () {
      $(".user-login-form").hide();
      $(".admin-login-form").show();
    });

    $("#userbtn").click(function () {
      $(".user-login-form").show();
      $(".admin-login-form").hide();
      $(".professor-login-form").hide();
      $("#userbtn").css("border", "0").css("opacity", "1");
      $("#adminbtn").css("border", "0").css("border-bottom", "1.5px solid rgb(6, 50, 53)").css("opacity", "1").css("opacity", "0.3");
      $("#professorbtn").css("border", "0").css("border-bottom", "1.5px solid rgb(6, 50, 53)").css("border-left", "1.5px solid rgb(6, 50, 53)").css("opacity", "1").css("opacity", "0.3");
    });

    $("#professorbtn").click(function () {
      $(".user-login-form").hide();
      $(".admin-login-form").hide();
      $(".professor-login-form").show();
      $("#userbtn").css("border", "0").css("border-right", "1.5px solid rgb(6, 50, 53)").css("border-bottom", "1.5px solid rgb(6, 50, 53)").css("opacity", "0.3");
      $("#adminbtn").css("border", "0").css("border-left", "1.5px solid rgb(6, 50, 53)").css("border-bottom", "1.5px solid rgb(6, 50, 53)").css("opacity", "0.3");
      $("#professorbtn").css("border", "0").css("opacity", "1");
    });

    $("#adminbtn").click(function () {
      $(".user-login-form").hide();
      $(".admin-login-form").show();
      $(".professor-login-form").hide();
      $("#userbtn").css("border", "0").css("border-bottom", "1.5px solid rgb(6, 50, 53)").css("opacity", "0.3");
      $("#adminbtn").css("border", "0").css("opacity", "1");
      $("#professorbtn").css("border", "0").css("border-right", "1.5px solid rgb(6, 50, 53)").css("border-bottom", "1.5px solid rgb(6, 50, 53)").css("opacity", "0.3");;
    });

    $(".adminlogin").click(function () {
      $(".user-login-form").show();
      $(".admin-login-form").hide();
    });
  }

  authentificateLearner() {
    this._service.loginUserFromRemote(this.user).subscribe(
      (data: any) => {
        if (data.roles[0] == 'LEARNER' && data.status == 'Accepté') {
          sessionStorage.setItem('loggedUser',data.email);
          sessionStorage.setItem('ROLE', data.roles[0]);
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('ID', data.id);
          this._router.navigate(['/dashborduser']);
        } else {
          this.msg = "Veuillez verifier vos informations !!!";
          throw new Error('Veuillez verifier vos informations !!!')
        }
      },
      (error: { error: any; }) => {
        console.log(error.error);
        this.msg = "Veuillez verifier vos informations !!!";
      }
    )
  }



  authentificateAdmin() {    
    this._service.loginUserFromRemote(this.user).subscribe(
      (data: any) => {
        if (data.roles[0] == 'ADMIN') {
          sessionStorage.setItem('loggedUser',data.email);
          sessionStorage.setItem('ROLE', data.roles[0]);
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('ID', data.id);
          sessionStorage.setItem('HOME', 'false');
          this._router.navigate(['/dashbordadmin']);
        } else {
          this.msg = "Veuillez verifier vos informations !!!";
          throw new Error('Veuillez verifier vos informations !!!')
        }
      },
      (error: { error: any; }) => {
        console.log(error.error);
        this.msg = "Veuillez verifier vos informations !!!";
      }
    )
  }


  authentificateProfessor() {
    console.log(this.professor);
    this._service.loginUserFromRemote(this.professor).subscribe(
      (data: any) => {
        if (data.roles[0] == 'TRAINER' && data.status == 'Accepté') {
          sessionStorage.setItem('loggedUser',data.email);
          sessionStorage.setItem('ROLE', data.roles[0]);
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('ID', data.id);
          this._router.navigate(['/dashbordprofessor']);
        } else {
          this.msg = "Veuillez verifier vos informations !!!";
          throw new Error('Veuillez verifier vos informations !!!')
        }
      },
      (error: { error: any; }) => {
        console.log(error.error);
        this.msg = "Veuillez verifier vos informations !!!";
      }
    )
  }


  backToHome() {
    this._router.navigate(['/welcome']);
  }

  

}