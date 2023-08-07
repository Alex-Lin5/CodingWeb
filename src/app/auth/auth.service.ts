import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { AuthData } from "./authdata.model";
import { User } from "./user.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  hostURL = 'http://localhost:3000'
  private authdata: AuthData = {
    Authenticated: false,
    token: '',
    tokenTimer: ''
  };
  // private isAuthenticated = false;
  // private token: string;
  // private tokenTimer: any;

  constructor(private http: HttpClient, private router: Router){
    // this.authdata.token = '';
    // this.authdata.Authenticated = false;
    // this.authdata.tokenTimer = '';
  }
  getToken(){ return this.authdata.token;}
  getIsAuth(){ return this.authdata.Authenticated;}
  login(user: User){
    if(!user){
      console.log("User is not provided.");
      return;
    }
    console.log("User logging in, ", user);
    this.http.post<AuthData>(`${this.hostURL}/users/login`, user)
      .subscribe(res => {
        // const token = res.token
        if(res.token){
          this.setAuthTimer(res.tokenTimer);
          this.authdata.Authenticated = true;
          const expirationDate = new Date(
            new Date().getTime() + res.tokenTimer*1000);
          console.log("Token expires in ", expirationDate);
          this.authdata.token = res.token;
        }
        // this.router.navigate(['/'])
      })
  }
  signup(user: User){
    if(!user){
      console.log("User is not provided.");
      return;
    }
    console.log("User signing up, ", user);
    this.http.post<AuthData>(`${this.hostURL}/users/signup`, user)
      .subscribe(res => {
        console.log(res);
      })
  }
  logout(){
    this.authdata.token = '';
    this.authdata.Authenticated = false;
    clearTimeout(this.authdata.tokenTimer);
    this.router.navigate(['/']);
  }
  private setAuthTimer(duration: number){
    console.log("Setting timer: ", duration);
    this.authdata.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration*1000);
  }
}