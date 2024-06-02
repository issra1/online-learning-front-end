import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  loggedUser = '';
  currRole = '';
  title = '';

  constructor(private _router: Router) {}
  ngOnInit(): void {
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser') || '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');
  }




  navigateToHome() {
    this._router.navigate(['/welcome']);
   }


  logout() {
    sessionStorage.clear();
    this._router.navigate(['/welcome']);
  }

}

