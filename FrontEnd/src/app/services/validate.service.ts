import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegisterUser(user){

    if(user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined){
      return false;
    }
    else{
      return true;
    }
  }

  ValidateEmail(email){
    const regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regx.test(email);
  }

  validateLoginUser(user){

    if(user.username == undefined || user.password == undefined){
      return false;
    }
    else{
      return true;
    }
  }
}
