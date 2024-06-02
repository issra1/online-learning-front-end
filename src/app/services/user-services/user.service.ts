import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const NAV_URL = environment.apiURL;
const NAV_URL_USER = environment.apiURLUser;


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this._http.get<any>(`${NAV_URL}/userlist`);
  }


  getAllUsersByRoles(role: string) {
    return this._http.get<any>(`${NAV_URL_USER}/roles/` + role);
  }

  getAllUsersExceptAdminByRoles(role: string) {
    return this._http.get<any>(`${NAV_URL_USER}/userroles/` + role);
  }

  acceptUser(email: any, data: any): Observable<any> {
    return this._http.put<any>(`${NAV_URL_USER}/updatestatus/${email}`, data);
  }

  refuseUser(email: any, data: any): Observable<any> {
    return this._http.put<any>(`${NAV_URL_USER}/cancelstatus/${email}`, data);
  }

  updateUserProfile(email: any, user: any): Observable<any> {
    return this._http.put<any>(`${NAV_URL_USER}/updateuserprofile/${email}`, user);
  }

  getProfileDetails(loggedUser: string): Observable<any> {
    return this._http.get(`${NAV_URL_USER}/getprofildetails/` + loggedUser);
  }


  deleteUser(email: any, data: any): Observable<any> {
    return this._http.put<any>(`${NAV_URL_USER}/delete-user/${email}`, data);
  }






}
