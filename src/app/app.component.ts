import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { LoginService } from './services/security-service/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WelcomepageComponent } from './components/shared-component-management/welcomepage/welcomepage.component';
import { HeaderComponent } from './components/shared-component-management/header/header.component';
import { FooterComponent } from './components/shared-component-management/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLinkWithHref, RouterOutlet, WelcomepageComponent, HeaderComponent, FooterComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Plate-forme d\'apprentissage en ligne';
  currentRoute: string = '';

  isLoggedIn: boolean = false;
  isHomePage: boolean = false;
  email: string | null = '';
  constructor(protected loginService: LoginService, private route: Router, private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isUserLoggedIn();
    this.isHomePage = this.route.url === '/welcome';
    this.email = sessionStorage.loggedUser;
  }
  


  logout() {
    this.loginService.logout();
    this.route.navigate(['/welcome']);
  }


}
