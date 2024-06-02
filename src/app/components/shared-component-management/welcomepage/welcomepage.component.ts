import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import $ from 'jquery';
import { CommonModule } from '@angular/common';
import { ListCoursesComponent } from '../../course-management/list-courses/list-courses.component';
import { FooterComponent } from '../footer/footer.component';
import { LoginService } from '../../../services/security-service/login.service';

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  standalone: true,
  imports: [FooterComponent,ListCoursesComponent,CommonModule],
  styleUrl: './welcomepage.component.css'
})
export class WelcomepageComponent implements OnInit {

  isLoggedIn: boolean = false;
  userIcon: string = ''; // Add an icon for the authenticated user if needed
  userEmail: string | null = '';

  constructor(private _router: Router, protected loginService: LoginService) {
    sessionStorage.setItem('HOME', 'true');
  }

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isUserLoggedIn();
    // Get the email of the authenticated user
    this.userEmail = sessionStorage.loggedUser; // Assuming you store the email in sessionStorage
    // Set an icon for the authenticated user if needed
    // For example, you can set it based on the user's role or use a default icon
    if (this.isLoggedIn) {
      // Set the user icon based on the user's role or use a default icon
      // Example: this.userIcon = 'path-to-user-icon'; // Update with your icon path
    }
    this.hideUnhidePage();
  }

  hideUnhidePage() {
    $("#subtext1").click(function () {
      $("#innertext1").slideToggle(300);
      if ($('#innertext2').is(':visible') || $('#innertext3').is(':visible') || $('#innertext4').is(':visible')) {
        $('#innertext2').slideUp(300);
        $('#innertext3').slideUp(300);
        $('#innertext4').slideUp(300);
      }
    });
    $("#subtext2").click(function () {
      $("#innertext2").slideToggle(300);
      if ($('#innertext1').is(':visible') || $('#innertext3').is(':visible') || $('#innertext4').is(':visible')) {
        $('#innertext1').slideUp(300);
        $('#innertext3').slideUp(300);
        $('#innertext4').slideUp(300);
      }
    });
    $("#subtext3").click(function () {
      $("#innertext3").slideToggle(300);
      if ($('#innertext1').is(':visible') || $('#innertext2').is(':visible') || $('#innertext4').is(':visible')) {
        $('#innertext1').slideUp(300);
        $('#innertext2').slideUp(300);
        $('#innertext4').slideUp(300);
      }
    });
    $("#subtext4").click(function () {
      $("#innertext4").slideToggle(300);
      if ($('#innertext1').is(':visible') || $('#innertext2').is(':visible') || $('#innertext3').is(':visible')) {
        $('#innertext1').slideUp(300);
        $('#innertext2').slideUp(300);
        $('#innertext3').slideUp(300);
      }
    });
  }

  goToLoginPage() {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }

  scrollToDivHtml(servicesSection: HTMLElement) {
    servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }

  goToRegisterPage() {
    this._router.navigate(['/registration']);
  }

  goToNextPageAdmin() {
    sessionStorage.HOME = 'false';
    if (sessionStorage.ROLE === 'ADMIN') {
      this._router.navigate(['/dashbordadmin']);
    } else {
      sessionStorage.clear();
      this._router.navigate(['/login']);
    }
  }

  goToNextPageTrainer() {
    sessionStorage.HOME = 'false';
    if (sessionStorage.ROLE === 'TRAINER') {
      this._router.navigate(['/dashbordprofessor']);
    } else {
      sessionStorage.clear();
      this._router.navigate(['/login']);
    }
  }

  goToNextPageLearner() {
    sessionStorage.HOME = 'false';
    if (sessionStorage.ROLE === 'LEARNER') {
      this._router.navigate(['/dashborduser']);
    } else {
      sessionStorage.clear();
      this._router.navigate(['/login']);
    }
  }


logout() {
  this.loginService.logout();
}







}