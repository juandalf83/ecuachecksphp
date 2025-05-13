import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlpath } from '../guards/appSettings';

@Injectable()
export class RulesService {

  pathservice = urlpath.path;
  constructor(private http: HttpClient) {
  }

  getRules() {
    return this.http.get(`${this.pathservice}rules`, {}); 
  }

  getRulesCompany(company_id) {
    return this.http.get(`${this.pathservice}rules/by_company/${company_id}`, {}); 
  }

  saveAdmin(data) {
    const url = this.pathservice+`rules/save_admin`;
    return this.http.post(url, {data: data});     
  }

  saveCompany(data) {
    const url = this.pathservice+`rules/save_company`;
    return this.http.post(url, {data: data});     
  }
}