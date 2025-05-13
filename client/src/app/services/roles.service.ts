import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlpath } from '../guards/appSettings';

@Injectable()
export class RolesService {

  pathservice = urlpath.path;
  constructor(private http: HttpClient) {
  }

  getRoles() {
    return this.http.get(`${this.pathservice}roles`, {}); 
  }
}