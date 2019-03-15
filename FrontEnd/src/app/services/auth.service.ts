import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt"; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  constructor(private _http:Http, public JwtExpired: JwtHelperService) { }

  registerUser(user){

    var header = new Headers();
    header.append('Content-Type','application/json');

    return this._http.post('users/register',user, {headers: header})
      .pipe(map(res => res.json()));
  }
  
  authenticateUser(user){

    var header = new Headers();
    header.append('Content-Type','application/json');

    return this._http.post('users/login',user, {headers: header})
      .pipe(map(res => res.json()));
  }

  getProfile(){

    var header = new Headers();
    this.getToken();
    header.append('Authorization',this.authToken);
    header.append('Content-Type','application/json');
    return this._http.get('users/profile', {headers: header})
      .pipe(map(res => res.json()));
  }

  getToken(){

    var token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  
  storeUserData(token, user){

    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout(){

    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  isLoggedIn(){

    //return this.JwtExpired.isTokenExpired();
    return (localStorage.getItem('id_token') !== null);
  }
}
