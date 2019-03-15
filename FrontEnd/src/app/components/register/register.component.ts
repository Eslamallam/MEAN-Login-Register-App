import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private _validator: ValidateService,
    private _auth: AuthService ,
    private _falsh: FlashMessagesService,
    private _Route: Router
    ) { }

  ngOnInit() {
  }

  onRegister(){
    
    var user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    //check Required fields
    if(!this._validator.validateRegisterUser(user)){
      this._falsh.show('Please fill in all fields and try again !!' , {cssClass: "alert-danger"})
      return false;
    }
    
    //validate email address
    if(!this._validator.ValidateEmail(user.email)){
      this._falsh.show('Please enter a vaild email address !!' , {cssClass: "alert-danger"})
      return false;
    }

    this._auth.registerUser(user).subscribe(data => {
      if(data.success){
        this._falsh.show('You are registered now' , {cssClass: "alert-success" ,timeout: 3000});
        this._Route.navigate(['/login']);
      }
      else{
        this._falsh.show('Something went wrong, try again later !!' , {cssClass: "alert-danger"})
      }
    })
  }
}
