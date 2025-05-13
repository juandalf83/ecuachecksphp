import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlpath } from '../../../guards/appSettings';

@Injectable()
export class LoginService {

  pathservice = urlpath.path;
  constructor(private http: HttpClient) {
  }

  login(data): any {
    const url = this.pathservice+'authentication/login'
    return this.http.post(url, {data: data});     
  }

  logout(data){
    const url = this.pathservice+'authentication/logout'
    return this.http.post(url, {data: data});
  }

  register(data) {
    const url = this.pathservice+`authentication/register`;
    return this.http.post(url, {data: data});     
  }

  resetPassword(email) {
    const url = this.pathservice+`authentication/reset_password`;
    return this.http.post(url, {data: email});     
  }
}