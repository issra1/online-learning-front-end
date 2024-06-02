import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Professor } from '../../models/professor';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user = new User();
  professor = new Professor();
  currentRoute: string = '';
  constructor(private _http: HttpClient) { }

  public loginUserFromRemote(user: any) {
    return this._http.post<any>(`${NAV_URL}/signin`, user)
  }


 
  isAdmin():boolean {
    return sessionStorage.ROLE == 'ADMIN'
  }

  isTrainer():boolean {
    return sessionStorage.ROLE == 'TRAINER'
  }

  
  isLearner():boolean {
    return sessionStorage.ROLE == 'LEARNER'
  }

  isUser():boolean {
    return sessionStorage.ROLE == null;
  }

  

  isUserLoggedIn():boolean {    
    return sessionStorage.token != null;
  }

  getAuthenticatedToken() {
    return sessionStorage.getItem('TOKEN');
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem('USER');
  }

  userType() {
    return sessionStorage.getItem('ROLE');
  }



  getUserIdFromSessionStorage(): number | null {
    const userIdString = sessionStorage.getItem('ID'); // Retrieve user ID from session storage
    if (userIdString) {
      return parseInt(userIdString, 10); // Convert the string to a number
    } else {
      return null; // Return null if user ID is not found in session storage
    }
  }

  logout() {
    sessionStorage.removeItem('loggedUser');
    sessionStorage.removeItem('ROLE');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('HOME');
  }

  isCurrentPage(): boolean {    
    return sessionStorage.HOME === 'true'
  }


}
