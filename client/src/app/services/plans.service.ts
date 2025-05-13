import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlpath } from '../guards/appSettings';

@Injectable()
export class PlansService {

  pathservice = urlpath.path;
  constructor(private http: HttpClient, private handleError: HttpHandler) {
  }

  searchObjects(): Observable<any[]> {
    let requestUrl = this.pathservice+`plans`;
    return this.http.get<any[]>(requestUrl, {});
  }

  updateStatus(data){
    const url = this.pathservice+`plans/update_status`;
    return this.http.post(url, {data: data});
  }

  save(data) {
    const url = this.pathservice+`plans/save`;
    return this.http.post(url, {data: data});     
  }
}