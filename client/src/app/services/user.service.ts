import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlpath } from '../guards/appSettings';

@Injectable()
export class UserService {

  pathservice = urlpath.path;
  constructor(private http: HttpClient, private handleError: HttpHandler) {
  }

  // Generic function to consume API
  searchUsersAdmin(): Observable<any[]> {
    let requestUrl = this.pathservice+`users`;
    return this.http.get<any[]>(requestUrl, {});
  }

  searchUserCompany(id_company: string): Observable<any[]> {
    let requestUrl = this.pathservice+`users/by_company/${id_company}`;
    return this.http.get<any[]>(requestUrl, {});
  }

  // Generic function to consume API
  getUsersAdmin() {
    let requestUrl = this.pathservice+`users`;
    return this.http.get(requestUrl, {});
  }

  getUsersInterviewer() {
    let requestUrl = this.pathservice+`users/interviewer`;
    return this.http.get(requestUrl, {});
  }

  getUserActive(token: string) {
    let requestUrl = this.pathservice+`users/by_token/${token}`;
    return this.http.get(requestUrl, {});
  }

  save(data) {
    const url = this.pathservice+`users/save`;
    return this.http.post(url, {data: data});     
  }

  saveAccount(data){
    const url = this.pathservice+`users/save_my_account`;
    return this.http.post(url, {data: data});     
  }

  delete(id: string) {
    const url = this.pathservice+`users/delete/${id}`;
    return this.http.delete(url, {});     
  }

  updateStatus(data){
    const url = this.pathservice+`users/update_status`;
    return this.http.post(url, {data: data}); 
  }

  resetPass(data) {
    const url = this.pathservice+`users/reset_password`;
    return this.http.post(url, {data: data});     
  }
}