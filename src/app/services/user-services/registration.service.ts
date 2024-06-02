import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from '../../models/professor';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  user = new User();
  professor = new Professor();

  constructor(private http : HttpClient) { }

public registerUserFromRemote(user : User):Observable<any>{
    return this.http.post<any>(`${NAV_URL}/signup`,user)
}

public registerProfessorFromRemote(professor : Professor):Observable<any>{
    return this.http.post<any>(`${NAV_URL}/signup`,professor)
}

}
