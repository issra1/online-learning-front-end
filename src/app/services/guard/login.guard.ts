import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "../security-service/login.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class LoginGuard implements CanActivate {
    constructor(private _router : Router, private _service : LoginService) {}
    
    canActivate() {
      if (this._service.isUserLoggedIn()){
        return true;
      }
      this._router.navigate(['login']);
      return false;
    }
    
  }
  