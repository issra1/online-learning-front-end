import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {  Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { HeaderComponent } from '../../shared-component-management/header/header.component';
import { FooterComponent } from '../../shared-component-management/footer/footer.component';
import { LoginService } from '../../../services/security-service/login.service';

@Component({
  selector: 'app-dashbord-admin',
  standalone: true,
  imports: [FooterComponent,FormsModule,CommonModule,RouterModule,HeaderComponent],
  templateUrl: './dashbord-admin.component.html',
  styleUrl: './dashbord-admin.component.css'
})
export class DashbordAdminComponent {
  sidebarShow: boolean = true;

  name = 'admin';
  gender = '';
  loggedUser = '';
  currRole = '';
  professors : Observable<any[]> | undefined;
  users : Observable<any[]> | undefined;
  courses : Observable<any[]> | undefined;
  enrollments : Observable<any[]> | undefined;
  enrollmentcount : Observable<any[]> | undefined;
  wishlist : Observable<any[]> | undefined;
  chapters : Observable<any[]> | undefined;

  constructor(private _route : Router, private loginService : LoginService) { }

  ngOnInit(): void{
    

    this.name = JSON.stringify(sessionStorage.getItem('ROLE')|| '{}');
    this.name = this.name.replace(/"/g, '');

    this.gender = JSON.stringify(sessionStorage.getItem('gender')|| '{}');
    this.gender = this.gender.replace(/"/g, '');

    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| '{}'); 
    this.currRole = this.currRole.replace(/"/g, '');
  }

logout() {
this.loginService.logout();
this._route.navigate(['/welcome']);
}

}
