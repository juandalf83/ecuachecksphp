import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import { Observable, firstValueFrom, retry } from 'rxjs';
import { urlpath } from '../guards/appSettings';

@Injectable()
export class QueryService {

  pathservice = urlpath.path_report;
  dataResult: any;
  constructor(private http: HttpClient, private handleError: HttpHandler) {
  }

  queryReport(data: any) {
    const url = this.pathservice+`report_pdf.php`;
    return this.http.post(url, {data: data});     
  }

  getDataResult(){
    let data = localStorage.getItem('report');
    return JSON.parse(data);
  }

  setDataResult(dataResult){
    this.dataResult = dataResult;
    localStorage.setItem('report', JSON.stringify(this.dataResult));
  }

  getStatusResult(){
    let data = localStorage.getItem('status');
    return JSON.parse(data);
  }

  setStatusResult(dataResult){
    this.dataResult = dataResult;
    localStorage.setItem('status', JSON.stringify(this.dataResult));
  }
}