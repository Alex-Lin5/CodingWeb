import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { AuthData } from "./authdata.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  hostURL = 'http://localhost:3000'
  constructor(private http: HttpClient, private router: Router){}

  login(authdata: AuthData){
    this.http.post<AuthData>(`${this.hostURL}/user/login`, authdata)
      .subscribe(res => {
        console.log(res);
      })
  }
}