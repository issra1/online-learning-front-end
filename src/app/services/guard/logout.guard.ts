import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "../security-service/login.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class LogoutGuard implements CanActivate {
    constructor(private _service : LoginService) {}
    
    canActivate() {
      if (!this._service.isUserLoggedIn()){
        return true;
      }
      return false;
    }

    
  }
  