import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrationsuccess',
  standalone: true,
  imports: [],
  templateUrl: './registrationsuccess.component.html',
  styleUrl: './registrationsuccess.component.css'
})
export class RegistrationsuccessComponent implements OnInit{

  constructor(private router : Router) { }

  ngOnInit(): void {
    this.navigateToHome();
  }

  navigateToHome() {
    setTimeout(() => {
      this.router.navigate(['welcome']);
  }, 7000);

  }

}
