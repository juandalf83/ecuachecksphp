import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlpath } from '../guards/appSettings';

@Injectable()
export class ConsultationsService {

  pathservice = urlpath.path;
  constructor(private http: HttpClient, private handleError: HttpHandler) {
  }

  getConsultations() {
    let requestUrl = this.pathservice+`consultations`;
    return this.http.get(requestUrl, {});
  }

}