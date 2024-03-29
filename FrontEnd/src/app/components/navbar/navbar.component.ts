import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private _auth: AuthService,
    private _flash: FlashMessagesService,
    private _route: Router,
  ) { }

  ngOnInit() {
  }

  onLogoutClicked(){

    this._auth.logout();
    this._flash.show("You are now logged out" , {cssClass: "alert-success" ,timeout: 3000});
    this._route.navigate(['home']);
    return false;
  }

}
