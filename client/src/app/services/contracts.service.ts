import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlpath } from '../guards/appSettings';

@Injectable()
export class ContractsService {

  pathservice = urlpath.path;
  constructor(private http: HttpClient, private handleError: HttpHandler) {
  }

  searchObjects(): Observable<any[]> {
    let requestUrl = this.pathservice+`contracts`;
    return this.http.get<any[]>(requestUrl, {});
  }

  getCreditsContracts(company_id) {
    let requestUrl = this.pathservice+`contracts/valid_credits/${company_id}`;
    return this.http.get(requestUrl, {});
  }

  updateStatus(data){
    const url = this.pathservice+`contracts/update_status`;
    return this.http.post(url, {data: data});
  }

  updateCredits(data){
    const url = this.pathservice+`contracts/update_credits`;
    return this.http.post(url, {data: data});
  }

  createContractCompany(data){
    const url = this.pathservice+`contracts/create_contract_company`;
    return this.http.post(url, {data: data});
  }

  consumeCredits(data){
    const url = this.pathservice+`contracts/consume_credits`;
    return this.http.post(url, {data: data});
  }
}