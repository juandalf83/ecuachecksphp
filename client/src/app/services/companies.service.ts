import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlpath } from '../guards/appSettings';

@Injectable()
export class CompaniesService {

  pathservice = urlpath.path;
  constructor(private http: HttpClient, private handleError: HttpHandler) {
  }

  // Generic function to consume API
  searchObjects(): Observable<any[]> {
    let requestUrl = this.pathservice+`companies`;
    return this.http.get<any[]>(requestUrl, {});
  }

  updateStatus(data){
    const url = this.pathservice+`companies/update_status`;
    return this.http.post(url, {data: data});
  }
  
}