import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

username: String;
password: String;

  constructor(
    private _auth: AuthService,
    private _flash: FlashMessagesService,
    private _route: Router,
    private _validate: ValidateService
  ) { }

  ngOnInit() {
  }

  onLogin(){

    var user = {
      username: this.username,
      password: this.password
    }

    if(!this._validate.validateLoginUser(user)){

      this._flash.show('Please fill in all fields and try again !!' , {cssClass: "alert-danger"})
      return false;
    }

    this._auth.authenticateUser(user).subscribe(data => {

     if(data.success){

      this._auth.storeUserData(data.token, data.user);
      this._flash.show("You are now logged in" , {cssClass: "alert-success"});
      this._route.navigate(['profile']);
     }
     else{

      this._flash.show(data.message , {cssClass: "alert-danger"})
     }

    })
  }

}
